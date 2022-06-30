import { Module } from '@nestjs/common';
import { RpcProvider } from './providers/rpc.provider';

@Module({
  providers: [RpcProvider],
  exports: [RpcProvider],
})
export class ProvidersModule {}
