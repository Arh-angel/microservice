import { PostFacade } from '@lib/post/application-services';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto';
import { CurrentUser, ICurrentUser, Pablic } from '@lib/auth';
import { JwtGuard } from '@lib/auth/guards/jwt.guard';
import { PaginationDto } from '@lib/shared/dto';
import { plainToInstance } from 'class-transformer';
import { ResponseWithPagination } from '@lib/shared';
import { PostAggregate } from '@lib/post';

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

  @Pablic()
  @Get()
  async getPosts(
    @Query() paginationDto: PaginationDto,
  ): Promise<ResponseWithPagination<PostAggregate>> {
    const pagination = plainToInstance(PaginationDto, paginationDto);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const [data, count] = await this.postFacade.queries.getPosts(pagination);

    return {
      ...pagination,
      data,
      total: count,
    };
  }

  @Put()
  updatePost(
    @CurrentUser() user: ICurrentUser,
    @Body() updatePost: UpdatePostDto,
  ) {
    return this.postFacade.commands.updatePost({
      ...updatePost,
      authorId: user.userId,
    });
  }

  @Patch(':id')
  setPublished(@Param('id', ParseUUIDPipe) id: string) {
    return this.postFacade.commands.setPublished(id);
  }
}
