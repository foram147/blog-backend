import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON, writeFile } = fs;
const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");

const datFolderPath = join(
  dirname(fileURLToPath(import.meta.url), "../data") //data folder path to read and write images in to the public folder
);

const publicFolderPATH = join(process.cwd(), "public"); // public folder path

//JSON file paths from the data folder
const authorJSONPath = join(dataFolderPath, "author.json");
const postsJSONPath = join(dataFolderPath, "posts.json");

export const getAuthors = () => readJSON(authorJSONPath);
export const saveAuthors = (fileContent) =>
  writeJSON(authorJSONPath, fileContent);

export const getPosts = () => readJSON(postsJSONPath);
export const savePosts = (fileContent) => writeJSON(postsJSONPath, fileContent);

export const saveAuthorPic = (name, bufferContent) =>
  writeFile(join(publicFolderPATH, name), bufferContent);
export const savePostPic = (name, bufferContent) =>
  writeFile(join(publicFolderPATH, name), bufferContent);
