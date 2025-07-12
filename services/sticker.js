import { AlbumSticker, Sticker } from "../models/index.js";

export class StickerService {
  static async getStickers(publicId) {
    const allStickers = await Sticker.findAll({
      where: { publicId },
      order: [["albumStickerId", "ASC"]],
      include: [{ model: AlbumSticker, as: "albumSticker" }],
      attributes: { exclude: ["id", "publicId"] },
    });
    // reduce with quantity of sticker per album sticker id
    return allStickers.reduce((acc, sticker) => {
      const { albumStickerId, openedAt } = sticker.dataValues;
      const albumSticker = sticker.dataValues.albumSticker.dataValues;
      const index = acc.findIndex(
        (item) => item.albumSticker.id === albumStickerId
      );
      index >= 0
        ? acc[index].quantity++
        : acc.push({ openedAt, quantity: 1, albumSticker });
      return acc;
    }, []);
  }

  static async openStickers(publicId) {
    // Fetch all available album stickers
    let availableStickers = await Sticker.findAll({
      where: { publicId: null },
      limit: 5,
    });

    // Create new batch of stickers if there are not enough available
    if (availableStickers.length < 5) {
      console.log("Not enough available stickers, generating a new batch.");
      availableStickers = await StickerService.#generateBatchOfStickers();
    }

    // Update the publicId and openedAt for the available stickers
    const availableStickerIds = availableStickers.map((sticker) => sticker.id);
    await Sticker.update(
      {
        publicId,
        openedAt: new Date(),
      },
      {
        where: { id: availableStickerIds },
      }
    );

    return await Sticker.findAll({
      where: { publicId },
      order: [["openedAt", "DESC"]],
      limit: 5,
      include: [
        {
          model: AlbumSticker,
          as: "albumSticker",
        },
      ],
      attributes: { exclude: ["id", "publicId", "albumStickerId"] },
    });
  }

  static async #generateBatchOfStickers() {
    // Fetch all album stickers and categorize them by rarity
    const albumStickers = await AlbumSticker.findAll({
      attributes: ["id", "rarity"],
    });

    // Create a new batch of stickers based on the rarity distribution
    // Shiny: 5, Uncommon: 10, Common: 20
    const stickerIds = [];
    const shinyAlbumStickers = albumStickers.filter(
      (sticker) => sticker.rarity === "shiny"
    );
    shinyAlbumStickers.forEach((sticker) =>
      stickerIds.push(
        sticker.id,
        sticker.id,
        sticker.id,
        sticker.id,
        sticker.id
      )
    );

    const uncommonAlbumStickers = albumStickers.filter(
      (sticker) => sticker.rarity === "uncommon"
    );
    uncommonAlbumStickers.forEach((sticker) =>
      stickerIds.push(
        sticker.id,
        sticker.id,
        sticker.id,
        sticker.id,
        sticker.id,
        sticker.id,
        sticker.id,
        sticker.id,
        sticker.id,
        sticker.id
      )
    );

    const commonAlbumStickers = albumStickers.filter(
      (sticker) => sticker.rarity === "common"
    );
    commonAlbumStickers.forEach((sticker) =>
      stickerIds.push(
        sticker.id,
        sticker.id,
        sticker.id,
        sticker.id,
        sticker.id,
        sticker.id,
        sticker.id,
        sticker.id,
        sticker.id,
        sticker.id,
        sticker.id,
        sticker.id,
        sticker.id,
        sticker.id,
        sticker.id,
        sticker.id,
        sticker.id,
        sticker.id,
        sticker.id,
        sticker.id
      )
    );

    // Shuffle the stickers and create new Sticker instances
    const shuffleStickerIds = (stickerIds) => {
      const shuffledStickerIds = [];
      while (stickerIds.length > 0) {
        const randomIndex = Math.floor(Math.random() * stickerIds.length);
        shuffledStickerIds.push(stickerIds[randomIndex]);
        stickerIds.splice(randomIndex, 1);
      }
      return shuffledStickerIds;
    };

    // Create new Sticker instances with the shuffled IDs
    const shuffledStickers = shuffleStickerIds(stickerIds).map(
      (albumStickerId) => ({ publicId: null, openedAt: null, albumStickerId })
    );
    for (const shuffledSticker of shuffledStickers) {
      await Sticker.create(shuffledSticker);
    }

    // Return the newly created stickers
    return await Sticker.findAll({ where: { publicId: null }, limit: 5 });
  }
}
