import { Request, Response } from "express";
import { dataValidation } from "../../../utilis/checkdata";
import { passwordHash } from "../../../utilis/hashpass";
import { prisma } from "../../../utilis/prisma";

export const adminCreate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const dt: any = req.body?.adminInfo;
  const token: string = req.body.token;
  console.log(dt);
  console.log("token", token);

  try {
    const value = dataValidation(dt);

    if (value == false) {
      res.status(401).json("data problem");
    }
    console.log(req);
    console.log("body", req.body);

    // password hash
    const pass: string = passwordHash(dt.password);
    console.log(pass);
    const admin = await prisma.admin.create({
      data: {
        name: dt.name,
        family: dt.family,
        email: dt.email,
        username: dt.username,
        address: dt.address,
        phoneNumber: dt.phoneNumber,
        createdAt: new Date().toISOString(),
        token: "0",
        password: pass,
      },
    });

    const newadmin = {
      name: admin?.name,
      family: admin?.family,
      username: admin?.username,
      email: admin?.email,
      address: admin?.address,
      phoneNmuber: admin?.phoneNumber,
      createdAt: admin?.createdAt,
    };
    console.log(admin);

    if (admin) {
      res.status(200).json(newadmin);
    } else {
      res.status(400).json("error");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
