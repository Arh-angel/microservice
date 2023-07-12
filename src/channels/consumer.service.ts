import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { CreatePostContract } from '@lib/amqp-contracts';
import { PostFacade } from '@lib/post/application-services';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ConsumerService {
  private readonly logger = new Logger(ConsumerService.name);

  constructor(private readonly postFacade: PostFacade) {}

  @RabbitRPC({
    exchange: CreatePostContract.queue.exchange.name,
    routingKey: CreatePostContract.queue.routingKey,
    queue: CreatePostContract.queue.queue,
  })
  private async createPost(
    request: CreatePostContract.request,
  ): Promise<CreatePostContract.response> {
    const { payload: post, ...requestMessage } = request;

    try {
      const createdPost = await this.postFacade.commands.createPost(post);
      return {
        ...requestMessage,
        payload: createdPost,
      };
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }
}
