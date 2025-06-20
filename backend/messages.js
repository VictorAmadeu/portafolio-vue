// backend/routes/messages.js
const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
const authMiddleware = require("../middlewares/auth");

// Usa la SERVICE_ROLE_KEY aquí
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// GET /api/messages (solo admin)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("mensajes")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("❌ Error al buscar mensajes en Supabase:", error);
      return res.status(500).json({ error: "Error al buscar mensajes" });
    }

    res.json(data);
  } catch (err) {
    console.error("❌ Error inesperado:", err);
    res.status(500).json({ error: "Error inesperado al buscar mensajes" });
  }
});

// DELETE /api/messages/:id (solo admin)
router.delete("/:id", authMiddleware, async (req, res) => {
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

module.exports = router;
