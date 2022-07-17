import { Request, Response } from "express";
import { prisma } from "../../../utilis/prisma";

export const getAllusers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id: any = req.body.id;

  try {
    console.log(id);

    const result = await prisma.user.findMany({});

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json(Error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//Todo
/****
 * 1. get all users
 *
 *
 *
 *
 *
 */
