import { Request, Response } from "express";
// import fileUpload from "express-fileupload";
import express from "express";
import { prisma } from "../utilis/prisma";
import multer from "multer";
import path from "path";

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },
  filename: (req, file, cb) => {
    let year = new Date(Date.now()).getFullYear();
    let month = new Date(Date.now()).getMonth() + 1;
    cb(null, Date.now() + file.originalname);
    // cb(null, `${year}/${month}/${file.originalname}`);
  },
});
export const upload = multer({ storage: fileStorage }).single("file");

export const CreatePost = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    console.log(title);
    const filename = req.file?.filename;
    const path = req.file?.path;
    console.log(req.file);
    if (!req.files) {
      const error = new Error("Please upload a file");
      return error;
      // return res.status(400).json({ msg: "No file uploaded" });
    }

    console.log(title, content);

    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        //@ts-ignore
        image: path,
      },
    });
    // console.log("result:", result);
    res.status(200).send({
      path: path,
      title: title,
      content: content,
    });
  } catch (error) {
    console.log(error);
  }
};
