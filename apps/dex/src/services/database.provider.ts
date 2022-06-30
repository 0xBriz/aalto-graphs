import { DatabaseService } from '@0cbriz/database';
import { Provider } from '@nestjs/common';

export const DEX_CONNECTION = 'DEX_CONNECTION';

export const DexConnectionProvider: Provider = {
  provide: DEX_CONNECTION,
  useFactory: async (dbService: DatabaseService) => {
    return dbService.getDatabase('dex');
  },
  inject: [DatabaseService],
};
