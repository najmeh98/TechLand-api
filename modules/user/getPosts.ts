import { Request, Response } from "express";
import { prisma } from "../../utilis/prisma";

export const getPosts = async (req: Request, res: Response): Promise<void> => {
  const catId: string = req.query.catId as string;

  console.log("req", req);
  console.log("bd", req.body);
  console.log("catId", catId);

  try {
    const getposts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        image: true,
        categoryId: true,
        createdAt: true,
        updatedAt: true,
        admin: {
          select: {
            id: true,
            name: true,
            image: true,
            family: true,
            createdAt: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    if (getposts) {
      console.log(getposts);
      res.status(200).json(getposts);
    } else {
      res.status(400).json(Error);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
