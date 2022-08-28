import { Request, Response } from "express";
import { prisma } from "../../../utilis/prisma";
import jwt from "jsonwebtoken";
import { generateAcessToken } from "../../../utilis/authenticate";

export const userValid = async (req: Request, res: Response): Promise<void> => {
  console.log("uservalid", req.body);

  const id = req.body?.id;

  //@ts-ignore
  const userId: string = req.userId;

  try {
    const userInfo = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        family: true,
        username: true,
        email: true,
        bio: true,
        skill: true,
        isAdmin: true,
        createdAt: true,
        address: true,
        phoneNumber: true,
        token: true,
      },
    });

    if (userInfo) {
      const userId: any = userInfo.id;
      const token: string = generateAcessToken(userId);

      res.status(200).json(userInfo);
    } else {
      res.status(401).json("user not found");
    }
  } catch (error) {
    console.dir(error);
    res.status(500).json(error);
  }
};
