import { StickerService } from "../services/sticker.js";

export const StickerController = {
  getStickers: async (req, res) => {
    // Fetch stickers for the authenticated user
    const { publicId } = req.query;
    const stickers = await StickerService.getStickers(publicId);
    return res.json(stickers);
  },
  openStickers: async (req, res) => {
    // Get new stickers for the authenticated user
    const { publicId } = req.query;
    const stickers = await StickerService.openStickers(publicId);
    return res.json(stickers);
  },
};
