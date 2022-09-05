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

  const bucket: string = uploaderConfig.createCategory.bucket;
  const format: string = uploaderConfig.createCategory.format;

  const imgUrl: string = await uploadService(req, bucket, format);

  try {
    const createCate = await prisma.category.create({
      data: {
        id: undefined,
        name: name,
        description: description,
        image: `${imgUrl}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      select: {
        name: true,
        description: true,
        image: true,
        id: true,
        createdAt: true,
        posts: {
          select: {
            id: true,
            title: true,
            content: true,
            image: true,
            categoryId: true,
            createdAt: true,
            updatedAt: true,
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
