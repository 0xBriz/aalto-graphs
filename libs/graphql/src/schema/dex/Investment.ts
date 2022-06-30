import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PoolToken } from './PoolToken';

@ObjectType()
export class Investment {
  id: string;

  assetManagerAddress: string;

  amount: string;

  poolTokenId: PoolToken;

  @Field(() => Int)
  timestamp: number;
}
