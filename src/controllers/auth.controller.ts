import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../database/models";

class AuthController {
  public async signup(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    try {
      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(password, salt);
      await db.User.create({ name, email, password: hashedPassword });
      return res.status(201).json("Success create data");
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  public async signin(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    try {
      const user = await db.User.findOne({ where: { email: email } });
      const matchedPassword = bcrypt.compareSync(password, user.password);
      if (!matchedPassword) return res.sendStatus(403);
      const data = {
        name: user.name,
        email: user.email,
        role: user.role,
      };
      const key = process.env.KEY;
      const token = await jwt.sign(data, key!);
      return res.status(200).json({ token: token });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }
}

export default new AuthController();
