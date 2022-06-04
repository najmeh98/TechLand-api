import { Request, Response } from "express";
import fileUpload from "express-fileupload";

export const Posts = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const file: any = req.files;
    // if (!req.files) {
    //   res.send("File was not found");
    //   return;
    // }
    console.log("file:", req.files);
    res.status(200).json({ title, content });
  } catch (error) {
    res.status(500).json(error);
  }
};
