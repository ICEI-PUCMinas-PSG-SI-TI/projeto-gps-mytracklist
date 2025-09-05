#!/usr/bin/env node

const AdminCLI = require('../utils/admin-base');
const ControllerFactory = require('../../src/factories/ControllerFactory');

class RegisterAdminCLI extends AdminCLI {
  async validatePassword(password) {
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
      const adminController = ControllerFactory.createAdminController();
      const result = await adminController.registerAdmin(username, password);

      if (result.success) {
        this.success(`Administrador '${username}' criado com sucesso!`);
        this.log('Use este administrador para fazer login no painel administrativo');
      } else {
        this.error(result.message);
      }

    } catch (error) {
      this.error(`Erro inesperado: ${error.message}`);
    } finally {
      this.close();
    }
  }
}

// Executa se chamado diretamente
if (require.main === module) {
  const cli = new RegisterAdminCLI();
  cli.run();
}

module.exports = RegisterAdminCLI;