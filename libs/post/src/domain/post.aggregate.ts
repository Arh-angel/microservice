import { IPost } from './post.interface';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { PostServices } from './services';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUUID,
  validateSync,
} from 'class-validator';
import { Exclude } from 'class-transformer';
import { DomainError } from '@lib/errors';
import { randomUUID } from 'crypto';

export class PostAggregate extends PostServices implements IPost {
  @IsUUID()
  id: string = randomUUID();

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsUUID()
  authorId: string;

  @IsBoolean()
  @Exclude()
  isPublished = false;

  @IsString()
  createdAt = new Date().toISOString();

  @IsString()
  updatedAt = new Date().toISOString();

  private constructor() {
    super();
  }

  static create(post: Partial<IPost>) {
    const _post = new PostAggregate();

    Object.assign(_post, post);

    _post.updatedAt = post?.id ? new Date().toISOString() : _post.updatedAt;

    const error = validateSync(_post);

    if (!!error.length) {
      throw new DomainError(error, 'Post not valid!');
    }

    return _post;
  }
}
