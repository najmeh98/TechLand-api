import { Request, Response } from "express";
import { hashpassmethod } from "../../../utilis/authenticate";
import { prisma } from "../../../utilis/prisma";

export const changePassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("query", req.query);
  console.log("bdy", req.body);

  const passsword: string = req.body?.adminPassword?.currentpassword;
  const newpass: string = req.body?.adminPassword?.newpassword;

  const id: any = req.query.query;

  if (!passsword || !newpass || passsword.length == null) {
    res.status(401).json("data problem");
  }
  try {
    const findUser = await prisma.admin.findFirst({
      where: {
        //@ts-ignore
        id: req.userId,
      },
    });
    if (findUser) {
      console.log(findUser);

      const pass: string = findUser?.password;

      // hash pass
      const hashCurrentPass: string = hashpassmethod(passsword);

      // console.log(hashCurrentPass === pass);

      // hash new pass
      const hashNewPass: string = hashpassmethod(newpass);

      const id: any = findUser?.id;

      if (pass === hashCurrentPass) {
        const updatepass = await prisma.admin.update({
          where: {
            id: Number(id),
          },
          data: {
            password: hashNewPass,
          },
        });
        if (updatepass) {
          res.status(200).json("update password");
        } else {
          res.status(400).json("error");
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
