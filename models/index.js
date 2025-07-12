import { Sticker } from "./sticker.js";
import { AlbumSticker } from "./album-sticker.js";
import { User } from "./user.js";

AlbumSticker.hasMany(Sticker, { foreignKey: 'albumStickerId', as: 'albumSticker' });
Sticker.belongsTo(AlbumSticker, { foreignKey: 'albumStickerId', as: 'albumSticker' });

export { Sticker, AlbumSticker, User };
