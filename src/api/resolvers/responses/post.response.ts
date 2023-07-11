import { IPost } from '@lib/post';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostResponse implements Omit<IPost, 'isPublished'> {
  @Field(() => ID, { description: 'Id поста' })
  id: string;

  @Field(() => String, { description: 'Заголовок поста' })
  title: string;

  @Field(() => String, { description: 'Текст поста' })
  message: string;

  @Field(() => ID, { description: 'Id автора поста' })
  authorId: string;

  @Field({ description: 'Дата создания поста' })
  createdAt: string;

  @Field({ description: 'Дата обновления поста' })
  updatedAt: string;
}
