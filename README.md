
# Projeto de Autenticação com Node.js, Express e DynamoDB

Este projeto implementa uma API RESTful para autenticação de usuários utilizando Node.js, Express e AWS DynamoDB. A API oferece funcionalidades de login, troca de senha e proteção com autenticação JWT.

## Índice
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Uso](#uso)
  - [Endpoints da API](#endpoints-da-api)
- [Testes](#testes)
- [Considerações Finais](#considerações-finais)

## Tecnologias Utilizadas

- **Node.js** para o ambiente de execução do JavaScript.
- **Express** para construção da API.
- **DynamoDB** como banco de dados NoSQL para armazenar as informações dos usuários.
- **JWT (JSON Web Tokens)** para autenticação segura.
- **bcrypt** para hash de senhas.
- **dotenv** para configuração das variáveis de ambiente.

## Pré-requisitos

- **Node.js** e **npm** instalados.
- Uma conta AWS com permissões para uso do DynamoDB e configuração das credenciais AWS.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/nome-do-projeto.git
   cd nome-do-projeto
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto:
   ```plaintext
   AWS_ACCESS_KEY_ID=<sua_access_key>
   AWS_SECRET_ACCESS_KEY=<sua_secret_key>
   JWT_SECRET=<sua_chave_jwt>
   ```

## Configuração

### Configuração do DynamoDB
Crie uma tabela no DynamoDB chamada conforme definido no projeto (ou adapte no arquivo `src/constants/constants.ts`):
- **Nome da Tabela:** `seu_nome_de_tabela`
- **Chave Primária:** `username` (tipo `String`)

### Configuração do JWT
A chave JWT (`JWT_SECRET`) é necessária para gerar e verificar tokens de autenticação. Caso o `.env` não inclua uma, será gerada automaticamente ao iniciar o projeto.

## Estrutura do Projeto

```
src/
├── config/               # Configurações (JWT, etc.)
├── constants/            # Constantes (ex. TABLE_NAME)
├── controllers/          # Lógica de controle (login, troca de senha)
├── middleware/           # Autenticação e validação JWT
├── models/               # Operações no banco DynamoDB
├── routes/               # Definições de rotas da API
├── services/             # Regras de negócio (login, hash de senha)
├── tests/                # Testes de API
├── utils/                # Utilitários (ex. conexão com DynamoDB)
└── app.ts                # Configuração principal do Express
└── server.ts             # Inicialização do servidor
```

## Uso

### Executando o Servidor

Para iniciar o servidor em modo de desenvolvimento, use:
```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`.

### Endpoints da API

#### 1. Login

- **Rota:** `/auth/login`
- **Método:** `POST`
- **Descrição:** Autentica o usuário e retorna um token JWT.
- **Body:**
  ```json
  {
    "username": "testuser",
    "password": "password123"
  }
  ```
- **Resposta:**
  ```json
  {
    "token": "jwt_token_gerado"
  }
  ```

#### 2. Troca de Senha

- **Rota:** `/auth/change-password`
- **Método:** `POST`
- **Descrição:** Permite ao usuário alterar a própria senha, utilizando o token JWT para autenticação.
- **Headers:**
  - `Authorization: Bearer <token_jwt>`
- **Body:**
  ```json
  {
    "currentPassword": "senha_atual",
    "newPassword": "nova_senha"
  }
  ```
- **Resposta:**
  ```json
  {
    "message": "Senha atualizada com sucesso"
  }
  ```

### Testando com Postman ou Bruno

- **Login**: Envie uma requisição `POST` para `/auth/login` com o `username` e `password` no body para receber o token JWT.
- **Troca de Senha**: Em `/auth/change-password`, insira o token JWT no header `Authorization` e envie `currentPassword` e `newPassword` no body para trocar a senha.

## Testes

Para garantir a funcionalidade e segurança dos endpoints, foram incluídos testes básicos para login e troca de senha:

- **Local dos testes:** `src/tests/`
- **Rodar os testes:** Utilize um gerenciador de testes, como `jest`, com o comando:
  ```bash
  npm run test
  ```

## Considerações Finais

Esse projeto serve como base para uma API de autenticação com armazenamento seguro de senhas e autenticação JWT. Para produção, considere:

- Configurar variáveis sensíveis de forma segura.
- Implementar validações adicionais nos endpoints.
- Adicionar limitações de taxa de requisição para melhorar a segurança.

