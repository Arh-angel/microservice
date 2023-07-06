import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from './create-pots.command-handler';
import { PostAggregate } from '@lib/post';
import { PostRepository } from 'libs/post/providers';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(CreatePostCommand)
export class CreatePostCommandHandler
  implements ICommandHandler<CreatePostCommand, PostAggregate>
{
  constructor(private readonly postRepository: PostRepository) {}
  async execute({ post }: CreatePostCommand): Promise<PostAggregate> {
    const postAggregate = PostAggregate.create(post);
    const createPost = await this.postRepository
      .save(postAggregate)
      .catch((err) => {
        throw new BadRequestException(err);
      });

    return createPost;
  }
}
