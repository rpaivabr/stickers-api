import { User } from "../models/index.js";
import { Validators, encrypt } from "../utils/index.js";

export class UserService {
  static async login(email, password) {
    // Validate params
    if (!email || !password) {
      throw new Error("Required email or password");
    }

    // Check if email is valid
    if (!Validators.email(email)) {
      throw new Error("Invalid email format");
    }

    // Check if user exists in the database
    const user = await User.findOne({
      attributes: ["publicId"],
      where: { email, password: encrypt(password) },
    });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const { publicId } = user;
    return publicId;
  }
}
