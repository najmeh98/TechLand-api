import { Request, Response } from "express";
import { prisma } from "../utilis/prisma";

export const getPost = async (req: Request, res: Response) => {
  const { id }: any = req.params;
  try {
    const post = await prisma.post.findFirst({
      where: { id: Number(id) },
      include: {
        author: true,
      },
    });

    const data = {
      title: post?.title,
      content: post?.content,
      image: post?.image,
      published: post?.published,
      createdAt: post?.createdAt,
      updatedAt: post?.updatedAt,
      id: post?.id,

      user: {
        name: post?.author.name,
        email: post?.author.email,
        skill: post?.author.skill,
        bio: post?.author.bio,
        id: post?.author.id,
      },
    };

    console.log("id", id);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
};
