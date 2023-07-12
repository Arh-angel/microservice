import { PostFacade } from '@lib/post/application-services';
import {
  Body,
  Controller,
  Delete,
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
import { ApiOkResponsePaginated, ResponseWithPagination } from '@lib/shared';
import { PostAggregate } from '@lib/post';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PostResponse } from './response';

@ApiTags('Posts')
@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postFacade: PostFacade) {}

  @ApiOperation({
    summary: 'Создание поста',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostResponse })
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

  @ApiOperation({
    summary: 'Получение поста',
  })
  @ApiOkResponse({ type: PostResponse })
  @Pablic()
  @Get(':id')
  getPost(@Param('id', ParseUUIDPipe) id: string) {
    return this.postFacade.queries.getPost(id);
  }

  @ApiOperation({
    summary: 'Получение постов',
  })
  @ApiOkResponsePaginated(PostResponse)
  @Pablic()
  @Get()
  async getPosts(
    @Query() paginationDto: PaginationDto,
  ): Promise<ResponseWithPagination<PostAggregate>> {
    const pagination = plainToInstance(PaginationDto, paginationDto);
    const [data, count] = await this.postFacade.queries.getPosts(pagination);

    return {
      ...pagination,
      data,
      total: count,
    };
  }

  @ApiOperation({
    summary: 'Обновление поста',
  })
  @ApiOkResponse({ type: PostResponse })
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

  @ApiOperation({
    summary: 'Установление статуса публикации',
  })
  @ApiOkResponse({ type: PostResponse })
  @Patch(':id')
  setPublished(@Param('id', ParseUUIDPipe) id: string) {
    return this.postFacade.commands.setPublished(id);
  }

  @ApiOperation({
    summary: 'Удаление поста',
  })
  @ApiOkResponse({ type: Boolean })
  @Delete(':id')
  deletePost(@Param('id', ParseUUIDPipe) id: string) {
    return this.postFacade.commands.deletePost(id);
  }
}
