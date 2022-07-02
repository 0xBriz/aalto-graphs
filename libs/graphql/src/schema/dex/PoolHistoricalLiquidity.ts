import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Pool } from './Pool';

@ObjectType()
export class PoolHistoricalLiquidity {
  @Field()
  id: string;

  @Field(() => [Pool])
  poolId: Pool;

  @Field()
  poolTotalShares: string;

  @Field()
  poolLiquidity: string; //# total value, priced in the stable asset - ie USD

  @Field()
  poolShareValue: string;

  @Field()
  pricingAsset: string; // # address of stable asset

  @Field(() => Int)
  block: number;
}
