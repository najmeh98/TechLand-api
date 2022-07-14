import { Request, Response } from "express";
import { prisma } from "../../../utilis/prisma";

export const DeletePost = async (req: Request, res: Response) => {
  try {
    const id: any = req.params.id;
    console.log("deleteid", id);
    const deletepost = await prisma.post.delete({
      where: { id: Number(id) },
    });

    if (deletepost) {
      res.status(200).json({ deletepost, message: "post deleted successfuly" });
    } else {
      res.status(400).json("error");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
