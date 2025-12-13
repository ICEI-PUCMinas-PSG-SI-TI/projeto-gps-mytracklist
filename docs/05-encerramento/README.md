# Encerramento

# Estrutura do Documento

- [Fase de Encerramento](#encerramento)
- [Encerramento do Projeto](#encerramento-do-projeto)
- [Lições Aprendidas](#lições-aprendidas)
- [Auto-avaliação](#auto)
- [Sugestões e Críticas](#sugestões-e-críticas)

----
```diff
+ Tarefa 13:
+ Encerramento do Projeto
```

# Encerramento do Projeto

#### 1. Objetivo do Projeto

Desenvolver um site para avaliar, organizar e compartilhar músicas, permitindo que usuários registrem suas preferências e descubram novas faixas.

#### 2. Resumo do Projeto

No projeto MyTrackList, iniciamos o desenvolvimento com a configuração do serviço de API utilizando Axios, que serviu de base para a comunicação entre o frontend e o backend. Em seguida, criamos a página de detalhes da música para visualização de informações específicas sobre cada faixa.

Implementamos componentes essenciais como Rotas Protegidas e o contexto de autenticação (AuthContext) para gerir sessões de forma eficiente. Integramos os formulários de login e cadastro com a API e desenvolvemos a lógica crítica para obtenção do token de acesso do Spotify. Ao longo do processo, realizamos testes de integração e unitários para assegurar a qualidade, resultando numa solução robusta que proporciona uma experiência agradável de gestão musical.

#### 3. Artefatos Entregues

- Frontend:

    - Aplicação desenvolvida em React 19 com Vite, Material-UI, Axios e React Router.

    - Componentes: ProtectedRoute, RatingInput, SearchBar, ReviewItem.

    - Páginas: HomePage, LoginPage, RegisterPage, ProfilePage, PublicProfilePage, SearchResultsPage, TrackDetailsPage, UserSearchPage.

    - Serviços: Contexto de Autenticação (AuthContext) e serviços de integração (API, Reviews, Spotify).

- Backend:

    - API REST desenvolvida em Node.js/Express com TypeScript, utilizando Bun como runtime.

    - Estrutura: Controllers (Admin, Review, User), Factories e Interfaces.

    - Base de Dados: SQLite configurado com persistência.

    - Segurança: Autenticação via sessões, rate limiting e helmet.

    - Scripts administrativos para gestão de utilizadores.

#### 4. Conclusões

O projeto alcançou os objetivos definidos inicialmente, entregando uma aplicação web funcional para gestão de playlists e integração com a API do Spotify. Através de um desenvolvimento ágil e colaborativo, a equipa entregou uma solução que atende às necessidades do cliente com uma interface intuitiva.

Os resultados demonstraram a eficácia da comunicação entre o front-end e o back-end, a segurança na autenticação e a integração fluida com a biblioteca de músicas. O projeto serviu como um excelente exercício de aplicação de tecnologias modernas como React, Node.js, Bun e SQLite.


# Lições Aprendidas 

A identificação e documentação de lições aprendidas contribuem significativamente para a melhoria contínua das práticas da equipa. Abaixo, destacam-se os principais aprendizados do projeto MyTrackList:

#### A. Importância do Planejamento

O planejamento inicial e a definição clara dos objetivos foram fundamentais para manter o foco durante o desenvolvimento e garantir que todas as funcionalidades necessárias fossem implementadas no tempo previsto.

#### B. Integração e Comunicação

A integração entre o front-end e o back-end é crucial. Aprendemos que uma boa comunicação entre os membros responsáveis por cada parte é necessária para resolver problemas rapidamente e garantir que as funcionalidades se alinhem.

#### C. Segurança em Primeira Mão

A implementação de um sistema de autenticação robusto destacou a importância da segurança em aplicações web desde o início do projeto, especialmente ao lidar com dados sensíveis e credenciais de usuários.

#### D. Testes Contínuos

A realização de testes de integração e unitários ao longo do desenvolvimento ajudou a identificar e prevenir problemas precocemente, melhorando significativamente a qualidade do código e a confiabilidade da aplicação final.

#### E. Adaptação e Flexibilidade

O projeto exigiu adaptação a novas tecnologias. Aprendemos a ser flexíveis e a buscar soluções criativas para os desafios técnicos. Exemplos claros foram a escolha do runtime Bun (pela sua integração nativa com SQLite e desempenho) e o uso do Axios para otimizar as requisições à API REST.

# Auto-avaliação

- **Bruna de Paula Anselmi:**

- **Cauã Diniz Armani:** 

- **David Nunes Ribeiro:** A disciplina superou as minhas expectativas, especialmente pelo desafio prático que o projeto proporcionou. Embora o foco principal fosse a gestão, a oportunidade de aplicar simultaneamente conceitos de gerência ágil e desenvolvimento full stack foi extremamente enriquecedora. Esta experiência permitiu-me consolidar conhecimentos técnicos e de liderança, resultando num projeto robusto que servirá como peça-chave no meu portfólio. Considero que esta foi a matéria onde demonstrei maior comprometimento e esforço ao longo do semestre, focado em garantir uma entrega de alta qualidade.

- **Lucca Mendes Alves Pellegrini:**

# Sugestões e Críticas

- **Bruna de Paula Anselmi:**

- **Cauã Diniz Armani:**

- **David Nunes Ribeiro:** Acredito que a disciplina beneficiaria de uma simulação mais intensa do feedback contínuo do cliente. Sugiro a inclusão de mais pontos de controle (apresentações parciais) ao longo do semestre, onde o professor pudesse visualizar o progresso tangível do software e fornecer pareceres sobre a direção do produto, simulando a dinâmica real de revisões de Sprint com stakeholders. Embora compreenda que o foco é a gestão, essa interação prática enriqueceria a experiência de adaptação às mudanças.

- **Lucca Mendes Alves Pellegrini:**


```diff
+ Tarefa 13
+ Fim da seção a ser atualizada.
```


