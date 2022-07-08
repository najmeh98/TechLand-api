import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

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
