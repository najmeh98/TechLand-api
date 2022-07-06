import { prisma } from "../utilis/prisma";
import { Request, Response } from "express";

export const GetAllPost = async (req: Request, res: Response) => {
  const id: number = req.body.id;

  // const userid: number = req.userId;
  // try {
  //@ts-ignore
  console.log("userid", req.userId);

  const posts = await prisma.user.findFirst({
    where: {
      // id: Number(id),
      //@ts-ignore
      id: req.userId,
    },
    include: {
      //@ts-ignore
      post: true,
    },
  });

  if (posts) {
    const data: any = {
      fullName: posts.name,
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
