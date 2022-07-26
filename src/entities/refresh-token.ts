import { BaseEntity } from 'src/common/bases/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class RefreshTokenEntity extends BaseEntity {
  @Column()
  userId: string;

  @Column({ unique: true })
  token: string;

  @Column({ default: true })
  isActive: boolean;
}
