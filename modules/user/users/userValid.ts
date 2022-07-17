import { Request, Response } from "express";
import { prisma } from "../../../utilis/prisma";
import jwt from "jsonwebtoken";
export const userValid = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    console.log(req.userId);
    const jwttoken: any = process.env.JWT_TOKEN;

    const userInfo = await prisma.user.findFirst({
      where: {
        //@ts-ignore
        id: req.userId,
      },
      include: {
        post: true,
      },
    });
    if (userInfo) {
      const userId: any = userInfo.id;
      const token = jwt.sign(userId, jwttoken);

      const user = {
        id: userInfo?.id,
        fullName: userInfo?.name,
        email: userInfo?.email,
        bio: userInfo?.bio,
        skill: userInfo?.skill,
        isAdmin: userInfo?.isAdmin,
        createdAt: userInfo?.createdAt,
        token: token,
      };

      const post = userInfo?.post;

      res.status(200).json({ user, post });
    } else {
      res.status(400).json("data problem");
    }
  } catch (error) {
    res.status(500).json({ Error });
  }
};
