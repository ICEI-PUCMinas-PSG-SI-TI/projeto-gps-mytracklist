import { Database } from 'bun:sqlite';
import { IDatabase } from '../interfaces/IDatabase';

export class SqliteDatabase implements IDatabase {
  private db: Database | null = null;
  private filename: string;

  constructor(filename: string = './database.sqlite') {
    this.filename = filename;
  }

  async connect(): Promise<void> {
    this.db = new Database(this.filename);
  }

  async disconnect(): Promise<void> {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  async get(query: string, params?: any[]): Promise<any> {
    if (!this.db) throw new Error('Database not connected');
    return this.db.prepare(query).get(params as any);
  }

  async run(query: string, params?: any[]): Promise<any> {
    if (!this.db) {
      console.error('Database not connected in run method');
      throw new Error('Database not connected');
    }
    return this.db.prepare(query).run(params as any);
  }

  async all(query: string, params?: any[]): Promise<any[]> {
    if (!this.db) throw new Error('Database not connected');
    return this.db.prepare(query).all(params as any);
  }

  async exec(query: string): Promise<void> {
    if (!this.db) throw new Error('Database not connected');
    this.db.run(query);
  }
}
