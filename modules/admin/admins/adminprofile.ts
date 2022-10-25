import { Admin } from "@prisma/client";
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
    const dt: any = JSON.parse(req.body.admin);

    console.log("dt", dt);

    if (!id) return;
    // check data
    const value: boolean | undefined = dataValidation(dt);

    if (value == false) {
      res.status(404).json("data is empty!");
    }
    // check token
    // ...

    const bucket: string = uploaderConfig.createProfile.bucket;
    const format: string = uploaderConfig.createProfile.format;

    const imgUrl: string = await uploadService(req, bucket, format);

    const bucketbanner: string = uploaderConfig.createBanner.bucket;
    const formatbanner: string = uploaderConfig.createBanner.format;

    const bannerUrl: string = await uploadService(
      req,
      bucketbanner,
      formatbanner
    );
    console.log("banner", bannerUrl);
    console.log("img", imgUrl);

    const updateInfo: Admin = await prisma.admin.update({
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
        image: req?.files?.image && `${imgUrl}`,
        banner: req?.files?.banner && `${bannerUrl}`,
        bio: dt.bio,
        job: dt.job,
        updatedAt: new Date().toISOString(),
      },
    });
    if (updateInfo) {
      console.log(updateInfo);
      res.status(200).json(updateInfo);
    } else {
      res.status(400).json(Error);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
