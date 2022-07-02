import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PoolToken } from './PoolToken';

@ObjectType()
export class Investment {
  @Field()
  id: string;

  @Field()
  assetManagerAddress: string;

  @Field()
  amount: string;

  @Field(() => [PoolToken])
  poolTokenId: PoolToken;

  @Field(() => Int)
  timestamp: number;
}
