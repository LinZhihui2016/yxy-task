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
import { WorkService } from './work.service';
import { CreateWorkDto } from './work.dto';
import { dateRange, initDate, isDate } from '../../util/date';
import { ErrYezi, ResException } from '../../util/error';
import * as dayjs from 'dayjs';
import { WorkStatus } from './work.entity';

@Controller('api2/work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Get('finish')
  getFinish(@Query() query) {
    const { start, end } = query;
    const finish_date: dayjs.Dayjs[] = dateRange(start, end);
    return this.workService.getFinishList(finish_date.map((i) => i.toDate()));
  }
  @Get()
  get(@Query() query) {
    const { start, end, deadline, status } = query;
    const deadline_date: dayjs.Dayjs[] = dateRange(start, end);
    return this.workService.getDeadlineList(
      status,
      deadline,
      deadline_date.map((i) => i.toDate()),
    );
  }

  @Post()
  create(@Body() work: CreateWorkDto) {
    const { content, deadline, deadline_date } = work;
    return this.workService.create({
      deadline,
      deadline_date,
      content,
    });
  }

  @Patch('deadline/:id')
  setDeadline(@Param('id', new ParseIntPipe()) id: number, @Body() data) {
    const { deadline, deadline_date } = data;
    const obj = { deadline: !!deadline, deadline_date };
    if (deadline && !isDate(deadline_date))
      throw new ResException(ErrYezi.参数类型错误, '请输入正确的deadline_date');
    obj.deadline_date = deadline ? dayjs(deadline_date).toDate() : null;
    return this.workService.update(id, obj);
  }

  @Patch('finish/:id')
  finishWork(@Param('id', new ParseIntPipe()) id: number, @Body() data) {
    const finish_date = initDate(data.finish_date).toDate();
    return this.workService.update(id, {
      status: WorkStatus.FINISH,
      finish_date,
    });
  }

  @Patch(':id')
  edit(@Param('id', new ParseIntPipe()) id: number, @Body() data) {
    const { content } = data;
    const obj = { content };
    return this.workService.update(id, obj);
  }

  @Delete(':id')
  del(@Param('id', new ParseIntPipe()) id: number) {
    return this.workService.del(id);
  }
}
