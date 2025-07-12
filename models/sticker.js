import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

export const Sticker = sequelize.define('Sticker', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  publicId: {
    type: DataTypes.STRING,
  },
  openedAt: {
    type: DataTypes.DATE,
  }
}, { timestamps: false });
