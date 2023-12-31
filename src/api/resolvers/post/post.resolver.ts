import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaginatedPosts, PostResponse } from '../responses';
import { PostFacade } from '@lib/post/application-services';
import { GqlCurrentUser, ICurrentUser, Pablic } from '@lib/auth';
import { PaginationDto } from '@lib/shared';
import { plainToInstance } from 'class-transformer';
import { CreatePostInput, UpdatePostInput } from '../inputs';
import { UseGuards } from '@nestjs/common';
import { GqlGuard } from '@lib/auth/guards/gql.guard';

@UseGuards(GqlGuard)
@Resolver(() => PostResponse)
export class PostResolver {
  constructor(private readonly postFacade: PostFacade) {}

  @Pablic()
  @Query(() => PostResponse, { name: 'getPost' })
  async getPost(@Args('id') id: string) {
    return this.postFacade.queries.getPost(id);
  }
  @Pablic()
  @Query(() => PaginatedPosts, { name: 'getPosts' })
  async getPosts(
    @Args() paginationDto: PaginationDto,
  ): Promise<PaginatedPosts> {
    const pagination = plainToInstance(PaginationDto, paginationDto);
    const [data, count] = await this.postFacade.queries.getPosts(pagination);

    return {
      ...pagination,
      data,
      total: count,
    };
  }

  @Mutation(() => PostResponse, { name: 'createPost' })
  async createPost(
    @GqlCurrentUser() user: ICurrentUser,
    @Args('createPostInput') createPostInput: CreatePostInput,
  ) {
    return this.postFacade.commands.createPost({
      ...createPostInput,
      authorId: user.userId,
    });
  }

  @Mutation(() => PostResponse, { name: 'updatePost' })
  updatePost(
    @GqlCurrentUser() user: ICurrentUser,
    @Args('updatePost') updatePost: UpdatePostInput,
  ) {
    return this.postFacade.commands.updatePost({
      ...updatePost,
      authorId: user.userId,
    });
  }

  @Mutation(() => PostResponse, { name: 'setPublished' })
  setPublished(@Args('id') id: string) {
    return this.postFacade.commands.setPublished(id);
  }

  @Mutation(() => Boolean, { name: 'deletePost' })
  deletePost(@Args('id') id: string) {
    return this.postFacade.commands.deletePost(id);
  }
}
