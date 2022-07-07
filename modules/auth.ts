import { Request, Response } from "express";
import { prisma } from "../utilis/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Login = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    const password: any = req.body.password;

    if (!email || !password) {
      return res.status(400).json("user error");
    }

    const User = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (User) {
      const compare = await bcrypt.compare(password, User.password);

      const user = {
        userId: User.id,
        isAdmin: User.isAdmin,
      };
      const jwtToken: any = process.env.JWT_TOKEN;

      const token = jwt.sign(user, jwtToken);

      res.status(200).json({
        user: {
          id: User.id,
          email: User.email,
          fullName: User.name,
          token,
        },
      });
    } else {
      res.status(404).json("There is no user with this profile");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const Authentication = async (req: Request, res: Response) => {
  try {
    const name: string = req.body.name;
    const email: string = req.body.email;
    const password: any = req.body.password;

    if (!name || !password || !email) {
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
          name: name,
          email: email,
          password: hash,
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
