import { Request, Response } from "express";
import { prisma } from "../../../utilis/prisma";

export const count = async (req: Request, res: Response): Promise<void> => {
  try {
    //count of posts
    const postCount = await prisma.post.count();

    // count of users
    const adminCount = await prisma.admin.count();

    if (postCount || adminCount) {
      res.status(200).json({ postCount, adminCount });
    } else {
      res.status(400).json("There are no posts or user");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
