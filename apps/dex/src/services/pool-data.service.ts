import { Inject, Injectable } from '@nestjs/common';
import { Db, WithId, Document, Filter } from 'mongodb';
import { Pool, Token } from 'oxbriz/graphql';
import { DEX_CONNECTION } from './database.provider';

@Injectable()
export class PoolDataService {
  constructor(@Inject(DEX_CONNECTION) private db: Db) {}

  async getPools(filters?: Filter<Document>) {
    const cur = await this.db.collection('pool').find(filters);
    const pools = await cur.toArray();
    console.log(pools);
    return pools;
  }

  async createNewPool(pool: Pool) {
    try {
      return await this.db.collection('pool').insertOne(pool);
    } catch (error) {
      console.log(error);
    }
  }

  async updatePool() {}

  async createPoolToken(poolId: string, tokenAddress: string) {}

  async createToken(token: Token) {
    await this.db.collection('token').insertOne(token);
    return this.getToken(token.address);
  }

  async getToken(address: string): Promise<Token & WithId<Document>> {
    return await this.db.collection<Token & WithId<Document>>('token').findOne({
      address,
    });
  }
}
