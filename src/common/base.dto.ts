import BaseEntity from './base.entity';

export class BaseDto {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  constructor(entity: BaseEntity) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
