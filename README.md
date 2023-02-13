# Documentação da API

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Início Rápido](#2-início-rápido)
    - [Instalando Dependências](#21-instalando-dependências)
    - [Variáveis de Ambiente](#22-variáveis-de-ambiente)
    - [Migrations](#23-migrations)
- [Endpoints](#3-endpoints)

---

## 1. Visão Geral

O projeto visa facilitar o registro de usuários e contatos que são ligados aos seus respectivos usuários. Nesse projeto foram utilizados TypeScript, NodeJS, PostgreSQL e JavaScript no BackEnd e React, JavaScript e TypeScript no Front.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [React](https://reactjs.org/)

A URL base da aplicação:
https://backend-registro-contatos.onrender.com/

---


## 2. Início Rápido
[ Voltar para o topo ](#tabela-de-conteúdos)


### 2.1. Instalando Dependências

Clone o projeto em seguida instale todas as dependências com o comando:

```shell
yarn
```

### 2.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:
```
cp .env.example .env
```

Preencha os campos com os dados do Banco de Dados Local.

### 2.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

---

## 3. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Users](#1-users)
    - [POST - /users](#11-criação-de-usuário)
    - [GET - /users](#12-listando-usuários)
	- [GET - /users/:id](#13-listar-usuário-por-id)
	- [PATCH - /users/:id](#14-atualizar-dados-do-usuário)
	- [DELETE - /users/:id](#15-deletar-usuario)
- [Contacts](#2-contacts)
    - [POST - /contacts](#21-criação-de-contato)
    - [GET - /contacts](#22-listando-contatos)
    - [GET - /contacts/:id](#23-listar-contato-por-id)
	- [GET - /contacts/users/:id](#24-listar-contatos-por-usuário)
	- [PATCH - /contact/:id](#25-atualizar-dados-do-contato)
	- [DELETE - /contact/:id](#26-deletar-contato)


---

## 1. **Users**
[ Voltar para os Endpoints ](#3-endpoints)

O objeto User é definido como:

| Campo      | Tipo   | Descrição                                     |
| -----------|--------|-------------------------------------------------|
| id         | string | Identificador único do usuário                  |
| fullname   | string | O nome do usuário.                              |
| email      | string | O e-mail do usuário.                            |
| phone      | string | O telefone do usuário.                            |
| password   | string | A senha de acesso do usuário                    |
| isAdm      | boolean | Define se um usuário é Administrador ou não.   |
|createdAt   | data   | Data que o usuário foi criado                   |
|updatedAt   | data   | Data que o usuário foi atualizado pela ultima vez|

### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /users     | Criação de um usuário.                  |
| GET      | /users     | Lista todos os usuários                 |
| GET      | /users/:user_id     | Lista um usuário usando seu ID como parâmetro 
| PATCH    | /users/:user_id     | Atualiza os dados de um usuário usando seu ID como parâmetro 
| DELETE   | /users/:user_id     | Deleta um usuário usando seu ID como parâmetro 

---

### 1.1. **Criação de Usuário**

[ Voltar para os Endpoints ](#3-endpoints)

### `/users`

### Exemplo de Request:
```
POST /users
Host: https://backend-registro-contatos.onrender.com
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"fullname": "João Carlos",
	"password": "12345",
	"email": "joaoc@mail.com",
	"phone": "1234567890",
	"isAdm": false
}
```

### Exemplo de Response:
```
201 Created
```

```json
{
	"id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
	"fullname": "João Carlos",
	"email": "joaoc@mail.com",
	"phone": "1234567890",
	"isAdm": false,
    "isActive": true,
	"createdAt": "2023-02-12T01:40:33.231Z",
	"updatedAt": "2023-02-12T01:40:33.231Z"
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 409 Conflict   | Email is already being used. |

---

### 1.2. **Listando Usuários**

[ Voltar aos Endpoints ](#3-endpoints)

### `/users`

### Exemplo de Request:
Somente usuários com isAdm: true poderão fazer essa requisição.

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
[
	{
		"id": "a4f1855f-a95c-4393-b770-45d41679955f",
		"fullname": "Rayane F.",
		"email": "rayanef@mail.com",
		"phone": "1234567890",
		"createdAt": "2023-02-04T21:56:21.063Z",
		"updatedAt": "2023-02-04T21:56:55.293Z",
		"isAdm": false,
		"isActive": false
	},
	{
		"id": "c4409597-bf64-4ba8-afbd-2b7d3fd4a0d5",
		"fullname": "Carlos Mota",
		"email": "carlosm@mail.com",
		"phone": "1234567890",
		"createdAt": "2023-02-04T22:33:49.162Z",
		"updatedAt": "2023-02-04T22:33:49.162Z",
		"isAdm": true,
		"isActive": true
	},
]
```

### Possíveis Erros:
Caso o usuário não tenha permissão para a request, a request retornará uma mensagem: "User has no permission to do this action"

---

### 1.3. **Listar Usuário por ID**

[ Voltar aos Endpoints ](#3-endpoints)

### `/users/:user_id`

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| user_id     | string      | Identificador único do usuário (User) |

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
{
	"id": "a784ad47-8287-46b7-aac1-b2a562724609",
	"fullname": "Eduardo Ribeiro",
	"email": "eduardor@mail.com",
	"phone": "1234567890",
	"createdAt": "2023-02-04T22:34:18.307Z",
	"updatedAt": "2023-02-04T22:42:31.739Z",
	"isAdm": true,
	"isActive": true
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found   | User not found. |

---

### 1.4. **Atualizar Usuário por ID**

[ Voltar aos Endpoints ](#3-endpoints)

### `/users/:user_id`

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| user_id     | string      | Identificador único do usuário (User) |

### Corpo da Requisição:
```json
{
	"fullname": "Novo Nome",
	"email": "novoemail@mail.com",
	"phone": "9876543210"
}
```

### Exemplo de Response:
```
200 OK
```
```json
{
	"id": "a784ad47-8287-46b7-aac1-b2a562724609",
	"fullname": "Novo Nome",
	"email": "novoemail@mail.com",
	"phone": "9876543210",
	"createdAt": "2023-02-04T22:34:18.307Z",
	"updatedAt": "2023-02-04T22:42:31.739Z",
	"isAdm": true,
	"isActive": true
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found   | User not found. |

---

### 1.5. **Deletar Usuário por ID**

Esta API apenas realiza um softdelete, alterando o valor de isActive para false

[ Voltar aos Endpoints ](#3-endpoints)

### `/users/:user_id`

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| user_id     | string      | Identificador único do usuário (User) |

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
204 No body returned for response
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 400  | User already inactive. |
| 404 Not Found   | User not found. |


---

## 2. **Contacts**
[ Voltar para os Endpoints ](#3-endpoints)

O objeto Contact é definido como:

| Campo      | Tipo   | Descrição                                     |
| -----------|--------|-------------------------------------------------|
| id         | string | Identificador único do contato                  |
| fullname   | string | O nome do contato.                              |
| email      | string | O e-mail do contato.                            |
| phone      | string | O telefone do contato.                          |
| user       | objeto | Objeto que contém a id do usuário dono do contato |
|createdAt   | data   | Data que o contato foi criado                   |
|updatedAt   | data   | Data que o contato foi atualizado pela ultima vez|


### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /contacts     | Criação de um contato.                  |
| GET      | /contacts    | Lista todos os contatos.                 |
| GET      | /contacts/:contact_id    | Lista um contato usando seu ID como parâmetro                 |
| GET      | /contacts/users/:user_id     | Lista todos os contatos de um usuário usando seu ID como parâmetro 
| PATCH    | /contacts/:contact_id     | Atualiza os dados de um contato usando seu ID como parâmetro 
| DELETE   | /contacts/:contact_id     | Deleta um contato usando seu ID como parâmetro 

---

### 2.1. **Criação de Contato**
[ Voltar para os Endpoints ](#3-endpoints)

### `/contacts`

### Corpo da Requisição:
```json
{
	"fullname": "Jonas",
	"phone": "12345678",
	"email": "jonasm@mail.com"
}
```

### Exemplo de Response:
```
201 Created
```

```json
{
	"id": "5c9a42aa-3032-4b9f-ba6d-edc599d99132",
	"fullname": "Jonas 1",
	"email": "Teste@mail.com",
	"phone": "123456",
	"user": {
		"id": "d053f734-f2e1-463d-b0a4-810b3e80574b"
	},
	"createdAt": "2023-02-11T20:01:39.567Z",
	"updatedAt": "2023-02-11T20:01:39.567Z"
}
```
---

### 2.2. **Listando todos os Contatos**

[ Voltar aos Endpoints ](#3-endpoints)

### `/contacts`

### Exemplo de Request:
Somente usuários com isAdm: true poderão fazer essa requisição.

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
[
	{
		"id": "6dff3531-623e-4936-8676-64a268eb32f1",
		"fullname": "Jonas 2",
		"email": "jonas@mail.com",
		"phone": "12345622",
		"createdAt": "2023-02-11T19:37:06.500Z",
		"updatedAt": "2023-02-11T19:37:06.500Z"
	},
	{
		"id": "40cc105d-755c-4a0f-84a3-c7fa2a3db332",
		"fullname": "Joao M.",
		"email": "joaom@mail.com",
		"phone": "12345689",
		"createdAt": "2023-02-11T19:37:45.072Z",
		"updatedAt": "2023-02-11T19:37:45.072Z"
	},
]
```
---

### 2.3. **Listando um Contato buscando pela sua ID**

[ Voltar aos Endpoints ](#3-endpoints)

### `/contacts/:contactId`

### Exemplo de Request:
Somente usuários com isAdm: true ou o dono do contato poderão fazer essa requisição.

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
{
	"id": "6dff3531-623e-4936-8676-64a268eb32f1",
	"fullname": "Jonas 1",
	"email": "Teste@mail.com",
	"phone": "123456",
	"createdAt": "2023-02-11T19:37:06.500Z",
	"updatedAt": "2023-02-11T19:37:06.500Z"
},

```

---

### 2.4. **Listando contatos por usuário usando userId**

[ Voltar aos Endpoints ](#3-endpoints)

### `/contacts/users/:userId`

### Exemplo de Request:
Somente usuários com isAdm: true ou o usuário poderão fazer essa requisição.

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
{
	"id": "6dff3531-623e-4936-8676-64a268eb32f1",
	"fullname": "Jonas 1",
	"email": "Teste@mail.com",
	"phone": "123456",
	"createdAt": "2023-02-11T19:37:06.500Z",
	"updatedAt": "2023-02-11T19:37:06.500Z"
},

```

---

### 2.5. **Atualizar Contato por ID**

[ Voltar aos Endpoints ](#3-endpoints)

### `/contacts/:contactId`

### Exemplo de Request:
Somente usuários com isAdm: true ou o usuário dono do contato poderão fazer essa requisição.

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| contact_id     | string      | Identificador único do contato (Contact) |

### Corpo da Requisição:
```json
{
	"fullname": "Jonas 27",
	"phone": "1234563333",
	"email": "jonas@mail.com"
}
```

### Exemplo de Response:
```
200 OK
```
```json
{
	"id": "5c9a42aa-3032-4b9f-ba6d-edc599d99132",
	"fullname": "Jonas 27",
	"email": "jonas@mail.com",
	"phone": "1234563333",
	"createdAt": "2023-02-11T20:01:39.567Z",
	"updatedAt": "2023-02-11T20:01:48.162Z"
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found   | Contact not found. |

---

### 2.6. **Deletar Contato por ID**

DELETA o contato do banco de dados.

[ Voltar aos Endpoints ](#3-endpoints)

### `/contacts/:contactId`

### Exemplo de Request:
Somente usuários com isAdm: true ou o usuário dono do contato poderão fazer essa requisição.

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| contactId   | string      | Identificador único do contato (Contact) |

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
204 No body returned for response
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found   | Contact not found. |


---
