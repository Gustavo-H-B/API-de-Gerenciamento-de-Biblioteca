# API de Gerenciamento de Biblioteca

## Sobre o projeto
Esta é uma API RESTful desenvolvida para simular o gerenciamento completo de uma biblioteca. A sua finalidade é permitir o controle e a administração de entidades fundamentais do sistema, possibilitando a criação, leitura, atualização e exclusão (CRUD) de livros, autores, gêneros literários, usuários e controle do fluxo de empréstimos.

## Tecnologias
As seguintes tecnologias, bibliotecas e ferramentas foram utilizadas no desenvolvimento:
* **Node.js:** Ambiente de execução JavaScript.
* **Express:** Framework para criação do servidor, roteamento e middlewares.
* **MySQL2:** Biblioteca para realizar a conexão e consultas utilizando Promises no banco de dados relacional.
* **Dotenv:** Gerenciamento de variáveis de ambiente mantendo dados sensíveis seguros.
* **Nodemon:** Utilitário para reiniciar automaticamente o servidor durante o desenvolvimento.
* **Git/Gitignore:** Controle de versão ignorando a pasta `node_modules`.

## Instalação
Para instalar as dependências necessárias do projeto, siga os passos abaixo:
1. Abra o terminal na pasta raiz do projeto.
2. Certifique-se de ter o Node.js instalado na sua máquina.
3. Digite o seguinte comando e pressione Enter:
   ```bash
   npm install
   ```

## Configuração
Para configurar as variáveis de ambiente necessárias para rodar a aplicação:
1. Navegue até a pasta `backend`.
2. Crie um arquivo chamado `.env`.
3. Utilize o arquivo `.env.example` como base.
4. Preencha as informações com os dados do seu MySQL e a porta da API:
   ```env
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_PORT=3306
   DB_NAME=nome_do_banco
   API_PORT=3033
   ```

## Banco de dados
Instruções para criar e configurar o banco:
1. Acesse a pasta `src/config`.
2. Abra o arquivo chamado `db.sql` no seu SGBD (como MySQL Workbench, Beekeeper, etc).
3. Execute os comandos presentes neste arquivo para criar o banco de dados e as tabelas obrigatórias.
4. *Opcional:* Você pode alterar ou adicionar novas informações de testes nos comandos `INSERT` presentes no arquivo para popular o banco e ter um melhor proveito da API.

## Execução
Instruções para executar a aplicação localmente:
1. Com tudo instalado e o banco de dados rodando, abra o terminal e certifique-se de estar na pasta `backend`.
2. Execute o comando:
   ```bash
   npm run start
   ```
3. O terminal exibirá a mensagem indicando que o servidor está rodando na porta configurada (ex: `http://localhost:3033`).
4. Utilize uma ferramenta de requisições HTTP como o Postman ou Thunder Client para realizar os testes.

## Endpoints
A documentação das rotas disponíveis segue o padrão arquitetural rest, contando com os métodos `GET`, `POST`, `PUT` e `DELETE`. 

### Regras Gerais dos Parâmetros
* **GET (Listar todos):** Não exige parâmetros.
* **GET (Buscar por ID):** Requer o parâmetro `/:id` na URL.
* **POST (Criar):** Requer envio de dados pelo corpo da requisição (JSON).
* **PUT (Atualizar):** Requer o parâmetro `/:id` na URL e os dados no corpo da requisição (JSON).
* **DELETE (Deletar):** Requer o parâmetro `/:id` na URL.

---

### 1. Autores (`/autores`)
* **Finalidade:** Gerenciar os autores dos livros.
* **Corpo da requisição (POST/PUT):**
  ```json
  {
    "nome_completo": "Nome do Autor",
    "nacionalidade": "Brasileiro",
    "data_nascimento": "1990-05-20"
  }
  ```
* **Exemplo de Resposta (201 Created):**
  ```json
  {
    "nome_completo": "Teste",
    "nacionalidade": "nenhuma",
    "data_nascimento": "0001-01-01"
  }
  ```

### 2. Livros (`/livros`)
* **Finalidade:** Cadastrar, listar e atualizar o acervo de livros da biblioteca.
* **Corpo da requisição (POST/PUT):**
  ```json
  {
    "titulo": "O Senhor dos Anéis",
    "isbn": "978-85-336-1337-9",
    "ano_publicado": 1954,
    "numero_paginas": 1200,
    "sinopse": "Uma jornada para destruir O Um Anel..."
  }
  ```

### 3. Gêneros (`/generos`)
* **Finalidade:** Organizar as categorias literárias do sistema.
* **Corpo da requisição (POST/PUT):**
  ```json
  {
    "nome": "Ficção Científica"
  }
  ```

### 4. Usuários (`/usuarios`)
* **Finalidade:** Gerenciar os clientes que utilizam a biblioteca para realizar empréstimos.
* **Corpo da requisição (POST/PUT):**
  ```json
  {
    "nome_completo": "João Silva",
    "cpf": "123.456.789-10",
    "email": "joao.silva@email.com",
    "telefone": "(11) 99999-9999",
    "data_nascimento": "1995-10-15"
  }
  ```

### 5. Empréstimos (`/emprestimos`)
* **Finalidade:** Registrar o fluxo de saída e devolução de exemplares.
* **Corpo da requisição (POST/PUT):**
  ```json
  {
    "data_emprestimo": "2024-01-10",
    "data_devolucao": "2024-01-25",
    "Titulo da Obra": "O Senhor dos Anéis",
    "Autor": "J.R.R. Tolkien",
    "Usuário": "João Silva",
    "cpf": "123.456.789-10"
  }
  ```