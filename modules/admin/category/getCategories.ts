import { Request, Response } from "express";
import { prisma } from "../../../utilis/prisma";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const getCategory = await prisma.category.findMany({
      select: {
        name: true,
        description: true,
        id: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (getCategory) {
      res.status(200).json(getCategory);
    } else {
      res.status(400).json(Error);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
