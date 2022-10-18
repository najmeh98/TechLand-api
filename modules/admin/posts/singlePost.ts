import { Request, Response } from "express";
import { prisma } from "../../../utilis/prisma";
import { findpost } from "./post.interface";

export const singlePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const psId: any = req.query?.postId;

  try {
    const post: findpost | null = await prisma.post.findFirst({
      where: {
        id: psId,
      },
      select: {
        title: true,
        content: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        id: true,
      },
    });
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(400).json(Error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
