import { Request, Response } from "express";
import { dataValidation } from "../../../utilis/checkdata";
import { prisma } from "../../../utilis/prisma";

export const EditUserInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.params.id;
    const data: any = req.body.userInfo;

    console.log(req.body);

    // check data
    const checkdata: boolean | undefined = dataValidation(data);

    if (checkdata == false) {
      res.status(401).json("data problem");
    }

    const result = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        id: undefined,
        name: data.name,
        family: data.family,
        email: data.email,
        username: data.username,
        phoneNumber: data.phoneNumber,
        address: data.address,
        bio: data.bio,
        isAdmin: false,
        skill: data.skill,
        updatedAt: new Date().toISOString(),
      },
      select: {
        name: true,
        family: true,
        username: true,
        email: true,
        address: true,
        skill: true,
        bio: true,
        phoneNumber: true,
        updatedAt: true,
      },
    });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json("error");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
