// scripts/chatbotIngest.mjs
//
// Ingesta del corpus del chatbot en Supabase (pgvector).
// Requisitos:
// - SUPABASE_URL
// - SUPABASE_SERVICE_ROLE_KEY
//
// IMPORTANTE: Este script NO se ejecuta en el frontend. Solo local.
//
// Modelo de embeddings:
// - Xenova/multilingual-e5-small (dimensión 384 verificada en config del modelo)
// - Añadir prefijos "passage:" para indexado (E5).
//
// Referencias:
// - El modelo E5 recomienda prefijos query/passage para rendimiento.
// - La dimensión 384 debe coincidir con la columna vector(384).

import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { pipeline } from "@huggingface/transformers";
import { portfolioDocuments } from "../src/chatbot/knowledge/portfolioDocuments.js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Faltan env vars: SUPABASE_URL y/o SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

function chunkText(text, maxChars = 900, overlapChars = 120) {
  const clean = text.replace(/\s+/g, " ").trim();

  if (clean.length <= maxChars) return [clean];

  const chunks = [];
  let start = 0;

  while (start < clean.length) {
    const end = Math.min(start + maxChars, clean.length);
    const slice = clean.slice(start, end);

    chunks.push(slice);

    if (end === clean.length) break;

    start = end - overlapChars;
    if (start < 0) start = 0;
  }

  return chunks;
}

// Nota: algunos modelos devuelven tensores; aquí extraemos un vector plano
// con pooling mean + normalize.
async function embedPassage(extractor, text) {
  const output = await extractor(`passage: ${text}`, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data);
}

async function main() {
  console.log("Inicializando pipeline de embeddings...");

  const extractor = await pipeline(
    "feature-extraction",
    "Xenova/multilingual-e5-small"
  );

  const rows = [];

  for (const doc of portfolioDocuments) {
    const pieces = chunkText(doc.content);

    for (let i = 0; i < pieces.length; i++) {
      const chunkId =
        pieces.length === 1 ? doc.id : `${doc.id}__chunk_${i + 1}`;

      const chunkTitle =
        pieces.length === 1
          ? doc.title
          : `${doc.title} (chunk ${i + 1})`;

      console.log(`Embedding: ${chunkId}`);

      const embedding = await embedPassage(extractor, pieces[i]);

      rows.push({
        id: chunkId,
        title: chunkTitle,
        url: doc.url,
        tags: doc.tags,
        content: pieces[i],
        embedding,
        is_public: true,
      });
    }
  }

  console.log(`Upsert de ${rows.length} filas en Supabase...`);

  const { error } = await supabase
    .from("portfolio_documents")
    .upsert(rows, { onConflict: "id" });

  if (error) {
    console.error("Error en upsert:", error);
    process.exit(1);
  }

  console.log("Ingesta completada.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Fallo inesperado:", err);
  process.exit(1);
});