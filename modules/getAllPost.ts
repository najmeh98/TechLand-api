import { prisma } from "../utilis/prisma";
import { Request, Response } from "express";

export const GetAllPost = async (req: Request, res: Response) => {
  const { id } = req.body;

  // try {
  console.log(id);

  const posts = await prisma.user.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      //@ts-ignore
      post: true,
    },
  });

  if (posts) {
    res.status(200).json(posts);
  } else {
    res.status(400).json("No post found");
  }
  // } catch (error) {
  //   res.status(500).json({ error });
  // }
};

/**
 * TODO
 * - add get router for get all posts
 * -
 * -
 */
