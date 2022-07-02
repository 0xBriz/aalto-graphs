import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Pool } from './Pool';
import { PoolToken } from './PoolToken';

@ObjectType()
export class PriceRateProvider {
  @Field()
  id: string;

  @Field(() => Pool)
  poolId: Pool;

  @Field(() => PoolToken)
  token: PoolToken;

  @Field()
  address: string;

  @Field()
  rate: string;

  @Field(() => Int)
  lastCached: number;

  @Field(() => Int)
  cacheDuration: number;

  @Field(() => Int)
  cacheExpiry: number;
}
