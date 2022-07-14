import { Request, Response } from "express";
import { prisma } from "../../utilis/prisma";
import { createHmac } from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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

  console.log(adInfo);

  const admin = await prisma.admin.findFirst({
    where: { email: email },
  });

  if (admin) {
    res.status(400).json({ error: "admin already exists." });
  }

  try {
    const passalogritm: any = process.env.PASS_ALGORITHM;
    const secret: any = process.env.PASS_SECRET;
    const jwtToken: any = process.env.JWT_TOKEN;

    //hash password
    const pass: string = createHmac(passalogritm, secret)
      .update(adInfo.password)
      .digest("hex");

    const result = await prisma.admin.create({
      data: {
        name: adInfo.name,
        family: adInfo.family,
        email: adInfo.email,
        username: adInfo.username,
        password: pass,
        phoneNumber: adInfo.phone,
        address: adInfo.address,
      },
    });

    const adminId: any = result.id;
    const token = jwt.sign(adminId, jwtToken);
    if (result) {
      res.status(200).json({
        admin: {
          name: result.name,
          family: result.family,
          email: result.email,
          token,
        },
      });
    } else {
      res.status(401).json("error creating admin");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const adminLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const email: string = req.body.email;
  const password: string = req.body.password;

  if (!email || !password) {
    res.status(401).json("data problem");
  }
  const user = await prisma.admin.findFirst({
    where: {
      email: email,
      password: password,
    },
  });
  const jwtToken: any = process.env.JWT_TOKEN;

  if (user) {
    const userId: any = user.id;
    const token = jwt.sign(userId, jwtToken);

    //compare password
    const compare = await bcrypt.compare(password, user.password);

    if (compare) {
      const update = await prisma.admin.update({
        where: { email: email },
        data: {
          updatedAt: new Date(),
        },
      });
      if (update) {
        res.status(200).json(update);
      } else {
        res.status(400).json("error");
      }
    }
  } else {
    res.status(404).json("not Found");
  }
};
