import { Request, Response } from "express";
import { dataValidation } from "../../../utilis/checkdata";
import { passwordHash } from "../../../utilis/hashpass";
import { prisma } from "../../../utilis/prisma";

export const adminCreate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const dt: any = req.body?.adminInfo;

  try {
    const value = dataValidation(dt);

    if (value == false) {
      res.status(401).json("data problem");
    }

    const phoneNumber: string = dt?.phoneNumber;

    const findAdmin = await prisma.admin.findFirst({
      where: {
        phoneNumber: phoneNumber,
      },
    });

    if (findAdmin) {
      res.status(400).json({ error: "admin already exists." });
    }

    // password hash
    const pass: string = passwordHash(dt.password);
    // create new admin
    const admin = await prisma.admin.create({
      data: {
        id: undefined,
        name: dt.name,
        family: dt.family,
        email: dt.email,
        username: dt.username,
        address: dt.address,
        phoneNumber: dt.phoneNumber,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        token: "0",
        password: pass,
        bio: "",
        job: "",
      },
      select: {
        name: true,
        family: true,
        username: true,
        email: true,
        address: true,
        phoneNumber: true,
        createdAt: true,
      },
    });

    if (admin) {
      res.status(200).json(admin);
    } else {
      res.status(400).json("Error in creating a new admin");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
