import * as sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { IDatabase } from '../interfaces/IDatabase';

export class SqliteMemoryDatabase implements IDatabase {
  private db: Database | null = null;

  async connect(): Promise<void> {
    this.db = await open({
      filename: ':memory:',
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

  // Método adicional para limpar banco de teste
  async clearAll(): Promise<void> {
    if (!this.db) return;

    // Limpar todas as tabelas
    const tables = await this.db.all("SELECT name FROM sqlite_master WHERE type='table'");
    for (const table of tables) {
      if (table.name !== 'sqlite_sequence') {
        await this.db.run(`DELETE FROM ${table.name}`);
        await this.db.run(`DELETE FROM sqlite_sequence WHERE name='${table.name}'`);
      }
    }
  }
}