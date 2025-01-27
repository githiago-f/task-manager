# About

The system allows users to create, read, update and delete tasks. Each task has a title, description, due date, and status (pending, in progress, or completed). Users will be able to register, log in and manage their own tasks.

## Starting the project

```bash
## Generate the required certs and encryption keys
./cert-generate.sh 

## Run the back-end along with the database
docker compose up
```

## Testing

### Check the coverage for this project
```bash
cd ./task-manager
pnpm test:cov 
```

## Features

### Autentication
  * Users can sign-up, giving their name, e-mail and password
  * User should be able to login

### Task management

  * Authenticated users may be able to create new tasks.
  * Users will be able to list their tasks.
  * Users may be able to update a task's information, like title, description, due date and status.
  * Users may be able to delete existing tasks.

### Tasks filtering

  * Users may be able to filter their tasks with information like status, showing only finished tasks or in progress.

----

## Critérios de avaliação

* [x] Separação de responsabilidades: Divida seu código em módulos e camadas com responsabilidades claras. Isso facilita a compreensão e a manutenção do código.
* [x] Validação de dados: Realize validação adequada dos dados de entrada, tanto do lado do cliente como do servidor. Utilize bibliotecas de validação ou crie suas próprias funções de validação.
* [x] Tratamento de erros: Implemente um tratamento adequado de erros, retornando respostas de erro apropriadas e tratando exceções de forma adequada.
* [x] Testes automatizados: Escreva testes automatizados, incluindo testes unitários, testes de integração e testes de API.
Documentação: explicação para construir o app localmente, histórico e workflow de git
* [x] Documentação: Utilizar técnicas para gerar documentação das rotas desenvolvidas. 
