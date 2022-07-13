import { Request, Response } from "express";
import { prisma } from "../../../utilis/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const userInfo = async (req: Request, res: Response) => {
  try {
    const { id, slug }: any = req.params;
    let data: any;

    const password: string = req.body.password;
    const newpassword: string = req.body.newpassword;
    const Renewpassword: string = req.body.Renewpassword;
    const skill: string = req.body.skill;
    const bio: string = req.body.bio;

    if (id) {
      console.log("id", id);
      console.log("slug", slug);
      const User: any = await prisma.user.findFirst({
        where: { id: Number(id) },
      });

      if (User) {
        const compare = await bcrypt.compare(password, User.password);

        if (compare) {
          if (newpassword === Renewpassword) {
            bcrypt.hash(newpassword, 10, async (err, hash) => {
              const updateInfo: any = await prisma.user.update({
                where: {
                  id: Number(id),
                },
                data: {
                  password: hash,
                  bio: bio,
                  skill: skill,
                },
              });
              if (updateInfo) {
                data = {
                  bio: updateInfo.bio,
                  skill: updateInfo.skill,
                  fullName: updateInfo.name,
                  email: updateInfo.email,
                  role: updateInfo.role,
                };
              }

              res.status(200).json(data);
            });
          } else {
            res.status(401).json(" پسورد وارد شده مطابقت ندارد.");
          }
        } else {
          res.status(402).json("پسورد وارد شده اشتباه است");
        }
      }
    } else {
      console.log("کاربر با این مشخصات وجود ندارد.");

      res.status(404).json("کاربر با این مشخصات وجود ندارد.");
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
