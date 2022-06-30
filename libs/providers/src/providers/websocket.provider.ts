import { Network } from '0xbriz/data/networks';
import { Provider } from '@nestjs/common';
import { ethers } from 'ethers';

export const WEBSOCKET_PROVIDER = 'WEBSOCKET_PROVIDER';

export const WebsocketProvider: Provider = {
  provide: WEBSOCKET_PROVIDER,
  useFactory: async () => {
    if (!process.env.CHAIN_ID) {
      throw new Error('Chain ID not set in env');
    }
    const chainId = Number(process.env.CHAIN_ID);
    console.log(Network[chainId].wsUrl);
    const provider = new ethers.providers.WebSocketProvider(
      Network[chainId].wsUrl,
    );
    await provider.ready;
    return provider;
  },
  inject: [],
};
