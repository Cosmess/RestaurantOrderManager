import { IMenuRepository } from '../../domain/repositories/IMenuRepository';
import { MenuItem } from '../../domain/entities/MenuItem';
import { v4 as uuidv4 } from 'uuid';

interface Request {
  name: string;
  description: string;
  price: number;
  category: 'starter' | 'main_course' | 'dessert' | 'drink';
}

export class CreateMenuItemUseCase {
  constructor(private repository: IMenuRepository) {}

  async execute(data: Request): Promise<MenuItem> {
    if (data.price < 0) throw new Error('Price must be >= 0');
    const item = new MenuItem(uuidv4(), data.name, data.description, data.price, data.category);
    return this.repository.create(item);
  }
}
