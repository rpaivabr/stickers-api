import { createHash } from "crypto";

export const encrypt = (password) => {
  return createHash("sha256").update(password).digest("hex");
};