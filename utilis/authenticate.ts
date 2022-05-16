import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token: any = req.header("token");
  try {
    if (process.env.JWT_TOKEN) {
      const tokenUserId = jwt.verify(token, process.env.JWT_TOKEN);
      //@ts-ignore
      req.userId = tokenUserId;

      return next();
    }
  } catch (error) {
    res.status(403).send("failed");
  }
};
