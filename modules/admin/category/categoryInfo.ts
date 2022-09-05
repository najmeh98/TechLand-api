import { prisma } from "../../../utilis/prisma";
import { Request, Response } from "express";

export const categoryInfo = async (req: Request, res: Response) => {
  const catId: any = req.query?.wbId;

  console.log("catId", catId);

  try {
    const category = await prisma.category.findFirst({
      where: {
        id: catId,
      },
      include: {
        posts: {
          select: {
            title: true,
            content: true,
            image: true,
            id: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
    if (category) {
      console.log("cat", category);
      res.status(200).json(category);
    } else {
      res.status(400).json(Error);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
