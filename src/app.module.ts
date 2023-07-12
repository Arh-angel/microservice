import { ProvidersModule } from '@lib/providers';
import { SharedModule } from '@lib/shared';
import { Module } from '@nestjs/common';
import { DomainsModule } from './domains/domains.module';
import { ApiModule } from './api';
import { ChannelsModule } from './channels/channels.module';

@Module({
  imports: [ProvidersModule, SharedModule, DomainsModule, ApiModule, ChannelsModule],
})
export class AppModule {}
