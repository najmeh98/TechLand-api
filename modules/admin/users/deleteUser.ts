import { Request, Response } from "express";
import { prisma } from "../../../utilis/prisma";

export const DeleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: any = req.params.id;

    if (!id) return;

    const deleteuser = await prisma.user.delete({
      where: { id: Number(id) },
    });

    if (deleteuser) {
      res.status(200).json({ deleteuser, message: "user deleted successfuly" });
    } else {
      res.status(400).json("user does not delete");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
