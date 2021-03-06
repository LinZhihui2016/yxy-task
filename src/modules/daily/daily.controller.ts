import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DailyService } from './daily.service';
import { CreateDailyDto } from './daily.dto';
import { ErrYezi, ResException } from '../../util/error';
import * as dayjs from 'dayjs';
import { ApiParam } from '@nestjs/swagger';
import { initDate, isDate } from '../../util/date';

@Controller('api2/daily')
export class DailyController {
  constructor(private readonly dailyService: DailyService) {}

  @Post()
  create(@Body() daily: CreateDailyDto) {
    const date = isDate(daily.date) ? dayjs(daily.date) : dayjs();
    return this.dailyService.create({ ...daily, date });
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  edit(@Param('id', new ParseIntPipe()) id: number, @Body() daily) {
    return this.dailyService.edit(id, daily);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  async del(@Param('id', new ParseIntPipe()) id: number) {
    await this.dailyService.del(id);
    return '删除成功';
  }

  @Get()
  getList(@Query() { start, end }) {
    const $isDate = isDate(start) && isDate(end);
    const $start = $isDate ? initDate(start) : dayjs();
    const $end = $isDate ? initDate(end) : dayjs().add(1, 'day');
    if ($start.isAfter($end)) {
      throw new ResException(ErrYezi.参数类型错误, '时间错误');
    }
    return this.dailyService.get(
      $start.startOf('day').toDate(),
      $end.startOf('day').toDate(),
    );
  }
}
