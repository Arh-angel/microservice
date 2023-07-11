import { CreatePostDto as ICreatePostDto } from '@lib/post/application-services/commands/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePostDto implements ICreatePostDto {
  @ApiProperty({ description: 'Заголовок поста', type: String })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Текст поста', type: String })
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsUUID()
  authorId: string;
}
