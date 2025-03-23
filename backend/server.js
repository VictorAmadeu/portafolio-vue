// ✅ Importamos módulos nativos de Node.js
import http from "http";
import { readFile, writeFile } from "fs/promises";

// ✅ Importamos axios para realizar solicitudes HTTP a la API de Brevo
import axios from "axios";

// ✅ Importamos dotenv para leer las variables de entorno desde el archivo .env
import dotenv from "dotenv";
dotenv.config(); // Carga las variables del archivo .env

// ✅ Definimos el puerto del servidor (desde .env o por defecto 3000)
const PORT = process.env.PORT || 3000;

// ✅ Leemos los datos del archivo JSON (proyectos y mensajes)
const readData = async () => {
  try {
    const data = await readFile("data.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return { projects: [], messages: [] }; // En caso de error, devolvemos estructura vacía
  }
};

// ✅ Guardamos los datos actualizados en el archivo JSON
const writeData = async (data) => {
  await writeFile("data.json", JSON.stringify(data, null, 2), "utf-8");
};

// ✅ Leemos la clave API y el email destino desde las variables de entorno (.env)
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const TO_EMAIL = process.env.TO_EMAIL;

// ✅ Creamos el servidor HTTP
const server = http.createServer(async (req, res) => {
  // ✅ Configuramos cabeceras CORS y tipo de contenido
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Manejamos solicitudes OPTIONS (preflight)
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // ✅ Ruta GET para obtener proyectos
  if (req.url === "/projects" && req.method === "GET") {
    const data = await readData();
    res.writeHead(200);
    return res.end(JSON.stringify(data.projects));
  }

  // ✅ Ruta POST para recibir mensajes del formulario de contacto
  if (req.url === "/contact" && req.method === "POST") {
    let body = "";

    // ✅ Recibimos los datos del body
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // ✅ Cuando terminamos de recibir, procesamos la solicitud
    req.on("end", async () => {
      try {
        const newMessage = JSON.parse(body); // Convertimos el body en objeto

        // ✅ Guardamos el mensaje en el archivo JSON
        const data = await readData();
        data.messages.push(newMessage);
        await writeData(data);

        // ✅ Enviamos el mensaje vía correo electrónico con Brevo
        await axios.post(
          "https://api.brevo.com/v3/smtp/email",
          {
            sender: {
              name: "Portafolio Victor Amadeu",
              email: "noreply@victorportafolio.com", // Puede ser ficticio
            },
            to: [
              {
                email: TO_EMAIL,
                name: "Victor Amadeu",
              },
            ],
            subject: `📬 Nuevo mensaje - ${newMessage.nome}`,
            htmlContent: `
              <h2>Nuevo mensaje recibido</h2>
              <p><strong>Nombre:</strong> ${newMessage.nome}</p>
              <p><strong>Email:</strong> ${newMessage.email}</p>
              <p><strong>Mensaje:</strong><br/>${newMessage.mensagem}</p>
            `,
          },
          {
            headers: {
              "api-key": BREVO_API_KEY,
              "Content-Type": "application/json",
              accept: "application/json",
            },
          }
        );

        // ✅ Enviamos respuesta al frontend
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

  // ✅ Ruta no encontrada
  res.writeHead(404);
  res.end(JSON.stringify({ error: "Ruta no encontrada" }));
});

// ✅ Iniciamos el servidor
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
