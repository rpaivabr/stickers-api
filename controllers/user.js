import { UserService } from "../services/index.js";

export const UserController = {
   login: async (req, res) => {
    // Attempt to log in the user
    const { email, password } = req.body;
    const publicId = await UserService.login(email, password);
    res.status(201).send({ publicId });
  }
}