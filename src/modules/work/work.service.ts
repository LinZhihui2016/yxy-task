import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, getRepository, Repository } from 'typeorm';
import { WorkEntity, WorkStatus } from './work.entity';
import { ErrYezi, ResException } from '../../util/error';
import { $val } from '../../util/mysql';
import { isDefined } from 'class-validator';
import { toNum } from '../../util/boolean';

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
    const { deadline, content, deadline_date } = data;
    const $data = await $val(new WorkEntity(), {
      status: WorkStatus.TODO,
      deadline,
      content,
      deadline_date: deadline_date.toDate(),
    });
    return await this.workRepository.save($data);
  }

  async update(id, data) {
    const dataToUpdate = await this.byId(id);
    const $data = await $val(dataToUpdate, data);
    return this.workRepository.save($data);
  }

  async get(status: WorkStatus, start: Date, end: Date, deadline: boolean) {
    const where = { deadline_date: Between(start, end) };
    if (isDefined(deadline)) {
      Object.assign(where, { deadline: toNum(deadline) });
    }
    if (isDefined(status) && WorkStatus[status.toUpperCase()]) {
      Object.assign(where, { status });
    }
    const [list, count] = await this.workRepository.findAndCount({ where });
    return { list, count };
  }
}
