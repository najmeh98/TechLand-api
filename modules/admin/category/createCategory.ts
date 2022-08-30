import { Request, Response } from "express";
import { dataValidation } from "../../../utilis/checkdata";
import { uploaderConfig, uploadService } from "../../../utilis/main-services";
import { prisma } from "../../../utilis/prisma";

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data = req.body;
  const name: string = data?.name;
  const description: string = data?.description;

  const value: any = dataValidation(data);

  if (value == false) {
    res.status(403).json("data problem");
  }

  console.log("req", req);
  console.log("body", req.body);
  console.log("files", req.files);

  const bucket: string = uploaderConfig.createCategory.bucket;
  const format: string = uploaderConfig.createCategory.format;

  const imgUrl: string = await uploadService(req, bucket, format);
  try {
    const createCate = await prisma.category.create({
      data: {
        name: name,
        description: description,
        image: `${imgUrl}`,
      },
      select: {
        name: true,
        description: true,
        image: true,
        id: true,
        posts: {
          select: {
            title: true,
            content: true,
            image: true,
            categoryId: true,
            id: true,
            createdAt: true,
          },
        },
      },
    });
    if (createCate) {
      res.status(200).json(createCate);
    } else {
      res.status(400).json(Error);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
