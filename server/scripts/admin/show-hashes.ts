#!/usr/bin/env node

import AdminCLI from '../utils/admin-base';
import { ControllerFactory } from '../../src/factories/ControllerFactory.js';

class ShowHashesCLI extends AdminCLI {
  async run() {
    try {
      console.log('🚨 ATENÇÃO CRÍTICA: Visualização de Hashes de Senha');
      console.log('='.repeat(60));
      console.log('⚠️  Esta operação é EXTREMAMENTE sensível!');
      console.log('⚠️  As hashes de senha NUNCA devem ser compartilhadas!');
      console.log('⚠️  Use apenas para debug/emergências!');
      console.log('='.repeat(60));

      const confirmed1 = await this.confirmAction('Você entende que esta é uma operação crítica?');
      if (!confirmed1) {
        this.log('Operação cancelada');
        return;
      }

      const confirmed2 = await this.confirmAction('Você confirma que precisa visualizar as hashes para fins legítimos?');
      if (!confirmed2) {
        this.log('Operação cancelada');
        return;
      }

      const confirmed3 = await this.confirmAction('Última confirmação: deseja prosseguir?');
      if (!confirmed3) {
        this.log('Operação cancelada');
        return;
      }

      this.log('Carregando hashes de senha...');

      await ControllerFactory.initializeDatabase();
      const adminController = ControllerFactory.createAdminController();
      const result = await adminController.getUserHashes(1); // Admin ID hardcoded para CLI

      if (result.success && result.users) {
        console.log('\n🔐 Hashes de Senha dos Usuários:');
        console.log('='.repeat(100));

        result.users.forEach((user: any) => {
          console.log(`ID: ${user.id}`);
          console.log(`Usuário: ${user.username}`);
          console.log(`Hash: ${user.password_hash}`);
          console.log('-'.repeat(50));
        });

        this.success(`${result.users.length} hashes carregadas`);
        this.log('Esta operação foi registrada no log de auditoria');
      } else {
        this.error(result.message || 'Erro desconhecido');
      }

    } catch (error: any) {
      this.error(`Erro ao carregar hashes: ${error.message}`);
    } finally {
      this.close();
    }
  }
}

// Executa se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const cli = new ShowHashesCLI();
  cli.run();
}

export default ShowHashesCLI;