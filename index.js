import { server, port, json } from "./config/server.js";
import { notFound, error } from "./middlewares/index.js";
import { router } from './routes.js';

// Middleware to parse JSON bodies
server.use(json());

// Routes
server.use(router);

// Not Found Middleware (optional, can be used to handle 404 errors)
server.use(notFound);
// Error handling middleware (must be the last middleware)
server.use(error);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log("Pressione Ctrl+C para desligar o servidor.");
});
