import { IPost } from './post.interface';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { PostServices } from './services';

export class PostAggregate extends PostServices implements IPost {
  id: string = randomStringGenerator();
  title: string;
  message: string;
  authorId: string;
  isPublished = false;
  createdAt = new Date().toISOString();
  updatedAt = new Date().toISOString();

  private constructor() {
    super();
  }

  static create(post: Partial<IPost>) {
    const _post = new PostAggregate();
    Object.assign(_post, post);

    return _post;
  }
}