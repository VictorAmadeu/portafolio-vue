-- Ruta sugerida para guardar como evidencia:
-- docs/sql/portfolio_chatbot_vector.sql

-- 1) Habilitar pgvector en el schema recomendado por Supabase
create extension if not exists vector with schema extensions;

-- 2) Tabla de documentos del portafolio
create table if not exists public.portfolio_documents (
  id text primary key,
  title text not null,
  url text not null,
  tags text[] not null default '{}',
  content text not null,
  embedding extensions.vector(384) not null,
  is_public boolean not null default true,
  created_at timestamptz not null default now()
);

-- 3) Función de búsqueda semántica (cosine distance)
create or replace function public.match_portfolio_documents (
  query_embedding extensions.vector(384),
  match_threshold float,
  match_count int
)
returns table (
  id text,
  title text,
  url text,
  tags text[],
  content text,
  similarity float
)
language sql
stable
as $$
  select
    d.id,
    d.title,
    d.url,
    d.tags,
    d.content,
    1 - (d.embedding <=> query_embedding) as similarity
  from public.portfolio_documents d
  where d.is_public = true
    and (1 - (d.embedding <=> query_embedding)) >= match_threshold
  order by d.embedding <=> query_embedding asc
  limit least(match_count, 20);
$$;

-- 4) Índice HNSW para cosine distance
create index if not exists portfolio_documents_embedding_hnsw
on public.portfolio_documents
using hnsw (embedding vector_cosine_ops);

-- 5) RLS
alter table public.portfolio_documents enable row level security;

drop policy if exists "public read portfolio docs"
on public.portfolio_documents;

create policy "public read portfolio docs"
on public.portfolio_documents
for select
to anon, authenticated
using (is_public = true);