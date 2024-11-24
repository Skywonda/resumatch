import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { SeniorityLevel } from '../types';

export class EnhanceResumeDto {
  @IsString()
  @IsNotEmpty()
  resumeText: string;

  @IsEnum(SeniorityLevel)
  level: SeniorityLevel;
}
