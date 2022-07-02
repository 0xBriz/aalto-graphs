import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Pool } from './Pool';

/**
 * For LiquidityBootstrappingPool only
 */

@ObjectType()
export class GradualWeightUpdate {
  @Field()
  id: string;

  @Field(() => Pool)
  poolId: Pool;

  @Field(() => Int)
  scheduledTimestamp: number;

  @Field(() => Int)
  startTimestamp: number;

  @Field(() => Int)
  endTimestamp: number;

  @Field(() => [String])
  startWeights: string[];

  @Field(() => [String])
  endWeights: string[];
}
