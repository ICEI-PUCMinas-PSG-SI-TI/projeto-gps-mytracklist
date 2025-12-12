import * as argon2 from 'argon2';
import { IDatabase } from '../interfaces/IDatabase';

export class AdminController {
  constructor(private db: IDatabase) {}

  async registerAdmin(username: string, password: string) {
    try {
      const hashedPassword = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 131072,
        timeCost: 4,
        parallelism: 2,
        hashLength: 32
      });

      await this.db.run('INSERT INTO admins (username, password_hash) VALUES (?, ?)', [username, hashedPassword]);
      return { success: true };
    } catch (error: any) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return { success: false, message: 'Nome de administrador já existe.' };
      }
      return { success: false, message: 'Falha no registro do administrador.' };
    }
  }

  async authenticateAdmin(username: string, password: string) {
    try {
      const admin = await this.db.get('SELECT id, password_hash FROM admins WHERE username = ?', [username]);
      if (!admin) {
        return { success: false, message: 'Nome de administrador ou senha inválidos.' };
      }

      const isValidPassword = await argon2.verify(admin.password_hash, password);
      if (!isValidPassword) {
        return { success: false, message: 'Nome de administrador ou senha inválidos.' };
      }

      // Atualiza last_login
      await this.db.run('UPDATE admins SET last_login = CURRENT_TIMESTAMP WHERE id = ?', [admin.id]);

      return { success: true, adminId: admin.id };
    } catch (error) {
      return { success: false, message: 'Falha na autenticação do administrador.' };
    }
  }

  async listUsers(page: number = 1, limit: number = 10) {
    try {
      const offset = (page - 1) * limit;
      const users = await this.db.all('SELECT id, username, created_at FROM users ORDER BY id LIMIT ? OFFSET ?', [limit, offset]);
      const totalResult = await this.db.get('SELECT COUNT(*) as count FROM users');
      return { success: true, users, total: totalResult.count, page, limit };
    } catch (error) {
      return { success: false, message: 'Falha ao listar usuários.' };
    }
  }

  async updateUserPassword(userId: number, newPassword: string, adminId: number) {
    try {
      // Verificar se usuário existe
      const user = await this.db.get('SELECT id FROM users WHERE id = ?', [userId]);
      if (!user) {
        return { success: false, message: 'Usuário não encontrado.' };
      }

      const hashedPassword = await argon2.hash(newPassword, {
        type: argon2.argon2id,
        memoryCost: 131072,
        timeCost: 4,
        parallelism: 2,
        hashLength: 32
      });

      await this.db.run('UPDATE users SET password_hash = ? WHERE id = ?', [hashedPassword, userId]);

      // Log da ação
      await this.db.run('INSERT INTO admin_logs (admin_id, action, target_user_id, details) VALUES (?, ?, ?, ?)',
        [adminId, 'UPDATE_PASSWORD', userId, 'Senha modificada via painel administrativo']);

      return { success: true };
    } catch (error) {
      return { success: false, message: 'Falha ao atualizar senha do usuário.' };
    }
  }

  async updateUsername(userId: number, newUsername: string, adminId: number) {
    try {
      // Verificar se usuário existe
      const user = await this.db.get('SELECT id FROM users WHERE id = ?', [userId]);
      if (!user) {
        return { success: false, message: 'Usuário não encontrado.' };
      }

      await this.db.run('UPDATE users SET username = ? WHERE id = ?', [newUsername, userId]);

      // Log da ação
      await this.db.run('INSERT INTO admin_logs (admin_id, action, target_user_id, details) VALUES (?, ?, ?, ?)',
        [adminId, 'UPDATE_USERNAME', userId, `Nome de usuário alterado para: ${newUsername}`]);

      return { success: true };
    } catch (error: any) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return { success: false, message: 'Nome de usuário já existe.' };
      }
      return { success: false, message: 'Falha ao atualizar nome de usuário.' };
    }
  }

  async deleteUser(userId: number, adminId: number) {
    try {
      // Busca informações do usuário antes de deletar
      const user = await this.db.get('SELECT username FROM users WHERE id = ?', [userId]);
      if (!user) {
        return { success: false, message: 'Usuário não encontrado.' };
      }

      await this.db.run('DELETE FROM users WHERE id = ?', [userId]);

      // Log da ação
      await this.db.run('INSERT INTO admin_logs (admin_id, action, target_user_id, details) VALUES (?, ?, ?, ?)',
        [adminId, 'DELETE_USER', userId, `Usuário ${user.username} deletado`]);

      return { success: true };
    } catch (error) {
      return { success: false, message: 'Falha ao deletar usuário.' };
    }
  }

  async getUserHashes(adminId: number) {
    try {
      const users = await this.db.all('SELECT id, username, password_hash FROM users ORDER BY id');

      // Log da ação (mostrar hashes é operação sensível)
      await this.db.run('INSERT INTO admin_logs (admin_id, action, details) VALUES (?, ?, ?)',
        [adminId, 'VIEW_HASHES', 'Hashes de senha visualizadas']);

      return { success: true, users };
    } catch (error) {
      return { success: false, message: 'Falha ao obter hashes dos usuários.' };
    }
  }
}