import { IPost } from '@lib/post';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class PostResponse implements Omit<IPost, 'isPublished'> {
  @ApiProperty({ description: 'Id поста', type: String, example: randomUUID() })
  id: string;

  @ApiProperty({ description: 'Заголовок поста', type: String })
  title: string;

  @ApiProperty({ description: 'Текст поста', type: String })
  message: string;

  @ApiProperty({
    description: 'Id автора поста',
    type: String,
    example: randomUUID(),
  })
  authorId: string;

  @ApiProperty({
    description: 'Дата создания поста',
    type: String,
    example: new Date().toISOString(),
  })
  createdAt: string;

  @ApiProperty({
    description: 'Дата обновления поста',
    type: String,
    example: new Date().toISOString(),
  })
  updatedAt: string;
}
