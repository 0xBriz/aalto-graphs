import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Pool } from './Pool';

/**
 * For LiquidityBootstrappingPool only
 */

@ObjectType()
export class GradualWeightUpdate {
  id: string;

  poolId: Pool;

  @Field(() => Int)
  scheduledTimestamp: number;

  @Field(() => Int)
  startTimestamp: number;

  @Field(() => Int)
  endTimestamp: number;

  startWeights: string[];

  endWeights: string[];
}
