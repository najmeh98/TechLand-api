import { prisma } from "../../../utilis/prisma";
import { Request, Response } from "express";

export const GetAllPost = async (req: Request, res: Response) => {
  const id: number = req.body.id;

  try {
    const posts = await prisma.user.findFirst({
      where: {
        id: Number(id),
        // //@ts-ignore
        // id: req.userId,
      },
      include: {
        post: true,
      },
    });

    if (posts) {
      const data: any = {
        name: posts.name,
        family: posts.family,
        username: posts.username,
        email: posts.email,
        bio: posts.bio,
        id: posts.id,
        skill: posts.skill,
        post: posts.post,
      };

      res.status(200).json(data);
    } else {
      res.status(400).json("No post found");
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

/**
 * TODO
 * - add get router for get all posts
 * -
 * -
 */
