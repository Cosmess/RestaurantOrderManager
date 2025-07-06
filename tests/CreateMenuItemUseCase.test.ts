import { CreateMenuItemUseCase } from '../src/application/use-cases/CreateMenuItemUseCase';
import { MenuItem } from '../src/domain/entities/MenuItem';

class FakeMenuRepo {
  public items: MenuItem[] = [];
  async create(item: MenuItem) {
    this.items.push(item);
    return item;
  }
  async findById() { return null; }
  async findAll() { return this.items; }
}

describe('CreateMenuItemUseCase', () => {
  it('should create a valid menu item', async () => {
    const repo = new FakeMenuRepo();
    const useCase = new CreateMenuItemUseCase(repo);
    const item = await useCase.execute({
      name: 'Pizza',
      description: 'Delicious',
      price: 20,
      category: 'main_course'
    });
    expect(item.id).toBeDefined();
    expect(item.name).toBe('Pizza');
  });

  it('should throw if price is negative', async () => {
    const repo = new FakeMenuRepo();
    const useCase = new CreateMenuItemUseCase(repo);
    await expect(useCase.execute({
      name: 'Test',
      description: '',
      price: -1,
      category: 'starter'
    })).rejects.toThrow('Price must be >= 0');
  });
});
