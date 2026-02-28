<template>
    <main class="not-found container py-5">
      <section class="not-found-card text-center" data-aos="fade-up">
        <p class="code">404</p>
        <h1 class="mb-3">Página no encontrada</h1>
        <p class="mb-3">
          La ruta solicitada no existe o el proyecto indicado no está disponible.
        </p>
        <p v-if="$route.query.from" class="requested-path mb-4">
          Ruta solicitada: {{ $route.query.from }}
        </p>
  
        <div class="actions">
          <router-link
            to="/projects"
            class="btn btn-primary custom-btn"
            aria-label="Volver al listado de proyectos"
          >
            <i class="fas fa-code"></i>
            Ver proyectos
          </router-link>
          <router-link to="/" class="btn btn-outline-light custom-btn" aria-label="Volver a inicio">
            <i class="fas fa-home"></i>
            Ir a inicio
          </router-link>
        </div>
      </section>
    </main>
  </template>
  
  <script>
  export default {
    name: "NotFoundView",
  };
  </script>
  
  <style scoped>
  .not-found {
    min-height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-100);
  }
  
  .not-found-card {
    width: 100%;
    max-width: 760px;
    border: 1px solid var(--color-border-soft);
    border-radius: 18px;
    padding: 2rem 1.4rem;
    background: linear-gradient(135deg, rgba(22, 27, 42, 0.88), rgba(19, 35, 55, 0.72));
    box-shadow: var(--shadow-soft);
  }
  
  .code {
    margin: 0 0 0.7rem;
    font-size: 3rem;
    font-weight: 700;
    color: var(--color-accent-cyan);
  }
  
  .not-found-card p {
    color: var(--color-text-300);
  }
  
  .requested-path {
    color: var(--color-text-400);
    word-break: break-word;
  }
  
  .actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .custom-btn {
    font-size: 1rem;
    padding: 11px 18px;
    border-radius: 14px;
    border: 1px solid var(--color-border-soft);
    color: var(--color-text-100);
    background: rgba(27, 32, 45, 0.78);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: transform 0.24s ease, border-color 0.24s ease, box-shadow 0.24s ease;
    min-width: 170px;
  }
  
  .custom-btn:hover {
    transform: translateY(-2px);
    border-color: var(--color-accent-cyan);
    box-shadow: 0 8px 20px rgba(8, 16, 34, 0.45);
    color: var(--color-text-100);
  }
  
  @media (max-width: 767.98px) {
    .custom-btn {
      width: 100%;
      min-width: 0;
    }
  }
  </style>
  