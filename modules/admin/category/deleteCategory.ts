// import { Category } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../../utilis/prisma";

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("req", req);
  console.log("body", req.body);
  console.log("catId", req.query);

  try {
    const catId: any = req.query?.catId;

    const deleteCate = await prisma.category.delete({
      where: {
        id: catId,
      },
    });
    if (deleteCate) {
      res.status(200).json(deleteCate);
    } else {
      res.status(400).json(Error);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
