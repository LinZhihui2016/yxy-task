import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkEntity } from './work.entity';
import { WorkController } from './work.controller';
import { WorkService } from './work.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkEntity])],
  controllers: [WorkController],
  providers: [WorkService],
})
export class WorkModule {}
