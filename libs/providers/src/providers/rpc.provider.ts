import { Network } from '0xbriz/data/networks';
import { Provider } from '@nestjs/common';
import { ethers } from 'ethers';

export const RPC_PROVIDER = 'RPC_PROVIDER';

export const RpcProvider: Provider = {
  provide: RPC_PROVIDER,
  useFactory: async () => {
    if (!process.env.CHAIN_ID) {
      throw new Error('Chain ID not set in env');
    }
    const chainId = Number(process.env.CHAIN_ID);
    const provider = new ethers.providers.JsonRpcProvider(
      Network[chainId].rpcUrl,
    );
    await provider.ready;
    return provider;
  },
  inject: [],
};
