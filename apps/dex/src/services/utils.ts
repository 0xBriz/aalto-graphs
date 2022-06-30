import { ethers } from 'ethers';
import { Pool } from 'oxbriz/graphql';

export const parseWeightPoolResponse = async (
  poolAddress: string,
  poolContract: ethers.Contract,
  info,
) => {
  const [poolId, swapFee, name, symbol, block, owner] = await Promise.all([
    poolContract.getPoolId(),
    poolContract.getSwapFeePercentage(),
    poolContract.name(),
    poolContract.symbol(),
    info.getBlock(),
    poolContract.getOwner(),
  ]);

  const data: Pool = {
    id: poolId.toString(),
    address: poolAddress,
    owner,
    factory: info.address, // factory who emitted the event
    swapFee: swapFee.toNumber(),
    createTime: block.timestamp, // block timestamp
    tx: info.transactionHash, // from tx info
    poolType: 'Weighted',
    name,
    symbol,
    strategyType: 1,
    swapEnabled: true,
  };

  return data;
};
