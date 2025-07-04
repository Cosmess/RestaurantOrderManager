import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { IMenuRepository } from '../../domain/repositories/IMenuRepository';
import { ICustomerRepository } from '../../domain/repositories/ICustomerRepository';
import { Order } from '../../domain/entities/Order';
import { v4 as uuidv4 } from 'uuid';

interface Request {
  customer_id: string;
  items: { menu_item_id: string; quantity: number }[];
}

export class CreateOrderUseCase {
  constructor(
    private orderRepo: IOrderRepository,
    private menuRepo: IMenuRepository,
    private customerRepo: ICustomerRepository
  ) {}

  async execute(data: Request): Promise<Order> {
    const customer = await this.customerRepo.findById(data.customer_id);
    if (!customer) throw new Error('Customer not found');

    let total = 0;
    for (const item of data.items) {
      if (item.quantity <= 0) throw new Error('Quantity must be > 0');
      const menu = await this.menuRepo.findById(item.menu_item_id);
      if (!menu) throw new Error('Invalid menu item');
      total += item.quantity * menu.price;
    }

    const order = new Order(uuidv4(), data.customer_id, data.items, 'pending', total);
    return await this.orderRepo.create(order);
  }
}
