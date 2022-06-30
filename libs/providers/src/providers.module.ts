import { Module } from '@nestjs/common';
import { RpcProvider } from './providers/rpc.provider';
import { WebsocketProvider } from './providers/websocket.provider';

@Module({
  providers: [RpcProvider, WebsocketProvider],
  exports: [RpcProvider, WebsocketProvider],
})
export class ProvidersModule {}
