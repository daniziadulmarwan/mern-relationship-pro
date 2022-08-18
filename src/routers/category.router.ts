import { Router } from "express";
import categoryController from "../controllers/category.controller";
import auth from "../middlewares/auth";
import IRouter from "./interface";

class CategoryRouter implements IRouter {
  public route: Router;

  constructor() {
    this.route = Router();
    this.router();
  }

  public router(): void {
    this.route.use(auth);
    this.route.get("/", categoryController.getAll);
    this.route.post("/", categoryController.store);
    this.route.get("/:id", categoryController.getOne);
    this.route.put("/:id", categoryController.update);
    this.route.delete("/:id", categoryController.destroy);
  }
}

export default new CategoryRouter().route;
