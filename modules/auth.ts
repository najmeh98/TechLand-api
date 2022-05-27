import { Request, Response } from "express";
import { prisma } from "../utilis/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const User = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (User) {
      const compare = await bcrypt.compare(password, User.password);

      // if (compare) {
      // @ts-ignore
      const token = jwt.sign(User.id, process.env.JWT_TOKEN);
      res.status(200).json({
        // user: {
        id: User.id,
        email: User.email,
        // },
        status: 1,
        message: "Login successfull",
        token,
      });
      // } else {
      //   return res.status(400).send({ message: "invalid password" });
      // }
    } else {
      res.status(400).json("error");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const Authentication = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const User = await prisma.user.findFirst({
      where: { email: email },
    });

    if (User) {
      return res.status(404).json({ error: "Email already exists" });
    }
    bcrypt.hash(password, 10, async (err, hash) => {
      const newUser = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hash,
        },
      });

      // @ts-ignore
      const token = jwt.sign(newUser.id, process.env.JWT_TOKEN);

      if (newUser) {
        // res.status(200).json(newUser);
        return res
          .status(200)
          .header("token", token)
          .json({
            user: {
              id: newUser.id,
              email: newUser.email,
              fullName: newUser.name,
            },
            status: 1,
            token,
          });
      } else {
        res.status(400).json("error");
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
