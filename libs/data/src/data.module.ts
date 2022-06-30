import { ProvidersModule } from '@0xbriz/providers';
import { Module } from '@nestjs/common';
import { ContractUtils } from './services/contract-utils.service';

@Module({
  imports: [ProvidersModule],
  providers: [ContractUtils],
  exports: [ContractUtils],
})
export class DataModule {}
