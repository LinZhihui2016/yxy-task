import { LabelEntity } from './label.entity';
import { Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { $val } from '../../util/mysql';
import { ErrYezi, ResException } from '../../util/error';

@Injectable()
export class LabelService {
  constructor(
    @InjectRepository(LabelEntity)
    private readonly labelRepository: Repository<LabelEntity>,
  ) {}

  async byId(id: number) {
    const where = { id };
    const $data = await getRepository(LabelEntity).findOne({ where });
    if (!$data) throw new ResException(ErrYezi.未找到, '没有找到标签');
    return $data;
  }

  async create(data): Promise<LabelEntity> {
    const { name, unit, pid, type } = data;
    const dataCheck = await getRepository(LabelEntity).findOne({
      where: { name, pid },
    });
    if (dataCheck) throw new ResException(ErrYezi.已存在);
    const $data = await $val(new LabelEntity(), { name, unit, pid, type });
    return await this.labelRepository.save($data);
  }

  async edit(id, data): Promise<LabelEntity> {
    const { name, unit } = data;
    const dataToUpdate = await this.byId(id);
    const $data = await $val(dataToUpdate, { name, unit });
    return this.labelRepository.save($data);
  }

  async getByPid(pid): Promise<LabelEntity[]> {
    const where = { pid };
    return await getRepository(LabelEntity).find({
      where,
      select: ['id', 'name', 'unit', 'type'],
    });
  }
}
