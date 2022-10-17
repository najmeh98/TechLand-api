import { Request, Response } from "express";
import { prisma } from "../../utilis/prisma";

export const getPostInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("req", req);

  const psId: string = req?.query?.query as string;
  try {
    const post = await prisma.post.findFirst({
      where: {
        id: psId,
      },
      select: {
        image: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        admin: {
          select: {
            family: true,
            name: true,
            image: true,
            id: true,
            job: true,
            email: true,
          },
        },
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
