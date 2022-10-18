import { Request, Response } from "express";
import { prisma } from "../../../utilis/prisma";
import { IAdInfo } from "./admin.interface";

export const GetallInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  //@ts-ignore
  const adId: string = req.userId;
  try {
    //get all admin info
    const adInfo: IAdInfo | null = await prisma.admin.findFirst({
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
        image: true,
        createdAt: true,
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

    if (adInfo) {
      res.status(200).json({ adInfo });
    } else {
      res.status(400).json(Error);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
