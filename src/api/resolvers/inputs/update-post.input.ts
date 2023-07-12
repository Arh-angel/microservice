import { UpdatePostDto } from '@lib/post/application-services/commands/dto';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput implements UpdatePostDto {
  @Field(() => String, { description: 'Заголовок поста', nullable: true })
  title?: string;

  @Field(() => String, { description: 'Текст поста', nullable: true })
  message?: string;

  @Field(() => ID, { description: 'Id поста' })
  id: string;

  authorId: string;
}
