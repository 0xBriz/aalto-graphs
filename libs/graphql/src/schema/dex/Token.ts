import { Field, Int, ObjectType } from '@nestjs/graphql';
import { LatestPrice } from './LatestPrice';

@ObjectType()
export class Token {
  id: string;

  symbol: string;

  name: string;

  @Field(() => Int)
  decimals: number;

  address: string;

  totalBalanceUSD: string; // total balance of tokens across balancer

  totalBalanceNotional: string;

  totalVolumeUSD: string; //# total volume in fiat (usd)

  totalVolumeNotional: string;

  totalSwapCount: string;

  latestPrice: LatestPrice; //# latest price of token, updated when pool liquidity changes
}
