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
    const data = await readFile("data.json", "utf-8"); // Leemos el contenido como texto
    return JSON.parse(data); // Convertimos el texto JSON en objeto
  } catch (error) {
    // En caso de error, devolvemos estructura vacía
    return { projects: [], messages: [] };
  }
};

// ✅ Guardamos los datos actualizados en el archivo JSON
const writeData = async (data) => {
  await writeFile("data.json", JSON.stringify(data, null, 2), "utf-8"); // Escribimos el JSON formateado
};

// ✅ Leemos la clave API y el email destino desde las variables de entorno (.env)
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const TO_EMAIL = process.env.TO_EMAIL;

// ✅ Creamos el servidor HTTP
const server = http.createServer(async (req, res) => {
  // ✅ Configuramos cabeceras CORS y tipo de contenido
  res.setHeader("Content-Type", "application/json"); // Indicamos que responderemos en formato JSON
  res.setHeader("Access-Control-Allow-Origin", "*"); // Permitimos solicitudes de cualquier origen
  res.setHeader("Access-Control-Allow-Methods", "GET, POST"); // Permitimos métodos GET y POST
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Permitimos cabecera Content-Type

  // ✅ Manejamos solicitudes OPTIONS (preflight)
  if (req.method === "OPTIONS") {
    res.writeHead(204); // 204 = Sin contenido
    return res.end(); // Terminamos la respuesta
  }

  // ✅ Ruta GET para obtener proyectos
  if (req.url === "/projects" && req.method === "GET") {
    const data = await readData(); // Leemos los proyectos desde data.json
    res.writeHead(200); // Respuesta exitosa
    return res.end(JSON.stringify(data.projects)); // Enviamos los proyectos al frontend
  }

  // ✅ Ruta POST para recibir mensajes del formulario de contacto
  if (req.url === "/contact" && req.method === "POST") {
    let body = ""; // Inicializamos la variable para recibir el cuerpo

    // ✅ Recibimos los datos del body en partes (chunks)
    req.on("data", (chunk) => {
      body += chunk.toString(); // Convertimos cada chunk a texto y lo agregamos
    });

    // ✅ Cuando terminamos de recibir, procesamos la solicitud
    req.on("end", async () => {
      try {
        const newMessage = JSON.parse(body); // Convertimos el texto recibido en objeto

        // ✅ Guardamos el mensaje en el archivo local (data.json)
        const data = await readData(); // Leemos los datos existentes
        data.messages.push(newMessage); // Agregamos el nuevo mensaje
        await writeData(data); // Guardamos el archivo actualizado

        // ✅ Enviamos el mensaje vía correo electrónico con la API de Brevo
      await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
          sender: {
            name: "Portafolio Victor Amadeu",
            email: "victoremmadrid@outlook.com", // 👈 remetente validado e funcional
          },

          to: [
            {
              email: "victoremmadrid@outlook.com", // 👈 destinatário principal
              name: "Victor Amadeu",
            },
          ],
          subject: `📬 Nuevo contacto desde el portafolio - ${newMessage.name}`,
          htmlContent: `
      <h2>¡Nueva mensaje recibido!</h2>
      <p><strong>Nombre:</strong> ${newMessage.name}</p>
      <p><strong>Email:</strong> ${newMessage.email}</p>
      <p><strong>Mensaje:</strong><br/>${newMessage.message}</p>
    `,
        },
        {
          headers: {
            "api-key": process.env.BREVO_API_KEY,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );


        // ✅ Enviamos respuesta al frontend
        res.writeHead(201); // 201 = creado con éxito
        res.end(JSON.stringify({ message: "Mensaje enviado con éxito." }));
      } catch (error) {
        // ✅ En caso de error en el envío, mostramos mensaje
        console.error("Error al enviar el correo:", error.message);
        res.writeHead(400); // 400 = error en los datos
        res.end(JSON.stringify({ error: "Error al procesar el mensaje." }));
      }
    });

    return; // Finalizamos el flujo
  }

  // ✅ Ruta no encontrada
  res.writeHead(404); // 404 = no encontrado
  res.end(JSON.stringify({ error: "Ruta no encontrada" })); // Enviamos error al frontend
});

// ✅ Iniciamos el servidor
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
