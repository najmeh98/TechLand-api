import { prisma } from "../utilis/prisma";
import { Request, Response } from "express";

export const getAllPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  // try {
  console.log(id);
  res.send("hello world");
  // } catch (error) {
  // console.log(error);
  // }
};
