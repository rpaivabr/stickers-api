import { User } from "../models/index.js";

export class AuthService {
  static async auth(publicId) {
    // Check if user exists in the database
    const user = await User.findOne({
      attributes: ["publicId"],
      where: { publicId },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return;
  }
}