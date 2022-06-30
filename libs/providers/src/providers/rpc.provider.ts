import { Provider } from '@nestjs/common';
import { ethers } from 'ethers';
import { Network } from '../network/networks';

export const RPC_PROVIDER = 'RPC_PROVIDER';

export const RpcProvider: Provider = {
  provide: RPC_PROVIDER,
  useFactory: () => {
    const chainId = Number(process.env.CHAIN_ID);
    return new ethers.providers.JsonRpcProvider(Network[chainId].rpcUrl);
  },
  inject: [],
};
