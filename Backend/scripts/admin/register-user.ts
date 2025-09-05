#!/usr/bin/env node

import AdminCLI from '../utils/admin-base.ts';
import { ControllerFactory } from '../../src/factories/ControllerFactory.js';

class RegisterUserCLI extends AdminCLI {
  validatePassword(password: string): string | null {
    if (password.length < 6) {
      return 'A senha deve ter pelo menos 6 caracteres';
    }
    return null;
  }

  async run() {
    try {
      console.log('👤 Registro de Usuário - MyTrackList\n');



      const username = await this.question('Nome de usuário: ');
      if (!username || username.length < 3) {
        this.error('Nome de usuário deve ter pelo menos 3 caracteres');
        return;
      }

      const password = await this.question('Senha (mínimo 6 caracteres): ');
      const passwordError = this.validatePassword(password);
      if (passwordError) {
        this.error(passwordError);
        return;
      }

      const confirmPassword = await this.question('Confirme a senha: ');
      if (password !== confirmPassword) {
        this.error('As senhas não coincidem');
        return;
      }

      const confirmed = await this.confirmAction('Tem certeza que deseja criar este usuário?');
      if (!confirmed) {
        this.log('Operação cancelada pelo usuário');
        return;
      }

      this.log('Criando usuário...');
      await ControllerFactory.initializeDatabase();
      const userController = ControllerFactory.createUserController();
      const result = await userController.registerUser(username, password);

      if (result.success) {
        this.success(`Usuário '${username}' criado com sucesso!`);
      } else {
        this.error(result.message || 'Erro desconhecido');
      }

    } catch (error) {
      this.error(`Erro inesperado: ${error.message}`);
    } finally {
      this.close();
    }
  }
}

// Executa se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const cli = new RegisterUserCLI();
  cli.run();
}

export default RegisterUserCLI;