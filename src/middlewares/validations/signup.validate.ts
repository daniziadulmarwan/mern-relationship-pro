import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import db from "../../database/models";

export const signup = [
  body("name").notEmpty(),
  body("email")
    .notEmpty()
    .isEmail()
    .custom(async (value, { req }) => {
      const user = await db.User.findOne({ where: { email: value } });
      if (user) return Promise.reject("User registered");
    }),
  body("password")
    .notEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password)
        return Promise.reject("Password must same");
      return true;
    }),
  body("confirmPassword").notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    next();
  },
];
