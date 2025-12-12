#!/usr/bin/env node

import AdminCLI from '../utils/admin-base';
import { ControllerFactory } from '../../src/factories/ControllerFactory.js';

class RegisterAdminCLI extends AdminCLI {
  validatePassword(password: string): string | null {
    if (password.length < 8) {
      return 'A senha deve ter pelo menos 8 caracteres';
    }
    if (!/[A-Z]/.test(password)) {
      return 'A senha deve conter pelo menos uma letra maiúscula';
    }
    if (!/[a-z]/.test(password)) {
      return 'A senha deve conter pelo menos uma letra minúscula';
    }
    if (!/\d/.test(password)) {
      return 'A senha deve conter pelo menos um número';
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return 'A senha deve conter pelo menos um caractere especial (!@#$%^&*)';
    }
    return null;
  }

  async run() {
    try {
      console.log('🚀 Registro de Administrador - MyTrackList\n');

      const username = await this.question('Nome de usuário do administrador: ');
      if (!username || username.length < 3) {
        this.error('Nome de usuário deve ter pelo menos 3 caracteres');
        return;
      }

      const password = await this.question('Senha (mínimo 8 caracteres, maiúscula, minúscula, número, especial): ');
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

      const confirmed = await this.confirmAction('Tem certeza que deseja criar este administrador?');
      if (!confirmed) {
        this.log('Operação cancelada pelo usuário');
        return;
      }

      this.log('Criando administrador...');
      await ControllerFactory.initializeDatabase();
      const adminController = ControllerFactory.createAdminController();
      const result = await adminController.registerAdmin(username, password);

      if (result.success) {
        this.success(`Administrador '${username}' criado com sucesso!`);
        this.log('Use este administrador para fazer login no painel administrativo');
      } else {
        this.error(result.message || 'Erro desconhecido');
      }

    } catch (error: any) {
      this.error(`Erro inesperado: ${error.message}`);
    } finally {
      this.close();
    }
  }
}

// Executa se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const cli = new RegisterAdminCLI();
  cli.run();
}

export default RegisterAdminCLI;