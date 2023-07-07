import { Module } from '@nestjs/common';
import { PostController } from './post/post.controller';
import { DomainsModule } from './domains.module';

@Module({
  controllers: [PostController],
  imports: [DomainsModule],
})
export class ControllersModule {}
