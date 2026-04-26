# Listagem e Cadastro de Usuários - Angular

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

## Descrição

Este projeto é uma aplicação web desenvolvida em Angular que permite a listagem, criação e edição de usuários. A interface é moderna e responsiva, utilizando componentes standalone e formulários reativos com validação.

### Funcionalidades Principais

- Listagem de usuários em cards com filtro por nome (com debounce).

- Indicador de loading e tratamento de erros.

- Modal para cadastro e edição de usuário com formulário reativo.

- Validação por campo com mensagens de erro.

- Botão de salvar desabilitado enquanto o formulário estiver inválido.

- Gerenciamento eficiente de assinaturas RxJS para evitar memory leaks.

---

## Tecnologias Utilizadas

- Angular 16+

- RxJS

- TypeScript

- CSS moderno

- Componentes Standalone do Angular

- Formulários Reativos

---

## Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 16 ou superior)

- [Angular CLI](https://angular.io/cli) (opcional, para rodar comandos Angular)

### Passos

1. Clone este repositório:

```bash
git clone https://github.com/viniciuscruz11/listagem-usuarios.git
```

Acesse a pasta do projeto:

```bash
cd listagem-usuarios
```

Instale as dependências:

```bash
npm install
```

### Execução
Para iniciar a aplicação em modo de desenvolvimento e abrir no navegador:

```bash
ng serve --open
```

A aplicação estará disponível em http://localhost:4200.

### Testes

Para executar os testes unitários (configure Jest, Vitest ou Karma conforme preferir):

```bash
npm run test
```

### Estrutura do Projeto
src/<br>
├── app/<br>
│   ├── usuario.service.ts          # Serviço para gerenciar dados dos usuários<br>
│   ├── usuarios-lista.component.ts # Componente de listagem e filtro<br>
│   ├── usuario-modal.component.ts  # Componente modal para cadastro e edição<br>
│   └── app.component.ts            # Componente raiz<br>
├── assets/<br>
├── environments/<br>
├── styles.css                     # Estilos globais<br>
...

### Como Usar
Na tela inicial, você verá a lista de usuários com filtro por nome.

Clique no botão vermelho para abrir o modal de cadastro.

Para editar um usuário, clique no botão "Editar" no card correspondente.

O formulário valida os campos obrigatórios e só habilita o botão "Salvar" quando válido.

Após salvar, a lista atualiza automaticamente.

### Contato
Desenvolvido por Vinícius Franco da Cruz.

Email: viniciusfcruz@outlook.com

GitHub: https://github.com/viniciuscruz11
