import express, { Application } from "express";
import cors from "cors";
import { config } from "dotenv";
import morgan from "morgan";

// routes
import authRouter from "./routers/auth.router";
import categoryRouter from "./routers/category.router";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
  }

  public plugins(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(morgan("tiny"));
    config();
  }

  public routes(): void {
    this.app.use("/api/v1/auth", authRouter);
    this.app.use("/api/v1/category", categoryRouter);
  }
}

const port: number = 5000;
const app: Application = new App().app;
app.listen(port, () => console.log("Server running at " + port));
