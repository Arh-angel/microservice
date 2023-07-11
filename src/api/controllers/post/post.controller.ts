import { PostFacade } from '@lib/post/application-services';
import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dto';
import { CurrentUser, ICurrentUser, Pablic } from '@lib/auth';
import { JwtGuard } from '@lib/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postFacade: PostFacade) {}

  @Post()
  createPost(
    @CurrentUser() user: ICurrentUser,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postFacade.commands.createPost({
      ...createPostDto,
      authorId: user.userId,
    });
  }

  @Pablic()
  @Get(':id')
  getPost(@Param('id', ParseUUIDPipe) id: string) {
    return this.postFacade.queries.getPost(id);
  }
}
