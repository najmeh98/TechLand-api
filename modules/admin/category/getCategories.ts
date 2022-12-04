import { Request, Response } from "express";
import { prisma } from "../../../utilis/prisma";
import { category } from "./category.interface";

export const getCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  const adminId: any = req?.query?.adminId;

  try {
    const getCategory = await prisma.category.findMany({
      include: {
        posts: true,
      },
    });

    if (getCategory) {
      console.log("cat", getCategory);
      res.status(200).json(getCategory);
    } else {
      res.status(400).json(Error);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
