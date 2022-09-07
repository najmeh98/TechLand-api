import { Request, Response } from "express";
import { prisma } from "../../../utilis/prisma";

export const DeletePost = async (req: Request, res: Response) => {
  const postid: any = req.query.psId;
  console.log("deleteid", postid);

  try {
    const deletepost = await prisma.post.delete({
      where: { id: postid },
    });

    if (deletepost) {
      res.status(200).json(deletepost);
    } else {
      res.status(400).json(Error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
