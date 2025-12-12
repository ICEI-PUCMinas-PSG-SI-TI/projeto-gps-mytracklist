#!/usr/bin/env node

import AdminCLI from '../utils/admin-base';

class ListUsersCLI extends AdminCLI {
  formatDate(dateString: string | null): string {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('pt-BR');
  }

  displayUsersTable(users: any[], showHashes: boolean = false) {
    console.log('\n📋 Lista de Usuários:');
    console.log('='.repeat(showHashes ? 120 : 80));

    if (showHashes) {
      console.log('┌────┬─────────────────┬──────────────────────────────────────────────────────────────────┬───────────────────────────┐');
      console.log('│ ID │ Nome de Usuário │ Hash da Senha                                                    │ Criado em                 │');
      console.log('├────┼─────────────────┼──────────────────────────────────────────────────────────────────┼───────────────────────────┤');
    } else {
      console.log('┌────┬─────────────────┬───────────────────────────┐');
      console.log('│ ID │ Nome de Usuário │ Criado em                 │');
      console.log('├────┼─────────────────┼───────────────────────────┤');
    }

    users.forEach(user => {
      const id = user.id.toString().padStart(2);
      const username = user.username.padEnd(15);
      const created = this.formatDate(user.created_at).padEnd(25);

      if (showHashes) {
        const hash = (user.password_hash || '').substring(0, 60).padEnd(64);
        console.log(`│ ${id} │ ${username} │ ${hash} │ ${created} │`);
      } else {
        console.log(`│ ${id} │ ${username} │ ${created} │`);
      }
    });

    if (showHashes) {
      console.log('└────┴─────────────────┴──────────────────────────────────────────────────────────────────┴───────────────────────────┘');
    } else {
      console.log('└────┴─────────────────┴───────────────────────────┘');
    }
  }

  async run() {
    try {
      const args = process.argv.slice(2);
      const showHashes = args.includes('--show-hashes');
      const page = parseInt(args.find(arg => arg.startsWith('--page='))?.split('=')[1] || '1');
      const limit = parseInt(args.find(arg => arg.startsWith('--limit='))?.split('=')[1] || '50');

      if (showHashes) {
        console.log('⚠️  ATENÇÃO: Mostrar hashes de senha é uma operação sensível!');
        const confirmed = await this.confirmAction('Tem certeza que deseja visualizar as hashes?');
        if (!confirmed) {
          this.log('Operação cancelada');
          return;
        }
      }

      this.log(`Carregando usuários (página ${page}, limite ${limit})...`);

      const db = await this.connectDB();
      const offset = (page - 1) * limit;

      let query: string, params: any[];
      if (showHashes) {
        query = 'SELECT id, username, password_hash, created_at FROM users ORDER BY id LIMIT ? OFFSET ?';
        params = [limit, offset];
      } else {
        query = 'SELECT id, username, created_at FROM users ORDER BY id LIMIT ? OFFSET ?';
        params = [limit, offset];
      }

      const users = await db.all(query, params);

      if (users.length === 0) {
        console.log('\n📭 Nenhum usuário encontrado.');
        return;
      }

      // Conta total de usuários
      const totalResult = await db.get('SELECT COUNT(*) as count FROM users');
      const total = totalResult.count;

      this.displayUsersTable(users, showHashes);

      console.log(`\n📊 Mostrando ${users.length} de ${total} usuários (página ${page})`);

      if (total > limit) {
        const totalPages = Math.ceil(total / limit);
        console.log(`💡 Use --page=N para navegar (páginas totais: ${totalPages})`);
      }

      if (showHashes) {
        this.log('Operação de visualização de hashes registrada no log de auditoria');
      }

    } catch (error: any) {
      this.error(`Erro ao listar usuários: ${error.message}`);
    } finally {
      this.close();
    }
  }
}

// Executa se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const cli = new ListUsersCLI();
  cli.run();
}

export default ListUsersCLI;