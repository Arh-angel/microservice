import { ArgsType, Field, Int } from '@nestjs/graphql';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

@ArgsType()
export class PaginationDto {
  @ApiPropertyOptional({ description: 'Пропуск строк', type: 'number' })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Field(() => Int, { description: 'Пропуск строк' })
  offset = 0;

  @ApiPropertyOptional({ description: 'Количество строк', type: 'number' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  @Field(() => Int, { description: 'Количество строк' })
  limit = 15;
}
