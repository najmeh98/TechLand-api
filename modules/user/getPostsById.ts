import { Request, Response } from "express";
import { prisma } from "../../utilis/prisma";

export const getPostsById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const catId: any = req.query.catId;

  console.log("req", req);
  console.log("bd", req.body);
  console.log("catId", catId);

  try {
    const getposts = await prisma.category.findMany({
      where: {
        id: catId,
      },

      include: {
        posts: {
          select: {
            title: true,
            content: true,
            image: true,
            createdAt: true,
            updatedAt: true,
            id: true,
            categoryId: true,
            admin: {
              select: {
                name: true,
                family: true,
                image: true,
                bio: true,
                job: true,
                email: true,
                username: true,
                createdAt: true,
              },
            },
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
