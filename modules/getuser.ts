import { Request, Response } from "express";
import { prisma } from "../utilis/prisma";

export const getuser = async (req: Request, res: Response) => {
  try {
    const userInfo = await prisma.user.findUnique({
      where: {},
    });
    if (userInfo) {
      res.status(200).json({ userInfo });
    } else {
      res.status(400).json("user not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
