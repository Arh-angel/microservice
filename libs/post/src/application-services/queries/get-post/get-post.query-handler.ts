import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPostQuery } from './get-post.query';
import { PostAggregate } from '@lib/post';
import { Logger } from '@nestjs/common';
import { PostRepository } from '@lib/post/providers';

@QueryHandler(GetPostQuery)
export class GetPostQueryHandler
  implements IQueryHandler<GetPostQuery, PostAggregate>
{
  private readonly logger = new Logger(GetPostQueryHandler.name);

  constructor(private readonly postRepository: PostRepository) {}
  async execute({ id }: GetPostQuery): Promise<PostAggregate> {
    const existPost = await this.postRepository.findOne(id).catch((err) => {
      this.logger.error(err);
      return null as PostAggregate;
    });

    return existPost;
  }
}
