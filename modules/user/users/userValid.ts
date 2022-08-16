import { Request, Response } from "express";
import { prisma } from "../../../utilis/prisma";
import jwt from "jsonwebtoken";
import { generateAcessToken } from "../../../utilis/authenticate";

export const userValid = async (req: Request, res: Response): Promise<void> => {
  console.log("uservalid", req.body);

  const id = req.body?.id;

  //@ts-ignore
  const userId: number = req.userId;

  console.log("type", typeof userId); // string
  try {
    const userInfo = await prisma.user.findFirst({
      where: {
        // error: id is strign  , solve: Number(id) --> conver id string to id int
        id: Number(userId),
      },
      include: {
        post: true,
      },
    });
    console.log("userinfo", req.params);

    console.dir(userInfo);
    if (userInfo) {
      const userId: any = userInfo.id;
      const token: string = generateAcessToken(userId);
      const user = {
        id: userInfo?.id,
        name: userInfo?.name,
        family: userInfo?.family,
        username: userInfo?.username,
        email: userInfo?.email,
        bio: userInfo?.bio,
        skill: userInfo?.skill,
        isAdmin: userInfo?.isAdmin,
        createdAt: userInfo?.createdAt,
        address: userInfo?.address,
        token: token,
      };

      console.log("user", user);

      const post = userInfo?.post;
      res.status(200).json({ user, post });
    } else {
      res.status(401).json("user not found");
    }
  } catch (error) {
    console.log("error valid", error);
    console.dir(error);
    res.status(500).json(error);
  }
};
