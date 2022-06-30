import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Pool } from './Pool';

@ObjectType()
export class LatestPrice {
  id: string;

  asset: string;

  pricingAsset: string; //# address of stable asset

  poolId: Pool; //# last pool which set price

  price: string; // # all the latest prices

  @Field(() => Int)
  block: number; //# last block that prices were updated
}
