import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers';
import { PostController } from './controllers/post/post.controller';
import { AuthModule } from '@lib/auth';
import { ResolversModule } from './resolvers';

@Module({
  controllers: [PostController],
  imports: [ControllersModule, AuthModule, ResolversModule],
})
export class ApiModule {}
