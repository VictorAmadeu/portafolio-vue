// ✅ Importamos módulos nativos de Node.js
import http from "http";
import { readFile, writeFile } from "fs/promises";

// ✅ Importamos dotenv para variáveis de ambiente
import dotenv from "dotenv";
dotenv.config();

// ✅ Importamos nodemailer
import nodemailer from "nodemailer";

// ✅ Configuração Nodemailer para Outlook
const transporter = nodemailer.createTransport({
  service: "hotmail", // serviço para Outlook/Hotmail
  auth: {
    user: process.env.OUTLOOK_EMAIL, // seu email Outlook no .env
    pass: process.env.OUTLOOK_APP_PASSWORD, // senha gerada (app password)
  },
});

// ✅ Porta padrão do backend
const PORT = process.env.PORT || 3000;

// ✅ Função para ler dados do JSON
const readData = async () => {
  try {
    const data = await readFile("data.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return { projects: [], messages: [] };
  }
};

// ✅ Função para salvar dados no JSON
const writeData = async (data) => {
  await writeFile("data.json", JSON.stringify(data, null, 2), "utf-8");
};

// ✅ Servidor HTTP simples
const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // GET (projetos)
  if (req.url === "/projects" && req.method === "GET") {
    const data = await readData();
    res.writeHead(200);
    return res.end(JSON.stringify(data.projects));
  }

  // POST (mensagens formulário)
  if (req.url === "/contact" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const newMessage = JSON.parse(body);

        // Salvamos no JSON local
        const data = await readData();
        data.messages.push(newMessage);
        await writeData(data);

        // Enviamos email usando Nodemailer
        await transporter.sendMail({
          from: `"Portafolio Victor Amadeu" <${process.env.OUTLOOK_EMAIL}>`, // remetente (seu email Outlook)
          to: process.env.OUTLOOK_EMAIL, // destinatário (seu próprio email)
          subject: `📬 Nuevo contacto desde el portafolio - ${newMessage.name}`,
          html: `
            <h2>¡Nuevo mensaje recibido desde tu portafolio!</h2>
            <p><strong>Nombre:</strong> ${newMessage.name}</p>
            <p><strong>Email:</strong> ${newMessage.email}</p>
            <p><strong>Mensaje:</strong><br/>${newMessage.message}</p>
          `,
        });

        res.writeHead(201);
        res.end(JSON.stringify({ message: "Mensaje enviado con éxito." }));
      } catch (error) {
        console.error("Error al enviar el correo:", error.message);
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Error al procesar el mensaje." }));
      }
    });

    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Ruta no encontrada" }));
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
