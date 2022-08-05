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
        name: true,
        email: true,
        phoneNumber: true,
        family: true,
        createdAt: true,
        id: true,
        address: true,
        username: true,
      },
    });
    if (result) {
      console.log("result", result);
      res.status(200).json(result);
    } else {
      res.status(400).json(Error);
    }
    console.log("hi");
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