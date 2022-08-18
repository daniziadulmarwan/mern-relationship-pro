import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(403);
  const key = process.env.KEY;
  const matchToken = jwt.verify(token, key!);
  if (!matchToken) return res.status(500).json({ msg: "Invalid token" });
  next();
}
