import { DataModule } from '0xbriz/data';
import { DatabaseModule } from '@0cbriz/database';
import { ProvidersModule } from '@0xbriz/providers';
import { Module } from '@nestjs/common';
import { GraphqlModule } from 'oxbriz/graphql';
import { VaultResolver } from './resolvers/Vault.resolver';
import { PoolEventService } from './services/pool-event.service';
import { PoolDataService } from './services/pool-data.service';
import { DexConnectionProvider } from './services/database.provider';

@Module({
  imports: [ProvidersModule, GraphqlModule, DatabaseModule, DataModule],
  providers: [
    PoolEventService,
    PoolDataService,
    VaultResolver,
    DexConnectionProvider,
  ],
})
export class DexModule {
  constructor() {}
}
