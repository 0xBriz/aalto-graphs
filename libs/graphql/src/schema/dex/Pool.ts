import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Vault } from './Vault';

@ObjectType()
export class Pool {
  address: string;

  poolType?: string;

  factory?: string;

  @Field(() => Int)
  strategyType: number;

  symbol?: string;

  name?: string;

  swapEnabled: boolean;

  swapFee: string;

  owner?: string;

  totalWeight?: string;

  totalSwapVolume: string;

  totalSwapFee: string;

  totalLiquidity: string;

  totalShares: string;

  @Field(() => Int)
  createTime: number;

  swapsCount: number;

  holdersCount: number;

  vaultId: Vault;
}
