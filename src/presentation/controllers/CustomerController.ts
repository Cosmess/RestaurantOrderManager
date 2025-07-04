import { Request, Response } from 'express';
import { CreateCustomerUseCase } from '../../application/use-cases/CreateCustomerUseCase';
import { CustomerRepository } from '../../infrastructure/repositories/CustomerRepository';

export class CustomerController {
  static createCustomerUseCase = new CreateCustomerUseCase(new CustomerRepository());

  static async create(req: Request, res: Response) {
    try {
      const customer = await CustomerController.createCustomerUseCase.execute(req.body);
      return res.status(201).json(customer);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
