import { Request, Response } from "express";
import { prisma } from "../../../utilis/prisma";

export const EditUserInfo = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    console.log(id);

    console.log(req.body);

    const result = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {},
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
