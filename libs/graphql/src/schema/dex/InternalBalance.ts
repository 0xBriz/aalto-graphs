import { ObjectType } from '@nestjs/graphql';
import { DexUser } from './DexUser';

@ObjectType()
export class UserInternalBalance {
  id: string;

  userAddress: DexUser;

  token: string;

  balance: string;
}
