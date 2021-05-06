import { IsString, Length } from 'class-validator';

export class CreateWorkDto {
  @IsString()
  @Length(1, 100)
  content: string;

  deadline_date?: string | number;
  deadline?: boolean;
}
