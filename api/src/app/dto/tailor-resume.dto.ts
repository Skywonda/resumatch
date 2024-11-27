import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class TailorResumeDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  resumeText: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(50, {
    message: 'Job description is too short to analyze effectively',
  })
  @MaxLength(5000, {
    message: 'Job description is too long. Please provide a shorter version',
  })
  @Transform(({ value }) => value?.trim())
  jobDescription: string;
}
