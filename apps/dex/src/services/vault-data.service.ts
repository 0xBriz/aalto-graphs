import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { DEX_CONNECTION } from './database.provider';

@Injectable()
export class VaultDataService {
  constructor(@Inject(DEX_CONNECTION) readonly db: Db) {}

  async createNewPool() {}

  async updatePool() {}
}
