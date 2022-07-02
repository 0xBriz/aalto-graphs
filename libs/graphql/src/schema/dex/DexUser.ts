import { Field, ObjectType } from '@nestjs/graphql';
import { UserInternalBalance } from './InternalBalance';
import { PoolShare } from './PoolShare';
import { Swap } from './Swap';

@ObjectType()
export class DexUser {
  @Field()
  id: string;

  @Field(() => [PoolShare])
  sharesOwned: PoolShare[];

  @Field(() => [Swap])
  swaps: Swap[];

  @Field(() => [UserInternalBalance])
  userInternalBalances: UserInternalBalance[];
}
