import { Request, Response } from 'express';
import { CreateOrderUseCase } from '../../application/use-cases/CreateOrderUseCase';
import { ListOrdersByCustomerUseCase } from '../../application/use-cases/ListOrdersByCustomerUseCase';
import { UpdateOrderStatusUseCase } from '../../application/use-cases/UpdateOrderStatusUseCase';
import { ModifyOrderUseCase } from '../../application/use-cases/ModifyOrderUseCase';
import { OrderRepository } from '../../infrastructure/repositories/OrderRepository';
import { MenuRepository } from '../../infrastructure/repositories/MenuRepository';
import { CustomerRepository } from '../../infrastructure/repositories/CustomerRepository';

const orderRepo = new OrderRepository();
const menuRepo = new MenuRepository();
const customerRepo = new CustomerRepository();

export class OrderController {
  static createOrderUseCase = new CreateOrderUseCase(orderRepo, menuRepo, customerRepo);
  static listOrdersByCustomerUseCase = new ListOrdersByCustomerUseCase(orderRepo);
  static updateOrderStatusUseCase = new UpdateOrderStatusUseCase(orderRepo);
  static modifyOrderUseCase = new ModifyOrderUseCase(orderRepo, menuRepo);

  static async create(req: Request, res: Response) {
    try {
      const result = await OrderController.createOrderUseCase.execute(req.body);
      res.status(201).json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async listByCustomer(req: Request, res: Response) {
    try {
      const { customer_id } = req.params;
      const page = Number(req.query.page ?? 1);
      const limit = Number(req.query.limit ?? 10);
      const result = await OrderController.listOrdersByCustomerUseCase.execute({ customer_id, page, limit });
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async updateStatus(req: Request, res: Response) {
    try {
      const { order_id } = req.params;
      const { status } = req.body;
      await OrderController.updateOrderStatusUseCase.execute({ order_id, status });
      res.sendStatus(204);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async modify(req: Request, res: Response) {
    try {
      const { order_id } = req.params;
      const { items } = req.body;
      await OrderController.modifyOrderUseCase.execute({ order_id, items });
      res.sendStatus(204);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
