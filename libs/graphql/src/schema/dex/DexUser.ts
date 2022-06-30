import { ObjectType } from '@nestjs/graphql';
import { UserInternalBalance } from './InternalBalance';
import { PoolShare } from './PoolShare';
import { Swap } from './Swap';

@ObjectType()
export class DexUser {
  id: string;

  sharesOwned: PoolShare[];

  swaps: Swap[];

  userInternalBalances: UserInternalBalance[];
}
