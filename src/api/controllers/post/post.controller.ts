import { Body, Controller, Post } from '@nestjs/common';
import { PostFacade } from 'libs/post/aplication-servises';
import { CreatePostDto } from './dto';

@Controller('post')
export class PostController {
  constructor(private readonly postFacade: PostFacade) {}

  @Post()
  createPost(@Body() createPostBody: CreatePostDto) {
    return this.postFacade.commands.createPost(createPostBody);
  }
}
