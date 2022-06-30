import { RPC_PROVIDER, WEBSOCKET_PROVIDER } from '@0xbriz/providers';
import { Inject, Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { ERC20_ABI } from '../abis';
import { AaltoContract, ABI_MAP, getContractAddress } from '../contracts';

@Injectable()
export class ContractUtils {
  constructor(
    @Inject(RPC_PROVIDER) private provider,
    @Inject(WEBSOCKET_PROVIDER) private wsProvider,
  ) {}

  getERC20(address: string, websockets = false) {
    return new ethers.Contract(
      address,
      ERC20_ABI,
      websockets ? this.wsProvider : this.provider,
    );
  }

  getContract(contract: AaltoContract, websockets = false) {
    return new ethers.Contract(
      getContractAddress(contract, this.provider.network.chainId),
      ABI_MAP[contract],
      websockets ? this.wsProvider : this.provider,
    );
  }
}
