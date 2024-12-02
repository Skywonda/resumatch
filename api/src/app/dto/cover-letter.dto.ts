import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CoverLetterDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(15, { message: 'Company name cannot exceed 15 characters' })
  companyName!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(100, { message: 'Resume must be at least 100 characters long' })
  @MaxLength(5000, { message: 'Resume cannot exceed 5000 characters' })
  resumeText: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(50, {
    message: 'Job description must be at least 50 characters long',
  })
  @MaxLength(3000, { message: 'Job description cannot exceed 3000 characters' })
  jobDescription: string;
}
