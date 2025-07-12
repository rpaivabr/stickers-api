
import { UserController, StickerController } from "./controllers/index.js";
import { auth } from "./middlewares/index.js";
import express from "express";
const router = express.Router();

// Public Routes
router.post("/login", UserController.login);

// Private Routes
router.get("/stickers", auth, StickerController.getStickers);
router.post("/stickers", auth, StickerController.openStickers);

export { router };