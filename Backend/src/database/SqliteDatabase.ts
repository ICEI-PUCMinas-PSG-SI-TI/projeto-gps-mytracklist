import * as sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { IDatabase } from '../interfaces/IDatabase';

export class SqliteDatabase implements IDatabase {
  private db: Database | null = null;
  private filename: string;

  constructor(filename: string = './database.sqlite') {
    this.filename = filename;
  }

  async connect(): Promise<void> {
    this.db = await open({
      filename: this.filename,
      driver: sqlite3.Database
    });
  }

  async disconnect(): Promise<void> {
    if (this.db) {
      await this.db.close();
      this.db = null;
    }
  }

  async get(query: string, params?: any[]): Promise<any> {
    if (!this.db) throw new Error('Database not connected');
    return await this.db.get(query, params);
  }

  async run(query: string, params?: any[]): Promise<any> {
    if (!this.db) throw new Error('Database not connected');
    return await this.db.run(query, params);
  }

  async all(query: string, params?: any[]): Promise<any[]> {
    if (!this.db) throw new Error('Database not connected');
    return await this.db.all(query, params);
  }

  async exec(query: string): Promise<void> {
    if (!this.db) throw new Error('Database not connected');
    return await this.db.exec(query);
  }
}