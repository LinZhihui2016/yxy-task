import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { resolve } from 'path';
import { LabelModule } from './modules/label/label.module';
import { DailyModule } from './modules/daily/daily.module';
import { WorkModule } from './modules/work/work.module';

@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return config.get('mysql');
      },
      inject: [ConfigService],
    }),
    LabelModule,
    DailyModule,
    WorkModule,
  ],
})
export class AppModule {}
