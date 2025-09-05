#!/usr/bin/env node

const AdminCLI = require('../utils/admin-base');
const { getUserHashes } = require('../../src/adminController');

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

      const result = await getUserHashes(1); // Admin ID hardcoded para CLI

      if (result.success) {
        console.log('\n🔐 Hashes de Senha dos Usuários:');
        console.log('='.repeat(100));

        result.users.forEach(user => {
          console.log(`ID: ${user.id}`);
          console.log(`Usuário: ${user.username}`);
          console.log(`Hash: ${user.password_hash}`);
          console.log('-'.repeat(50));
        });

        this.success(`${result.users.length} hashes carregadas`);
        this.log('Esta operação foi registrada no log de auditoria');
      } else {
        this.error(result.message);
      }

    } catch (error) {
      this.error(`Erro ao carregar hashes: ${error.message}`);
    } finally {
      this.close();
    }
  }
}

// Executa se chamado diretamente
if (require.main === module) {
  const cli = new ShowHashesCLI();
  cli.run();
}

module.exports = ShowHashesCLI;
