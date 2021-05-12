import { Column, Entity } from 'typeorm';
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsEnum,
  Length,
  ValidateIf,
} from 'class-validator';
import { $BaseEntity } from '../../util/entity';

export enum WorkStatus {
  TODO = 'todo',
  FINISH = 'finish',
}

@Entity({ name: 'work' })
export class WorkEntity extends $BaseEntity {
  @Column('text')
  @Length(1, 100)
  content: string;

  @Column({
    type: 'enum',
    enum: WorkStatus,
    default: WorkStatus.TODO,
  })
  @IsEnum(WorkStatus)
  status: WorkStatus;

  @Column({ type: 'datetime', nullable: true })
  @ValidateIf((o, v) => !IsDefined(v))
  @IsDate()
  deadline_date: Date;

  @Column('boolean')
  @IsBoolean()
  deadline: boolean;

  @Column({ type: 'datetime', nullable: true })
  @ValidateIf((o, v) => !IsDefined(v))
  @IsDate()
  finish_date: Date;
}
