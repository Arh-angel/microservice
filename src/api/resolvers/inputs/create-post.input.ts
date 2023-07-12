import { CreatePostDto } from '@lib/post/application-services/commands/dto';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostInput implements CreatePostDto {
  @Field(() => String, { description: 'Заголовок поста' })
  title: string;

  @Field(() => String, { description: 'Текст поста' })
  message: string;

  authorId: string;
}
