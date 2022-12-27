// import { Admin } from "@prisma/client";
import { Request, Response } from "express";
import { hashpassmethod } from "../../../utilis/authenticate";
import { prisma } from "../../../utilis/prisma";

export const changePassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const passsword: string = req.body?.adminPassword?.currentpassword;
  const newpass: string = req.body?.adminPassword?.newpassword;

  const id: any = req.query.query;

  //@ts-ignore
  const usreId: string = req.userId;

  if (!passsword || !newpass || passsword.length == null) {
    res.status(404).json("data problem");
  }
  try {
    const findUser = await prisma.admin.findFirst({
      where: {
        id: usreId,
      },
    });
    if (findUser) {
      const pass: string = findUser?.password;

      // hash pass
      const hashCurrentPass: string = hashpassmethod(passsword);

      // hash new pass
      const hashNewPass: string = hashpassmethod(newpass);

      const id: any = findUser?.id;

      if (pass === hashCurrentPass) {
        const updatepass = await prisma.admin.update({
          where: {
            id: id,
          },
          data: {
            password: hashNewPass,
            updatedAt: new Date(),
          },
        });
        if (updatepass) {
          res.status(200).json("update password");
        } else {
          res.status(400).json(Error);
        }
      } else {
        console.log(Error);
        res.status(404).json("The password is wrong");
      }
    } else {
      res.status(402).json("user not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
