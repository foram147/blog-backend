import createHttpError from "http-errors";
import uniqid from "uniqid";
import express from "express";

import path from "path";
import multer from "multer";
import { getPosts, savePosts, savePostPic } from "../../lib/fs-tools.js";
import fs from "fs-extra";

const postsRouter = express.Router();

const publicFolder = path.join(process.cwd(), "public");

postsRouter.get("/", async (req, res, next) => {
  try {
    const posts = await getPosts();
    console.log(posts);

    res.send(posts);
  } catch (error) {
    next(error);
  }
});

postsRouter.get("/:postId", async (req, res, next) => {
  try {
    const posts = await getPosts();
    const post = posts.find((post) => post._id === req.params.postId);

    const authorId = post.author.id;
    if (post || authorId) {
      res.send(posts);
    } else {
      next(createHttpError(404), `Invalid Post id`);
    }
  } catch (error) {
    next(error);
  }
});

postsRouter.post(
  "/:id",
  multer().single("articleCover"),
  async (req, res, next) => {
    try {
      const { originalname, buffer } = req.file;

      await savePostPic(originalname, buffer);
      const newPost = {
        ...req.body,
        cover: `http://localhost:3000/${originalname}`,
        id: uniqid(),
        createdAt: new Date(),
      };
      // console.log(newAuthor)
      const posts = await getPosts();
      posts.push(newPost);
      await savePosts(posts);
      res.status(201).send(newPost);
    } catch (error) {
      next(error);
    }
  }
);

postsRouter.put(
  "/:postId",
  multer().single("articleCover"),
  async (req, res, next) => {
    try {
      const { originalname, buffer } = req.file;

      const extension = path.extname(originalname);

      const fileName = `${req.params.postId}${extension}`;

      await fs.writeFile(path.join(publicFolder, fileName), buffer);

      const posts = await getPosts();

      const index = posts.findIndex((post) => post._id === req.params.postId);

      if (index !== -1) {
        const postToModify = posts[index];
        const updatedPost = {
          ...postToModify,
          ...req.body,
          cover: `http://localhost:3000/${fileName}`,
          updatedAt: new Date(),
        };

        posts[index] = updatedPost;
        await savePosts(posts);
        res.send(updatedPost);

        res.send(updatedPost);
      } else {
        next(createHttpError(404), `No post found with id of`);
      }
    } catch (error) {
      next(error);
    }
  }
);

postsRouter.delete("/:postId", async (req, res, next) => {
  try {
    const posts = await getPosts();
    const remainingPosts = posts.filter(
      (post) => post._id !== req.params.postId
    );
    await savePosts(remainingPosts);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default postsRouter;
