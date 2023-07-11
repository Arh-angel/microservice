import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostAggregate } from '@lib/post';
import { BadRequestException } from '@nestjs/common';
import { CreatePostCommand } from './create-post.command';
import { PostRepository } from '@lib/post/providers';

@CommandHandler(CreatePostCommand)
export class CreatePostCommandHandler
  implements ICommandHandler<CreatePostCommand, PostAggregate>
{
  constructor(private readonly postRepository: PostRepository) {}
  async execute({ post }: CreatePostCommand): Promise<PostAggregate> {
    const postAggregate = PostAggregate.create(post);
    postAggregate.plainToInstance();

    const createPost = await this.postRepository
      .save(postAggregate)
      .catch((err) => {
        throw new BadRequestException(err);
      });

    return createPost;
  }
}
