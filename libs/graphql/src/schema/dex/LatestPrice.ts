import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Pool } from './Pool';

@ObjectType()
export class LatestPrice {
  @Field()
  id: string;

  @Field()
  asset: string;

  @Field()
  pricingAsset: string; //# address of stable asset

  @Field(() => [Pool])
  poolId: Pool; //# last pool which set price

  @Field()
  price: string; // # all the latest prices

  @Field(() => Int)
  block: number; //# last block that prices were updated
}
