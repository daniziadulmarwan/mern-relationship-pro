import { Router } from "express";
import IRouter from "./interface";
import authController from "../controllers/auth.controller";
import { signup } from "../middlewares/validations/signup.validate";
import { signin } from "../middlewares/validations/signin.validate";

class AuthRouter implements IRouter {
  public route: Router;

  constructor() {
    this.route = Router();
    this.router();
  }

  public router(): void {
    this.route.post("/signup", signup, authController.signup);
    this.route.post("/signin", signin, authController.signin);
  }
}

export default new AuthRouter().route;
