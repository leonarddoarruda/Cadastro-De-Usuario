 LeoDev.AI – Sistema de Cadastro de Usuários

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
</p>

<p align="center">
  Sistema completo de cadastro de usuários com autenticação segura, desenvolvido com Node.js, Express e PostgreSQL.
</p>

---

 📸 Preview

> Tela de cadastro moderna com tema escuro, validação de formulário em tempo real e feedback visual ao usuário.

---

 Funcionalidades

- ✅ Cadastro de usuários com validação completa
- ✅ Criptografia de senha com **bcrypt**
- ✅ Verificação de e-mail duplicado
- ✅ Máscara automática no campo de celular
- ✅ Mostrar/ocultar senha
- ✅ Feedback visual de sucesso e erro
- ✅ API REST com Node.js + Express
- ✅ Banco de dados PostgreSQL

---

 🛠️ Tecnologias Utilizadas

| Camada | Tecnologia |
|--------|-----------|
| Front-end | HTML5, CSS3, JavaScript |
| Back-end | Node.js, Express |
| Banco de dados | PostgreSQL |
| Segurança | bcrypt, dotenv |

---

 Estrutura do Projeto

cadastro_de_usuario/
├── public/
│   ├── index.html      # Tela de cadastro
│   ├── style.css       # Estilos
│   └── script.js       # JavaScript do front-end
├── src/
│   ├── server.js       # Servidor Express
│   ├── database.js     # Conexão com PostgreSQL
│   ├── create_tables.sql # Script do banco de dados
│   └── routes/
│       └── auth.js     # Rotas de autenticação
├── .env.example        # Exemplo de variáveis de ambiente
├── .gitignore
└── package.json

---

Como Rodar o Projeto

 Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [PostgreSQL](https://www.postgresql.org/) instalado

 Passo a passo

1. Clone o repositório**
```bash
git clone https://github.com/leonarddoarruda/Cadastro-De-Usuario.git
cd Cadastro-De-Usuario
```

2. Instale as dependências**
```bash
npm install
```

3. Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=presencedev
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui
```

4. Crie o banco de dados**
```bash
psql -U postgres -c "CREATE DATABASE presencedev;"
```

5. Crie a tabela de usuários**
```bash
psql -U postgres -d presencedev -f src/create_tables.sql
```

6. Inicie o servidor**
```bash
npm start
```

 Acesse no navegador.

   
   http://localhost:3000

   ---

 Segurança

- Senhas criptografadas com **bcrypt** (nunca armazenadas em texto puro)
- Variáveis sensíveis protegidas com **dotenv**
- Proteção contra **SQL Injection** com queries parametrizadas
- Validação de dados no front-end e no back-end

---

 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/cadastro` | Cadastra novo usuário |
| POST | `/api/login` | Autentica usuário |
| GET | `/api/status` | Verifica status do servidor |

---

Autor

Feito por ( Leonardo Arruda )

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/leonarddoarruda)

---

Licença

Este projeto está sob a licença MIT.
