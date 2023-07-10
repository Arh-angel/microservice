import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers';
import { PostController } from './controllers/post/post.controller';

@Module({
  controllers: [PostController],
  imports: [ControllersModule],
})
export class ApiModule {}
