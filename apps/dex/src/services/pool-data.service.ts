import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { Pool } from 'oxbriz/graphql';
import { DEX_CONNECTION } from './database.provider';

@Injectable()
export class PoolDataService {
  constructor(@Inject(DEX_CONNECTION) private db: Db) {}

  async createNewPool(pool: Pool) {
    try {
      return await this.db.collection('pool').insertOne(pool);
    } catch (error) {
      console.log(error);
    }
  }

  async updatePool() {}

  async createPoolToken(token) {
    console.log(token);
  }
}
