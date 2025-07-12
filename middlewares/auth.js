import { AuthService } from "../services/index.js";

export const auth = async (req, res, next) => {
  console.log("Authenticating user...");
  console.log(req.query);
  // Validate request query
  const { publicId } = req.query;
  if (!publicId) {
    return res.status(400).send("PublicId query is required");
  }

  try {
    // Authenticate user
    await AuthService.auth(publicId);
    next();
  } catch (err) {
    return res.status(401).send("Unauthorized: Invalid user credentials");
  }
};