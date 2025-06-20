// Carga variables de entorno (.env en la misma carpeta)
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const port = process.env.PORT || 3000;
const SECRET = process.env.SECRET_KEY;

// ---- INTEGRACIÓN SUPABASE ----
// Usa SERVICE_ROLE_KEY solo en el backend para máxima seguridad
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.use(cors());
app.use(express.json());

// ---- Middleware de autenticación JWT ----
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

// ---- LOGIN de administrador ----
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  // Aquí deberías consultar una BD real, este es solo un ejemplo fijo:
  const usuarioBD = {
    username: "admin",
    hash: "$2b$10$MJq41D1uRXRg5ZZznCfJ/O8tBIxuO8/g8twT5tNs5h61.FocSLMn.", // cambia por tu hash real si cambias la clave
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

// ---- RUTAS PROTEGIDAS: Mensajes (ver/borrar) ----

// GET /api/messages — Recuperar mensajes SOLO si tienes token válido
app.get("/api/messages", authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("mensajes")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("❌ Error al buscar mensajes en Supabase:", error);
      return res.status(500).json({ error: "Error al buscar mensajes" });
    }

    // Puedes mapear los datos aquí si quieres compatibilidad especial:
    // (En este ejemplo, se envía el array tal cual)
    res.json(data);
  } catch (err) {
    console.error("❌ Error inesperado:", err);
    res.status(500).json({ error: "Error inesperado al buscar mensajes" });
  }
});

// DELETE /api/messages/:id — Borrar mensaje SOLO si tienes token válido
app.delete("/api/messages/:id", authMiddleware, async (req, res) => {
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

// ---- RUTA PÚBLICA: Guardar mensaje ----
app.post("/mensajes", async (req, res) => {
  const { nombre, email, mensaje, asunto } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const { data, error } = await supabase
      .from("mensajes")
      .insert([{ nombre, email, mensaje, asunto }])
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
