import { prisma } from "../../../utilis/prisma";
import { Request, Response } from "express";
import { adminpost } from "./post.interface";

export const GetAllPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  //@ts-ignore
  const adminId = req.adminId;

  try {
    const adminPost: adminpost | null = await prisma.admin.findFirst({
      where: {
        id: adminId,
      },
      select: {
        post: {
          select: {
            title: true,
            content: true,
            image: true,
            createdAt: true,
            updatedAt: true,
            id: true,
            categoryId: true,
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (adminPost) {
      res.status(200).json(adminPost);
    } else {
      res.status(400).json("No post found");
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

/**
 * TODO
 * - add get router for get all posts
 * -
 * -
 */
