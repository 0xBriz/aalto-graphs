import { Module } from '@nestjs/common';
import { DatabaseConnectionProvider } from './connection.provider';
import { DatabaseService } from './services/database.service';

@Module({
  providers: [DatabaseConnectionProvider, DatabaseService],
  exports: [DatabaseConnectionProvider, DatabaseService],
})
export class DatabaseModule {}
