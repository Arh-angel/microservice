import { EXCHANGE_POST } from '@lib/amqp-contracts/exchanges';
import {
  IAmqpBaseRequest,
  IAmqpBaseResponse,
  IQueueDeclaration,
} from '@lib/amqp-contracts/shared';
import { CreatePostRequest, CreatePostResponse } from './interfaces';

export namespace CreatePostContract {
  export const queue: IQueueDeclaration = {
    exchange: EXCHANGE_POST,
    queue: `create-${EXCHANGE_POST.name}`,
    routingKey: `create-${EXCHANGE_POST.name}`,
    queueOptions: {
      durable: true,
    },
  };

  export type request = IAmqpBaseRequest<CreatePostRequest>;

  export type response = IAmqpBaseResponse<CreatePostResponse>;
}
