export interface IDatabase {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  get(query: string, params?: any[]): Promise<any>;
  run(query: string, params?: any[]): Promise<any>;
  all(query: string, params?: any[]): Promise<any[]>;
  exec(query: string): Promise<void>;
}

export interface DatabaseConfig {
  type: 'real' | 'memory' | 'mock';
  filename?: string;
}