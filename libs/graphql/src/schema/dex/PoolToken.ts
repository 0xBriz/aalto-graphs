import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Investment } from './Investment';
import { Pool } from './Pool';
import { Token } from './Token';

@ObjectType()
export class PoolToken {
  id: string;

  poolId: Pool;

  token: Token;

  symbol: string;

  name: string;

  @Field(() => Int)
  decimals: number;

  address: string;

  priceRate: string;

  balance: string;

  invested: string;

  investments?: Investment[];

  // WeightedPool Only
  weight?: string;
}
