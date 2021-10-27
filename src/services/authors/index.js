import uniqid from "uniqid";
import express from "express";
import createHttpError from "http-errors";
import multer from "multer";
import { getAuthors, saveAuthors } from "../../lib/fs-tools.js";

const authorsRouter = express.Router();

authorsRouter.get("/", async (req, res, next) => {
  try {
    const authors = await getAuthors();
    console.log(authors);

    res.send(authors);
  } catch (error) {
    next(error);
  }
});

authorsRouter.get("/:authorId", async (req, res, next) => {
  try {
    const authors = await getAuthors();
    const author = authors.find((author) => author.id === req.params.authorId);
    if (author) {
      res.send(author);
    } else {
      next(
        createHttpError(404),
        `Invalid Author id, no author with _id:${req.params.authorId}`
      );
    }
  } catch (error) {
    next(error);
  }
});

authorsRouter.post("/", async (req, res, next) => {
  try {
    const newAuthor = {
      ...req.body,
      __id: uniqid(),
      createdAt: new Date(),
      avatar: `https://ui-avatars.com/api/?name=${req.body.name}+${req.body.surname}`,
    };
    const authors = await getAuthors();
    authors.push(newAuthor);
    saveAuthors(authors);
    res.status(201).send(newAuthor);
  } catch (error) {
    next(error);
  }
});

authorsRouter.put("/:authorId", async (req, res, next) => {
  try {
    const authors = await getAuthors();
    const index = authors.findIndex(
      (author) => author.__id === req.params.authorId
    );
    if (!index === -1) {
      next(
        createHttpError(404),
        `Invalid Author id, no author with _id:${req.params.authorId}`
      );
    } else {
      const authorToModify = authors[index];
      const changedAuthor = {
        ...authorToModify,
        ...req.body,
        updatedAt: new Date(),
        __id: req.params.authorId,
      };

      authorToModify = changedAuthor;
      await saveAuthors(authors);
      res.send(changedAuthor);
    }
  } catch (error) {
    next(error);
  }
});

authorsRouter.delete("/:authorId", async (req, res, next) => {
  try {
    const authors = await getAuthors();
    const remainingAuthors = authors.filter(
      (author) => author.__id !== req.params.authorId
    );
    saveAuthors(remainingAuthors);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default authorsRouter;
