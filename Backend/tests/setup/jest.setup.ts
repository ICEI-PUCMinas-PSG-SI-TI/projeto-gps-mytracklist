import { DatabaseFactory } from '../../src/database/DatabaseFactory';
import { ControllerFactory } from '../../src/factories/ControllerFactory';

// Configurar banco de teste antes de todos os testes
beforeAll(async () => {
  // Usar banco em memória para testes
  process.env.NODE_ENV = 'test';
  process.env.DB_TYPE = 'memory';

  // Inicializar banco de teste
  const db = DatabaseFactory.create();
  await ControllerFactory.initializeDatabase(db);
});

// Limpar banco após cada teste
afterEach(async () => {
  const db = DatabaseFactory.create();
  if (db && typeof (db as any).clearAll === 'function') {
    await (db as any).clearAll();
  }
});

// Limpar após todos os testes
afterAll(async () => {
  const db = DatabaseFactory.create();
  await db.disconnect();
});