import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { PostFacade } from '../application-services';

export const PostFacadeFactory = (
  commandBus: CommandBus,
  queryBus: QueryBus,
  eventBus: EventBus,
) => new PostFacade(commandBus, queryBus, eventBus);
