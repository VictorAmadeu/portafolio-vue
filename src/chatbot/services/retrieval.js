// src/chatbot/services/retrieval.js
import { pipeline } from "@huggingface/transformers";
import { supabase } from "@/services/supabase.js";

let extractorPromise = null;

async function getExtractor() {
  if (!extractorPromise) {
    extractorPromise = pipeline(
      "feature-extraction",
      "Xenova/multilingual-e5-small"
    );
  }
  return extractorPromise;
}

async function embedQuery(extractor, text) {
  const output = await extractor(`query: ${text}`, {
    pooling: "mean",
    normalize: true,
  });
  return Array.from(output.data);
}

export async function retrieveContext(query, options = {}) {
  const {
    matchThreshold = 0.55,
    matchCount = 6,
  } = options;

  const extractor = await getExtractor();
  const queryEmbedding = await embedQuery(extractor, query);

  const { data, error } = await supabase.rpc("match_portfolio_documents", {
    query_embedding: queryEmbedding,
    match_threshold: matchThreshold,
    match_count: matchCount,
  });

  if (error) {
    throw new Error(error.message || "Error en retrieval");
  }

  return (data || []).map((row) => ({
    id: row.id,
    title: row.title,
    url: row.url,
    content: row.content,
    similarity: row.similarity,
    tags: row.tags || [],
  }));
}