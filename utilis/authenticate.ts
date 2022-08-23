import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { createHmac } from "crypto";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token: any = req.header("authorization");
  const jwttoken: any = process.env.JWT_TOKEN;

  try {
    if (token) {
      const tokenUserId = jwt.verify(token, jwttoken, {
        algorithms: ["HS256"],
      });
      //@ts-ignore
      req.userId = tokenUserId; //type : string
      return next();
    } else {
      res.status(401).json("invalid token ");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// token
export const generateAcessToken = (userId: any): string => {
  const secretKey: any = process.env.JWT_TOKEN;
  return jwt.sign(userId, secretKey, { algorithm: "HS256" });
};

// hash password
export const hashpassmethod = (password: string): string => {
  const passalogritm: any = process.env.PASS_ALGORITHM;
  const secret: any = process.env.PASS_SECRET;

  const pass: string = createHmac(passalogritm, secret)
    .update(password)
    .digest("hex");

  return pass;
};
