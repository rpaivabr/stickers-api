import { DataTypes } from 'sequelize'
import { Sticker } from './sticker.js'
import sequelize from '../config/database.js'

export const AlbumSticker = sequelize.define('AlbumSticker', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  rarity: {
    type: DataTypes.ENUM,
    values: ['common', 'uncommon', 'shiny'],
    allowNull: false,
  },
}, { timestamps: false });

const insertStickersIfNotExists = async (stickers) => {
  await sequelize.sync();
  const existingStickers = await AlbumSticker.findAll();
  if (existingStickers.length > 0) {
    console.log("Stickers already exist in the database.");
    return;
  }
  await AlbumSticker.bulkCreate(stickers);
  console.log("Stickers inserted successfully.");
}

// Create user stickers data if it doesn't exist
const stickers = [
  { imageUrl: "https://example.com/sticker1.png", rarity: "shiny" },
  { imageUrl: "https://example.com/sticker2.png", rarity: "shiny" },
  { imageUrl: "https://example.com/sticker3.png", rarity: "uncommon" },
  { imageUrl: "https://example.com/sticker4.png", rarity: "uncommon" },
  { imageUrl: "https://example.com/sticker5.png", rarity: "uncommon" },
  { imageUrl: "https://example.com/sticker6.png", rarity: "common" },
  { imageUrl: "https://example.com/sticker7.png", rarity: "common" },
  { imageUrl: "https://example.com/sticker8.png", rarity: "common" },
  { imageUrl: "https://example.com/sticker9.png", rarity: "common" },
  { imageUrl: "https://example.com/sticker10.png", rarity: "common" }
]
insertStickersIfNotExists(stickers);
