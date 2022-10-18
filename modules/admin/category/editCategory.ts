import { Category } from "@prisma/client";
import { Request, Response } from "express";
import { dataValidation } from "../../../utilis/checkdata";
import { uploaderConfig, uploadService } from "../../../utilis/main-services";
import { prisma } from "../../../utilis/prisma";

export const editCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("req", req);
  console.log("body", req.body);
  console.log("req.query", req.query);

  const catId: any = req.query.catId;
  const data = req.body;
  const name: string = data?.name;
  const description: string = data?.description;

  const value = dataValidation(data);

  if (value == false) {
    res.status(401).json("data problem");
  }

  // const imgUrl:string = await uploadService(req,)

  const bucket: string = uploaderConfig.createCategory.bucket;
  const format: string = uploaderConfig.createCategory.format;

  const imgUrl: string = await uploadService(req, bucket, format);

  try {
    const findCategory: Category | null = await prisma.category.findFirst({
      where: { id: catId },
    });
    console.log(findCategory);

    if (findCategory) {
      const editCat: Category = await prisma.category.update({
        where: {
          id: catId,
        },
        data: {
          id: undefined,
          name: name,
          description: description,
          image: `${imgUrl}`,
          updatedAt: new Date(),
        },
      });
      if (editCat) {
        res.status(200).json(editCat);
      } else {
        res.status(400).json(Error);
      }
    } else {
      res.status(404).json("category does not exicted");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
