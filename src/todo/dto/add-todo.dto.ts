import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export class AddTodoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, new BadRequestException('Nom de Todo trop cours'))
  @MaxLength(20, new BadRequestException('Nom de Todo trop long'))
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
