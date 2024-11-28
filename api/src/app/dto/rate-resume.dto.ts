import { IsString, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class RateResumeDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  resumeText: string;
}
