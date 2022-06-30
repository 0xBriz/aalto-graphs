import { RPC_PROVIDER } from '@0xbriz/providers';
import { Inject, Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { ERC20_ABI } from '../abis';

@Injectable()
export class ContractUtils {
  constructor(@Inject(RPC_PROVIDER) private provider) {}

  getERC20(address: string) {
    return new ethers.Contract(address, ERC20_ABI, this.provider);
  }
}
