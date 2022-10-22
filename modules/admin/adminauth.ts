import { Request, Response } from "express";
import { prisma } from "../../utilis/prisma";
import { generateAcessToken, hashpassmethod } from "../../utilis/authenticate";
import { Admin } from "@prisma/client";
import { update } from "./auth.interface";

// check data is not empty
const dataValidation = (adInfo: any): boolean | undefined => {
  let flag: boolean = true;
  const keys = Object.keys(adInfo);
  for (let key of keys) {
    if (adInfo[key] === "" || adInfo[key] == 0) {
      if (flag !== flag) {
        flag = false;
      }
    }
    return flag;
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const adInfo: any = req.body.admin;
  const email: any = adInfo.email;

  const value = dataValidation(adInfo);

  if (value == false) {
    res.status(401).json("data is empty");
  }

  const admin: Admin | null = await prisma.admin.findFirst({
    where: { email: email },
  });

  if (admin) {
    res.status(400).json({ error: "admin already exists." });
  }

  try {
    //hash password
    const pass: string = hashpassmethod(adInfo.password);

    const result: Admin = await prisma.admin.create({
      data: {
        id: undefined,
        name: adInfo.name,
        family: adInfo.family,
        email: adInfo.email,
        username: adInfo.username,
        password: pass,
        phoneNumber: adInfo.phoneNumber,
        address: adInfo.address,
        image: "",
        banner: "",
        token: "0",
        bio: "",
        job: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log(result);

    const adminId: any = result.id;

    //token
    const token: string = generateAcessToken(adminId);

    const admin = {
      id: result.id,
      name: result.name,
      family: result.family,
      username: result.username,
      email: result.email,
      address: result.address,
      phoneNumber: result.phoneNumber,
      image: result?.image,
      banner: result?.banner,
      createdAt: result?.createdAt,
      token: token,
    };

    if (result) {
      res.status(200).json(admin);
    } else {
      res.status(400).json("error creating admin");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const adminLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const email: string = req.body.email;
    const password: string = req.body.password;

    if (!email || !password) {
      res.status(404).json("data problem");
    }

    const user: Admin | null = await prisma.admin.findFirst({
      where: {
        email: email,
        // password: password,
      },
    });

    const userId: any = user?.id;
    const hashpassword: string = hashpassmethod(password);

    const pass: string | undefined = user?.password;

    console.log(hashpassword);

    if (user) {
      const token: string = generateAcessToken(userId);

      if (pass === hashpassword) {
        const update: update = await prisma.admin.update({
          where: { id: userId },
          data: {
            updatedAt: new Date(),
            token: token,
          },
          select: {
            id: true,
            name: true,
            family: true,
            email: true,
            username: true,
            address: true,
            phoneNumber: true,
            image: true,
            banner: true,
            token: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        if (update) {
          res.status(200).json(update);
        } else {
          res.status(400).json("bad request");
        }
      }
    } else {
      console.log(Error);
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
