# MyTrackList Backend

Backend da plataforma MyTrackList, um sistema tipo Letterboxd para rastreamento
de músicas, álbuns e artistas. Construído com foco em performance, segurança e
escalabilidade. O front end será desenvolvido em React.

## Tecnologias

- **Bun**: Runtime JavaScript/TypeScript de alta performance com testes nativos
- **TypeScript**: Tipagem estática para maior robustez e manutenibilidade
- **SQLite**: Banco de dados leve e eficiente, utilizando driver nativo do Bun
- **Express**: Framework web minimalista e extensível
- **Argon2**: Algoritmo de hashing de senhas resistente a ataques
- **Helmet**: Middleware para configuração de headers de segurança HTTP
- **express-rate-limit**: Proteção contra abuso de API
- **express-session**: Gerenciamento de sessões HTTP seguras

## Arquitetura

### Estrutura de Diretórios

```
src/
├── controllers/         # Lógica de negócio (UserController, AdminController)
├── database/            # Implementações de banco de dados
├── factories/           # Padrão Factory para criação de instâncias
├── interfaces/          # Contratos TypeScript (IDatabase)
└── index.ts             # Ponto de entrada da aplicação

tests/                   # Testes automatizados
scripts/admin/           # Scripts de administração CLI
```

### Padrões de Design

- **Factory Pattern**: `ControllerFactory` e `DatabaseFactory` para injeção de dependências
- **Interface Segregation**: `IDatabase` define contrato claro para implementações de banco
- **Dependency Injection**: Controllers recebem instância de database via construtor

### Implementações de Database

- `SqliteDatabase`: Persistência real em arquivo SQLite
- `SqliteMemoryDatabase`: Banco em memória para testes
- Suporte a configuração via variáveis de ambiente (`DB_TYPE`, `DB_FILENAME`)

## Middlewares e Segurança

### CORS (Cross-Origin Resource Sharing)

- Configuração dinâmica baseada em `NODE_ENV`
- Permite credenciais e métodos específicos
- Headers customizados para autenticação

### Rate Limiting

- Limite geral: 100 requisições/15min por IP
- Limite estrito para autenticação: 5 tentativas/15min
- Headers padrão do express-rate-limit

### Helmet Security Headers

- Content Security Policy (CSP) configurada
- HSTS (HTTP Strict Transport Security)
- Proteções contra clickjacking e MIME sniffing

### Sessões HTTP

- Secret obrigatório via `SESSION_SECRET`
- Cookies seguros apenas em produção
- SameSite strict para proteção CSRF
- Expiração de 24 horas

## Sistema de Autenticação

### Hashing de Senhas

- Argon2 com parâmetros otimizados:
  - Tipo: argon2id (resistente a ataques side-channel)
  - Memória: 128MB
  - Iterações: 4
  - Paralelismo: 2
  - Comprimento do hash: 32 bytes

### Autenticação de Usuários

- Middleware `requireAuth` para rotas protegidas
- Sessões baseadas em userId
- Validação de credenciais com Argon2.verify

### Autenticação Administrativa

- Middleware `requireAdminAuth` separado
- Logs automáticos de todas as ações administrativas
- Tabela `admin_logs` para auditoria

### Logs Administrativos

- Registro de ações: UPDATE_PASSWORD, UPDATE_USERNAME, DELETE_USER, VIEW_HASHES
- Timestamp automático
- Detalhes contextuais de cada operação

## Instalação e Uso

### Dependências

```bash
bun install
```

### Desenvolvimento

```bash
bun run dev
```

Executa com hot reload automático.

### Produção

```bash
bun run build
bun run start
```

### Testes

```bash
bun test
```

Executa toda a suíte de testes com isolamento de database.

## Testes

### Estratégia de Testes

- **Testes Unitários**: Controllers e utilitários
- **Testes de Integração**: Fluxos completos de API
- **Testes de API**: Endpoints HTTP com supertest

### Isolamento de Database

- Cada teste usa instância separada de `SqliteMemoryDatabase`
- Setup/teardown automático por teste
- Sem interferência entre testes

### Cobertura

- Autenticação: registro, login, validação
- Administração: CRUD de usuários, logs
- Segurança: rate limiting, validação de entrada
- Integração: fluxos end-to-end

## Scripts de Administração

Scripts CLI localizados em `scripts/admin/` para operações administrativas:

### Registrar Administrador

```bash
bun admin:register-admin
```

### Registrar Usuário

```bash
bun admin:register-user
```

### Listar Usuários

```bash
bun admin:list-users
```

### Gerenciar Usuários

```bash
bun admin:manage-users
```

### Mostrar Hashes (Operação Sensível)

```bash
bun admin:show-hashes
```

**Atenção**: Esta operação é logada para auditoria.

## Variáveis de Ambiente

- `SESSION_SECRET`: Chave secreta para sessões (obrigatória)
- `NODE_ENV`: Ambiente (development/production)
- `DB_TYPE`: Tipo de database (real/memory)
- `DB_FILENAME`: Caminho do arquivo SQLite
- `ALLOWED_ORIGINS`: Origens permitidas para CORS (produção)

## Referências

- [Bun Documentation](https://bun.com/docs)
- [Express.js](https://expressjs.com/)
- [SQLite](https://www.sqlite.org/)
- [Argon2](https://github.com/P-H-C/phc-winner-argon2)
- [Helmet](https://helmetjs.github.io/)
