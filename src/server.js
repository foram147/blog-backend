import express from "express";
import authorsRouter from "./services/authors/index.js";
import postsRouter from "./services/posts/index.js";
import listEndpoints from "express-list-endpoints";

import path from "path";
import {
  badRequest,
  forbidden,
  notFound,
  serverError,
} from "./errorHandler.js";
import cors from "cors";
import createHttpError from "http-errors";

const server = express();
const port = process.env.PORT;
console.log(process.env.DB_CONNECTION_STRING);

const whitelist = [
  process.env.FRONTEND_LOCAL_URL,
  process.env.FRONTEND_PROD_URL,
];
const corsOpts = {
  origin: function (origin, next) {
    console.log("current origin", origin);
    if (!origin || whitelist.indexOf(origin) !== -1) {
      next(null, true);
    } else {
      next(createHttpError(400, "CORS ERROR"));
    }
  },
};

server.use(cors(corsOpts));
server.use(express.static(path.join(process.cwd(), "public")));
server.use(express.json());

server.use("/authors", authorsRouter);
server.use("/posts", postsRouter);
console.table(listEndpoints(server));

// error handlers
server.use(badRequest);
server.use(forbidden);
server.use(notFound);
server.use(serverError);

server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
