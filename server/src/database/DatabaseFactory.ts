import { IDatabase, DatabaseConfig } from '../interfaces/IDatabase';
import { SqliteDatabase } from './SqliteDatabase';
import { SqliteMemoryDatabase } from './SqliteMemoryDatabase';

export class DatabaseFactory {
  static create(config?: DatabaseConfig): IDatabase {
    const dbType = config?.type || process.env.DB_TYPE || 'real';

    switch (dbType) {
      case 'memory':
        return new SqliteMemoryDatabase();

      case 'real':
      default:
        const filename = config?.filename || process.env.DB_FILENAME || './database.sqlite';
        return new SqliteDatabase(filename);
    }
  }

  static async createAndConnect(config?: DatabaseConfig): Promise<IDatabase> {
    const db = this.create(config);
    await db.connect();
    return db;
  }
}