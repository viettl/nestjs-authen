import { NotFoundException } from '@nestjs/common';
import { DeepPartial, FindOneOptions, Repository } from 'typeorm';

export abstract class BaseService<T> {
  constructor(private readonly repository: Repository<T>) {}

  async create(entity: DeepPartial<T>): Promise<T> {
    const newEntity = this.repository.create(entity);
    return await this.repository.save(newEntity);
  }

  async findById(id: string | number): Promise<T | undefined> {
    const options: FindOneOptions<T & any> = {
      where: { id },
    };
    return await this.repository.findOne(options);
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async update(id: number, updateData: DeepPartial<T>): Promise<T> {
    const entity = await this.findById(id);
    if (!entity) {
      throw new NotFoundException(`Entity    not found`);
    }
    const updatedEntity = this.repository.merge(entity, updateData);
    return await this.repository.save(updatedEntity);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async findByIds(ids: any[]): Promise<T[]> {
    const queryBuilder = this.repository.createQueryBuilder();
    const entities = await queryBuilder.whereInIds(ids).getMany();
    if (entities.length !== ids.length) {
      const notFoundIds = ids.filter(
        (id) => !entities.find((entity) => entity['id'] === id),
      );
      throw new NotFoundException(`Entities with ids ${notFoundIds} not found`);
    }
    return entities;
  }

  async findOneOrFail(id: string, options: any = {}): Promise<T> {
    return await this.repository.findOneOrFail({
      where: { id },
      ...options,
    });
  }
}
