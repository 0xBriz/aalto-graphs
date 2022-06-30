import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Pool } from './Pool';
import { PoolToken } from './PoolToken';

@ObjectType()
export class PriceRateProvider {
  id: string;

  poolId: Pool;

  token: PoolToken;

  address: string;

  rate: string;

  @Field(() => Int)
  lastCached: number;

  @Field(() => Int)
  cacheDuration: number;

  @Field(() => Int)
  cacheExpiry: number;
}
