import { ContractUtils } from '0xbriz/data';
import { RPC_PROVIDER } from '@0xbriz/providers';
import { Inject, Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

/**
 * Use to go back and scrape data for anything that may have been missed
 */

@Injectable()
export class PoolIndexer {
  constructor(
    private readonly utils: ContractUtils,
    @Inject(RPC_PROVIDER) private provider: ethers.providers.JsonRpcProvider,
  ) {}

  async checkLatestPools(blocksBack = 2000) {
    try {
      console.log('checkLatestPools');
      const weightedFactory = this.utils.getContract('WeightedPoolFactory');
      const blockNumber = await this.provider.getBlockNumber();
      let fromBlock = blockNumber - blocksBack;
      let toBlock = blockNumber;
      const filter = weightedFactory.filters.PoolCreated(null, null);
      const data = await weightedFactory.queryFilter(
        filter,
        fromBlock,
        toBlock,
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
}
