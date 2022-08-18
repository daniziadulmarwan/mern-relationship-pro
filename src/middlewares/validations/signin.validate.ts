import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import db from "../../database/models";

export const signin = [
  body("email")
    .notEmpty()
    .isEmail()
    .custom(async (value, { req }) => {
      const user = await db.User.findOne({ where: { email: value } });
      if (!user) return Promise.reject("User not found");
    }),
  body("password").notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    next();
  },
];
