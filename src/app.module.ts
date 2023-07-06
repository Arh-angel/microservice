import { ProvidersModule } from '@lib/providers';
import { SharedModule } from '@lib/shared';
import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';

@Module({
  imports: [ProvidersModule, SharedModule, ApiModule],
})
export class AppModule {}
