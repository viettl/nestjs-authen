import { BaseEntity } from '../common/bases/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'refresh_tokens' })
export class RefreshTokenEntity extends BaseEntity {
  @Column()
  userId: string;

  @Column()
  token: string;

  @Column({ default: true })
  isActive: boolean;
}
