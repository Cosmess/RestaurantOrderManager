import { IMenuRepository } from '../../domain/repositories/IMenuRepository';
import { MenuItem } from '../../domain/entities/MenuItem';
import { MenuItemModel } from '../database/models/MenuItemModel';

export class MenuRepository implements IMenuRepository {
  async create(item: MenuItem): Promise<MenuItem> {
    await MenuItemModel.create({...item});
    return item;
  }

  async findById(id: string): Promise<MenuItem | null> {
    const model = await MenuItemModel.findByPk(id);
    return model ? new MenuItem(model.id, model.name, model.description, model.price, model.category) : null;
  }

  async findAll(category?: string, page = 1, limit = 10): Promise<MenuItem[]> {
    const where = category ? { category } : undefined;
    const offset = (page - 1) * limit;
    const results = await MenuItemModel.findAll({ where, offset, limit });
    return results.map(r => new MenuItem(r.id, r.name, r.description, r.price, r.category));
  }
}
