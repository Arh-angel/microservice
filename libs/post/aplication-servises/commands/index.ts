import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommandHandler } from './create-post/create-post.command';

export const POST_COMMANDS_HANDLERS: Type<ICommandHandler>[] = [
  CreatePostCommandHandler,
];
