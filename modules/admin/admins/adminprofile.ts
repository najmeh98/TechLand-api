import { Request, Response } from "express";
import { dataValidation } from "../../../utilis/checkdata";
import { uploaderConfig, uploadService } from "../../../utilis/main-services";
import { prisma } from "../../../utilis/prisma";

export const adminprofile = async (
  req: Request,
  res: Response
): Promise<void> => {
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

    const bucket: string = uploaderConfig.createProfile.bucket;
    const format: string = uploaderConfig.createProfile.format;

    const imgUrl: string = await uploadService(req, bucket, format);

    const updateInfo = await prisma.admin.update({
      where: {
        id: id,
      },
      data: {
        id: undefined,
        name: dt.name,
        family: dt.family,
        email: dt.email,
        username: dt.username,
        address: dt.address,
        phoneNumber: dt.phoneNumber,
        image: `${imgUrl}`,
        bio: dt.bio,
        job: dt.job,
        updatedAt: new Date().toISOString(),
      },
      // select: {
      //   name: true
      // }
    });
    if (updateInfo) {
      console.log(updateInfo);
      res.status(200).json(updateInfo);
    } else {
      res.status(400).json("error");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
