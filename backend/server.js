////////////////////////////////////////////////////////////////////////////////
// Importações e configuração inicial
import dotenv from "dotenv"; // Usar variáveis de ambiente (.env)
import express from "express"; // Framework para criar servidor
import fs from "fs"; // Manipular arquivos (como data.json)
import cors from "cors"; // Permitir requisições de outros domínios

dotenv.config(); // Carregar variáveis de ambiente

const app = express(); // Criar app express
const PORT = process.env.PORT || 3000; // Porta do servidor
const DATA_FILE = "data.json"; // Caminho do arquivo de dados

app.use(cors()); // Ativar CORS
app.use(express.json()); // Permitir receber JSON no corpo das requisições

////////////////////////////////////////////////////////////////////////////////
// GET /projects → Retorna projetos
app.get("/projects", (req, res) => {
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Erro ao ler projetos." });
    const jsonData = data ? JSON.parse(data) : { projects: [], messages: [] };
    return res.json(jsonData.projects || []);
  });
});

////////////////////////////////////////////////////////////////////////////////
// GET /messages → Retorna todas as mensagens
app.get("/messages", (req, res) => {
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Erro ao ler mensagens." });
    const jsonData = data ? JSON.parse(data) : { projects: [], messages: [] };
    return res.json(jsonData.messages || []);
  });
});

////////////////////////////////////////////////////////////////////////////////
// POST /contact → Armazena uma nova mensagem
app.post("/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  // Verifica se os campos obrigatórios estão preenchidos
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Faltam campos obrigatórios." });
  }

  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Erro ao acessar o arquivo de dados." });

    const jsonData = data ? JSON.parse(data) : { projects: [], messages: [] };

    // Adiciona nova mensagem com subject incluído
    jsonData.messages.push({ name, email, subject, message });

    fs.writeFile(
      DATA_FILE,
      JSON.stringify(jsonData, null, 2),
      "utf8",
      (writeErr) => {
        if (writeErr)
          return res.status(500).json({ error: "Erro ao guardar a mensagem." });
        return res
          .status(201)
          .json({ message: "Mensagem armazenada com sucesso." });
      }
    );
  });
});

////////////////////////////////////////////////////////////////////////////////
// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
