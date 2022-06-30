import { ProvidersModule } from '@0xbriz/providers';
import { Module } from '@nestjs/common';
import { DexEventService } from './services/event.service';
import { DexStorageService } from './services/storage.service';

@Module({
  imports: [ProvidersModule],
  providers: [DexEventService, DexStorageService],
})
export class DexModule {}
