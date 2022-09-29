import { Request, Response } from "express";
import { prisma } from "../../utilis/prisma";

export const getAdminInfo = async (req: Request, res: Response) => {
  console.log(req.query);

  const adId: string = req?.query?.query as string;

  try {
    const getInfo = await prisma.admin.findMany({
      where: {
        id: adId,
      },
      select: {
        image: true,
        name: true,
        family: true,
        bio: true,
        job: true,
      },
    });

    if (getInfo.length >= 1) {
      console.log("info", getInfo);
      res.status(200).json(getInfo[0]);
    } else {
      res.status(400).json(Error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
