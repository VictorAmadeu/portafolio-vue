// Importamos o módulo 'express' para criar nosso servidor web
const express = require("express");

// Importamos o módulo 'cors' para permitir requisições de outros domínios
const cors = require("cors");

// Importamos o módulo 'mysql2' para conectar com o banco de dados MySQL
const mysql = require("mysql2");

// Criamos uma instância da aplicação Express
const app = express();

// Definimos a porta onde o servidor vai rodar (pode vir do ambiente ou usar 3000 por padrão)
const port = process.env.PORT || 3000;

// Middleware para habilitar CORS (permite que o frontend Vue.js acesse este backend)
app.use(cors());

// Middleware para permitir o servidor receber e entender JSON no corpo das requisições
app.use(express.json());

// Criamos a conexão com o banco de dados MySQL hospedado na Railway
const db = mysql.createConnection({
  host: process.env.DB_HOST, // Endereço do servidor MySQL (ex: caboose.proxy.rlwy.net)
  user: process.env.DB_USER, // Nome de usuário do banco (ex: root)
  password: process.env.DB_PASSWORD, // Senha do banco (vinda das variáveis de ambiente)
  database: process.env.DB_NAME, // Nome do banco (ex: railway)
  port: process.env.DB_PORT, // Porta do banco (ex: 41535)
});

// Testamos se a conexão foi estabelecida com sucesso
db.connect((err) => {
  if (err) {
    // Se ocorrer erro, mostramos no console
    console.error("❌ Erro ao conectar no banco:", err);
  } else {
    // Se tudo estiver certo, avisamos que conectou com sucesso
    console.log("✅ Conectado ao banco de dados MySQL com sucesso!");
  }
});

// Rota POST para receber mensagens do formulário de contato (vindo do frontend Vue)
app.post("/mensajes", (req, res) => {
  // Extraímos os campos enviados pelo frontend no corpo da requisição
  const { nombre, email, asunto, mensaje } = req.body;

  // Comando SQL que insere os dados na tabela "mensajes" do MySQL
  const sql =
    "INSERT INTO mensajes (nombre, email, asunto, mensaje) VALUES (?, ?, ?, ?)";

  // Executamos a query passando os valores do formulário
  db.query(sql, [nombre, email, asunto, mensaje], (err, result) => {
    if (err) {
      // Se houver erro na execução, retornamos erro 500 com uma mensagem
      console.error("❌ Erro ao salvar mensagem:", err);
      res.status(500).json({ error: "Erro ao salvar mensagem" });
    } else {
      // Se der tudo certo, retornamos mensagem de sucesso
      res.status(201).json({ message: "✅ Mensagem salva com sucesso!" });
    }
  });
});

// Iniciamos o servidor na porta configurada e mostramos mensagem no console
app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
