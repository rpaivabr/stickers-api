export const error = async (err, _req, res, _next) => {
  console.error("Error:", err.message);
  console.error("Stack:", err.stack);

  switch (err.message) {
    case "Required email or password":
      return res.status(400).send("Email and password are required");
    case "Invalid email format":
      return res.status(422).send("Invalid email format");
    case "Invalid email or password":
      return res.status(403).send("Invalid email or password");
    default:
      return res.status(500).send("Internal server error");
  }
};
