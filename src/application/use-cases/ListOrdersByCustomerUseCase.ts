import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { Order } from '../../domain/entities/Order';

interface Request {
  customer_id: string;
  page: number;
  limit: number;
}

export class ListOrdersByCustomerUseCase {
  constructor(private orderRepo: IOrderRepository) {}

  async execute({ customer_id, page, limit }: Request): Promise<Order[]> {
    return await this.orderRepo.findByCustomerId(customer_id, page, limit);
  }
}
