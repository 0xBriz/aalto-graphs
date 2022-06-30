import { ProvidersModule } from '@0xbriz/providers';
import { Module } from '@nestjs/common';
import { GraphqlModule } from 'oxbriz/graphql';
import { VaultResolver } from './resolvers/Vault.resolver';
import { DexEventService } from './services/event.service';
import { DexStorageService } from './services/storage.service';

@Module({
  imports: [ProvidersModule, GraphqlModule],
  providers: [DexEventService, DexStorageService, VaultResolver],
})
export class DexModule {}
