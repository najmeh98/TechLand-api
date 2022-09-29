import { Request, Response } from "express";
import { prisma } from "../utilis/prisma";

export const getAllCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const getCate = await prisma.category.findMany({
      select: {
        name: true,
        id: true,
        image: true,
      },
    });

    if (getCate) {
      res.status(200).json(getCate);
    } else {
      res.status(400).json(Error);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
