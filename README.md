># Controle-Financeiro-Dindin
## Descrição do projeto
Projeto realizado como Desafio do Módulo 03 do curso de Desenvolvimento de Software com foco em Back-end na Cubos Academy. O desenvolvimento deste projeto teve como objetivo proporcionar prática no fluxo de trabalho em equipe, a partir da aplicação de metodologias ágeis e utilização de branches na criação de uma RESTful API integrada ao Banco de Dados, além de ser protegida por criptografia de senhas e autenticação de usuários via Token.

A RESTful API foi desenvolvida para gerenciar receitas e despesas, com integração total ao banco de dados PostgreSQL, permitindo a persistência e manipulação de dados de usuários, categorias e transações, fundamentais para o funcionamento da aplicação. Além disso, foram implementadas medidas de segurança, incluindo a criptografia de senhas e autenticação de usuário por meio de tokens, para garantir a proteção dos dados.

## Funcionalidades
* Cadastrar Usuário

* Fazer Login do Usuário

* Detalhar Perfil do Usuário Logado

* Atualizar Perfil do Usuário Logado

* Listar Categorias

* Cadastrar Transações do Usuário Logado

* Listar Transações do Usuário Logado

* Detalhar uma Transação do Usuário Logado

* Atualizar Transação do Usuário Logado

* Remover Transação do Usuário Logado

* Obter Extrato de Transações

* Filtrar Transações por Categoria

## Linguagens e Ferramentas utilizadas
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![NodeJs](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![insomnia](https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white)
![Postgresql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## Executando o projeto

Para começar a utilizar a RESTful API de Controle Financeiro Dindin na sua máquina, siga estas etapas:

```shell
# 1. Faça o Fork do repositório

# 2. Clone o projeto

git clone <um-dos-links-abaixo>

HTTPS:
https://github.com/MarcelaLinhares/Controle-Financeiro-Dindin.git

SSH:
git@github.com:MarcelaLinhares/Controle-Financeiro-Dindin.git

# 3. No VS Code instale as dependências

npm install

# 4. Execute o servidor

npm run dev

```

## Banco de Dados PostgreSQL "Dindin"
Comandos SQL para a criação do Banco de Dados "Dindin" e de suas respectivas tabelas no software Beekeeper ou em um software similar.
- [ ] Banco de Dados Dindin
```sql
CREATE DATABASE dindin;
```

- [ ] Tabela de Usuários
```sql
CREATE TABLE usuarios (
    id serial PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
);
```
- [ ] Tabela de Categorias
```sql
CREATE TABLE categorias (
    id serial PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL
);
```
- [ ] Tabela de Transações
```sql
CREATE TABLE transacoes (
    id serial PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    valor DECIMAL(10) NOT NULL,
    data TIMESTAMP DEFAULT NOW() NOT NULL,
    categoria_id INTEGER REFERENCES categorias(id),
    usuario_id INTEGER REFERENCES usuarios(id),
    tipo TEXT NOT NULL
);
```
- [ ] Inserção das Categorias
```sql
INSERT INTO categorias (descricao) VALUES
    ('Alimentação'),
    ('Assinaturas e Serviços'),
    ('Casa'),
    ('Mercado'),
    ('Cuidados Pessoais'),
    ('Educação'),
    ('Família'),
    ('Lazer'),
    ('Pets'),
    ('Presentes'),
    ('Roupas'),
    ('Saúde'),
    ('Transporte'),
    ('Salário'),
    ('Vendas'),
    ('Outras receitas'),
    ('Outras despesas');
```

## Endpoints no Insomnia
Para realizar as requisições com os verbos GET, POST, PUT, DELETE use o framework Insomnia ou similar.

Abra o insomnia e use o caminho (URL Base):
http://localhost:3000/


- [ ] Cadastrar Usuário - **POST**
```javascript
http://localhost:3000/usuario
```
```javascript
// No body (JSON) preencher os dados da requisição:
{
	"nome": "Marcela",
	"email": "marcela@email.com",
	"senha": "1234"
}
```

<img src="./imgsReadme/img1_CadastrarUsuário.png" >

- [ ] Fazer Login do Usuário - **POST**
```javascript
http://localhost:3000/login
```
```javascript
// No body (JSON) preencher os dados da requisição:
{
	"email": "christiane@email.com",
	"senha": "12345"
}
```

<img src="./imgsReadme/img2_FazerLogin.png" >

- [ ] Detalhar Perfil do Usuário Logado - **GET**
```javascript
http://localhost:3000/usuario
```
```javascript
// No Auth (Bearer Token) colar o Token gerado no endpoint "Fazer Login do Usuário":
TOKEN <colar-token-gerado-no-login-do-usuario>
```

<img src="./imgsReadme/img3_DetalharUsuário.png" >

- [ ] Atualizar Perfil do Usuário Logado - **PUT**

```javascript
http://localhost:3000/usuario
```
```javascript
// No Auth (Bearer Token) colar o Token gerado no endpoint "Fazer Login do Usuário":
TOKEN <colar-token-gerado-no-login-do-usuario>
```
```javascript
// No body (JSON) preencher os dados da requisição:
{
	"nome": "Maria Helena",
	"email": "mariahelena@email.com",
        "senha": "1234567"
}
```

<img src="./imgsReadme/img4_AtualizarUsuario.png" >

- [ ] Listar Categorias - **GET**
```javascript
http://localhost:3000/categoria
```
```javascript
// No Auth (Bearer Token) colar o Token gerado no endpoint "Fazer Login do Usuário":
TOKEN <colar-token-gerado-no-login-do-usuario>
```

<img src="./imgsReadme/img5_ListaCategorias.png" >

- [ ] Cadastrar Transações do Usuário Logado - **POST**
```javascript
http://localhost:3000/transacao
```
```javascript
// No Auth (Bearer Token) colar o Token gerado no endpoint "Fazer Login do Usuário":
TOKEN <colar-token-gerado-no-login-do-usuario>
```
```javascript
// No body (JSON) preencher os dados da requisição:
{
     "tipo": "entrada",
     "descricao": "Salário out/2023",
     "valor": 1500000,
     "data": "2023-11-06T15:30:00.000Z",
     "categoria_id": 14
}
```

<img src="./imgsReadme/img6_CadastrarTransação.png" >

- [ ] Listar Transações do Usuário Logado - **GET**
```javascript
http://localhost:3000/transacao
```
```javascript
// No Auth (Bearer Token) colar o Token gerado no endpoint "Fazer Login do Usuário":
TOKEN <colar-token-gerado-no-login-do-usuario>
```

<img src="./imgsReadme/img7_ListarTransações.png" >

- [ ] Detalhar uma Transação do Usuário Logado - **GET**
```javascript
http://localhost:3000/transacao/:id
```
```javascript
// No Auth (Bearer Token) colar o Token gerado no endpoint "Fazer Login do Usuário":
TOKEN <colar-token-gerado-no-login-do-usuario>
```

<img src="./imgsReadme/img8_DetalharTransação.png" >

- [ ] Atualizar Transação do Usuário Logado - **PUT**
```javascript
http://localhost:3000/transacao/:id
```
```javascript
// No Auth (Bearer Token) colar o Token gerado no endpoint "Fazer Login do Usuário":
TOKEN <colar-token-gerado-no-login-do-usuario>
```
```javascript
// No body (JSON) preencher os dados da requisição:
{
    "descricao": "Venda de Notebook Usado",
    "valor": 320000,
    "data": "2023-10-12 12:35:00",
    "categoria_id": 16,
    "tipo": "entrada"
}
```

<img src="./imgsReadme/img9_AtualizarTransação.png" >

- [ ] Remover Transação do Usuário Logado - **DELETE**
```javascript
http://localhost:3000/transacao/:id
```
```javascript
// No Auth (Bearer Token) colar o Token gerado no endpoint "Fazer Login do Usuário":
TOKEN <colar-token-gerado-no-login-do-usuario>
```

<img src="./imgsReadme/img10_RemoverTransação.png" >

- [ ] Obter Extrato de Transações - **GET**
```javascript
http://localhost:3000/transacao/extrato
```
```javascript
// No Auth (Bearer Token) colar o Token gerado no endpoint "Fazer Login do Usuário":
TOKEN <colar-token-gerado-no-login-do-usuario>
```

<img src="./imgsReadme/img11_ObterExtratoDeTransações.png" >

- [ ] Filtrar Transações por Categoria - **GET**
```javascript
http://localhost:3000/transacao
```
```javascript
// No Auth (Bearer Token) colar o Token gerado no endpoint "Fazer Login do Usuário":
TOKEN <colar-token-gerado-no-login-do-usuario>
```
```javascript
// No Query preencher o filtro das Categorias desejadas:
filtro[]       Salário
filtro[]       Pets
```

<img src="./imgsReadme/img12_FiltrarTransaçõesPorCategoria.png" >

## Contribua com o Projeto

- [ ] Realize o Fork
- [ ] Faça as modificações
- [ ] Realize o Pull Request (PR)

## Contribuidores

<table>
  <tr>
    <td align="center"><a href="https://github.com/MarcelaLinhares"><img src="https://avatars.githubusercontent.com/u/141354578?v=4" width="50px;" alt=""/><br /><sub><b>Marcela Linhares</b></sub></a><br /></td>
   
  <td align="center"><a href="https://github.com/christianebs"><img src="https://avatars.githubusercontent.com/u/108686840?v=4" width="50px;" alt=""/><br /><sub><b>Christiane Barbosa</b></sub></a><br /></td>
