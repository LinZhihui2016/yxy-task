import { Column, Entity } from 'typeorm';
import { IsInt, Length } from 'class-validator';
import { $BaseEntity } from '../../util/entity';

export enum LabelType {
  COUNT = 'count',
  CATEGORY = 'category',
  CHECK = 'check',
}

@Entity({ name: 'label' })
export class LabelEntity extends $BaseEntity {
  @Column('int')
  @IsInt()
  pid: number;

  @Column('varchar')
  @Length(1, 10)
  name: string;

  @Column('varchar')
  @Length(0, 3)
  unit: string;

  @Column({
    type: 'enum',
    enum: LabelType,
    default: LabelType.COUNT,
  })
  type: LabelType;

  @Column({ type: 'varchar', nullable: true })
  icon: string;

  @Column({ type: 'varchar', nullable: true })
  color: string;
}
