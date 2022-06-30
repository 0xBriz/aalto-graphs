import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Pool } from './Pool';

@ObjectType()
export class Vault {
  @Field(() => Int)
  poolCount: number;

  @Field(() => [Pool])
  pools: Pool[];

  totalLiquidity: string;

  totalSwapCount: string;

  totalSwapVolume: string;

  totalSwapFee: string;
}
