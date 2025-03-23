//////////////////////////////////////////////////////////////////////////
// ✅ Importamos módulos nativos de Node.js
//////////////////////////////////////////////////////////////////////////
import http from "http"; /* Importa el módulo 'http' de Node.js para crear el servidor */
import {
  readFile,
  writeFile,
} from "fs/promises"; /* Importa métodos de lectura/escritura de archivos como promesas */
import { parse } from "url"; /* Importa la función 'parse' para analizar rutas (pathname) de las solicitudes */

//////////////////////////////////////////////////////////////////////////
// ✅ Variables de entorno
//////////////////////////////////////////////////////////////////////////
import dotenv from "dotenv"; /* Importa dotenv para cargar variables de entorno desde un archivo .env */
dotenv.config(); /* Llama a la función config() para que dotenv lea y aplique las variables definidas en .env */

//////////////////////////////////////////////////////////////////////////
// ✅ Nodemailer
//////////////////////////////////////////////////////////////////////////
import nodemailer from "nodemailer"; /* Importa la librería nodemailer para enviar correos electrónicos */

//////////////////////////////////////////////////////////////////////////
// ✅ Configurar transporte Outlook
//////////////////////////////////////////////////////////////////////////
const transporter = nodemailer.createTransport({
  service:
    "hotmail" /* Especificamos que usaremos el servicio de correo 'hotmail' (Outlook) */,
  auth: {
    user: process.env
      .OUTLOOK_EMAIL /* Indica el correo Outlook desde las variables de entorno (.env) */,
    pass: process.env
      .OUTLOOK_APP_PASSWORD /* Indica la contraseña de aplicación generada en Outlook */,
  },
}); /* Esta constante 'transporter' es el objeto que usaremos para enviar emails con nodemailer */

//////////////////////////////////////////////////////////////////////////
// ✅ Puerto de escucha
//////////////////////////////////////////////////////////////////////////
const PORT =
  process.env.PORT ||
  3000; /* Toma el valor 'PORT' de .env o, si no existe, usa 3000 por defecto */

//////////////////////////////////////////////////////////////////////////
// ✅ Función para leer el JSON local (data.json)
//////////////////////////////////////////////////////////////////////////
const readData = async () => {
  try {
    /* Intentamos leer el archivo 'data.json' con la codificación 'utf-8' */
    const data = await readFile("data.json", "utf-8");
    /* Convertimos el contenido de texto en un objeto JavaScript */
    return JSON.parse(data);
  } catch (err) {
    /* Si hay algún error (por ejemplo, el archivo no existe), retornamos una estructura base */
    return { projects: [], messages: [] };
  }
};

//////////////////////////////////////////////////////////////////////////
// ✅ Función para guardar (escribir) el JSON local (data.json)
//////////////////////////////////////////////////////////////////////////
const writeData = async (data) => {
  /* Convertimos el objeto JavaScript 'data' en un texto JSON con 2 espacios de indentación */
  const jsonText = JSON.stringify(data, null, 2);
  /* Escribimos ese texto en el archivo 'data.json' con la codificación 'utf-8' */
  await writeFile("data.json", jsonText, "utf-8");
};

//////////////////////////////////////////////////////////////////////////
// ✅ Creamos el servidor HTTP
//////////////////////////////////////////////////////////////////////////
const server = http.createServer(async (req, res) => {
  /* Extraemos el 'pathname' de la URL de la petición usando 'parse' */
  const { pathname } = parse(req.url, true);

  ////////////////////////////////////////////////////////////////////////
  // CORS y cabeceras iniciales
  ////////////////////////////////////////////////////////////////////////
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  ); /* Permite solicitudes desde cualquier origen */
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS"
  ); /* Permite métodos GET, POST y OPTIONS */
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  ); /* Permite la cabecera 'Content-Type' */
  res.setHeader(
    "Content-Type",
    "application/json"
  ); /* Indicamos que la respuesta será de tipo JSON */

  ////////////////////////////////////////////////////////////////////////
  // Manejo de la petición OPTIONS (CORS preflight)
  ////////////////////////////////////////////////////////////////////////
  if (req.method === "OPTIONS") {
    res.writeHead(204); /* 204 significa "No Content" */
    return res.end(); /* Terminamos la respuesta inmediatamente */
  }

  ////////////////////////////////////////////////////////////////////////
  // ✅ GET /projects
  ////////////////////////////////////////////////////////////////////////
  if (pathname === "/projects" && req.method === "GET") {
    /* Llamamos a la función readData() para obtener los datos del archivo JSON */
    const data = await readData();
    /* Enviamos estado 200 (OK) para indicar que la solicitud tuvo éxito */
    res.writeHead(200);
    /* Convertimos 'data.projects' a JSON y lo enviamos como respuesta */
    return res.end(JSON.stringify(data.projects));
  }

  ////////////////////////////////////////////////////////////////////////
  // ✅ GET /messages → lista todas las mensajes
  ////////////////////////////////////////////////////////////////////////
  if (pathname === "/messages" && req.method === "GET") {
    /* Leemos el contenido actual de 'data.json' */
    const data = await readData();
    /* Devolvemos las mensajes que se han guardado en 'data.messages' */
    res.writeHead(200);
    /* Convertimos 'data.messages' en JSON y lo enviamos */
    return res.end(JSON.stringify(data.messages));
  }

  ////////////////////////////////////////////////////////////////////////
  // ✅ POST /contact
  ////////////////////////////////////////////////////////////////////////
  if (pathname === "/contact" && req.method === "POST") {
    /* Inicializamos una variable 'body' para ir concatenando los datos de la solicitud */
    let body = "";

    /* Evento 'data': se dispara cada vez que llega un chunk (fragmento) de datos */
    req.on("data", (chunk) => {
      /* Convertimos ese chunk a texto y lo añadimos a la variable 'body' */
      body += chunk.toString();
    });

    /* Evento 'end': se dispara cuando termina de llegar toda la data del body */
    req.on("end", async () => {
      try {
        /* Parseamos el body en formato JSON, obteniendo un objeto con { name, email, message } */
        const parsed = JSON.parse(body);

        /* Extraemos name, email y message del objeto 'parsed' */
        const { name, email, message } = parsed;

        /* Validamos que no falten datos obligatorios */
        if (!name || !email || !message) {
          /* Devolvemos estado 400 indicando que los campos son inválidos */
          res.writeHead(400);
          return res.end(
            JSON.stringify({ error: "Campos obrigatórios ausentes." })
          );
        }

        /* Leemos el archivo JSON actual para no sobreescribir lo existente */
        const data = await readData();
        /* Agregamos la nueva entrada de mensaje al array 'messages' */
        data.messages.push({ name, email, message });
        /* Guardamos los cambios en 'data.json' */
        await writeData(data);

        /* Enviamos un correo usando el objeto 'transporter' de Nodemailer */
        await transporter.sendMail({
          from: `"Portafolio Victor Amadeu" <${process.env.OUTLOOK_EMAIL}>` /* Remitente */,
          to: process.env.OUTLOOK_EMAIL /* Destinatario (nosotros mismos) */,
          subject: `📬 Nuevo contacto - ${name}` /* Asunto del correo */,
          html: `
            <h2>Nuevo mensaje recibido:</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mensaje:</strong> ${message}</p>
          ` /* Contenido en formato HTML */,
        });

        /* Respondemos con estado 201 (Created), indicando éxito */
        res.writeHead(201);
        res.end(JSON.stringify({ message: "Mensaje enviado con éxito." }));
      } catch (err) {
        /* Si ocurre un error, lo registramos en consola */
        console.error("❌ Erro ao processar mensagem:", err.message);
        /* Devolvemos 400 como indicación de datos malformados o error */
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Error al procesar el mensaje." }));
      }
    });

    /* Cuando usamos 'return;' aquí, indicamos que no se siga ejecutando el resto de código */
    return;
  }

  ////////////////////////////////////////////////////////////////////////
  // ❌ Ruta no encontrada
  ////////////////////////////////////////////////////////////////////////
  res.writeHead(
    404
  ); /* 404 indica que la ruta solicitada no existe en este servidor */
  res.end(
    JSON.stringify({ error: "Ruta no encontrada" })
  ); /* Enviamos un JSON de error */
});

//////////////////////////////////////////////////////////////////////////
// ✅ Iniciamos el servidor en el puerto definido (PORT)
//////////////////////////////////////////////////////////////////////////
server.listen(PORT, () => {
  /* Imprimimos un mensaje en consola para saber que el servidor está en marcha */
  console.log(`🚀 Servidor rodando en http://localhost:${PORT}`);
});
