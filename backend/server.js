// Carga variables de entorno (.env en la misma carpeta)
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ---- INTEGRACIÓN SUPABASE ----
const { createClient } = require("@supabase/supabase-js");
// ATENCIÓN: Usar SERVICE ROLE KEY, no ANON KEY
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const app = express();
const port = process.env.PORT || 3000;
const SECRET = process.env.SECRET_KEY;

app.use(cors());
app.use(express.json());

// ---- LOGIN (SIN CAMBIOS) ----
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  // Ejemplo: obtén de tu BD real el usuario y su hash
  const usuarioBD = {
    username: "admin",
    hash: "$2b$10$MJq41D1uRXRg5ZZznCfJ/O8tBIxuO8/g8twT5tNs5h61.FocSLMn.",
  };

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

// ---- Middleware de autenticación (SIN CAMBIOS) ----
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

// ---- GET /messages — Recuperar mensajes (usando Supabase) ----
app.get("/messages", authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("mensajes")
      .select("*")
      .order("id", { ascending: false });
      

    if (error) {
      console.error("❌ Error al buscar mensajes en Supabase:", error);
      return res.status(500).json({ error: "Error al buscar mensajes" });
    }

    // Mapeo para compatibilidad con el frontend
    const messages = data.map((row) => ({
      _id: row.id,
      name: row.nombre,
      email: row.email,
      subject: row.asunto, // Asegúrate que la columna 'asunto' exista si la necesitas
      message: row.mensaje,
      date: row.fecha,
    }));

    res.json(messages);
  } catch (err) {
    console.error("❌ Error inesperado:", err);
    res.status(500).json({ error: "Error inesperado al buscar mensajes" });
  }
});

// ---- DELETE /messages/:id — Borrar mensaje por ID (usando Supabase) ----
app.delete("/messages/:id", authMiddleware, async (req, res) => {
  try {
    const { error } = await supabase
      .from("mensajes")
      .delete()
      .eq("id", req.params.id);

    if (error) {
      console.error("❌ Error al borrar mensaje en Supabase:", error);
      return res.status(500).json({ error: "Error al borrar mensaje" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error inesperado:", err);
    res.status(500).json({ error: "Error inesperado al borrar mensaje" });
  }
});

// ---- POST /mensajes — Guardar mensaje en Supabase (público) ----
app.post("/mensajes", async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const { data, error } = await supabase
      .from("mensajes")
      .insert([{ nombre, email, mensaje }])
      .select();

    if (error) {
      console.error("❌ Error en Supabase:", error);
      return res
        .status(500)
        .json({ error: "Error al guardar el mensaje en Supabase" });
    }

    res.status(201).json({ id: data[0]?.id, éxito: true });
  } catch (err) {
    console.error("❌ Error inesperado:", err);
    res.status(500).json({ error: "Error inesperado al guardar el mensaje" });
  }
});

// ---- Arrancar servidor ----
app.listen(port, () => {
  console.log(`🚀 Servidor en http://localhost:${port}`);
});
