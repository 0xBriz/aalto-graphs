import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { DEX_CONNECTION } from './database.provider';

@Injectable()
export class PoolDataService {
  constructor(@Inject(DEX_CONNECTION) db: Db) {}

  async createNewPool() {}

  async updatePool() {}
}
