# CodeTrack 🚀

O CodeTrack é uma aplicação web para organizar estudos de programação, acompanhar o progresso e tornar o aprendizado mais motivador através de gamificação.

O projeto começou como uma aplicação simples utilizando HTML, CSS e JavaScript e está evoluindo gradualmente para uma aplicação Full Stack.

Atualmente, o frontend já está conectado a uma API REST desenvolvida com Node.js e Express.

## 📌 Status

🚧 Projeto em desenvolvimento.

### Atualmente

- Frontend funcional
- API REST funcionando
- Frontend conectado ao backend
- CRUD de tarefas completo
- Dashboard de progresso
- Sistema de XP e níveis
- Streak de estudos
- Gráfico de produtividade
- Categorias, prioridades e prazos

### Próximo grande passo

Adicionar PostgreSQL para persistir os dados permanentemente.

Atualmente, as tarefas ficam armazenadas na memória do servidor e são perdidas quando o backend é reiniciado.

---

## ✨ Funcionalidades

### Gerenciamento de tarefas

- [x] Criar tarefas
- [x] Editar tarefas
- [x] Excluir tarefas
- [x] Marcar tarefas como concluídas
- [x] Desfazer conclusão
- [x] Adicionar tecnologia
- [x] Adicionar categoria
- [x] Adicionar prioridade
- [x] Adicionar prazo
- [x] Identificar tarefas atrasadas
- [x] Identificar tarefas que vencem no dia

### Filtros e organização

- [x] Buscar tarefas
- [x] Filtrar tarefas pendentes
- [x] Filtrar tarefas concluídas
- [x] Filtrar tarefas atrasadas
- [x] Filtrar por categoria
- [x] Ordenar por prioridade

### Gamificação

- [x] Sistema de XP
- [x] Sistema de níveis
- [x] Barra de progresso
- [x] Sequência de dias de estudo
- [x] Registro de data de conclusão das tarefas

### Dashboard

- [x] Total de tarefas
- [x] Tarefas concluídas
- [x] Tarefas pendentes
- [x] Tarefas atrasadas
- [x] Porcentagem de progresso
- [x] Streak de estudos
- [x] Produtividade dos últimos 7 dias
- [x] Progresso por categoria

### Interface

- [x] Layout responsivo
- [x] Cards de estatísticas
- [x] Modal para edição de tarefas
- [x] Indicadores de prioridade
- [x] Destaque visual para tarefas atrasadas
- [x] Gráfico de produtividade

---

## 🛠️ Tecnologias

### Frontend

- HTML5
- CSS3
- JavaScript
- Fetch API
- LocalStorage

### Backend

- Node.js
- Express
- CORS
- REST API

### Ferramentas

- Git
- GitHub
- npm
- VS Code
- Live Server

### Planejado

- PostgreSQL
- Autenticação de usuários
- Testes
- Variáveis de ambiente
- Deploy
- Possível migração para React

---

## 🔌 API REST

O backend possui um CRUD de tarefas utilizando Express.

### Listar tarefas

```http
GET /api/tasks
```

### Criar tarefa

```http
POST /api/tasks
```

### Atualizar tarefa

```http
PUT /api/tasks/:id
```

### Excluir tarefa

```http
DELETE /api/tasks/:id
```

### Verificar funcionamento da API

```http
GET /api/health
```

---

## 🔄 Arquitetura atual

```text
Frontend
   │
   │ Fetch API
   ↓
Node.js + Express
   │
   ↓
API REST
   │
   ↓
Dados em memória
```

A próxima evolução será:

```text
Frontend
   │
   ↓
API REST
   │
   ↓
Node.js + Express
   │
   ↓
PostgreSQL
```

---

## 📂 Estrutura do projeto

```text
CodeTrack/
│
├── index.html
├── README.md
│
├── css/
│   └── style.css
│
├── js/
│   └── app.js
│
└── server/
    ├── server.js
    ├── package.json
    └── package-lock.json
```

---

## ▶️ Como executar

### 1. Instale as dependências do backend

Entre na pasta do servidor:

```bash
cd server
```

Instale as dependências:

```bash
npm install
```

### 2. Inicie o backend

```bash
node server.js
```

O servidor será iniciado em:

```text
http://localhost:3000
```

A API pode ser testada em:

```text
http://localhost:3000/api/health
```

### 3. Inicie o frontend

Abra o `index.html` utilizando o Live Server.

Normalmente o frontend será iniciado em:

```text
http://127.0.0.1:5500/index.html
```

O frontend se comunica com a API através de:

```text
http://localhost:3000/api/tasks
```

---

## 🎮 Sistema de XP

Cada tarefa concluída concede:

```text
20 XP
```

A cada 100 XP o usuário sobe um nível.

Exemplo:

```text
0 XP   → Nível 1
100 XP → Nível 2
200 XP → Nível 3
300 XP → Nível 4
```

---

## 🔥 Streak

O CodeTrack registra os dias em que pelo menos uma tarefa foi concluída.

Exemplo:

```text
Segunda ✅
Terça   ✅
Quarta  ✅
Quinta  ✅

Sequência: 4 dias 🔥
```

Atualmente, o histórico do streak utiliza `localStorage`.

Futuramente esses dados também serão armazenados no banco de dados.

---

## 📊 Categorias

As tarefas podem ser organizadas nas seguintes categorias:

- Frontend
- Backend
- Algoritmos
- Git / GitHub
- Banco de Dados
- Outros

O dashboard também calcula automaticamente o progresso de cada categoria.

---

## ⚠️ Persistência atual

As tarefas atualmente ficam armazenadas apenas na memória do backend.

Isso significa que:

```text
Servidor inicia
      ↓
Tarefas são criadas
      ↓
Servidor é encerrado
      ↓
As tarefas são perdidas
```

Isso será resolvido com a integração do PostgreSQL.

---

## 🗺️ Roadmap

### Banco de dados

- [ ] Instalar PostgreSQL
- [ ] Criar banco de dados do CodeTrack
- [ ] Conectar Express ao PostgreSQL
- [ ] Criar tabela de tarefas
- [ ] Persistir tarefas
- [ ] Remover armazenamento em memória

### Backend

- [ ] Separar rotas
- [ ] Criar controllers
- [ ] Criar camada de acesso ao banco
- [ ] Adicionar validação
- [ ] Melhorar tratamento de erros
- [ ] Adicionar variáveis de ambiente
- [ ] Criar arquivo `.env`

### Usuários

- [ ] Cadastro de usuários
- [ ] Login
- [ ] Logout
- [ ] Hash de senhas
- [ ] Autenticação
- [ ] Associar tarefas a usuários

### Gamificação

- [ ] Persistir XP
- [ ] Persistir streak
- [ ] Histórico de atividades
- [ ] Sistema de conquistas

### Qualidade

- [ ] Melhorar acessibilidade
- [ ] Adicionar feedback de carregamento
- [ ] Adicionar mensagens de sucesso e erro
- [ ] Confirmar antes de excluir
- [ ] Adicionar ESLint
- [ ] Adicionar Prettier
- [ ] Criar testes
- [ ] Documentar melhor a API

### Futuro

- [ ] Avaliar migração para React
- [ ] Deploy do frontend
- [ ] Deploy do backend
- [ ] PostgreSQL online
- [ ] Autenticação em produção
- [ ] Adicionar link público do projeto

---

## 🧠 O que estou aprendendo

Durante o desenvolvimento do CodeTrack estou praticando:

- HTML
- CSS
- Responsividade
- JavaScript
- Manipulação do DOM
- Arrays e objetos
- Eventos
- Funções
- `filter()`
- `find()`
- `forEach()`
- `sort()`
- Datas em JavaScript
- JSON
- LocalStorage
- Async / Await
- Fetch API
- Node.js
- Express
- APIs REST
- Requisições HTTP
- CRUD
- Status HTTP
- CORS
- npm
- Git
- GitHub

---

## 🎯 Objetivo

O objetivo do CodeTrack é evoluir até se tornar uma aplicação Full Stack completa para gerenciamento e acompanhamento de estudos de programação.

Além de ser uma aplicação funcional, o projeto também serve para colocar em prática novos conhecimentos e documentar minha evolução no desenvolvimento de software.