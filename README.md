# Portafolio Vue

Portafolio profesional de Victor Amadeu Braga Heleno construido como SPA con Vue 3 y Vite. El proyecto publica una web estatica en GitHub Pages, muestra perfil profesional, experiencia, certificaciones, casos de estudio de proyectos, formulario de contacto con Supabase y un chatbot RAG integrado para responder preguntas sobre el contenido del portafolio.

## Estado actual del proyecto

- Rama de trabajo documentada: `main`.
- Aplicacion principal: frontend Vue 3 servido y compilado con Vite.
- Publicacion del frontend: build estatica en `docs/`, preparada para GitHub Pages.
- Persistencia del formulario de contacto: Supabase desde el cliente.
- Chatbot: retrieval en el frontend con embeddings, Supabase pgvector/RPC y respuesta mediante Cloudflare Worker + Workers AI.
- Backend Express: presente en `backend/` para login y gestion de mensajes, aunque el formulario actual del frontend inserta directamente en Supabase.

## Stack principal

### Frontend

- Vue 3
- Vite
- Vue Router con `createWebHashHistory`
- Bootstrap 5
- Font Awesome
- AOS
- CSS global propio en `src/style.css` y `src/assets/theme-palette.css`

### Datos, IA y servicios

- Supabase JS
- Supabase PostgreSQL
- Supabase RPC `match_portfolio_documents` para retrieval semantico
- `@huggingface/transformers`
- Modelo de embeddings `Xenova/multilingual-e5-small`
- Cloudflare Workers
- Workers AI con modelo `@cf/meta/llama-3.1-8b-instruct-awq`

### Backend auxiliar

- Node.js
- Express
- CORS
- JWT
- bcrypt
- Supabase service role para operaciones administrativas

### Calidad

- ESLint
- Vitest
- Vue Test Utils
- Playwright
- GitHub Actions

## Arquitectura

La aplicacion se organiza en tres piezas principales:

1. Frontend Vue (`src/`)
   - `src/main.js` crea la app, registra el router, importa Bootstrap, AOS y estilos globales.
   - `src/App.vue` contiene la estructura comun: navbar fija, `router-view`, chatbot global y footer.
   - `src/router/index.js` define las rutas y usa hash history para evitar 404 en GitHub Pages.
   - `src/views/` contiene las pantallas principales.
   - `src/data/projects.js` centraliza los datos de los casos de estudio.

2. Chatbot RAG (`src/chatbot/`, `scripts/`, `worker-chatbot/`)
   - `ChatbotWidget.vue` se monta globalmente y permite preguntas sobre el portafolio.
   - `retrieval.js` genera embeddings en cliente y llama a Supabase RPC.
   - `portfolioDocuments.js` contiene el corpus publico del portafolio.
   - `scripts/chatbotIngest.mjs` genera embeddings de documentos y hace upsert en Supabase.
   - `worker-chatbot/src/index.js` expone `/api/chat`, valida CORS, aplica reglas de alcance y llama a Workers AI.

3. Backend Express (`backend/`)
   - `backend/server.js` expone rutas para login, consulta/borrado de mensajes y envio publico de mensajes.
   - Usa `SUPABASE_SERVICE_ROLE_KEY`, por lo que debe ejecutarse solo en entorno servidor.
   - Nota: el frontend actual no usa este backend para el formulario de contacto; `ContactView.vue` inserta directamente en Supabase.

## Funcionalidades

- Home con foto, perfil profesional, disponibilidad, formacion, experiencia, certificaciones y descarga de CV.
- Vista "Sobre mi" con propuesta de valor, stack agrupado, experiencia y formacion.
- Listado de proyectos desde datos estructurados.
- Detalle de proyecto por `slug` con contexto, problema, objetivos, stack, arquitectura, funcionalidades, capturas, retos, resultados y enlaces.
- Formulario de contacto con campos `nombre`, `email`, `asunto` y `mensaje`, persistido en Supabase.
- Pagina 404 para rutas no encontradas.
- Chatbot RAG con sugerencias rapidas, fuentes y control de alcance.
- Navegacion responsive con cierre de menu en movil.
- Build estatica compatible con GitHub Pages.

## Rutas

- `/#/`: Home.
- `/#/about`: Sobre mi.
- `/#/projects`: listado de proyectos.
- `/#/projects/:slug`: detalle de proyecto.
- `/#/contact`: contacto.
- `/#/404`: pagina no encontrada.

El uso de hash routing es intencional para GitHub Pages.

## Estructura del proyecto

```text
.
|-- .github/workflows/       # CI de validacion y actualizacion de docs en main
|-- backend/                 # Backend Express auxiliar
|-- docs/                    # Build de produccion para GitHub Pages
|-- public/                  # Activos publicos copiados en build
|-- scripts/                 # Scripts de mantenimiento e ingesta
|-- src/
|   |-- assets/              # Imagenes, paleta y recursos
|   |-- chatbot/             # Widget, retrieval, API client y corpus RAG
|   |-- components/          # Componentes Vue
|   |-- data/                # Datos estructurados de proyectos
|   |-- router/              # Configuracion de Vue Router
|   |-- services/            # Cliente Supabase
|   `-- views/               # Vistas principales
|-- tests/e2e/               # Pruebas Playwright
|-- tests/unit/              # Pruebas Vitest
|-- worker-chatbot/          # Cloudflare Worker del chatbot
|-- vite.config.js           # Vite, build en docs y Vitest
|-- playwright.config.js     # E2E contra preview de produccion
`-- package.json             # Scripts y dependencias del frontend
```

## Requisitos previos

- Node.js 20 o superior.
- npm.
- Proyecto de Supabase.
- Cloudflare account y Wrangler si se va a ejecutar o desplegar el Worker del chatbot.
- Navegadores de Playwright instalados para ejecutar E2E.

## Variables de entorno

### Frontend

Crear un `.env` en la raiz del proyecto:

```bash
VITE_SUPABASE_URL=tu_url_publica_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key_publica_de_supabase
VITE_CHATBOT_API_URL=https://tu-worker.example.workers.dev
```

`VITE_CHATBOT_API_URL` debe apuntar al Worker que expone `/api/chat`. Si falta, el widget se renderiza, pero no podra completar respuestas del chatbot.

Nota: `.env.example` tambien contiene `VITE_API_URL`, pero no hay uso observado de esa variable en el frontend actual.

### Backend Express

El backend carga variables con `dotenv` desde su proceso Node. Si se ejecuta desde la raiz con `npm run start`, define estas variables en el entorno disponible para `backend/server.js`:

```bash
SUPABASE_URL=tu_url_de_supabase
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
SECRET_KEY=tu_clave_para_firmar_jwt
PORT=3000
```

`SUPABASE_SERVICE_ROLE_KEY` nunca debe exponerse en el frontend ni en GitHub Pages.

### Script de ingesta RAG

```bash
SUPABASE_URL=tu_url_de_supabase
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

### Cloudflare Worker

`worker-chatbot/wrangler.toml` define:

```toml
ALLOWED_ORIGIN = "https://victoramadeu.github.io"
```

Para desarrollo local, el Worker tambien acepta `http://localhost:5173` desde el codigo.

## Supabase

Uso observado en el codigo:

- Tabla `mensajes`
  - Usada por el formulario de contacto.
  - Columnas insertadas desde frontend: `nombre`, `email`, `asunto`, `mensaje`.
  - El backend tambien consulta y borra registros por `id`.

- Tabla `portfolio_documents`
  - Usada por el chatbot RAG.
  - El script de ingesta hace upsert con `id`, `title`, `url`, `tags`, `content`, `embedding` e `is_public`.
  - El embedding generado por `Xenova/multilingual-e5-small` tiene dimension 384.

- RPC `match_portfolio_documents`
  - Llamada desde el frontend con `query_embedding`, `match_threshold` y `match_count`.
  - Devuelve documentos con `id`, `title`, `url`, `content`, `similarity` y `tags`.

Nota importante: el repositorio no incluye migraciones SQL ni esquema versionado de Supabase. La estructura anterior esta documentada por uso real del codigo, no por DDL incluido en el repo. Antes de desplegar en un entorno nuevo hay que crear las tablas, politicas RLS, extension/vector de pgvector y la funcion RPC correspondiente.

## Instalacion

Instalar dependencias del frontend:

```bash
npm install
```

Instalar dependencias del backend auxiliar:

```bash
cd backend
npm install
cd ..
```

Instalar dependencias del Worker del chatbot:

```bash
cd worker-chatbot
npm install
cd ..
```

## Ejecucion local

### Frontend

```bash
npm run dev
```

Vite suele servir la aplicacion en:

```text
http://localhost:5173
```

### Backend Express auxiliar

Desde la raiz:

```bash
npm run start
```

O desde `backend/`:

```bash
cd backend
npm run start
```

Por defecto escucha en:

```text
http://localhost:3000
```

### Worker del chatbot

```bash
cd worker-chatbot
npm run dev
```

Para que el chatbot funcione en local, `VITE_CHATBOT_API_URL` debe apuntar a la URL local que exponga Wrangler.

## Build y preview

Generar build de produccion:

```bash
npm run build
```

La build se escribe en `docs/` por configuracion de `vite.config.js`:

```js
build: {
  outDir: "docs",
  copyPublicDir: true
}
```

Previsualizar la build:

```bash
npm run preview
```

Playwright usa el preview en:

```text
http://127.0.0.1:4173/portafolio-vue/
```

## Despliegue

### GitHub Pages

Configuracion observada:

- `package.json` define `homepage` como `https://victoramadeu.github.io/portafolio-vue`.
- `vite.config.js` define `base: "/portafolio-vue/"`.
- La build de produccion se genera en `docs/`.
- El router usa hash history para evitar problemas de 404 en GitHub Pages.

El flujo esperado es:

```bash
npm run build
```

Despues, GitHub Pages debe publicar desde:

- Rama: `main`
- Carpeta: `/docs`

### GitHub Actions

El workflow `.github/workflows/ci.yml` se ejecuta en push y pull request contra `main`:

1. `npm ci`
2. Instalacion de Chromium para Playwright.
3. `npm run lint`
4. `npm run test`
5. `npm run build`
6. `npm run test:e2e`

En push a `main`, si `docs/` cambia despues del build, el workflow hace commit automatico de `docs/` con el build de produccion.

Secrets usados por el workflow:

```bash
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_CHATBOT_API_URL
```

### Cloudflare Worker

El Worker del chatbot se despliega manualmente desde `worker-chatbot/`:

```bash
cd worker-chatbot
npm run deploy
```

Nota: no hay workflow observado que despliegue automaticamente el Worker.

## Ingesta del corpus del chatbot

El corpus publico vive en:

```text
src/chatbot/knowledge/portfolioDocuments.js
```

Para generar embeddings y sincronizarlos con Supabase:

```bash
npm run chatbot:ingest
```

El script:

- carga `portfolioDocuments`;
- divide documentos largos en chunks;
- genera embeddings con prefijo `passage:`;
- usa `Xenova/multilingual-e5-small`;
- hace upsert en `portfolio_documents`.

## Calidad y pruebas

Lint:

```bash
npm run lint
```

Pruebas unitarias:

```bash
npm run test
```

Modo watch:

```bash
npm run test:watch
```

Cobertura:

```bash
npm run test:coverage
```

Pruebas E2E:

```bash
npm run test:e2e
```

Interfaz de Playwright:

```bash
npm run test:e2e:ui
```

Tests del Worker:

```bash
cd worker-chatbot
npm run test
```

## Buenas practicas del proyecto

- Mantener `main` como rama de integracion y abrir PRs desde ramas de trabajo.
- Ejecutar `npm run lint`, `npm run test`, `npm run build` y `npm run test:e2e` antes de fusionar cambios.
- No commitear claves privadas ni `SUPABASE_SERVICE_ROLE_KEY`.
- Mantener `docs/` como salida de build, no como fuente manual de desarrollo.
- Actualizar `src/data/projects.js` cuando cambien los casos de estudio.
- Actualizar `src/chatbot/knowledge/portfolioDocuments.js` y ejecutar `npm run chatbot:ingest` cuando cambie informacion que el chatbot debe conocer.
- Documentar cualquier cambio de Supabase con SQL/migraciones si se incorpora una carpeta de schema en el futuro.
- Mantener el Worker separado del frontend para no exponer logica sensible ni llamadas directas a Workers AI desde el navegador.

## Notas conocidas

- El repo no incluye migraciones ni DDL de Supabase; el esquema debe reconstruirse a partir del uso del codigo o documentarse en una futura carpeta `supabase/`.
- Hay un backend Express auxiliar, pero el formulario actual del frontend usa Supabase directamente.
- `VITE_API_URL` aparece en `.env.example`, pero no se observa uso real en `src/`.
- El despliegue automatico observado cubre el frontend en GitHub Pages; el Worker del chatbot se despliega aparte con Wrangler.

## Autor

Desarrollado por Victor Amadeu Braga Heleno.
