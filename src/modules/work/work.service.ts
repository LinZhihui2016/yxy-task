import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, getRepository, Repository } from 'typeorm';
import { WorkEntity, WorkStatus } from './work.entity';
import { ErrYezi, ResException } from '../../util/error';
import { $val } from '../../util/mysql';
import { isDefined } from 'class-validator';
import { initDate } from '../../util/date';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(WorkEntity)
    private readonly workRepository: Repository<WorkEntity>,
  ) {}

  async byId(id: number) {
    const where = { id };
    const $data = await getRepository(WorkEntity).findOne({ where });
    if (!$data) throw new ResException(ErrYezi.未找到, '没有找到任务');
    return $data;
  }

  async create(data) {
    const { deadline, deadline_date } = data;
    data.deadline = !!deadline;
    data.deadline_date = deadline ? initDate(deadline_date).toDate() : null;
    const $data = await $val(new WorkEntity(), {
      status: WorkStatus.TODO,
      ...data,
    });
    return await this.workRepository.save($data);
  }

  async update(id, data) {
    const dataToUpdate = await this.byId(id);
    const $data = await $val(dataToUpdate, data);
    return this.workRepository.save($data);
  }

  async getFinishList(finishDate?: Date[]) {
    const where = { status: WorkStatus.FINISH };
    if (finishDate && finishDate.length === 2) {
      const [start, end] = finishDate;
      Object.assign(where, { finish_date: Between(start, end) });
    }
    const [list, count] = await this.workRepository.findAndCount({ where });
    return { list, count };
  }

  async getDeadlineList(
    status: WorkStatus,
    deadline: boolean,
    deadline_date: Date[],
  ) {
    const where = {};
    if (isDefined(deadline)) {
      Object.assign(where, { deadline });
    }
    if (deadline_date.length === 2) {
      const [start, end] = deadline_date;
      Object.assign(where, { deadline_date: Between(start, end) });
    }
    if (isDefined(status) && WorkStatus[status.toUpperCase()]) {
      Object.assign(where, { status });
    }
    const [list, count] = await this.workRepository.findAndCount({ where });
    return { list, count };
  }

  async del(id: number) {
    const workToRemove = await this.byId(id);
    return this.workRepository.remove(workToRemove);
  }
}
