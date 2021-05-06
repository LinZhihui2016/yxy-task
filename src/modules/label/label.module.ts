import { LabelEntity } from './label.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabelController } from './label.controller';
import { LabelService } from './label.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([LabelEntity])],
  controllers: [LabelController],
  providers: [LabelService],
})
export class LabelModule {}
