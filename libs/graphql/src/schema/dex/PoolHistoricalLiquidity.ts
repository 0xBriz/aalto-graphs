import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Pool } from './Pool';

@ObjectType()
export class PoolHistoricalLiquidity {
  id: string;

  poolId: Pool;

  poolTotalShares: string;

  poolLiquidity: string; //# total value, priced in the stable asset - ie USD

  poolShareValue: string;

  pricingAsset: string; // # address of stable asset

  @Field(() => Int)
  block: number;
}
