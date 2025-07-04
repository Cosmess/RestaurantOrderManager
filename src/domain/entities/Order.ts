export interface OrderItem {
  menu_item_id: string;
  quantity: number;
}

export class Order {
  constructor(
    public id: string,
    public customer_id: string,
    public items: OrderItem[],
    public status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'canceled',
    public total: number
  ) {}
}
