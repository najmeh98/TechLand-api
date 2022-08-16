import { Request, Response } from "express";
import { prisma } from "../../../utilis/prisma";

export const GetAllusers = async (
  req: Request,
  res: Response
): Promise<void> => {
  // const id: any = req.body.id;

  try {
    const result = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        family: true,
        username: true,
        email: true,
        phoneNumber: true,
        address: true,
        createdAt: true,
      },
    });
    if (result) {
      console.log("result", result);
      res.status(200).json(result);
    } else {
      res.status(400).json(Error);
    }
  } catch (error) {
    console.log(error);
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
