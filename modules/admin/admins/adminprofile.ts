import { Request, Response } from "express";
import { dataValidation } from "../../../utilis/checkdata";
import { prisma } from "../../../utilis/prisma";

export const adminprofile = async (req: Request, res: Response) => {
  try {
    const id: any = req.params.id;
    const dt: any = req.body.admin;

    if (!id) return;
    // check data
    const value: boolean | undefined = dataValidation(dt);

    if (value == false) {
      res.status(401).json("data is empty!");
    }
    // check token
    // ...

    const updateInfo = await prisma.admin.update({
      where: {
        id: Number(id),
      },
      data: {
        name: dt.name,
        family: dt.family,
        email: dt.email,
        phoneNumber: dt.phoneNumber,
        bio: dt.bio,
        job: dt.job,
        updatedAt: new Date().toISOString(),
        address: dt.address,
        username: dt.username,

        // image:
      },
    });
    if (updateInfo) {
      res.status(200).json(updateInfo);
    } else {
      res.status(400).json("error");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
