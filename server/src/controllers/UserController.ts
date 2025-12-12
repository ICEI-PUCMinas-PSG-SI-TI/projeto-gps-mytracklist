import { IDatabase } from '../interfaces/IDatabase';
import bcrypt from 'bcryptjs';

export class UserController {
  constructor(private db: IDatabase) {}

  async registerUser(username: string, password: string) {
    try {
      const existingUser = await this.db.get('SELECT * FROM users WHERE username = ?', [username]);
      if (existingUser) {
        return { success: false, message: 'Nome de utilizador já existe' };
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const result = await this.db.run(
        'INSERT INTO users (username, password_hash) VALUES (?, ?)',
        [username, passwordHash]
      );

      return { success: true, userId: result.lastInsertRowid };
    } catch (error) {
      console.error('Erro ao registar utilizador:', error);
      return { success: false, message: 'Falha ao registar utilizador' };
    }
  }

  async authenticateUser(username: string, password: string) {
    try {
      const user = await this.db.get('SELECT * FROM users WHERE username = ?', [username]);
      if (!user) {
        return { success: false, message: 'Utilizador ou palavra-passe inválidos' };
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (isMatch) {
        return { success: true, userId: user.id };
      } else {
        return { success: false, message: 'Utilizador ou palavra-passe inválidos' };
      }
    } catch (error) {
      console.error('Erro ao autenticar utilizador:', error);
      return { success: false, message: 'Falha na autenticação' };
    }
  }

  async getUserById(userId: number) {
    try {
      const user = await this.db.get('SELECT id, username, created_at FROM users WHERE id = ?', [userId]);
      return user || null;
    } catch (error) {
      console.error('Erro ao buscar utilizador:', error);
      return null;
    }
  }

  async getUserByUsername(username: string) {
    try {
      const user = await this.db.get('SELECT id, username, created_at FROM users WHERE username = ?', [username]);
      return user || null;
    } catch (error) {
      console.error('Erro ao buscar utilizador por nome:', error);
      return null;
    }
  }

  async getUserReviews(userId: number) {
    try {
      const reviews = await this.db.all(
        'SELECT id, trackId, rating, createdAt, updatedAt FROM reviews WHERE userId = ? ORDER BY createdAt DESC',
        [userId]
      );
      return { success: true, reviews: reviews || [] };
    } catch (error) {
      console.error('Falha ao buscar avaliações do utilizador:', error);
      return { success: false, message: 'Falha ao buscar avaliações.' };
    }
  }
}