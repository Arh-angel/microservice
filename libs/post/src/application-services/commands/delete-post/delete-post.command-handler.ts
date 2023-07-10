import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePostCommand } from './delete-post.command';
import { PostAggregate } from '@lib/post';
import { Logger, NotFoundException } from '@nestjs/common';
import { PostRepository } from '@lib/post/providers';

@CommandHandler(DeletePostCommand)
export class DeletePostCommandHandler
  implements ICommandHandler<DeletePostCommand, boolean>
{
  private readonly logger = new Logger(DeletePostCommandHandler.name);
  constructor(private readonly postRepository: PostRepository) {}
  async execute({ id }: DeletePostCommand): Promise<boolean> {
    const existPost = await this.postRepository.findOne(id).catch((err) => {
      this.logger.error(err);
      return null as PostAggregate;
    });

    if (!existPost) {
      throw new NotFoundException(`Post by id ${id} not found`);
    }

    const isPostDeleted = await this.postRepository.delete(id).catch((err) => {
      throw new Error(err);
    });

    return isPostDeleted;
  }
}
