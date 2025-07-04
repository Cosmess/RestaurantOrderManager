import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { IMenuRepository } from '../../domain/repositories/IMenuRepository';

interface Request {
  order_id: string;
  items: { menu_item_id: string; quantity: number }[];
}

export class ModifyOrderUseCase {
  constructor(private orderRepo: IOrderRepository, private menuRepo: IMenuRepository) { }

  async execute({ order_id, items }: Request): Promise<void> {
    const order = await this.orderRepo.findById(order_id);
    if (!order) throw new Error('Order not found');
    if (!['pending', 'preparing'].includes(order.status)) throw new Error('Cannot modify order');

    let total = 0;

    for (const item of items) {
      if (item.quantity <= 0) throw new Error('Invalid quantity');
      const menu = await this.menuRepo.findById(item.menu_item_id);
      if (!menu) throw new Error('Invalid menu item');
      total += item.quantity * menu.price;
    }

    await this.orderRepo.updateItems(order_id, items, total);
  }
}
