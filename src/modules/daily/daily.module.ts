import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyEntity } from './daily.entity';
import { DailyService } from './daily.service';
import { DailyController } from './daily.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DailyEntity])],
  controllers: [DailyController],
  providers: [DailyService],
})
export class DailyModule {}
