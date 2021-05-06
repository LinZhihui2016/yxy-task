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
import { LabelService } from './label.service';

@Controller('label')
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  @Post()
  create(@Body() label) {
    return this.labelService.create(label);
  }

  @Patch(':id')
  edit(@Param('id', new ParseIntPipe()) id: number, @Body() data) {
    return this.labelService.edit(id, data);
  }

  @Get()
  getLabels(@Query() query) {
    return this.labelService.getByPid(query.pid || 0);
  }
}
