import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { createHmac } from "crypto";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token: any = req.header("authorization");
  const jwttoken: any = process.env.JWT_TOKEN;

  try {
    const tokenUserId = jwt.verify(token, jwttoken);

    console.log("tokenUserId", tokenUserId);

    //@ts-ignore
    req.userId = tokenUserId;

    return next();
  } catch (error) {
    res.status(500).json(error);
  }
};

export const generateAcessToken = (userId: any): string => {
  const token: any = process.env.JWT_TOKEN;
  return jwt.sign(userId, token);
};

export const hashpassmethod = (password: string): string => {
  const passalogritm: any = process.env.PASS_ALGORITHM;
  const secret: any = process.env.PASS_SECRET;
  const jwtToken: any = process.env.JWT_TOKEN;

  const pass: string = createHmac(passalogritm, secret)
    .update(password)
    .digest("hex");

  return pass;
};
