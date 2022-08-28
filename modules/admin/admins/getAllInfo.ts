import { Request, Response } from "express";
import { prisma } from "../../../utilis/prisma";

export const GetallInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  //@ts-ignore
  const adId: string = req.userId;
  try {
    //get all admin info
    const adInfo = await prisma.admin.findFirst({
      where: {
        id: adId,
      },

      select: {
        id: true,
        name: true,
        family: true,
        username: true,
        email: true,
        address: true,
        phoneNumber: true,
        bio: true,
        job: true,
        token: true,
        post: {
          select: {
            title: true,
            content: true,
            image: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    // get all user info
    const alluser = await prisma.user.findMany({
      select: {
        name: true,
        family: true,
        username: true,
        email: true,
        address: true,
        phoneNumber: true,
        bio: true,
        skill: true,
        createdAt: true,
      },
    });

    const lengthofUsers: number = alluser.length;

    if (adInfo && alluser) {
      res.status(200).json({ adInfo, alluser, lengthofUsers });
    } else {
      res.status(400).json("error");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
