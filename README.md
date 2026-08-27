# CodeTrack

CodeTrack é uma aplicação web para organizar estudos de programação de forma simples e gamificada.

O projeto foi criado com o objetivo de praticar fundamentos de desenvolvimento web, manipulação do DOM, arrays, objetos, `localStorage` e organização de código com JavaScript.

## Funcionalidades

* [x] Adicionar tarefas
* [x] Marcar tarefas como concluídas
* [x] Desfazer conclusão
* [x] Excluir tarefas
* [x] Editar tarefas
* [x] Salvar tarefas com `localStorage`
* [x] Sistema de XP
* [x] Sistema de níveis
* [x] Barra de progresso de XP
* [x] Dashboard de estatísticas
* [x] Mostrar tarefas totais
* [x] Mostrar tarefas concluídas
* [x] Mostrar tarefas pendentes
* [x] Mostrar porcentagem de progresso
* [x] Filtrar tarefas por status
* [x] Buscar por tarefa ou tecnologia
* [x] Adicionar prioridade às tarefas
* [x] Ordenar tarefas por prioridade
* [x] Editar prioridade das tarefas
* [ ] Melhorar o design da aplicação
* [ ] Melhorar responsividade
* [ ] Adicionar categorias
* [ ] Criar sistema de streak
* [ ] Criar backend
* [ ] Adicionar banco de dados
* [ ] Criar sistema de usuários
* [ ] Fazer deploy

## Tecnologias

* HTML5
* CSS3
* JavaScript
* Git
* GitHub
* LocalStorage

## Como funciona

O usuário pode cadastrar uma tarefa informando:

* tecnologia;
* nome da tarefa;
* prioridade.

As prioridades disponíveis são:

* Baixa
* Média
* Alta

As tarefas podem ser concluídas, editadas ou excluídas.

Também é possível filtrar as tarefas entre:

* Todas
* Pendentes
* Concluídas

A aplicação possui uma busca que permite procurar tarefas pelo nome ou pela tecnologia.

## Sistema de XP

Cada tarefa concluída concede:

**20 XP**

A cada:

**100 XP**

o usuário sobe um nível.

Exemplo:

```text
0 XP   → Nível 1
100 XP → Nível 2
200 XP → Nível 3
300 XP → Nível 4
```

## Dashboard

O dashboard mostra automaticamente:

* número total de tarefas;
* tarefas concluídas;
* tarefas pendentes;
* porcentagem de progresso.

As informações são recalculadas sempre que uma tarefa é adicionada, concluída, editada ou excluída.

## Persistência de dados

As tarefas são armazenadas utilizando:

```javascript
localStorage
```

Isso permite que os dados continuem disponíveis mesmo depois de atualizar ou fechar a página.

## Estrutura do projeto

```text
codetrack/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── app.js
│
├── assets/
│   └── images/
│
└── README.md
```

## O que estou aprendendo

Durante o desenvolvimento deste projeto estou praticando:

* manipulação do DOM;
* eventos em JavaScript;
* funções;
* arrays;
* objetos;
* `forEach()`;
* `find()`;
* `filter()`;
* `sort()`;
* spread operator;
* operadores lógicos;
* template literals;
* manipulação de classes CSS;
* `localStorage`;
* JSON;
* CSS Grid;
* responsividade;
* Git;
* GitHub;
* organização de projetos.

## Próximos passos

O objetivo é continuar evoluindo o CodeTrack até transformá-lo em uma aplicação full stack.

Algumas ideias para as próximas versões:

1. Melhorar completamente o visual.
2. Criar um sistema de sequência de dias estudados.
3. Adicionar categorias de estudo.
4. Adicionar datas e prazos às tarefas.
5. Criar gráficos de progresso.
6. Migrar o frontend para React.
7. Criar uma API.
8. Adicionar banco de dados.
9. Criar autenticação de usuários.
10. Fazer deploy da aplicação.

## Status

🚧 Projeto em desenvolvimento.

O CodeTrack está sendo construído aos poucos enquanto estudo e pratico programação.
