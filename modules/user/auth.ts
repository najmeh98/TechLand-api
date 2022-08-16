import { Request, Response } from "express";
import { prisma } from "../../utilis/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dataValidation } from "../../utilis/checkdata";
import { generateAcessToken } from "../../utilis/authenticate";

//user login
export const Login = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    const password: any = req.body.password;

    //All fields must be filled'
    if (!email || !password) {
      return res.status(400).json("data problem");
    }

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      const userId: any = user.id;

      //build token
      const token: string = generateAcessToken(userId);

      //compare pass
      const compare = await bcrypt.compare(password, user.password);

      if (compare) {
        const update = await prisma.user.update({
          where: { email: email },
          data: {
            updatedAt: new Date().toISOString(),
            token: token,
          },
        });
        if (update) {
          res.status(200).json({
            user: {
              id: user.id,
              name: user.name,
              family: user.family,
              email: user.email,
              username: user.username,
              address: user.address,
              phoneNumber: user.phoneNumber,
              token,
            },
          });
        }
      } else {
        res.status(404).json("password is invalid");
      }
    } else {
      res.status(401).json("There is no user with this profile");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// user register
export const Authentication = async (req: Request, res: Response) => {
  try {
    const userInfo: any = req.body.userInfo;

    const checkdata: boolean | undefined = dataValidation(userInfo);

    const email: string = req.body.email;
    const password: any = userInfo.password;
    const username: string = userInfo.username;

    // const name: string = req.body.name;

    if (checkdata == false) {
      return res.status(402).json("error");
    }
    const User = await prisma.user.findFirst({
      where: { email: email, username: username },
    });

    if (User) {
      return res.status(400).json({ error: "Email already exists" });
    }
    bcrypt.hash(password, 10, async (err, hash) => {
      const newUser: any = await prisma.user.create({
        data: {
          name: userInfo.name,
          family: userInfo.family,
          username: userInfo.username,
          email: userInfo.email,
          password: hash,
          address: userInfo.address,
          phoneNumber: userInfo.phone,
          token: "0",
        },
      });

      const token = generateAcessToken(newUser.id);

      if (newUser) {
        return res
          .status(200)
          .header("token", token)
          .json({
            user: {
              name: newUser.name,
              family: newUser.family,
              address: newUser.address,
              email: newUser.email,
              username: newUser.username,
              phoneNmuber: newUser.phoneNmuber,
              id: newUser.id,
              token,
            },
          });
      } else {
        res.status(401).json("Error creating user");
      }
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
//****
// error Handling : 400 , 404, 500 , 200
//
//
