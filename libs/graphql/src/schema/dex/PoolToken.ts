import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Investment } from './Investment';
import { Pool } from './Pool';
import { Token } from './Token';

@ObjectType()
export class PoolToken {
  @Field()
  id: string;

  @Field()
  poolId: string;

  @Field(() => Pool)
  pool: Pool;

  @Field(() => Token)
  token: Token;

  @Field()
  tokenId: string;

  @Field()
  symbol: string;

  @Field()
  name: string;

  @Field(() => Int)
  decimals: number;

  @Field()
  address: string;

  @Field()
  priceRate: string;

  @Field()
  balance: string;

  @Field()
  invested: string;

  @Field(() => [Investment])
  investments?: Investment[];

  // WeightedPool Only
  @Field()
  weight?: string;
}
