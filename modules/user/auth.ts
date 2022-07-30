import { Request, Response } from "express";
import { prisma } from "../../utilis/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dataValidation } from "../../utilis/checkdata";
import { generateAcessToken } from "../../utilis/authenticate";

export const Login = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    const password: any = req.body.password;

    if (!email || !password) {
      return res.status(400).json("data problem");
    }

    const User = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (User) {
      const userId: any = User.id;

      //build token
      const token: string = generateAcessToken(userId);

      //compare pass
      const compare = await bcrypt.compare(password, User.password);

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
              id: User.id,
              email: User.email,
              fullName: User.name,
              token,
            },
          });
        }
      } else {
        res.status(401).json("password is invalid");
      }
    } else {
      res.status(404).json("There is no user with this profile");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const Authentication = async (req: Request, res: Response) => {
  try {
    const userInfo: any = req.body.userInfo;

    const checkdata: boolean | undefined = dataValidation(userInfo);

    const email: string = req.body.email;
    const password: any = userInfo.password;

    // const name: string = req.body.name;

    if (checkdata == false) {
      return res.status(400).json("error");
    }
    const User = await prisma.user.findFirst({
      where: { email: email },
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
          token: "",
        },
      });

      const jwtToken: any = process.env.JWT_TOKEN;
      const token = jwt.sign(newUser.id, jwtToken);

      if (newUser) {
        return res
          .status(200)
          .header("token", token)
          .json({
            user: {
              email: newUser.email,
              id: newUser.id,
              fullName: newUser.name,
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
