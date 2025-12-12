#!/usr/bin/env node

import * as readline from 'readline';
import { ControllerFactory } from '../../src/factories/ControllerFactory.js';
import { IDatabase } from '../../src/interfaces/IDatabase.js';

class AdminCLI {
  private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async connectDB(): Promise<IDatabase> {
    await ControllerFactory.initializeDatabase();
    return ControllerFactory.getDatabase();
  }

  question(prompt: string): Promise<string> {
    return new Promise(resolve => {
      this.rl.question(prompt, resolve);
    });
  }

  async confirmAction(message: string): Promise<boolean> {
    const answer = await this.question(`${message} (sim/não): `);
    return answer.toLowerCase() === 'sim' || answer.toLowerCase() === 's';
  }

  log(message: string) {
    console.log(`[${new Date().toISOString()}] ${message}`);
  }

  error(message: string) {
    console.error(`[${new Date().toISOString()}] ERRO: ${message}`);
  }

  success(message: string) {
    console.log(`[${new Date().toISOString()}] ✅ ${message}`);
  }

  close() {
    try {
      this.rl.close();
    } catch {}
  }
}

export default AdminCLI;