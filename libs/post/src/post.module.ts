import { PostEntity } from '@lib/entities';
import { Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { POST_COMMANDS_HANDLERS } from '../aplication-servises/commands';
import { POST_EVENTS_HANDLERS } from '../aplication-servises/events';
import { POST_QUERIES_HANDLERS } from '../aplication-servises/queries';
import { PostFacade } from '../aplication-servises';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([PostEntity])],
  providers: [
    ...POST_COMMANDS_HANDLERS,
    ...POST_EVENTS_HANDLERS,
    ...POST_QUERIES_HANDLERS,
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
