import { UpdatePostDto as IUpdatePostDto } from '@lib/post/application-services/commands/dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { randomUUID } from 'crypto';

export class UpdatePostDto implements IUpdatePostDto {
  @ApiProperty({ description: 'Id поста', type: String, example: randomUUID() })
  @IsUUID()
  id: string;

  @IsUUID()
  authorId: string;

  @ApiPropertyOptional({ description: 'Заголовок поста', type: String })
  @IsOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ description: 'Текст поста', type: String })
  @IsOptional()
  @IsString()
  @IsOptional()
  message?: string;
}
