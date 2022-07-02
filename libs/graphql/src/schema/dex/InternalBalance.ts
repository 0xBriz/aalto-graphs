import { Field, ObjectType } from '@nestjs/graphql';
import { DexUser } from './DexUser';

@ObjectType()
export class UserInternalBalance {
  @Field()
  id: string;

  @Field(() => [DexUser])
  userAddress: DexUser;

  @Field()
  token: string;

  @Field()
  balance: string;
}
