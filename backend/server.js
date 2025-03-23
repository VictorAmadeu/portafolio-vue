////////////////////////////////////////////////////////////////////////////////
// 1) Importamos 'dotenv' para poder usar variables de entorno definidas en .env
import dotenv from "dotenv";
////////////////////////////////////////////////////////////////////////////////
// 2) Llamamos a la función config() para que se carguen las variables de .env
dotenv.config();
////////////////////////////////////////////////////////////////////////////////
// 3) Importamos 'express' para crear un servidor de forma sencilla
import express from "express";
////////////////////////////////////////////////////////////////////////////////
// 4) Importamos 'fs' (File System) para leer/escribir nuestro archivo data.json
import fs from "fs";
////////////////////////////////////////////////////////////////////////////////
// 5) Importamos 'cors' para permitir solicitudes desde otros orígenes (CORS)
import cors from "cors";
////////////////////////////////////////////////////////////////////////////////
// 6) Creamos la aplicación Express
const app = express();
////////////////////////////////////////////////////////////////////////////////
// 7) Definimos el puerto: si existe en las variables de entorno, lo usa; de lo contrario, 3000
const PORT = process.env.PORT || 3000;
////////////////////////////////////////////////////////////////////////////////
// 8) Definimos la ruta (archivo) donde guardaremos y leeremos nuestros datos
const DATA_FILE = "data.json";
////////////////////////////////////////////////////////////////////////////////
// 9) Habilitamos CORS en la app, para evitar problemas de seguridad al hacer fetch desde el frontend
app.use(cors());
////////////////////////////////////////////////////////////////////////////////
// 10) Habilitamos el parseo de JSON en el body de las solicitudes
app.use(express.json());
////////////////////////////////////////////////////////////////////////////////
// 11) Ruta GET /projects → Devuelve la lista de proyectos desde DATA_FILE
app.get("/projects", (req, res) => {
  // 11.1) Leemos el archivo data.json de forma asíncrona (en este caso, con callback)
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    // 11.2) Si hay error al leer el archivo, respondemos con código 500 (Internal Server Error)
    if (err) {
      return res.status(500).json({ error: "Error al leer proyectos." });
    }
    // 11.3) Si data no está vacío, lo convertimos de texto a objeto JavaScript, si no, un array vacío
    const jsonData = data ? JSON.parse(data) : { projects: [], messages: [] };
    // 11.4) Devolvemos la parte 'projects' en la respuesta
    return res.json(jsonData.projects || []);
  });
});
////////////////////////////////////////////////////////////////////////////////
// 12) Ruta GET /messages → Devuelve todas las "mensajes" guardadas en DATA_FILE
app.get("/messages", (req, res) => {
  // 12.1) Leemos el archivo data.json
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    // 12.2) Si ocurre algún error de lectura, enviamos estado 500
    if (err) {
      return res.status(500).json({ error: "Error al leer mensajes." });
    }
    // 12.3) Si todo va bien, convertimos el contenido a objeto
    const jsonData = data ? JSON.parse(data) : { projects: [], messages: [] };
    // 12.4) Retornamos el array de mensajes
    return res.json(jsonData.messages || []);
  });
});
////////////////////////////////////////////////////////////////////////////////
// 13) Ruta POST /contact → Guarda un nuevo mensaje en DATA_FILE (sin enviar email)
app.post("/contact", (req, res) => {
  // 13.1) 'req.body' debería contener { name, email, message }, que llegan desde el frontend
  const { name, email, message } = req.body;

  // 13.2) Validamos campos mínimos
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Faltan campos obligatorios." });
  }

  // 13.3) Leemos el archivo data.json para no pisar la información previa
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    // 13.4) Si falla la lectura, devolvemos error 500
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al acceder al archivo de datos." });
    }

    // 13.5) Convertimos a objeto o, si estaba vacío/inexistente, creamos una estructura base
    const jsonData = data ? JSON.parse(data) : { projects: [], messages: [] };

    // 13.6) Agregamos el nuevo mensaje al array 'messages'
    jsonData.messages.push({ name, email, message });

    // 13.7) Guardamos los cambios en el archivo data.json
    fs.writeFile(
      DATA_FILE,
      JSON.stringify(jsonData, null, 2),
      "utf8",
      (writeErr) => {
        // 13.8) Si hay error al escribir, devolvemos estado 500
        if (writeErr) {
          return res
            .status(500)
            .json({ error: "Error al guardar el mensaje." });
        }
        // 13.9) Devolvemos estado 201 (Created) indicando que todo salió bien
        return res
          .status(201)
          .json({ message: "Mensaje almacenado con éxito." });
      }
    );
  });
});
////////////////////////////////////////////////////////////////////////////////
// 14) Ponemos el servidor a escuchar en el puerto definido
app.listen(PORT, () => {
  // 14.1) Mensaje de confirmación en la consola
  console.log(`🚀 Servidor rodando en http://localhost:${PORT}`);
});
////////////////////////////////////////////////////////////////////////////////
