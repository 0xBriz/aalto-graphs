import { Inject, Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { DB_CONNECTION } from '../connection.provider';

@Injectable()
export class DatabaseService {
  constructor(@Inject(DB_CONNECTION) readonly db: MongoClient) {}

  async create<T>(): Promise<T | null> {
    return null;
  }

  async update<T>(): Promise<T | null> {
    return null;
  }

  async find<T>(): Promise<T | null> {
    return null;
  }
}
