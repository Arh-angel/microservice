import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { PostFacade } from '../aplication-servises';

export const PostFacadeFactory = (
  commandBus: CommandBus,
  queryBus: QueryBus,
  eventBus: EventBus,
) => new PostFacade(commandBus, queryBus, eventBus);
