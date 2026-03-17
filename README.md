# Portafolio Vue con Node.js y Supabase

## Descripción

Este repositorio contiene mi portafolio profesional desarrollado con Vue 3 y Vite en el frontend, y con Node.js + Express en el backend. El portafolio publica una web estática en GitHub Pages y utiliza Supabase para persistir los mensajes del formulario de contacto.

## Tecnologías principales

- Vue 3
- Vite
- Vue Router
- Bootstrap 5
- Supabase
- Node.js + Express
- Vitest
- Playwright
- GitHub Actions

## Estructura del proyecto

- `src/`: código del frontend.
- `backend/`: servidor Node.js y rutas auxiliares.
- `public/`: activos estáticos.
- `docs/`: build de producción publicada en GitHub Pages.
- `.github/workflows/`: workflows de integración continua.
- `tests/unit/`: pruebas unitarias e integración del frontend.
- `tests/e2e/`: pruebas end-to-end.

## Requisitos previos

- Node.js 20 o superior.
- npm.
- Un archivo `.env` en la raíz del proyecto para desarrollo local.
- Un proyecto de Supabase con su URL pública y su clave anónima pública.

## Variables de entorno

Para desarrollo local necesitas estas variables en `.env`:

```bash
VITE_SUPABASE_URL=tu_url_publica_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anon_publica
VITE_API_URL=http://localhost:3000
SUPABASE_URL=tu_url_de_supabase
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
SECRET_KEY=tu_clave_secreta
PORT=3000
```

## Instalación

Instala las dependencias del frontend:

```bash
npm install
```

Instala las dependencias del backend:

```bash
cd backend
npm install
cd ..
```

## Desarrollo local

Arranca el backend:

```bash
npm run start
```

En otra terminal, arranca el frontend:

```bash
npm run dev
```

La aplicación quedará disponible normalmente en `http://localhost:5173`.

## Calidad y pruebas

Ejecuta el lint del frontend:

```bash
npm run lint
```

Ejecuta las pruebas unitarias e integración:

```bash
npm run test
```

Ejecuta las pruebas unitarias en modo watch:

```bash
npm run test:watch
```

Genera cobertura:

```bash
npm run test:coverage
```

Genera la build de producción:

```bash
npm run build
```

Ejecuta las pruebas end-to-end sobre la build de producción:

```bash
npm run test:e2e
```

Si quieres abrir la interfaz gráfica de Playwright:

```bash
npm run test:e2e:ui
```

## Qué cubren los tests

- Home y acciones principales del portfolio.
- Navegación principal hacia la vista de proyectos.
- Capa de datos de proyectos.
- Formulario de contacto en éxito y error.
- Flujo real de navegación en navegador.
- Menú responsive en móvil.
- Envío del formulario de contacto sin tocar Supabase real en E2E.

## CI/CD

El proyecto usa GitHub Actions para validar automáticamente:

- `npm ci`
- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run test:e2e`

Si el evento es un `push` a `main` y la build genera cambios en `docs/`, el workflow hace commit automático de `docs/` para que GitHub Pages publique la nueva versión.

## Secrets necesarios en GitHub

Configura estos secrets en el repositorio:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

No debes usar `SUPABASE_SERVICE_ROLE_KEY` en el workflow del frontend.

## Despliegue en GitHub Pages

Este proyecto publica el frontend desde:

- Rama: `main`
- Carpeta: `/docs`

La build de producción se genera con:

```bash
npm run build
```

Ese comando escribe los archivos finales dentro de `docs/`.

## Flujo recomendado de trabajo

1. Crear una rama desde `main`.
2. Desarrollar el cambio.
3. Ejecutar `npm run lint`.
4. Ejecutar `npm run test`.
5. Ejecutar `npm run build`.
6. Ejecutar `npm run test:e2e`.
7. Abrir una Pull Request contra `main`.

## Contribución

Si vas a contribuir:

1. Crea una rama desde `main`.
2. Haz cambios pequeños y comprobables.
3. Ejecuta todas las validaciones antes de abrir la PR.
4. Describe claramente qué problema resuelves.

## Autor

Desarrollado por Victor Amadeu Braga Heleno.
