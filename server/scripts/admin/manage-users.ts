#!/usr/bin/env node

import AdminCLI from '../utils/admin-base';
import { ControllerFactory } from '../../src/factories/ControllerFactory.js';

class ManageUsersCLI extends AdminCLI {
  async findUserByIdOrUsername(identifier: string) {
    const db = await this.connectDB();
    let user: any;

    if (!isNaN(Number(identifier))) {
      // Busca por ID
      user = await db.get('SELECT id, username FROM users WHERE id = ?', [parseInt(identifier)]);
    } else {
      // Busca por username
      user = await db.get('SELECT id, username FROM users WHERE username = ?', [identifier]);
    }

    return user;
  }

  async changePassword() {
    const identifier = await this.question('ID ou nome de usuário do usuário: ');
    const user = await this.findUserByIdOrUsername(identifier);

    if (!user) {
      this.error('Usuário não encontrado');
      return;
    }

    console.log(`\n👤 Usuário encontrado: ${user.username} (ID: ${user.id})`);

    const newPassword = await this.question('Nova senha (mínimo 6 caracteres): ');
    if (newPassword.length < 6) {
      this.error('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    const confirmPassword = await this.question('Confirme a nova senha: ');
    if (newPassword !== confirmPassword) {
      this.error('As senhas não coincidem');
      return;
    }

    const confirmed = await this.confirmAction(`Tem certeza que deseja alterar a senha de '${user.username}'?`);
    if (!confirmed) {
      this.log('Operação cancelada');
      return;
    }

    this.log('Alterando senha...');
    await ControllerFactory.initializeDatabase();
    const adminController = ControllerFactory.createAdminController();
    const result = await adminController.updateUserPassword(user.id, newPassword, 1); // Admin ID hardcoded para CLI

    if (result.success) {
      this.success(`Senha de '${user.username}' alterada com sucesso`);
    } else {
      this.error(result.message || 'Erro desconhecido');
    }
  }

  async changeUsername() {
    const identifier = await this.question('ID ou nome de usuário atual: ');
    const user = await this.findUserByIdOrUsername(identifier);

    if (!user) {
      this.error('Usuário não encontrado');
      return;
    }

    console.log(`\n👤 Usuário encontrado: ${user.username} (ID: ${user.id})`);

    const newUsername = await this.question('Novo nome de usuário (mínimo 3 caracteres): ');
    if (newUsername.length < 3) {
      this.error('O nome de usuário deve ter pelo menos 3 caracteres');
      return;
    }

    const confirmed = await this.confirmAction(`Tem certeza que deseja alterar o nome de '${user.username}' para '${newUsername}'?`);
    if (!confirmed) {
      this.log('Operação cancelada');
      return;
    }

    this.log('Alterando nome de usuário...');
    await ControllerFactory.initializeDatabase();
    const adminController = ControllerFactory.createAdminController();
    const result = await adminController.updateUsername(user.id, newUsername, 1); // Admin ID hardcoded para CLI

    if (result.success) {
      this.success(`Nome de usuário alterado de '${user.username}' para '${newUsername}'`);
    } else {
      this.error(result.message || 'Erro desconhecido');
    }
  }

  async deleteUser() {
    const identifier = await this.question('ID ou nome de usuário do usuário a ser deletado: ');
    const user = await this.findUserByIdOrUsername(identifier);

    if (!user) {
      this.error('Usuário não encontrado');
      return;
    }

    console.log(`\n👤 Usuário encontrado: ${user.username} (ID: ${user.id})`);
    console.log('⚠️  ATENÇÃO: Esta operação não pode ser desfeita!');

    const confirmed = await this.confirmAction(`Tem certeza que deseja DELETAR o usuário '${user.username}'?`);
    if (!confirmed) {
      this.log('Operação cancelada');
      return;
    }

    // Confirmação extra para deletar
    const doubleConfirmed = await this.confirmAction('Esta é uma operação irreversível. Confirmar novamente?');
    if (!doubleConfirmed) {
      this.log('Operação cancelada');
      return;
    }

    this.log('Deletando usuário...');
    await ControllerFactory.initializeDatabase();
    const adminController = ControllerFactory.createAdminController();
    const result = await adminController.deleteUser(user.id, 1); // Admin ID hardcoded para CLI

    if (result.success) {
      this.success(`Usuário '${user.username}' deletado com sucesso`);
    } else {
      this.error(result.message || 'Erro desconhecido');
    }
  }

  async showMenu() {
    console.log('\n🔧 Gerenciamento de Usuários - MyTrackList');
    console.log('='.repeat(50));
    console.log('1. Alterar senha de usuário');
    console.log('2. Alterar nome de usuário');
    console.log('3. Deletar usuário');
    console.log('4. Sair');
    console.log('='.repeat(50));

    const choice = await this.question('Escolha uma opção (1-4): ');
    return choice;
  }

  async run() {
    try {
      while (true) {
        const choice = await this.showMenu();

        switch (choice) {
          case '1':
            await this.changePassword();
            break;
          case '2':
            await this.changeUsername();
            break;
          case '3':
            await this.deleteUser();
            break;
          case '4':
            this.log('Saindo...');
            return;
          default:
            this.error('Opção inválida');
        }

        console.log('\nPressione Enter para continuar...');
        await this.question('');
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
  const cli = new ManageUsersCLI();
  cli.run();
}

export default ManageUsersCLI;