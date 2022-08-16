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
        name: data.name,
        family: data.family,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
        bio: data.bio,
        skill: data.skill,
        username: data.username,
        updatedAt: new Date().toISOString(),
      },
    });
    const userupdate = {
      name: result?.name,
      family: result?.family,
      username: result?.username,
      email: result?.email,
      address: result?.address,
      skill: result?.skill,
      bio: result?.bio,
      phoneNmuber: result?.phoneNumber,
      updateAt: result?.updatedAt,
    };

    if (result) {
      res.status(200).json(userupdate);
    } else {
      res.status(400).json("error");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
