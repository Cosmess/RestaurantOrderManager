import { IMenuRepository } from '../../domain/repositories/IMenuRepository';
import { MenuItem } from '../../domain/entities/MenuItem';

interface Request {
  category?: string;
  page: number;
  limit: number;
}

export class ListMenuItemsUseCase {
  constructor(private repository: IMenuRepository) {}

  async execute({ category, page, limit }: Request): Promise<MenuItem[]> {
    return await this.repository.findAll(category, page, limit);
  }
}
