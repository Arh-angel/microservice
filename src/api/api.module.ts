import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers';
import { PostController } from './controllers/post/post.controller';
import { AuthModule } from '@lib/auth';

@Module({
  controllers: [PostController],
  imports: [ControllersModule, AuthModule],
})
export class ApiModule {}
