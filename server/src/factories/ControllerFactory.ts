import { IDatabase } from '../interfaces/IDatabase';
import { DatabaseFactory } from '../database/DatabaseFactory';
import { UserController } from '../controllers/UserController';
import { AdminController } from '../controllers/AdminController';
import { ReviewController } from '../controllers/ReviewController';

export class ControllerFactory {
  private static db: IDatabase | null = null;

  static setDatabase(db: IDatabase) {
    this.db = db;
  }

  static getDatabase(): IDatabase {
    if (!this.db) {
      this.db = DatabaseFactory.create();
    }
    return this.db;
  }

  static createUserController(db?: IDatabase): UserController {
    const database = db || this.getDatabase();
    return new UserController(database);
  }

  static createAdminController(db?: IDatabase): AdminController {
    const database = db || this.getDatabase();
    return new AdminController(database);
  }

  // 2. Adicione o novo método de criação
  static createReviewController(db?: IDatabase): ReviewController {
    const database = db || this.getDatabase();
    return new ReviewController(database);
  }

  // Método para inicializar banco de dados
  static async initializeDatabase(db?: IDatabase): Promise<void> {
    const database = db || this.getDatabase();
    await database.connect();

    await database.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_login DATETIME
      );

      CREATE TABLE IF NOT EXISTS admin_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        admin_id INTEGER,
        action TEXT NOT NULL,
        target_user_id INTEGER,
        details TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (admin_id) REFERENCES admins (id),
        FOREIGN KEY (target_user_id) REFERENCES users (id) ON DELETE SET NULL
      );

      CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        trackId TEXT NOT NULL,
        rating INTEGER NOT NULL CHECK (rating >= 0 AND rating <= 10),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
        UNIQUE (userId, trackId)
      );
    `);
    
    console.log("Banco de dados inicializado com todas as tabelas.");
  }
}

