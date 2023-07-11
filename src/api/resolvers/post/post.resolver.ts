import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostResponse } from '../responses';
import { PostFacade } from '@lib/post/application-services';
import { CurrentUser, ICurrentUser } from '@lib/auth';

@Resolver(() => PostResponse)
export class PostResolver {
  constructor(private readonly postFacade: PostFacade) {}
  @Query(() => PostResponse, { name: 'post' })
  async getPost(@Args('id') id: string) {
    return this.postFacade.queries.getPost(id);
  }

  // @Mutation()
  // createPost(
  //   @CurrentUser() user: ICurrentUser,
  //   @Args() createPostDto: CreatePostDto,
  // ) {
  //   return this.postFacade.commands.createPost({
  //     ...createPostDto,
  //     authorId: user.userId,
  //   });
  // }

  // @Query()
  // async getPosts(
  //   @Args() paginationDto: PaginationDto,
  // ): Promise<ResponseWithPagination<PostAggregate>> {
  //   const pagination = plainToInstance(PaginationDto, paginationDto);
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   //@ts-ignore
  //   const [data, count] = await this.postFacade.queries.getPosts(pagination);

  //   return {
  //     ...pagination,
  //     data,
  //     total: count,
  //   };
  // }

  // @Mutation()
  // updatePost(
  //   @CurrentUser() user: ICurrentUser,
  //   @Args() updatePost: UpdatePostDto,
  // ) {
  //   return this.postFacade.commands.updatePost({
  //     ...updatePost,
  //     authorId: user.userId,
  //   });
  // }

  // @Mutation()
  // setPublished(@Args('id') id: string) {
  //   return this.postFacade.commands.setPublished(id);
  // }

  // @Mutation()
  // deletePost(@Args('id') id: string) {
  //   return this.postFacade.commands.deletePost(id);
  // }
}
