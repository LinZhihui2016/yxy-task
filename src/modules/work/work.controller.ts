import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { WorkService } from './work.service';
import { CreateWorkDto } from './work.dto';
import { dateFormat, initDate, isDate } from '../../util/date';
import { ErrYezi, ResException } from '../../util/error';
import * as dayjs from 'dayjs';

@Controller('work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Get()
  get(@Query() query) {
    const { start, end, deadline, status } = query;
    const $isDate = isDate(start) && isDate(end);
    const $start = $isDate ? dayjs(start) : dayjs().add(1, 'day');
    const $end = $isDate ? dayjs(end) : dayjs().add(2, 'day');
    if ($start.isAfter($end)) {
      throw new ResException(ErrYezi.参数类型错误, '时间错误');
    }
    return this.workService.get(
      status,
      $start.startOf('day').toDate(),
      $end.startOf('day').toDate(),
      deadline,
    );
  }

  @Post()
  create(@Body() work: CreateWorkDto) {
    const { content, deadline, deadline_date } = work;
    const $deadline_date = initDate(deadline_date);
    const $deadline = !!deadline;
    return this.workService.create({
      deadline: $deadline,
      deadline_date: $deadline_date,
      content,
    });
  }

  @Patch(':id')
  edit(@Param('id', new ParseIntPipe()) id: number, @Body() data) {
    const { content, deadline, deadline_date, status } = data;
    if (deadline && !isDate(deadline_date)) {
      throw new ResException(ErrYezi.参数类型错误, '请输入deadline');
    }
    const obj = { content, status, deadline };
    if (deadline) {
      Object.assign(obj, {
        deadline_date: dateFormat(deadline_date),
      });
    }
    return this.workService.update(id, obj);
  }
}
