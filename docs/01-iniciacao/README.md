# Iniciação

> A fase de iniciação, em gerência de projetos, é o estágio que estabelece as bases para o sucesso do empreendimento. 
> Durante essa etapa, os objetivos definidos, identificando-se suas metas, escopo, partes interessadas (*stakeholders*) e restrições. 
> É o momento em que a viabilidade do projeto é avaliada, analisando-se recursos necessários, riscos potenciais e benefícios esperados.
> Nesta etapa é elaborado o Termo de Abertura do Projeto (TAP).
> Essa fase serve como um alicerce estratégico, proporcionando uma compreensão abrangente do que o projeto busca alcançar e delineando as diretrizes que orientarão as etapas subsequentes. 
> O sucesso na fase de iniciação contribui significativamente para a eficácia do gerenciamento de projetos como um todo.

# Estrutura do Documento

- [Fase de Iniciação](#iniciação)
- [Introdução](#introdução)
  - [Problema](#problema)
  - [Objetivos](#objetivos)
  - [Justificativa](#justificativa)
  - [Critérios de Sucessos](#critérios-de-sucesso)
- [Partes Interessadas](#partes-interessadas)
  - [Identificação das Partes Interessadas](#identificação-das-partes-interessadas)
  - [Avaliação das Partes Interessadas](#avaliação-das-partes-interessadas)
- [Termo de Abertura do Projeto](#termo-de-abertura-do-projeto)
  - [Estimativa de Custo](#estimativa-de-custo)
  - [Estimativa de Prazo](#estimativa-de-prazo)
  - [Escopo Preliminar e Premissas](#escopo-preliminar-e-premissas)
    - [Requisitos Funcionais](#requisitos-funcionais)
    - [Requisitos Não Funcionais](#requisitos-não-funcionais)
    - [Restrições](#restrições)
    - [Contra-Escopo](#contra-escopo)
    - [Condições para início do Projeto](#condições-para-início-do-projeto)
  - [Marcos Agendados e Entregas](#marcos-agendados-e-entregas)
- [Metodologia](#metodologia)
  - [Divisão de Papéis](#divisão-de-papéis)
  - [Ferramentas](#ferramentas)

# Introdução

```diff
+ Tarefa 01:
+ Tema do projeto e lista de Stakeholders
```

## Problema

Atualmente, o consumo de música digital está extremamente fragmentado entre a "audição" e a "interação". Embora serviços de streaming como o Spotify e Apple Music ofereçam acesso a bibliotecas musicais vastas e algoritmos de recomendação eficientes, eles falham em proporcionar um espaço dedicado para o registro crítico e pessoal da jornada musical do utilizador.

Os entusiastas de música enfrentam as seguintes dificuldades:

- **Falta de Catalogação Pessoal:** Não existe uma ferramenta consolidada e popular (semelhante ao Letterboxd para filmes ou Goodreads para livros) que permita aos utilizadores manter um diário de faixas ouvidas, atribuindo notas e registrando opiniões pessoais de forma organizada.

- **Experiência Social Limitada:** As funcionalidades sociais nas plataformas de streaming são muitas vezes secundárias ou pouco intuitivas. É difícil para um utilizador saber o que os seus amigos estão realmente a ouvir e, mais importante, o que eles acham dessas músicas, sem recorrer a redes sociais genéricas (Twitter/Instagram) onde o contexto musical se perde.

- **Descoberta Passiva vs. Ativa:** A descoberta de novas músicas tornou-se um processo passivo, dependente de algoritmos. Falta um ambiente onde a descoberta seja impulsionada ativamente pela curadoria humana e pelas recomendações da comunidade ou círculo de amigos do utilizador.

Em resumo, existe uma lacuna no mercado para uma plataforma que transforme o ato solitário de ouvir música numa experiência de catalogação social e partilha de gostos.

## Objetivos

#### Objetivo Geral

Desenvolver uma plataforma web social integrada com a API do Spotify que permita aos usuários catalogar seu histórico musical, atribuir avaliações críticas e compartilhar descobertas com uma comunidade de ouvintes.

#### Objetivos Específicos

- **Implementar um sistema de diário musical:** Criar uma funcionalidade que permita aos usuários registrar músicas ouvidas, atribuir notas (0-10) e organizar essas avaliações em um perfil pessoal acessível.

- **Facilitar a descoberta social:** Desenvolver perfis públicos pesquisáveis onde usuários podem visualizar e explorar as coleções e avaliações de outros membros da comunidade para descobrir novas músicas.

- **Centralizar a gestão de preferências:** Oferecer uma interface unificada onde o usuário possa visualizar estatísticas básicas de suas avaliações e gerenciar suas faixas favoritas sem depender exclusivamente dos algoritmos de streaming.

- **Garantir a integridade e segurança dos dados:** Implementar um sistema robusto de autenticação e autorização para proteger as contas dos usuários e garantir que apenas o autor possa editar ou excluir suas próprias avaliações.


## Justificativa

A construção do MyTrackList justifica-se pela oportunidade de preencher uma lacuna significativa no ecossistema de consumo musical digital. Enquanto as plataformas de streaming focam na distribuição massiva de conteúdo, existe uma demanda reprimida por ferramentas que permitam a curadoria pessoal e a interação social qualificada em torno da música.

#### Benefícios Esperados

- **Engajamento Cultural:** O projeto promove uma cultura de apreciação ativa da música, incentivando os utilizadores a não apenas consumir, mas a refletir e opinar sobre o que ouvem.

- **Fortalecimento de Comunidade:** Ao facilitar a visualização dos perfis e avaliações de outros utilizadores, a plataforma cria um ambiente propício para a formação de comunidades baseadas em afinidades musicais reais, superando as interações superficiais das redes sociais genéricas.

- **Organização Pessoal:** Para o utilizador individual, o sistema oferece o benefício tangível de organizar a sua "memória musical", permitindo um registo histórico da sua evolução de gostos e descobertas ao longo do tempo.

#### Impacto

O impacto previsto é a criação de um nicho social vibrante onde a descoberta de música é impulsionada por pessoas e não apenas por algoritmos. Para a organização (equipa de projeto), o desenvolvimento deste software demonstra a capacidade técnica de integrar APIs complexas (Spotify), gerir autenticação segura e entregar uma experiência de utilizador (UX) moderna e responsiva, servindo como um portefólio robusto de competências Full Stack.

## Critérios de Sucesso

O êxito do projeto MyTrackList será avaliado com base no cumprimento dos seguintes critérios, que abrangem as dimensões de prazo, qualidade, escopo e satisfação das partes interessadas:

- **Entrega do MVP Funcional:** O sistema deve estar implantado (deploy realizado) e acessível publicamente até o final do cronograma académico, com todas as funcionalidades críticas (Autenticação, Busca Spotify, Avaliação, Perfis) operacionais.

- **Qualidade do Software:** A aplicação deve apresentar estabilidade em ambiente de produção, sem erros críticos ("bugs" impeditivos) nos fluxos principais de uso e com uma interface responsiva que se adapte a dispositivos móveis e desktop.

- **Aderência ao Orçamento:** O projeto deve ser concluído utilizando apenas os recursos gratuitos ou de baixo custo previstos no plano de aquisições (ex: serviços de hospedagem free tier), sem exceder a verba estipulada para a infraestrutura.

- **Satisfação das Partes Interessadas:** Aprovação formal do produto final pelo Professor/Orientador (Cliente), validando que a solução atende aos requisitos pedagógicos e técnicos definidos no início do semestre.

- **Segurança e Conformidade:** O sistema deve garantir a proteção dos dados dos utilizadores (palavras-passe encriptadas) e respeitar os termos de uso da API pública do Spotify.

# Partes Interessadas

A identificação e gestão das partes interessadas (stakeholders) é crucial para o alinhamento de expectativas e o sucesso do projeto. Abaixo, relacionamos os principais envolvidos, suas responsabilidades e níveis de influência.

## Identificação das Partes Interessadas

| Nome            | Posição / Cargo | Papel Projeto | E-mail      | Telefone    |
|-----------------|-----------------|---------------|-------------|-------------|
|Bruna de Paula Anselmi                |Desenvolvedor Front-end + UX/UIDesigner                 |Criar a cara do site e dar vida a ele no navegador (front-end).          |bruanselmii@gmail.com             |(31) 98763-7769             |
|Cauã Diniz Armani                 |Product Owner (PO) + QA/Testador                 |Definir prioridades do produto e garantir sua qualidade com testes.               |cauaarmani@icloud.com            |(31) 99840-0306             |
|David Nunes Ribeiro                 |Scrum Master (SM) + Tech Lead + GP                 |Guiar o time, alinhar processos ágeis e liderar a parte técnica do projeto.               |ddnr03@gmail.com             |(31) 98618-2459            |
|Lucca Pellegrini                 |Desenvolvedor Back-end                 |Construir a lógica e o funcionamento interno do sistema.               |lucca@verticordia.com             |(31) 99222-4189             |
|                 |                 |               |             |             |

## Avaliação das Partes Interessadas

| Nome            | Expectativa no Projeto | Influência    | Importância / Poder | Apoio       | Observações   |
|-----------------|------------------------|---------------|---------------------|-------------|---------------|
|Bruna de Paula Anselmi                 |A expectativa é que o site funcione corretamente e seja inovador.                        |Média               |Média                     |Apoiador             |-               |
|Cauã Diniz Armani                 |Que o site seja divertido, funcional e popular.                        |Alta               |Média                     |Apoiador             |-               |
|David Nunes Ribeiro                 |Que o projeto se torne bastante popular e bastante utilizável, igual o Letterboxd.                        |Alta               |Alta                     |Apoiador             |Sempre gostei de sites como Letterboxd e MyAnimeList, porém sempre senti a falta de um site para avaliar minhas músicas.               |
| Lucca Pellegrini                |Que tenha um lucro extraordinário e que os usuários gostem e preencham uma lacuna no mercado.                        |Baixa               |Alta                     |Apoiador             |-               |
|                 |                        |               |                     |             |               |
                

```diff
+ Tarefa 01
+ Fim da seção a ser atualizada.
```


-----


# Termo de Abertura do Projeto

```diff
+ Tarefa 02
+ Termo de Abertura do Projeto
```

## Estimativa de Custo

A avaliação da viabilidade econômica do projeto MyTrackList baseia-se na análise detalhada dos investimentos necessários para o seu desenvolvimento e operação inicial. A estimativa de custos considera os recursos humanos, a infraestrutura tecnológica e os serviços de apoio, totalizando um investimento previsto de **R$ 18.100,00** para um esforço de **235 horas**.

A alocação de recursos reflete a natureza de desenvolvimento de software, onde o capital intelectual representa a maior parcela do orçamento (aproximadamente 76%), seguido pelos custos de hardware e infraestrutura. A utilização da API do Spotify como recurso gratuito é um fator chave para a viabilidade operacional do MVP.

A composição destes custos está detalhada abaixo:

| Item de Custo | Descrição | Qtd. horas | Valor / hora | Valor total |
| :--- | :--- | :---: | :---: | :---: |
| **Recursos Humanos** | Scrum Master (SM) + Tech Lead + GP | 70 | R$ 70,00 | R$ 4.900,00 |
| | Product Owner (PO) + QA/Testador | 40 | R$ 60,00 | R$ 2.400,00 |
| | Desenvolvedor Front-end + UX/UI Designer | 70 | R$ 50,00 | R$ 3.500,00 |
| | Desenvolvedor Back-end | 50 | R$ 60,00 | R$ 3.000,00 |
| **Hardware** | Computadores, periféricos | - | - | R$ 3.000,00 |
| **Serviços de Rede** | Rede e serviços de hospedagem | - | - | R$ 800,00 |
| **Hospedagem e Nuvem** | (Incluído em serviços de rede acima) | - | - | - |
| **Software de terceiros** | API Spotify | - | - | R$ 0,00 |
| **Serviços e treinamento** | Cursos, workshops, documentação | 5 | R$ 100,00 | R$ 500,00 |
| **Total Geral** | | **235** | **R$ 230,00** | **R$ 18.100,00** |

#### 1. Recursos Humanos (Desenvolvimento)
A maior parcela do orçamento é destinada ao capital intelectual, refletindo a natureza de projetos de software onde o esforço de desenvolvimento é o principal ativo.

- **Investimento:** R$ 13.800,00 (Aprox. 76% do total).

- **Detalhamento:**

  - Gestão e Liderança Técnica (Scrum Master/GP): R$ 4.900,00.

  - Front-end e UX/UI: R$ 3.500,00.

  - Back-end: R$ 3.000,00.

  - Qualidade e Produto (PO/QA): R$ 2.400,00.

#### 2. Infraestrutura e Hardware
Custos associados aos equipamentos necessários para os desenvolvedores e à infraestrutura de rede para hospedar e testar a aplicação.

- **Investimento:** R$ 3.800,00.

- **Detalhamento:**

  - Hardware (Computadores e periféricos): R$ 3.000,00.

  - Rede e serviços de hospedagem: R$ 800,00.

#### 3. Capacitação
Investimento na qualificação da equipe através de cursos, workshops ou documentação técnica necessária.

- **Investimento:** R$ 500,00.

#### 4. Recursos Gratuitos (Economia de Custos) 
Um ponto positivo para a viabilidade do projeto é a utilização da API do Spotify. Sendo um software de terceiros essencial para o funcionamento do sistema, o seu custo de utilização é **R$ 0,00** (considerando o uso dentro dos limites gratuitos para desenvolvedores), o que reduz significativamente o custo operacional inicial.

#### Conclusão da Viabilidade
A estimativa aponta para um projeto de baixo custo relativo para o desenvolvimento de um novo produto digital (MVP). A concentração de custos em recursos humanos indica que o sucesso do projeto depende diretamente da produtividade e eficiência da equipe técnica, enquanto a infraestrutura enxuta e o uso de APIs gratuitas contribuem para um retorno sobre o investimento (ROI) potencialmente mais rápido após o lançamento.

## Estimativa de Prazo

A estimativa de prazo do projeto MyTrackList foi estabelecida para orientar tanto o cliente quanto a equipe de desenvolvimento sobre o tempo estritamente necessário para a conclusão de todo o escopo. Esta projeção permite a criação de um cronograma realista e viável, fundamentando o planejamento adequado das Sprints, a alocação eficiente dos recursos de desenvolvimento e a antecipação de eventuais desafios técnicos. Esta definição precisa guia a execução do projeto, alinhando expectativas e estabelecendo metas alcançáveis para a entrega do MVP.

* **Prazo previsto (em horas):** 204 horas
* **Data de início:** 08 / 09 / 2025
* **Data de término:** 12 / 12 / 2025

## Escopo Preliminar e Premissas

O escopo do MyTrackList foca na criação de uma plataforma web social para catalogação musical. O projeto baseia-se na premissa de que a API do Spotify permanecerá gratuita e acessível para desenvolvedores e que a equipe utilizará exclusivamente tecnologias de código aberto e serviços de hospedagem gratuitos.

## Declaração de Escopo

### Requisitos Funcionais

A tabela a seguir apresenta os requisitos funcionais do projeto. 

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|-------|
|RF-001| Permitir que o usuário realize o cadastro na plataforma (Username e Senha) | ALTA |
|RF-002| Permitir que o usuário realize login (Autenticação) | ALTA |
|RF-003| Permitir que o usuário realize logout da sessão | ALTA |
|RF-004| Permitir a busca de músicas, álbuns e artistas através da integração com a API do Spotify | ALTA |
|RF-005| Exibir detalhes da música (capa, nome, artista, álbum) selecionada | ALTA |
|RF-006| Permitir que o usuário logado avalie uma música com uma nota (0 a 10) | ALTA |
|RF-007| Permitir que o usuário visualize a lista de suas próprias avaliações (Meu Perfil) | ALTA |
|RF-008| Permitir a pesquisa de outros usuários cadastrados na plataforma | MÉDIA |
|RF-009| Permitir a visualização do perfil público e avaliações de outros usuários | ALTA |
|RF-010| Exibir feedback visual de carregamento (loading) e erros durante as operações | MÉDIA |IA |

### Requisitos Não Funcionais

A tabela a seguir apresenta os requisitos não funcionais do projeto. 

|ID     | Descrição do Requisito                                            |Prioridade |
|-------|-------------------------------------------------------------------|-----------|
|RNF-001| O sistema deve ser responsivo, adaptando-se a dispositivos móveis e desktops | ALTA | 
|RNF-002| As senhas dos usuários devem ser armazenadas de forma criptografada (Hash) | ALTA |
|RNF-003| O sistema deve utilizar a API do Spotify para obter metadados, respeitando os limites de requisição | ALTA |
|RNF-004| A interface deve ser intuitiva, seguindo padrões de UX/UI modernos (Material Design) | MÉDIA |
|RNF-005| O sistema deve ser desenvolvido utilizando a stack Node.js (Backend) e React (Frontend) | ALTA |


### Restrições

A tabela a seguir apresenta as restrições do projeto. 

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|-------|
|RE-001| O projeto deve ser concluído rigorosamente dentro do cronograma acadêmico (até 14/01/2026) | ALTA | 
|RE-002| A equipe é limitada aos 4 alunos integrantes, sem contratação externa | ALTA |
|RE-003| O projeto deve utilizar apenas tecnologias e serviços de hospedagem gratuitos (Free Tier) | ALTA |
|RE-004| Dependência crítica da disponibilidade e regras de uso da API pública do Spotify | ALTA |
|RE-005| O banco de dados deve ser SQLite (ou compatível) para facilitar a portabilidade | MÉDIA |


### Contra-Escopo

A tabela a seguir apresenta as atividades que não serão executadas no projeto

|ID    | Descrição do Contra-Escopo          | 
|------|-------------------------------------|
|CE-001| Reprodução de músicas (streaming de áudio) diretamente na plataforma |
|CE-002| Desenvolvimento de aplicativo móvel nativo (iOS ou Android) |
|CE-003| Integração com outros serviços de streaming (Apple Music, Deezer, Tidal) |
|CE-004| Funcionalidades de chat ou mensagens diretas em tempo real entre usuários |
|CE-005| Algoritmos complexos de recomendação automática de músicas baseada em IA |
|CE-006| Download de faixas para ouvir offline |

### Condições para início do Projeto

A tabela a seguir, apresente as condições para que o projeto seja iniciado.

|ID    | Descrição de Condições para Início do Projeto    | 
|------|--------------------------------------------------|
|CI-001| Obtenção das credenciais de acesso (Client ID/Secret) da API do Spotify para desenvolvedores |
|CI-002| Definição e configuração do ambiente de desenvolvimento (Monorepo, Git) |
|CI-003| Aprovação do estudo de viabilidade técnica pela equipe |
|CI-004| Disponibilidade dos membros da equipe e acesso ao hardware necessário |

## Marcos Agendados e Entregas

A tabela a seguir, identifique os marcos do projeto e os entregáveis previstos (requisitos).

|ID   | Marco do Projeto                                                  | Entregáveis Previstos | Data Prevista |
|-----|-------------------------------------------------------------------|-----------------------|---------------|
|M-1  | **Fim da Sprint 0** (Fundação) | Fundação técnica do projeto (Setup, Git, BD) e documentação inicial | 31/10/2025 |
|M-2  | **Fim da Sprint 1** (Autenticação) | Sistema de Autenticação (Login/Cadastro) funcional e layout base | 20/11/2025 |
|M-3  | **Fim da Sprint 2** (Integração Spotify) | Integração com Spotify concluída (Busca e Detalhes de músicas) | 10/12/2025 |
|M-4  | **Fim da Sprint 3** (Avaliações/Perfil Pessoal) | Funcionalidade de Avaliações e Perfil Pessoal implementados | 30/12/2025 |
|M-5  | **Fim da Sprint 4** (Finalização/Deploy) | Perfis Públicos, revisão final, deploy em produção e encerramento | 14/01/2026 |

```diff
+ Tarefa 02
+ Fim da seção a ser atualizada.
```

-----


# Metodologia
```diff
+ Tarefa 03:
+ Metodologia do Projeto
```
A metodologia adotada pelo grupo foi baseada em princípios ágeis, utilizando o framework Scrum para gestão do processo de desenvolvimento. O projeto foi dividido em ciclos de trabalho (Sprints), permitindo entregas incrementais e adaptação contínua aos requisitos.

Para a organização e distribuição das tarefas, a equipe utilizou o GitHub Projects como ferramenta de Kanban. O quadro foi estruturado com as colunas:

- **Backlog:** Lista de todas as tarefas e requisitos do projeto.

- **Ready:** Tarefas priorizadas e prontas para serem iniciadas na Sprint atual.

- **In Progress:**Tarefas que estão sendo desenvolvidas no momento.

- **In Review:** Tarefas concluídas que aguardam revisão de código (Pull Request) ou testes.

- **Done:** Tarefas finalizadas e aprovadas.

O acompanhamento do progresso foi realizado através de comunicações assíncronas (WhatsApp/Discord) e revisões semanais ao fim de cada Sprint para alinhar o cronograma.

## Divisão de Papéis

A equipe foi organizada de forma multidisciplinar, com cada membro assumindo responsabilidades específicas, embora todos tenham colaborado no desenvolvimento geral:

- **David Nunes Ribeiro (Gerente do Projeto /Scrum Master / Tech Lead):** Responsável pela gestão do projeto, garantia da qualidade do código, configuração da infraestrutura (DevOps) e liderança técnica.

- **Cauã Diniz Armani (Product Owner / QA):** Responsável por definir as prioridades do produto (backlog), validar os requisitos e realizar os testes de qualidade para garantir que as funcionalidades atendam às expectativas.

- **Bruna de Paula Anselmi (Front-end / UX/UI):** Responsável pelo design das interfaces, experiência do usuário e implementação dos componentes visuais utilizando React e Material UI.

- **Lucca Mendes Alves Pellegrini (Back-end):** Responsável pela arquitetura do servidor, criação da API, gestão do banco de dados e regras de negócio.

## Ferramentas

As ferramentas empregadas no projeto foram selecionadas visando eficiência, gratuidade e facilidade de integração. Abaixo estão listadas as principais ferramentas utilizadas:

| Ambiente | Plataforma | Link de Acesso | Justificativa | 
| ----- | ----- | ----- | ----- | 
| **Quadro Kanban** | GitHub Projects | [Acessar Kanban](https://github.com/orgs/ICEI-PUCMinas-PSG-SI-TI/projects/162) | Centralização da gestão de tarefas integrada ao repositório de código. | 
| **Repositório de Código** | GitHub | [Acessar Repositório](https://github.com/ICEI-PUCMinas-PSG-SI-TI/projeto-gps-mytracklist) | Controle de versão distribuído e colaboração via Pull Requests. | 
| **Editor de Código** | VS Code | N/A | IDE leve e extensível, padrão da indústria para desenvolvimento JS/TS. | 
| **Comunicação** | Discord / WhatsApp | N/A | Canais para comunicação rápida (assíncrona) e reuniões de alinhamento. | 
| **Hospedagem (Back-end)** | Render | N/A | Plataforma de nuvem (PaaS) com suporte nativo a Node.js e deploy contínuo. | 
| **Hospedagem (Front-end)** | Vercel | N/A | Plataforma otimizada para frameworks frontend como React/Vite. | 
| **Banco de Dados** | SQLite | N/A | Banco de dados leve e portátil, ideal para o escopo do projeto e fácil configuração. | 
| **Gestão de BD** | DB Browser for SQLite | N/A | Ferramenta visual para criar tabelas e verificar a integridade dos dados. |

```diff
+ Tarefa 03:
+ Fim da seção a ser atualizada.
```

----
