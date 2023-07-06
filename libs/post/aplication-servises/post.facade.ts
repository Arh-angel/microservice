import { SetPublishedCommand } from './commands/set-published/set-published.command';
import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { CreatePostDto, UpdatePostDto } from './commands/dto';
import {
  CreatePostCommand,
  CreatePostCommandHandler,
  DeletePostCommand,
  DeletePostCommandHandler,
  SetPublishedCommandHandler,
  UpdatePostCommand,
  UpdatePostCommandHandler,
} from './commands';
import {
  GetPostQuery,
  GetPostQueryHandler,
  GetPostsQuery,
  GetPostsQueryHandler,
} from './queries';
import { PaginationDto } from '@lib/shared/dto';

@Injectable()
export class PostFacade {
  constructor(
    private readonly commandBas: CommandBus,
    private readonly queryBas: QueryBus,
    private readonly eventBas: EventBus,
  ) {}

  commands = {
    createPost: (post: CreatePostDto) => this.createPost(post),
    updatePost: (post: UpdatePostDto) => this.updatePost(post),
    deletePost: (id: string) => this.deletePost(id),
    setPublished: (id: string) => this.setPublished(id),
  };
  queries = {
    getPost: (id: string) => this.getPost(id),
    getPosts: (pagination: PaginationDto) => this.getPosts(pagination),
  };
  events = {};

  private createPost(post: CreatePostDto) {
    return this.commandBas.execute<
      CreatePostCommand,
      CreatePostCommandHandler['execute']
    >(new CreatePostCommand(post));
  }
  private updatePost(post: UpdatePostDto) {
    return this.commandBas.execute<
      UpdatePostCommand,
      UpdatePostCommandHandler['execute']
    >(new UpdatePostCommand(post));
  }
  private deletePost(id: string) {
    return this.commandBas.execute<
      DeletePostCommand,
      DeletePostCommandHandler['execute']
    >(new DeletePostCommand(id));
  }
  private setPublished(id: string) {
    return this.commandBas.execute<
      SetPublishedCommand,
      SetPublishedCommandHandler['execute']
    >(new SetPublishedCommand(id));
  }

  private getPost(id: string) {
    return this.queryBas.execute<GetPostQuery, GetPostQueryHandler['execute']>(
      new GetPostQuery(id),
    );
  }
  private getPosts(pagination: PaginationDto) {
    return this.queryBas.execute<
      GetPostsQuery,
      GetPostsQueryHandler['execute']
    >(new GetPostsQuery(pagination));
  }
}
