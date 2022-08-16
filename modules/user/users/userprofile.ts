import { Request, Response } from "express";
import { prisma } from "../../../utilis/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dataValidation } from "../../../utilis/checkdata";
export const userProfile = async (req: Request, res: Response) => {
  try {
    const { id, slug }: any = req.params;
    if (!id) return;

    const info: any = req.body.userData;

    //@ts-ignore
    const userId = req.userId;

    const value: boolean | undefined = dataValidation(info);

    if (value == false) {
      res.status(401).json("data is empty");
    }

    const updatedata = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        name: info.name,
        family: info.family,
        username: info.username,
        email: info.email,
        address: info.address,
        phoneNumber: info.phoneNumber,
        bio: info.bio,
        skill: info.skill,
        updatedAt: new Date().toISOString(),
      },
    });

    if (updatedata) {
      res.status(200).json(updatedata);
    } else {
      res.status(400).json("error update");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
