import { Column, Entity } from 'typeorm';
import { IsDateString, IsInt, IsString } from 'class-validator';
import { LabelEntity } from '../label/label.entity';
import { $BaseEntity } from '../../util/entity';

@Entity({ name: 'daily' })
export class DailyEntity extends $BaseEntity {
  @Column('int')
  @IsInt()
  label: LabelEntity;

  @Column({ type: 'int', default: 1 })
  @IsInt()
  content: number;

  @Column({ type: 'varchar', default: '' })
  @IsString()
  mark: string;

  @Column('datetime')
  @IsDateString()
  date: Date;
}
