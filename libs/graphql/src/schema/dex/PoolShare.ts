import { Field, ObjectType } from '@nestjs/graphql';
import { DexUser } from './DexUser';
import { Pool } from './Pool';

@ObjectType()
export class PoolShare {
  @Field()
  id: string;

  @Field(() => DexUser)
  userAddress: DexUser;

  @Field(() => Pool)
  poolId: Pool;

  @Field()
  balance: string;
}
