import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, getRepository, Repository } from 'typeorm';
import { DailyEntity } from './daily.entity';
import { $val } from '../../util/mysql';
import { ErrYezi, ResException } from '../../util/error';
import { LabelEntity } from '../label/label.entity';
import { arrFlat } from '../../util/object';

@Injectable()
export class DailyService {
  constructor(
    @InjectRepository(DailyEntity)
    private readonly dailyRepository: Repository<DailyEntity>,
  ) {}

  async byId(id: number) {
    const where = { id };
    const $data = await getRepository(DailyEntity).findOne({ where });
    if (!$data) throw new ResException(ErrYezi.未找到, '没有找到日志');
    return $data;
  }

  async create(data) {
    const { date, label, content, mark } = data;
    const start = date.startOf('day').toDate();
    const end = date.startOf('day').add(1, 'day').toDate();
    const where = { date: Between(start, end), label };
    const dataCheck = await this.dailyRepository
      .createQueryBuilder('daily')
      .where(where)
      .leftJoinAndMapOne(
        'daily.label',
        LabelEntity,
        'label',
        'daily.label=label.id',
      )
      .getOne();
    if (dataCheck) {
      const type = dataCheck.label.type;
      const dataToUpdate = await this.byId(dataCheck.id);
      let $content = 0;
      if (type === 'count') {
        $content = dataToUpdate.content + content;
      }
      if (type === 'check') {
        $content = content;
      }
      const $data = await $val(dataToUpdate, { content: $content, mark });
      return this.dailyRepository.save($data);
    }
    const $data = await $val(new DailyEntity(), {
      date: date.toDate(),
      label,
      content,
      mark,
    });
    return await this.dailyRepository.save($data);
  }

  async edit(id, data) {
    const { content = 1, mark } = data;
    const dataToUpdate = await this.byId(id);
    if (content <= 0) {
      return this.del(dataToUpdate.id);
    }
    const $data = await $val(dataToUpdate, { content, mark });
    return this.dailyRepository.save($data);
  }

  async del(id) {
    const dataToRemove = await this.byId(id);
    return this.dailyRepository.remove(dataToRemove);
  }

  async get(start: Date, end: Date) {
    const where = { date: Between(start, end) };
    const [list, count] = await this.dailyRepository
      .createQueryBuilder('daily')
      .where(where)
      .leftJoinAndMapOne(
        'daily.label',
        LabelEntity,
        'label',
        'daily.label=label.id',
      )
      .getManyAndCount();
    return {
      list: arrFlat(list, 'label', [
        'name',
        'unit',
        'type',
        'pid',
        'color',
        'icon',
      ]),
      count,
    };
  }
}
