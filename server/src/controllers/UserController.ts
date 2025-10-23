import * as argon2 from 'argon2';
import { IDatabase } from '../interfaces/IDatabase';

export class UserController {
  constructor(private db: IDatabase) {}

  async registerUser(username: string, password: string) {
    try {
      const hashedPassword = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 131072,
        timeCost: 4,
        parallelism: 2,
        hashLength: 32
      });

      await this.db.run('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, hashedPassword]);
      return { success: true };
    } catch (error: any) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return { success: false, message: 'Nome de usuário já existe.' };
      }
      return { success: false, message: 'Falha no registro.' };
    }
  }

  async authenticateUser(username: string, password: string) {
    try {
      const user = await this.db.get('SELECT id, password_hash FROM users WHERE username = ?', [username]);
      if (!user) {
        return { success: false, message: 'Nome de usuário ou senha inválidos.' };
      }

      const isValidPassword = await argon2.verify(user.password_hash, password);
      if (!isValidPassword) {
        return { success: false, message: 'Nome de usuário ou senha inválidos.' };
      }

      return { success: true, userId: user.id };
    } catch (error) {
      return { success: false, message: 'Falha na autenticação.' };
    }
  }

  async getUserById(userId: number) {
  try {
    const user = await this.db.get('SELECT id, username FROM users WHERE id = ?', [userId]);
    return user; // Retorna o utilizador encontrado ou null
  } catch (error) {
    console.error('Falha ao buscar utilizador por ID:', error);
    return null;
  }
}

async getUserReviews(userId: number) {
    try {
      // Seleciona todas as colunas da tabela reviews para o utilizador especificado,
      // ordenando pelas mais recentes primeiro.
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