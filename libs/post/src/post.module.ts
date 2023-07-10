import { PostEntity } from '@lib/entities';
import { Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { POST_EVENTS_HANDLERS } from './application-services/events';
import { POST_QUERIES_HANDLERS } from './application-services/queries';
import { PostFacade } from './application-services';
import { PostFacadeFactory } from './providers/post-facade.factory';
import { PostRepository } from './providers';
import { PostAdapter } from './providers/post.adapter';
import { POST_COMMANDS_HANDLERS } from './application-services/commands';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([PostEntity])],
  providers: [
    ...POST_COMMANDS_HANDLERS,
    ...POST_EVENTS_HANDLERS,
    ...POST_QUERIES_HANDLERS,
    {
      provide: PostFacade,
      inject: [CommandBus, QueryBus, EventBus],
      useFactory: PostFacadeFactory,
    },
    {
      provide: PostRepository,
      useClass: PostAdapter,
    },
  ],
  exports: [PostFacade],
})
export class PostModule implements OnModuleInit {
  constructor(
    private readonly commandBas: CommandBus,
    private readonly eventBas: EventBus,
    private readonly queryBas: QueryBus,
  ) {}

  onModuleInit() {
    this.commandBas.register(POST_COMMANDS_HANDLERS);
    this.eventBas.register(POST_EVENTS_HANDLERS);
    this.queryBas.register(POST_QUERIES_HANDLERS);
  }
}
