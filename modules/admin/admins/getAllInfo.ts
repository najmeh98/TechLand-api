import { Request, Response } from "express";
import { prisma } from "../../../utilis/prisma";

export const GetallInfo = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const adId = req.userId;
    console.log(req);

    //admin info
    const adInfo = await prisma.admin.findFirst({
      where: {
        id: adId,
      },
      select: {
        name: true,
        address: true,
        family: true,
        bio: true,
        email: true,
        job: true,
        phoneNumber: true,
        username: true,
      },
    });

    const alluser = await prisma.user.findMany({
      select: {
        name: true,
        address: true,
        family: true,
        email: true,
        phoneNumber: true,
        createdAt: true,
      },
    });

    const lengthofUsers: number = alluser.length;

    console.log("adInfo", adInfo);
    if (adInfo && alluser) {
      res.status(200).json({ adInfo, alluser, lengthofUsers });
    } else {
      res.status(400).json("error");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
