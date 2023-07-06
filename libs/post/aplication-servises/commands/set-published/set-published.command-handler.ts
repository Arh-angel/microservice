import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SetPublishedCommand } from './set-published.command';
import { PostRepository } from 'libs/post/providers';
import { Logger, NotFoundException } from '@nestjs/common';
import { PostAggregate } from '@lib/post';

@CommandHandler(SetPublishedCommand)
export class SetPublishedCommandHandler
  implements ICommandHandler<SetPublishedCommand, PostAggregate>
{
  private readonly logger = new Logger(SetPublishedCommandHandler.name);
  constructor(private readonly postRepository: PostRepository) {}
  async execute({ id }: SetPublishedCommand): Promise<PostAggregate> {
    const existPost = await this.postRepository.findOne(id).catch((err) => {
      this.logger.error(err);
      return null as PostAggregate;
    });

    if (!existPost) {
      throw new NotFoundException(`Post by id ${id} not found`);
    }

    const postAggregate = PostAggregate.create(existPost);
    postAggregate.setPublished();

    await this.postRepository.save(postAggregate);

    return postAggregate;
  }
}
