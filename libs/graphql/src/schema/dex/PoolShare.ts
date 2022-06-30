import { ObjectType } from '@nestjs/graphql';
import { DexUser } from './DexUser';
import { Pool } from './Pool';

@ObjectType()
export class PoolShare {
  id: string;

  userAddress: DexUser;

  poolId: Pool;

  balance: string;
}
