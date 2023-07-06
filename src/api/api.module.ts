import { Module } from '@nestjs/common';
import { PostController } from './controllers/post/post.controller';
import { ControllersModule } from './controllers';

@Module({
  controllers: [PostController],
  imports: [ControllersModule],
})
export class ApiModule {}
