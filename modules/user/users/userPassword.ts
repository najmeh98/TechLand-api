import { Request, Response } from "express";
import { hashpassmethod } from "../../../utilis/authenticate";
import { prisma } from "../../../utilis/prisma";

export const userPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const currentpass: string = req.body?.passwordInfo?.currentPassword;

  const newpass: string = req.body?.passwordInfo?.newPassword;

  //@ts-ignore
  const userId = req.userId;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (user) {
      const id: any = user?.id;
      const oldpass: string = user?.password;

      const hashCurrentPass: string = hashpassmethod(currentpass);

      const hashNewPass: string = hashpassmethod(newpass);

      if (oldpass === hashCurrentPass) {
        const updatePass = await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            password: hashNewPass,
          },
        });

        if (updatePass) {
          res.status(200).json(updatePass);
        } else {
          res.status(400).json(Error);
        }
      } else {
        console.log(Error);
        res.status(404).json("The password is wrong");
      }
    } else {
      res.status(401).json("user not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
