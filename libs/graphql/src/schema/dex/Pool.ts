import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GradualWeightUpdate } from './GradualWeightUpdate';
import { PoolHistoricalLiquidity } from './PoolHistoricalLiquidity';
import { PoolShare } from './PoolShare';
import { PoolToken } from './PoolToken';
import { PriceRateProvider } from './PriceRateProvider';
import { Swap } from './Swap';
import { Vault } from './Vault';

@ObjectType()
export class Pool {
  id: string;

  address: string;

  poolType: string;

  // Factory address that created this pool
  factory?: string;

  @Field(() => Int)
  strategyType: number;

  symbol?: string;

  name?: string;

  swapEnabled: boolean;

  swapFee: string;

  owner?: string;

  totalWeight?: string;

  totalSwapVolume?: string;

  totalSwapFee?: string;

  totalLiquidity?: string;

  totalShares?: string;

  @Field(() => Int)
  createTime: number;

  tx?: string; // Tx hash

  swapsCount?: number;

  holdersCount?: number;

  // vaultId: Vault;

  // concatenated version of pool token list (see graph)
  tokensList?: string[];

  tokens?: PoolToken[];

  swaps?: Swap[];

  shares?: PoolShare[];

  historicalValues?: PoolHistoricalLiquidity[];

  // # LiquidityBootstrappingPool Only
  weightUpdates?: GradualWeightUpdate[];

  // # StablePool Only
  amp?: string;

  // # MetaStablePool and LinearPool Only
  priceRateProviders?: PriceRateProvider[];

  // # ConvergentCurvePool (Element) Only
  principalToken?: string;
  baseToken?: string;
  expiryTime?: number;
  unitSeconds?: number;

  // # InvestmentPool Only
  managementFee?: string;

  // # LinearPool Only
  mainIndex?: number;
  wrappedIndex?: number;
  lowerTarget?: string;
  upperTarget?: string;
}
