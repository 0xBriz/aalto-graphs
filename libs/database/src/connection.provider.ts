import { Provider } from '@nestjs/common';
import { MongoClient } from 'mongodb';

export const DB_CONNECTION = 'DB_CONNECTION';

export const DatabaseConnectionProvider: Provider = {
  provide: DB_CONNECTION,
  useFactory: async () => {
    try {
      const client = new MongoClient(process.env.DB_HOST);
      // Connect the client to the server
      await client.connect();
      // Establish and verify connection
      await client.db('dex').command({ ping: 1 });
      console.log('Connected successfully to database server');
      return client;
    } catch (error) {
      throw error;
    }
  },
};
