import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CreatePostDto as ICreatePostDto } from 'libs/post/aplication-servises/commands/dto';

export class CreatePostDto implements ICreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsUUID()
  authorId: string;
}
