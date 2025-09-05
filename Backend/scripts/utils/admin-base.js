const readline = require('readline');
const { openDatabase } = require('../../src/database');

class AdminCLI {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async connectDB() {
    return await openDatabase();
  }

  question(prompt) {
    return new Promise(resolve => {
      this.rl.question(prompt, resolve);
    });
  }

  async confirmAction(message) {
    const answer = await this.question(`${message} (sim/não): `);
    return answer.toLowerCase() === 'sim' || answer.toLowerCase() === 's';
  }

  log(message) {
    console.log(`[${new Date().toISOString()}] ${message}`);
  }

  error(message) {
    console.error(`[${new Date().toISOString()}] ERRO: ${message}`);
  }

  success(message) {
    console.log(`[${new Date().toISOString()}] ✅ ${message}`);
  }

  close() {
    this.rl.close();
  }
}

module.exports = AdminCLI;