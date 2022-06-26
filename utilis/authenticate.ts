import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token: any = req.header("authorization");
  try {
    if (process.env.JWT_TOKEN) {
      const tokenUserId = jwt.verify(token, process.env.JWT_TOKEN);
      // const tokenUserEmail = jwt.
      console.log("tokenUserId", tokenUserId);

      //@ts-ignore
      req.userId = tokenUserId.userId;
      //@ts-ignore
      console.log(req.userId);
      return next();
    }
  } catch (error) {
    res.status(403).send("failed");
  }
};
