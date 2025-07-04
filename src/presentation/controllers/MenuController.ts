import { Request, Response } from 'express';
import { CreateMenuItemUseCase } from '../../application/use-cases/CreateMenuItemUseCase';
import { ListMenuItemsUseCase } from '../../application/use-cases/ListMenuItemsUseCase';
import { MenuRepository } from '../../infrastructure/repositories/MenuRepository';

export class MenuController {
  static createMenuItemUseCase = new CreateMenuItemUseCase(new MenuRepository());
  static listMenuItemsUseCase = new ListMenuItemsUseCase(new MenuRepository());

  static async create(req: Request, res: Response) {
    try {
      const result = await MenuController.createMenuItemUseCase.execute(req.body);
      res.status(201).json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const result = await MenuController.listMenuItemsUseCase.execute({
        category: req.query.category?.toString(),
        page: Number(req.query.page ?? 1),
        limit: Number(req.query.limit ?? 10)
      });
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
