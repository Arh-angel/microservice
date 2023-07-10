import { ProvidersModule } from '@lib/providers';
import { SharedModule } from '@lib/shared';
import { Module } from '@nestjs/common';
import { DomainsModule } from './domains/domains.module';
import { ApiModule } from './api';

@Module({
  imports: [ProvidersModule, SharedModule, DomainsModule, ApiModule],
})
export class AppModule {}
