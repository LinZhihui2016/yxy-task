import { IsInt } from 'class-validator';

export class CreateDailyDto {
  @IsInt()
  label: number;

  date: string;
}
