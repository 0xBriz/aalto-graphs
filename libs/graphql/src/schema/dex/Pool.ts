import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GradualWeightUpdate } from './GradualWeightUpdate';
import { PoolHistoricalLiquidity } from './PoolHistoricalLiquidity';
import { PoolShare } from './PoolShare';
import { PoolToken } from './PoolToken';
import { PriceRateProvider } from './PriceRateProvider';
import { Swap } from './Swap';

@ObjectType()
export class Pool {
  @Field()
  id: string;

  @Field()
  address: string;

  @Field()
  poolType: string;

  // Factory address that created this pool
  @Field()
  factory?: string;

  @Field(() => Int)
  strategyType: number;

  @Field()
  symbol?: string;

  @Field()
  name?: string;

  @Field()
  swapEnabled: boolean;

  @Field()
  swapFee: string;

  @Field()
  owner?: string;

  @Field()
  totalWeight?: string;

  @Field()
  totalSwapVolume?: string;

  @Field()
  totalSwapFee?: string;

  @Field()
  totalLiquidity?: string;

  @Field()
  totalShares?: string;

  @Field(() => Int)
  createTime: number;

  @Field()
  tx?: string; // Tx hash

  @Field()
  swapsCount?: number;

  @Field()
  holdersCount?: number;

  // vaultId: Vault;

  // concatenated version of pool token list (see graph)
  @Field(() => [String])
  tokensList?: string[];

  @Field(() => [PoolToken])
  tokens?: PoolToken[];

  @Field(() => [Swap])
  swaps?: Swap[];

  @Field(() => [PoolShare])
  shares?: PoolShare[];

  @Field(() => [PoolHistoricalLiquidity])
  historicalValues?: PoolHistoricalLiquidity[];

  // # LiquidityBootstrappingPool Only
  @Field(() => [GradualWeightUpdate])
  weightUpdates?: GradualWeightUpdate[];

  // # StablePool Only
  @Field()
  amp?: string;

  // # MetaStablePool and LinearPool Only
  @Field(() => [PriceRateProvider])
  priceRateProviders?: PriceRateProvider[];

  // # ConvergentCurvePool (Element) Only
  @Field()
  principalToken?: string;
  @Field()
  baseToken?: string;
  @Field()
  expiryTime?: number;
  @Field()
  unitSeconds?: number;

  // # InvestmentPool Only
  @Field()
  managementFee?: string;

  // # LinearPool Only
  @Field()
  mainIndex?: number;
  @Field()
  wrappedIndex?: number;
  @Field()
  lowerTarget?: string;
  @Field()
  upperTarget?: string;
}
