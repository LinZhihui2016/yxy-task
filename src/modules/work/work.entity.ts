import { Column, Entity } from 'typeorm';
import { IsBoolean, IsDate, IsEnum, Length } from 'class-validator';
import { $BaseEntity } from '../../util/entity';

export enum WorkStatus {
  TODO = 'todo',
  CANCEL = 'cancel',
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

  @Column({ type: 'datetime' })
  @IsDate()
  deadline_date: Date;

  @Column('boolean')
  @IsBoolean()
  deadline: boolean;
}
