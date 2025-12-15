# Planejamento

> A fase de planejamento na gerência de projetos é um momento onde os detalhes do projeto são minuciosamente definidos para garantir uma execução bem-sucedida.
> Durante essa etapa, os gerentes de projeto e suas equipes elaboram um plano abrangente que aborda aspectos como cronograma, orçamento, recursos necessários, riscos identificados e métodos de controle.
> O objetivo é criar uma estrutura que guiará as atividades ao longo do projeto, garantindo que metas sejam alcançadas de maneira eficiente.
> O plano de projeto não apenas define as tarefas específicas e suas interdependências, mas também estabelece critérios de sucesso e indicadores de desempenho.
> A qualidade do planejamento influencia diretamente a capacidade da equipe em cumprir prazos, alocar recursos eficientemente e lidar com desafios que possam surgir durante a execução.

# Estrutura do Documento

- [Fase de Planejamento](#planejamento)
- [Escopo do Projeto](#escopo-do-projeto)
- [Estrutura Analítica do Projeto](#estrutura-analítica-do-projeto)
- [Matriz de Responsabilidades](#matriz-de-responsabilidades)
- [Cronograma do Projeto](#cronograma-do-projeto)
- [Orçamento do Projeto](#orçamento-do-projeto)
- [Planos de Gerenciamento](#planos-de-gerenciamento)
  - [Plano de Qualidade](#plano-de-qualidade)
  - [Plano de Aquisição](#plano-de-aquisição)
  - [Plano de Comunicação](#plano-de-comunicação)
  - [Plano de Riscos](#plano-de-riscos)

-----
```diff
+ Tarefa 04:
+ Escopo e Estrutura Analítica do Projeto
```

# Escopo do Projeto

## Declaração de Escopo

- **Projeto:** MyTrackList
- **Gerente do Projeto:** David Nunes Ribeiro

### Objetivo do Projeto
Avaliar e compartilhar gostos musicais.

### Escopo do Projeto/Produto
O projeto está dividido em sprints, cada uma com objetivos específicos:

- **Sprint 0 - Configuração e Fundação:** Preparar todo o ambiente de desenvolvimento, incluindo a estrutura do monorepo, inicialização dos projetos de back-end (Node.js/Express) e front-end (React/Vite), e configuração da biblioteca de componentes visuais (MUI).
  - Estudo de viabilidade técnica
  - Levantamento de requisitos
  - Definição dos stakeholders
  - Inicialização e configuração do projeto
  - Termo de abertura

- **Sprint 1 - Autenticação de Usuários:** Implementar um sistema completo de cadastro e login, permitindo que usuários acessem a plataforma de forma segura.
  - Criação da estrutura e rotas básicas do desenvolvimento backend
  - Criação das interfaces de cadastro e autenticação de usuários
  - Definição das paletas de cores, logo e padrão de estilização do site

- **Sprint 2 - Integração com Spotify e Busca:** Integrar a API do Spotify para permitir a busca de músicas na plataforma, com páginas de resultado e de detalhes para cada faixa.
  - Integração com a API do Spotify
  - Criação da página de resultados da busca
  - Criação da página de detalhes da música

- **Sprint 3 - Listas e Avaliações:** Desenvolver a funcionalidade central do MVP, onde usuários logados podem adicionar músicas às suas listas, atribuir uma nota e visualizar sua coleção em uma página de perfil pessoal.
  - Desenvolvimento backend para que o usuário consiga fazer suas avaliações
  - Criação do componente de avaliação que o usuário irá fazer no frontend
  - Criação da página do perfil do usuário

- **Sprint 4 - Perfis Públicos e Finalização:** Implementar a visualização de perfis de outros usuários e preparar a aplicação para a implantação (deploy), realizando testes e revisões finais.
  - Criação de rotas para busca de perfil
  - Criação da página do perfil público
  - Garantir que o frontend exiba para a pessoa que está acessando outro perfil apenas o necessário
  - Fazer revisão de usabilidade e design
  - Preparar frontend e backend para o deploy
  - Realizar os testes finais
  - Treinamento de utilização junto com um manual de instruções

### Limites do Projeto
- Reprodução de músicas diretamente na plataforma.
- Desenvolvimento de um aplicativo móvel nativo (iOS/Android).
- Integração com outros serviços de streaming (Apple Music, Deezer, etc.).
- Funcionalidades sociais avançadas como chat não serão adicionadas.
- Algoritmos de recomendação de músicas.

### Restrições
- **Prazo:** O projeto deve ser concluído dentro do cronograma acadêmico.
- **Recursos:** A equipe é limitada aos alunos integrantes do projeto, utilizando apenas tecnologias e serviços gratuitos.
- **Dependência Externa:** A funcionalidade de busca de músicas depende criticamente da disponibilidade e das regras da API pública do Spotify.

### Premissas
- O projeto atendeu o estudo de viabilidade técnica.
- A equipe possui ou irá adquirir o conhecimento técnico necessário na stack definida.
- A API do Spotify para desenvolvedores permanecerá acessível e gratuita para os propósitos do projeto.
- Os membros da equipe têm acesso ao hardware e software necessários para o desenvolvimento.

### Marcos Agendados e Entregas
| Id. do Marco | Entregáveis Previstos |
|--------------|-----------------------|
| 1. Fim da Sprint 0 | Fundação técnica do projeto concluída. |
| 2. Fim da Sprint 1 | Sistema de autenticação funcional. |
| 3. Fim da Sprint 3 | Funcionalidade de avaliação e listas. |
| 4. Fim da Sprint 4 | MVP completo. |


# Estrutura Analítica do Projeto

A Estrutura Analítica do Projeto (EAP) para o MyTrackList foi elaborada para
decompor o escopo em componentes gerenciáveis, organizados hierarquicamente
desde o nível do projeto geral até as tarefas específicas de cada sprint. Essa
decomposição facilita o planejamento detalhado, a atribuição de
responsabilidades e o monitoramento do progresso, assegurando que todas as
atividades estejam alinhadas com os objetivos descritos acima. Como ilustrado
na imagem abaixo, a EAP inclui elementos como configuração inicial,
desenvolvimento de funcionalidades e finalização.

![Estrutura Analítica do Projeto](images/exemplo_wbs.png)

<!--
### Documento Editável

> Você deve atualiza o seguinte link (ou link correspondente), como o arquivo editável de geração da WBS:
- [Estrutura Analítica do Projeto - Editável](artefatos/estrutura_analitica_projeto.wbs)
-->

```diff
+ Tarefa 04:
+ Fim da seção a ser atualizada.
```

-----
```diff
+ Tarefa 05:
+ Matriz de Responsabilidades (RACI)
```

# Matriz de Responsabilidades

## Matriz RACI


 | Atividade                                                                                       | Gerente | Equipe gerenciada | Patrocinador |
 | ----------------------------------------------------------------------------------------------- | ------- | ----------------- | ------------ |
 | Iniciar o projeto                                                                               | R       | C                 | I            |
 | Definir o escopo                                                                                | R       | I                 | A            |
 | Elaborar a WBS                                                                                  | R       | I                 | I            |
 | Elaborar o cronograma                                                                           | R       | C                 | C            |
 | Planejar os riscos                                                                              | R       | C                 | I            |
 | Planejar a qualidade                                                                            | R       | C                 | C            |
 | Planejar o projeto                                                                              | R       | C                 | I            |
 | Monitorar o projeto                                                                             | R       | C                 | I            |
 | Encerrar o projeto                                                                              | A       | R                 | A            |
 | Realizar garantia da qualidade                                                                  | A       | R                 | C            |
 | Realizar controle da qualidade                                                                  | A       | R                 | I            |
 | Estudo de viabilidade                                                                           | R       | C                 | I            |
 | Levantamento de requisitos                                                                      | R       | C                 | C            |
 | Definição de Stakeholders                                                                       | R       | I                 | I            |
 | Criação das interfaces de cadastro e autenticação dos usuários                                  | C       | R                 | I            |
 | Criação da estrutura e rotas básicas do backend                                                 | C       | R                 | I            |
 | Definição das paletas de cores, logo e padrão de estilização do site                            | C       | R                 | A            |
 | Integração com a API do Spotify                                                                 | C       | R                 | I            |
 | Criação da página de resultados da busca                                                        | C       | R                 | I            |
 | Criação da página de detalhes da música                                                         | C       | R                 | I            |
 | Desenvolvimento backend para avaliações dos usuários                                            | C       | R                 | I            |
 | Criação do componente de avaliação no frontend                                                  | C       | R                 | I            |
 | Criação da página de perfil do usuário                                                          | C       | R                 | I            |
 | Criação de rotas para busca de perfil                                                           | C       | R                 | I            |
 | Criação da página do perfil público                                                             | C       | R                 | I            |
 | Garantir que o frontend exiba para a pessoa que está acessando outro perfil apenas o necessário | C       | R                 | I            |
 | Fazer revisão de usabilidade e design                                                           | A       | R                 | A            |
 | Preparar frontend e backend para o deploy                                                       | R       | R                 | I            |
 | Realizar os testes finais                                                                       | A       | R                 | C            |
 | Treinamento de utilização junto com um manual de instruções                                     | C       | R                 | A            |


## Recursos Humanos

 | Nome                   | Papel                   | Nível de Proficiência | Treimentos Necessários                                          |
 | ----                   | -----                   | --------------------- | ----------------------                                          |
 | Cauã Diniz Armani      | Product Owner           | Suficiente            | Aprender a escrever "Histórias de Usuário"                      |
 | Cauã Diniz Armani      | QA/Testador             | Baixo                 | Aprender a usar as "Ferramentas de desenvolvedor" no navegador" |
 | Bruna de Paula Anselmi | Desenvolvedor Front-end | Baixo                 | DIW                                                             |
 | Bruna de Paula Anselmi | UX/UI Designer          | Suficiente            | Aprender o avançado do Figma                                    |
 | Davd Nunes Ribeiro     | Scrum Master            | Bom                   | Arquitetura de Software e Padrões de Projeto                    |
 | Davd Nunes Ribeiro     | Tech Lead               | Bom                   | Arquitetura de Software e Padrões de Projeto                    |
 | Davd Nunes Ribeiro     | GP                      | Suficiente            | Habilidades de Liderança e Influência                           |
 | Lucca Pellegrini       | Desenvolvedor Back-end  | Suficiente            | Treinamento de TypeScript                                       |

![Matriz RACI (página 1)](images/raci-1.png)
![Matriz RACI (página 2)](images/raci-2.png)
![Matriz RACI (página 2)](images/raci-3.png)

<!--
### Documento Editável

> Você deve atualiza o seguinte link (ou link correspondente), como o arquivo editável da Matriz RACI:
- [Matriz de Responsabilidades (RACI) - Editável](artefatos/matriz-raci.docx)
-->

```diff
+ Tarefa 05:
+ Fim da seção a ser atualizada.
```

-----
```diff
+ Tarefa 07:
+ Cronograma do Projeto
```

# Cronograma do Projeto

O cronograma do projeto MyTrackList abrange um período total de 90 dias úteis,
iniciando em 17/10/2025 e concluindo em 14/01/2026. Ele é organizado em cinco
sprints: Sprint 0 (configuração e fundação, 15 dias), Sprint 1 (autenticação de
usuários, 20 dias), Sprint 2 (integração com Spotify e busca, 20 dias), Sprint
3 (listas e avaliações, 20 dias) e Sprint 4 (perfis públicos e finalização, 15
dias). As atividades incluem desenvolvimento de backend e frontend, integração
de APIs, testes finais e deploy, com reuniões de planejamento semanais para
cada sprint. Dependências entre tarefas são consideradas para garantir um fluxo
eficiente, e o cronograma visa otimizar recursos e antecipar possíveis atrasos.

![Cronograma (página 1)](images/cronograma-1.png)
![Cronograma (página 2)](images/cronograma-2.png)
![Cronograma (página 3)](images/cronograma-3.png)
![Cronograma (página 4)](images/cronograma-4.png)
![Cronograma (página 5)](images/cronograma-5.png)
![Cronograma (página 6)](images/cronograma-6.png)

### Documento Editável

- [Cronograma do Projeto - Editável](artefatos/cronograma.pod)

```diff
+ Tarefa 07:
+ Fim da seção a ser atualizada.
```

-----
```diff
+ Tarefa 08:
+ Orçamento do Projeto
```

# Orçamento do Projeto

![Orçamento (parte 1)](images/orçamento1.webp)
![Orçamento (parte 2)](images/orçamento2.webp)
![Orçamento (parte 3)](images/orçamento3.webp)

### Documento Editável

- [Cronograma e Orçamento do Projeto - Editável](artefatos/cronograma_orcamento.pod)

```diff
+ Tarefa 08:
+ Fim da seção a ser atualizada.
```

# Planos de Gerenciamento

> Os planos de gerenciamento do projetos consolidam as diretrizes e estratégias para a execução bem-sucedida de um empreendimento.
> Ele abrange diversos aspectos, como escopo, cronograma, custos, riscos, qualidade, recursos humanos, comunicação e aquisições, proporcionando uma visão abrangente e integrada do projeto.
> Este plano funciona como um guia mestre que orienta a equipe de projeto e as partes interessadas ao longo do ciclo de vida do projeto, estabelecendo expectativas, responsabilidades e processos.
> Além disso, serve como um instrumento de comunicação, alinhando as expectativas entre os membros da equipe e as partes interessadas, mitigando riscos e fornecendo uma estrutura sólida para a tomada de decisões.

```diff
+ Tarefa 09:
+ Checklist de Qualidade
```

## Plano de Qualidade

O nosso Plano de Qualidade visa à garantia da conformidade e da qualidade dos
artefatos por meio de verificações técnicas, testes funcionais e revisões.
Inclui artefatos como Pull Requests (revisão técnica), componentes React
(revisão de apresentação) e endpoints de API (teste funcional), com métricas
como resolução de 100% dos comentários de revisão e conformidade com fluxos
esperados. Padrões adotados incluem TypeScript Strict Mode, ESLint,
Conventional Commits e Gitflow. Atividades ocorrem via GitHub PRs, ambientes
locais de desenvolvimento e ferramentas como DB Browser. Metodologias seguem
PMBOK: Prevenção (ferramentas estáticas e planejamento), Inspeção (revisões via
PR) e Teste Funcional (verificação manual antes do commit).

> O Plano de Qualidade auxilia a garantir que as entregas do projeto atendam aos padrões de qualidade definidos.
> Este plano abrange atividades como definição de padrões, procedimentos de garantia de qualidade, critérios de aceitação e processos de monitoramento e controle da qualidade ao longo do ciclo de vida do projeto.
> Ao identificar metas de qualidade, responsabilidades da equipe, e métricas de avaliação, o Plano de Qualidade busca assegurar que o projeto atinja ou exceda as expectativas dos stakeholders em termos de desempenho e conformidade.
> A adoção de políticas de qualidade auxilia a mitigar riscos, promove a confiança nas entregas do projeto e, por fim, aumenta a probabilidade de sucesso do empreendimento.

> Referência - Conceitual
> * https://www.researchgate.net/publication/230636169_Software_Quality_Assurance

> Normas de Qualidade:
> * https://repositorium.uminho.pt/bitstream/1822/27266/1/Tese_MEI_PG19676_Juliana%20Oliveira.pdf
> * https://cin.ufpe.br/~processos/TAES3/Livro/00-LIVRO/07-Normas%20ISO%20e%20Qualidade%20de%20Software-v6_CORRIGIDO.pdf

> Métricas de software:
> * https://repositorio.unicamp.br/Busca/Download?codigoArquivo=489087
> * https://lume.ufrgs.br/bitstream/handle/10183/66095/000870909.pdf?sequence=1
> * https://www.computerweekly.com/br/tip/23-metricas-de-desenvolvimento-de-software-que-devem-ser-monitoradas

> Processos de Garantia da Qualidade de Software
> * https://ceur-ws.org/Vol-3200/paper22.pdf
> * https://citeseerx.ist.psu.edu/document?repid=rep1&type=pdf&doi=d6bd60206282a2d4449e414e81a703612ef78a0c
> * https://www.testbytes.net/blog/quality-assurance-process-methodology/
> * https://www.projectmanager.com/blog/quality-assurance-and-testing

> Você pode utilizar como referência o seguinte documento:
> [Checklist de Qualidade](artefatos/checklist_qualidade.docx)


![Checklist de Qualidade (página 1)](images/checklist_de_qualidade-1.png)
![Checklist de Qualidade (página 2)](images/checklist_de_qualidade-2.png)
![Checklist de Qualidade (página 2)](images/checklist_de_qualidade-2.png)

### Artefatos a serem verificados

| Artefato   | Tipo Verif. | Data        | Responsável | Métrica     | Data Correção | Ação Não Conform. | Resp. Avaliação | Resp. Correção |
|------------|-------------|-------------|-------------|-------------|---------------|-------------------|-----------------|----------------|
|            |             |             |             |             |               |                   |                 |                |
|            |             |             |             |             |               |                   |                 |                |
|            |             |             |             |             |               |                   |                 |                |
|            |             |             |             |             |               |                   |                 |                |
|            |             |             |             |             |               |                   |                 |                |
|            |             |             |             |             |               |                   |                 |                |

### Padrões e Normas Utilizadas

| Nome       | Descrição   |
|------------|-------------|
|            |             |
|            |             |
|            |             |
|            |             |
|            |             |

### Ambiente das Atividades de Qualidade

| Ambiente   | Descrição   |
|------------|-------------|
|            |             |
|            |             |
|            |             |
|            |             |

### Equipe de Qualidade

| Nome       | Responsabilidade |
|------------|------------------|
|            |                  |
|            |                  |
|            |                  |
|            |                  |
|            |                  |

### Metodologias de Qualidade Utilizadas

| Nome       | Descrição   |
|------------|-------------|
|            |             |
|            |             |
|            |             |

```diff
+ Tarefa 09:
+ Fim da seção a ser atualizada.
```

```diff
+ Tarefa 10:
+ Especificação de Produto para Aquisição
```

## Plano de Aquisição

> O Plano de Aquisições define o processo relacionado à aquisição de bens e serviços necessários para a execução do projeto.
> Este plano abrange a identificação de necessidades, a seleção de fornecedores, a elaboração de contratos, e a gestão do relacionamento com os fornecedores durante do ciclo de vida do projeto.
> O Plano de Aquisições visa garantir a aquisição eficiente e eficaz dos recursos necessários, minimizando riscos e custos.
> Além disso, ele proporciona transparência nas relações com fornecedores, promovendo a conformidade com os prazos estabelecidos e padrões de qualidade.

### Documento Editável

> Você deve atualiza o seguinte link (ou link correspondente), como o arquivo editável de geração da WBS:
- [Especificação Produto Aquisição - Editável](artefatos/aquisicao_produtos.docx)


```diff
+ Tarefa 10:
+ Fim da seção a ser atualizada.
```

```diff
+ Tarefa 11:
+ Plano de Comunicação
```

## Plano de Comunicação

...... DESCREVA SUCINTAMENTE O PLANO DE COMUNICAÇÃO UTILIZADO NO PROJETO ......

> O Plano de Comunicação estabelece estratégias e diretrizes para facilitar a troca de informações entre os membros da equipe e as partes interessadas.
> Este plano abrange aspectos como os meios de comunicação, a frequência das atualizações, os canais de distribuição de informações e os responsáveis pela comunicação.
> Uma comunicação eficiente não apenas previne mal-entendidos e conflitos, mas também fortalece o engajamento da equipe e o apoio das partes interessadas.
>
> Você pode utilizar como referência o seguinte documento:
- [Plano de Gerenciamento de Comunicação - Editável](artefatos/plano_comunicacao.docx)

### Plano de Comunicação do Projeto

| Entregável                         | Público Alvo | Met. Comunicação | Frequência  | Responsável |
|------------------------------------|--------------|------------------|-------------|-------------|
| Ata de reunião                     |              |                  |             |             |
| Declaração de escopo               |              |                  |             |             |
| WBS                                |              |                  |             |             |
| Dicionário da WBS                  |              |                  |             |             |
| Cronograma                         |              |                  |             |             |
| Lista de Riscos                    |              |                  |             |             |
| Plano de qualidade                 |              |                  |             |             |
| Plano de projeto                   |              |                  |             |             |
| Relatório de Progresso             |              |                  |             |             |
| Relatório de Aderência ao Processo |              |                  |             |             |
| Checklists de Inspeção             |              |                  |             |             |
|                                    |              |                  |             |             |
|                                    |              |                  |             |             |
|                                    |              |                  |             |             |

> Legenda:
> - Público: a quem se destina a comunicação.
> - Método de Comunicação: e_mail, reunião presencial, reunião virtual, etc.
> - Freqüência: diária, semanal, quinzenal, mensal, etc.
> - Responsável: pessoa responsável pela comunicação.

### Plano de Gerência de Comunicação

> Indique:
> - Ferramentas utilizadas no projeto - adicionar link de acesso às ferramentas
> - Papéis: responsáveis pelas correspondentes no projeto
> - Princípios gerais: indica quais princípios serão adotados no plano de comunicação, como clareza, objetividade, impessoalidade, imparcialidade e cordialidade. Detalhar.
>
> Plano de Gerência de Configuração: definir, em linhas gerais, como (ferramenta) serão controladas e distribuídas as versões e se haverá algum controle de responsabilidades.

- Ferramentas utilizadas:
- - [Ferramenta 01](https://pucminas.br)
  - [Ferramenta 02](https://pucminas.br)
  - [Ferramenta 03](https://pucminas.br)
- Papéis:
- - ...
  - ...
  - ...
- Princípios gerais
- - ...
  - ...
  - ...
  - ...

```diff
+ Tarefa 11:
+ Fim da seção a ser atualizada.
```

```diff
+ Tarefa 12:
+ Riscos do Projeto
```

## Plano de Riscos

......  COLOQUE AQUI O SEU TEXTO ......


> O plano de riscos busca antecipar, avaliar e mitigar os desafios potenciais que podem surgir ao longo do projeto.
> Este documento estratégico oferece uma visão global dos riscos, categorizando-os e delineando estratégias para lidar com cada uma das possíveis adversidades.
> Inicialmente, é realizada a identificação detalhada dos riscos, abrangendo desde ameaças imprevistas até oportunidades que podem ser exploradas.
> Uma vez catalogados, os riscos são avaliados quanto à sua probabilidade de ocorrência e impacto, permitindo a priorização e foco em áreas críticas.
>
> O plano de riscos não apenas destaca os perigos em potencial, mas também estabelece respostas e estratégias de contingência.
> Isso inclui a definição de ações preventivas para mitigar riscos antes que se materializem, bem como estratégias de mitigação para minimizar seu impacto se ocorrerem.
> Além disso, a identificação de pontos de monitoramento contínuo ao longo do projeto permite uma resposta ágil às mudanças nas condições do ambiente.
>
> Você pode utilizar como referência o seguinte documento:
- [Plano de Gerenciamento de Riscos - Editável](artefatos/plano_riscos.xls)

| Categoria do Risco  | Descrição do Risco | Impacto       | Risco         | Medidas de Prevenção (Contramedidas) | Medidas de Contingência (Mitigação) |
|---------------------|--------------------|---------------|---------------|--------------------------------------|-------------------------------------|
|                     |                    |               |               |                                      |                                     |
|                     |                    |               |               |                                      |                                     |
|                     |                    |               |               |                                      |                                     |
|                     |                    |               |               |                                      |                                     |
|                     |                    |               |               |                                      |                                     |
|                     |                    |               |               |                                      |                                     |
|                     |                    |               |               |                                      |                                     |
|                     |                    |               |               |                                      |                                     |
|                     |                    |               |               |                                      |                                     |
|                     |                    |               |               |                                      |                                     |

> Indique:
> Categoria do Risco: *ex.: Cliente, Cronograma, Orçamento, Aquisição de produtos, etc*
> Descrição do Risco: *ex.: Cliente não aparenta ter muito interesse no projeto*
> Impacto: *Baixo / Médio / Alto*
> Risco: *Baixo / Médio / Alto*
> Medidas de Prevenção: *Medidas que devem ser adotadas para evitar que o risco se concretize*
> Medidas de Contingência: *Medidas que devem ser adotadas caso o risco se concretize*
>
> *Obs.: Para determinar o risco considere a seguinte combinação entre Probabilidade e Impacto:

| Probabilidade | Impacto       | Risco         |
|---------------|---------------|---------------|
| Baixo         | Baixo         | Baixo         |
| Médio         | Médio         | Médio         |
| Alto          | Alto          | Alto          |
| Baixo         | Médio         | Médio         |
| Médio         | Baixo         | Médio         |
| Baixo         | Alto          | Médio         |
| Alto          | Baixo         | Médio         |
| Médio         | Alto          | Alto          |
| Alto          | Médio         | Alto          |


```diff
+ Tarefa 12:
+ Fim da seção a ser atualizada.
```

-----






