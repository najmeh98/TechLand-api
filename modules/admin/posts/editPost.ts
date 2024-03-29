import { Request, Response } from "express";
import fileUpload from "express-fileupload";
import express from "express";
import { prisma } from "../../../utilis/prisma";
import { uploaderConfig, uploadService } from "../../../utilis/main-services";
import { Post } from "@prisma/client";
import { post } from "./post.interface";
const app = express();
app.use(express.json());
app.use(fileUpload()); // Don't forget this line!

export const EditPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const psId: any = req.query.postId;

    const title: string = req.body.title;
    const content: string = req.body.content;

    const files: any = req.files;

    const bucket: string = uploaderConfig.createImage.bucket;
    const format: string = uploaderConfig.createImage.format;

    const imgUrl: string = await uploadService(req, bucket, format);

    const findpost: Post | null = await prisma.post.findFirst({
      where: { id: psId },
    });

    if (findpost) {
      const editpost: post = await prisma.post.update({
        where: { id: psId },
        data: {
          id: undefined,
          title: title,
          content: content,
          image: `${imgUrl}`,
          published: false,
          updatedAt: new Date(),
        },
        select: {
          id: true,
          title: true,
          content: true,
          image: true,
          updatedAt: true,
          published: true,
        },
      });

      if (editpost) {
        res.status(200).json(editpost);
      } else {
        res.status(400).json(Error);
      }
    } else {
      res.status(404).json("post does not exicted");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// ******
//TODO
// 1. find post
// 2. check if post existed send for update
// *****
