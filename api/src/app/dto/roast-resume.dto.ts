import { IsString, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class RoastResumeDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  resumeText: string;
}
