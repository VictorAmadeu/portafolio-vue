import http from "http";
import fs from "fs";
import { readFile, writeFile } from "fs/promises";

// Definimos el puerto del servidor
const PORT = 3000;

// Función para leer el archivo JSON
const readData = async () => {
  try {
    const data = await readFile("data.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return { projects: [], messages: [] };
  }
};

// Función para escribir en el archivo JSON
const writeData = async (data) => {
  await writeFile("data.json", JSON.stringify(data, null, 2), "utf-8");
};

// Creamos el servidor HTTP
const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  // Configuración de CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // Ruta para obtener los proyectos
  if (req.url === "/projects" && req.method === "GET") {
    const data = await readData();
    res.writeHead(200);
    return res.end(JSON.stringify(data.projects));
  }

  // Ruta para recibir mensajes de contacto
  if (req.url === "/contact" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const newMessage = JSON.parse(body);
        const data = await readData();
        data.messages.push(newMessage);
        await writeData(data);

        res.writeHead(201);
        res.end(JSON.stringify({ message: "Mensaje recibido correctamente" }));
      } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Error procesando los datos" }));
      }
    });

    return;
  }

  // Ruta no encontrada
  res.writeHead(404);
  res.end(JSON.stringify({ error: "Ruta no encontrada" }));
});

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
