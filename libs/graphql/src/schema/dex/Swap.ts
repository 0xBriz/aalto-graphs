import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DexUser } from './DexUser';
import { Pool } from './Pool';

@ObjectType()
export class Swap {
  id: string;

  caller: string;

  tokenIn: string;

  tokenInSym: string;

  tokenOut: string;

  tokenOutSym: string;

  tokenAmountIn: string;

  tokenAmountOut: string;

  // valueUSD: BigDecimal!

  poolId: Pool;

  userAddress: DexUser;

  @Field(() => Int)
  timestamp: number;

  tx: string;
}
