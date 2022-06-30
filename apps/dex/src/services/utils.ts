import { ethers } from 'ethers';
import { Pool, PoolToken } from 'oxbriz/graphql';

export const ZERO = ethers.constants.Zero.toString();
export const ONE = ethers.constants.One.toString();

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
    strategyType: parseInt(poolId.toString().slice(42, 46)),
    swapEnabled: true,
  };

  return data;
};

export function getPoolTokenId(poolId: string, tokenAddress: string): string {
  return poolId.concat('-').concat(tokenAddress);
}
