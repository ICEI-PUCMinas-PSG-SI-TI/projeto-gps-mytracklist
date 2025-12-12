import { Database } from 'bun:sqlite';
import { IDatabase } from '../interfaces/IDatabase';

export class SqliteMemoryDatabase implements IDatabase {
  private db: Database | null = null;

  async connect(): Promise<void> {
    this.db = new Database(':memory:');
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
    if (!this.db) throw new Error('Database not connected');
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

  // Método adicional para limpar banco de teste
  async clearAll(): Promise<void> {
    if (!this.db) return;

    // Limpar todas as tabelas
    const tables = this.db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all() as any;
    for (const table of tables) {
      if (table.name !== 'sqlite_sequence') {
        this.db.prepare(`DELETE FROM ${table.name}`).run();
        this.db.prepare(`DELETE FROM sqlite_sequence WHERE name='${table.name}'`).run();
      }
    }
  }
}
