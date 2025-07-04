import { IOrderRepository } from '../../domain/repositories/IOrderRepository';

interface Request {
  order_id: string;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'canceled';
}

export class UpdateOrderStatusUseCase {
  constructor(private orderRepo: IOrderRepository) {}

  async execute({ order_id, status }: Request): Promise<void> {
    return await this.orderRepo.updateStatus(order_id, status);
  }
}
