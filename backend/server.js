////////////////////////////////////////////////////////////////////////////////
// ¡A continuación verás el archivo "server.js" completamente actualizado,
// con comentarios y textos en ESPAÑOL, y la nueva ruta DELETE /messages/:id
// que permite eliminar mensajes individuales.
//
// Importante: cada nueva mensaje se guarda con un "_id" único en data.json,
// para que luego podamos identificarlo y borrarlo con la ruta DELETE.
////////////////////////////////////////////////////////////////////////////////

import dotenv from "dotenv"; // Cargar variables de entorno desde .env
import express from "express"; // Framework para crear un servidor sencillo
import fs from "fs"; // Módulo para manipular archivos (como data.json)
import cors from "cors"; // Middleware para habilitar CORS

dotenv.config(); // Cargar las variables de entorno

const app = express();
const PORT = process.env.PORT || 3000; // Puerto configurado en .env o por defecto 3000
const DATA_FILE = "data.json"; // Archivo donde guardamos 'projects' y 'messages'

// Activamos CORS y el parseo de JSON en el body de las peticiones
app.use(cors());
app.use(express.json());

////////////////////////////////////////////////////////////////////////////////
// GET /projects → Retorna la lista de proyectos
app.get("/projects", (req, res) => {
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error al leer proyectos." });
    }

    // Si el archivo no está vacío, parseamos. Si no, creamos una estructura base
    const jsonData = data ? JSON.parse(data) : { projects: [], messages: [] };
    // Devolvemos solo la parte 'projects'
    return res.json(jsonData.projects || []);
  });
});

////////////////////////////////////////////////////////////////////////////////
// GET /messages → Retorna todas las mensajes
app.get("/messages", (req, res) => {
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error al leer mensajes." });
    }

    const jsonData = data ? JSON.parse(data) : { projects: [], messages: [] };
    // Devolvemos solo la parte 'messages'
    return res.json(jsonData.messages || []);
  });
});

////////////////////////////////////////////////////////////////////////////////
// POST /contact → Almacena un nuevo mensaje en data.json
app.post("/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validamos campos obligatorios
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "Faltan campos obligatorios (name, email, message)." });
  }

  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al acceder al archivo de datos." });
    }

    // Si el archivo está vacío o no existe, creamos un objeto base
    const jsonData = data ? JSON.parse(data) : { projects: [], messages: [] };

    // Generamos un _id único para cada mensaje
    // Puede ser simplemente la marca de tiempo (Date.now()) convertida a string
    const newId = Date.now().toString();

    // Creamos el objeto mensaje con subject incluido
    const newMessage = {
      _id: newId,
      name,
      email,
      subject,
      message,
    };

    // Agregamos el nuevo mensaje al array 'messages'
    jsonData.messages.push(newMessage);

    // Escribimos de vuelta en data.json
    fs.writeFile(
      DATA_FILE,
      JSON.stringify(jsonData, null, 2),
      "utf8",
      (writeErr) => {
        if (writeErr) {
          return res
            .status(500)
            .json({ error: "Error al guardar el mensaje." });
        }
        return res
          .status(201)
          .json({ message: "Mensaje almacenado con éxito." });
      }
    );
  });
});

////////////////////////////////////////////////////////////////////////////////
// DELETE /messages/:id → Eliminar un mensaje específico por su _id
app.delete("/messages/:id", (req, res) => {
  const { id } = req.params; // Obtenemos el id de la URL

  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al acceder al archivo de datos." });
    }

    // Si el archivo está vacío, creamos estructura base
    const jsonData = data ? JSON.parse(data) : { projects: [], messages: [] };

    // Buscamos los mensajes que NO coincidan con el id a eliminar
    const filteredMessages = jsonData.messages.filter((msg) => msg._id !== id);

    // Si la cantidad no cambió, significa que no se encontró el mensaje
    if (filteredMessages.length === jsonData.messages.length) {
      return res
        .status(404)
        .json({ error: "No se encontró un mensaje con ese ID." });
    }

    // Actualizamos la lista de mensajes
    jsonData.messages = filteredMessages;

    // Guardamos de vuelta en el archivo data.json
    fs.writeFile(
      DATA_FILE,
      JSON.stringify(jsonData, null, 2),
      "utf8",
      (writeErr) => {
        if (writeErr) {
          return res
            .status(500)
            .json({ error: "Error al eliminar el mensaje." });
        }
        return res.json({ message: "Mensaje eliminado con éxito." });
      }
    );
  });
});

////////////////////////////////////////////////////////////////////////////////
// Iniciamos el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`🚀 Servidor en ejecución en http://localhost:${PORT}`);
});
