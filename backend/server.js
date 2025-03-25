// Importamos el módulo 'express' que nos permite crear un servidor web en Node.js
const express = require("express");

// Importamos el módulo 'cors' para permitir solicitudes desde otros dominios (Front-end)
const cors = require("cors");

// Importamos el módulo 'mysql2' para conectarnos con una base de datos MySQL
const mysql = require("mysql2");

// Creamos una instancia de la aplicación Express para manejar rutas y middlewares
const app = express();

// Definimos la variable 'port' para indicar en qué puerto se ejecutará nuestro servidor
// Si existe una variable de entorno (process.env.PORT), la utilizamos; si no, usamos 3000
const port = process.env.PORT || 3000;

// Usamos 'cors()' como middleware para permitir que el front-end acceda a este servidor
app.use(cors());

// Usamos 'express.json()' para que el servidor pueda interpretar datos JSON en el cuerpo de las solicitudes
app.use(express.json());

// Creamos la conexión con el servidor de base de datos MySQL
// Los datos de conexión (host, user, password, database, port) pueden venir de variables de entorno
// o definirse de forma explícita
const db = mysql.createConnection({
  host: process.env.DB_HOST, // Dirección del servidor MySQL
  user: process.env.DB_USER, // Usuario de la base de datos
  password: process.env.DB_PASSWORD, // Contraseña de la base de datos
  database: process.env.DB_NAME, // Nombre de la base de datos
  port: process.env.DB_PORT, // Puerto donde está escuchando MySQL
});

// Establecemos la conexión y comprobamos si hay errores
db.connect((err) => {
  if (err) {
    // Si existe un error en la conexión, lo mostramos en la consola
    console.error("❌ Erro al conectar al banco de datos MySQL:", err);
  } else {
    // Si todo va bien, mostramos un mensaje de éxito
    console.log("✅ Conectado al banco de datos MySQL con éxito!");
  }
});

// RUTA POST: '/mensajes'
// Recibe datos del formulario de contacto (desde el front-end Vue) y los inserta en la base de datos
app.post("/mensajes", (req, res) => {
  // Extraemos del cuerpo de la solicitud los campos que el usuario envía (nombre, email, asunto, mensaje)
  const { nombre, email, asunto, mensaje } = req.body;

  // Creamos la sentencia SQL que insertará los datos en la tabla 'mensajes'
  const sql =
    "INSERT INTO mensajes (nombre, email, asunto, mensaje) VALUES (?, ?, ?, ?)";

  // Ejecutamos la consulta, pasando los valores en un arreglo en el mismo orden que los signos de interrogación
  db.query(sql, [nombre, email, asunto, mensaje], (err, result) => {
    if (err) {
      // Si ocurre un error, mostramos en consola y devolvemos un mensaje de error al front-end
      console.error("❌ Erro al guardar mensaje:", err);
      return res.status(500).json({ error: "Erro ao salvar mensagem" });
    }
    // Si la inserción fue exitosa, enviamos un mensaje de confirmación al front-end
    res.status(201).json({ message: "✅ Mensagem salva com sucesso!" });
  });
});

// RUTA GET: '/messages'
// Recupera todas las filas de la tabla 'mensajes' ordenadas por fecha descendente
app.get("/messages", (req, res) => {
  // Sentencia SQL para seleccionar todo de la tabla 'mensajes' ordenado por fecha descendente
  const sql = "SELECT * FROM mensajes ORDER BY fecha DESC";

  // Ejecutamos la consulta
  db.query(sql, (err, results) => {
    if (err) {
      // Si ocurre un error, lo mostramos y devolvemos un estado HTTP 500 (error interno)
      console.error("Erro ao buscar mensagens:", err);
      return res.status(500).json({ error: "Erro ao buscar mensagens" });
    }

    // Mapeamos cada fila obtenida en un nuevo objeto con las claves que el front-end espera
    const messages = results.map((row) => ({
      _id: row.id, // Usamos _id para que Vue identifique cada mensaje
      name: row.nombre, // Nombre del remitente
      email: row.email, // Correo del remitente
      subject: row.asunto, // Asunto del mensaje
      message: row.mensaje, // Contenido del mensaje
      date: row.fecha, // Fecha en la que se envió o guardó el mensaje
    }));

    // Enviamos el arreglo de mensajes en formato JSON al front-end
    res.json(messages);
  });
});

// RUTA DELETE: '/messages/:id'
// Elimina un registro de la tabla 'mensajes' en función del 'id' que viene en la URL
app.delete("/messages/:id", (req, res) => {
  // Recuperamos el parámetro 'id' de la URL
  const id = req.params.id;

  // Creamos la sentencia SQL para eliminar un registro de la tabla 'mensajes' según su 'id'
  const sql = "DELETE FROM mensajes WHERE id = ?";

  // Ejecutamos la consulta pasando el 'id' como parámetro
  db.query(sql, [id], (err, result) => {
    if (err) {
      // Si ocurre un error, lo mostramos y respondemos con un estado 500
      console.error("Erro ao deletar mensagem:", err);
      return res.status(500).json({ error: "Erro ao deletar mensagem" });
    }
    // Si se ha eliminado correctamente, devolvemos una respuesta de éxito
    res.json({ success: true, message: "Mensagem deletada com sucesso" });
  });
});

// Ponemos a escuchar el servidor en el puerto definido anteriormente
// y mostramos un mensaje en la consola indicando que el servidor está en marcha
app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
