// Carga variables de entorno
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 3000;
const SECRET = process.env.SECRET_KEY;

app.use(cors());
app.use(express.json());

// Conexión a MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar a MySQL:", err);
  } else {
    console.log("✅ Conectado a MySQL");
  }
});

// Ruta POST /api/login — valida credenciales y devuelve JWT
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  // Ejemplo: obtén de tu BD real el usuario y su hash
  const usuarioBD = { username: "admin", hash: "$2b$10$KIX..." };

  if (username !== usuarioBD.username) {
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }

  const match = await bcrypt.compare(password, usuarioBD.hash);
  if (!match) {
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }

  // Generar token (1h de validez)
  const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Middleware para proteger rutas
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token requerido" });
  }
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
}

// GET /messages — recupera todos los mensajes (protegido)
app.get("/messages", authMiddleware, (req, res) => {
  const sql = "SELECT * FROM mensajes ORDER BY fecha DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Error al buscar mensajes" });
    const messages = results.map((row) => ({
      _id: row.id,
      name: row.nombre,
      email: row.email,
      subject: row.asunto,
      message: row.mensaje,
      date: row.fecha,
    }));
    res.json(messages);
  });
});

// DELETE /messages/:id — borra un mensaje por su id (protegido)
app.delete("/messages/:id", authMiddleware, (req, res) => {
  const sql = "DELETE FROM mensajes WHERE id = ?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Error al borrar mensaje" });
    res.json({ success: true });
  });
});

// POST /mensajes — formulario de contacto (público)
app.post("/mensajes", (req, res) => {
  const { nombre, email, asunto, mensaje } = req.body;
  const sql =
    "INSERT INTO mensajes (nombre, email, asunto, mensaje) VALUES (?, ?, ?, ?)";
  db.query(sql, [nombre, email, asunto, mensaje], (err) => {
    if (err) return res.status(500).json({ error: "Error al guardar mensaje" });
    res.status(201).json({ message: "Mensaje guardado con éxito" });
  });
});

// Arrancar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor en http://localhost:${port}`);
});
