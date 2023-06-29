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

export class PostAggregate extends PostServices implements IPost {
  @IsUUID()
  id: string = randomStringGenerator();

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

    _post.updatedAt = post?.id ? new Date().toISOString() : _post.updatedAt;

    const error = validateSync(_post, { whitelist: true });

    if (!!error.length) {
      throw new Error('Post not valid!');
    }

    Object.assign(_post, post);

    return _post;
  }
}
