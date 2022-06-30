import { Inject, Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { DB_CONNECTION } from '../connection.provider';

@Injectable()
export class DatabaseService {
  constructor(@Inject(DB_CONNECTION) readonly client: MongoClient) {}

  getDatabase(databaseName: string) {
    return this.client.db(databaseName);
  }

  // async create<T>(): Promise<T | null> {
  //   return null;
  // }

  // async update<T>(): Promise<T | null> {
  //   return null;
  // }

  // async find<T>(): Promise<T | null> {
  //   return null;
  // }
}
