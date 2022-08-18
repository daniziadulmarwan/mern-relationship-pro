import { Request, Response } from "express";
import db from "../database/models";

class CategoryController {
  public async getAll(req: Request, res: Response): Promise<any> {
    try {
      const categories = await db.Category.findAll();
      return res.status(200).json({ data: categories });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    try {
      const category = await db.Category.findOne({ where: { id: id } });
      return res.status(200).json({ data: category });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  public async store(req: Request, res: Response): Promise<any> {
    const { title } = req.body;
    try {
      await db.Category.create({ title });
      return res.status(201).json({ message: "Success create data" });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  public async update(req: Request, res: Response): Promise<any> {
    const { title } = req.body;
    const { id } = req.params;
    try {
      await db.Category.update({ title }, { where: { id: id } });
      return res.status(200).json({ message: "Success update data" });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  public async destroy(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    try {
      const category = await db.Category.destroy({ where: { id: id } });
      if (!category) return res.sendStatus(404);
      return res.status(200).json({ message: "Success delete data" });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }
}

export default new CategoryController();
