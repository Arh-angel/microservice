import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

@Injectable()
export class PostFacade {
  constructor(
    private readonly commandBas: CommandBus,
    private readonly queryBas: QueryBus,
    private readonly eventBas: EventBus,
  ) {}

  commands = {};
  queries = {};
  events = {};
}
