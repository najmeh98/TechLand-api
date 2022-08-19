import { Request, Response } from "express";
import fileUpload from "express-fileupload";
import express from "express";
import { prisma } from "../../../utilis/prisma";
import { uploaderConfig, uploadService } from "../../../utilis/main-services";
const app = express();
app.use(express.json());
app.use(fileUpload()); // Don't forget this line!

export const EditPost = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;

    const title: string = req.body.title;
    const content: string = req.body.content;

    const files: any = req.files;

    const bucket: string = uploaderConfig.createImage.bucket;
    const format: string = uploaderConfig.createImage.format;

    const findpost = await prisma.post.findFirst({ where: { id: Number(id) } });
    let data: any;

    if (findpost) {
      const editpost = await prisma.post.update({
        where: { id: Number(id) },
        data: {
          id: undefined,
          title: title,
          content: content,
          updatedAt: new Date(),
          published: false,
          image: "",
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
        res.status(200).json(data);
      } else {
        res.status(400).json(Error);
      }
    } else {
      res.status(404).json("post does not exicted");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// ******
//TODO
// 1. find post
// 2. check if post existed send for update
// *****
