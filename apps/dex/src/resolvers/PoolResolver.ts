import { Query, Resolver } from '@nestjs/graphql';
import { Pool } from 'oxbriz/graphql';
import { PoolDataService } from '../services/pool-data.service';

@Resolver(() => Pool)
export class PoolResolver {
  constructor(private readonly pools: PoolDataService) {}

  @Query(() => [Pool])
  async getPools() {
    return this.pools.getPools();
  }
}
