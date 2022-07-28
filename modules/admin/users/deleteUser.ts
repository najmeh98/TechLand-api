import { Request, Response } from "express";
import { prisma } from "../../../utilis/prisma";

export const DeleteUser = async (req: Request, res: Response) => {
  try {
    const id: any = req.params.id;
    console.log("body", req.body);
    console.log("params", req.params.id);
    // console.log(id);
    const deleteuser = await prisma.user.delete({
      where: { id: Number(id) },
    });

    console.log(deleteuser);

    if (deleteuser) {
      res.status(200).json({ deleteuser, message: "user deleted successfuly" });
    } else {
      res.status(400).json("user does not delete");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
