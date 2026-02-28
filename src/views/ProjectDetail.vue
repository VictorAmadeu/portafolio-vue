<template>
    <main v-if="project" class="project-detail container py-5">
      <article>
        <header class="hero-card mb-5" data-aos="fade-up">
          <img
            :src="project.coverImage"
            :alt="`Portada del caso de estudio ${project.title}`"
            class="hero-image"
            loading="eager"
          />
  
          <div class="hero-copy">
            <p class="hero-eyebrow">Caso de estudio</p>
            <h1 class="hero-title">{{ project.title }}</h1>
            <p class="hero-subtitle">{{ project.subtitle }}</p>
  
            <div class="hero-actions">
              <a
                :href="project.links.github"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary custom-btn"
                :aria-label="`Abrir repositorio de ${project.title}`"
              >
                <i class="fab fa-github"></i>
                Ver GitHub
              </a>
  
              <a
                v-if="project.links.demo"
                :href="project.links.demo"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-secondary custom-btn"
                :aria-label="`Abrir demo de ${project.title}`"
              >
                <i class="fas fa-globe"></i>
                Ver demo
              </a>
  
              <router-link
                to="/projects"
                class="btn btn-outline-light custom-btn"
                aria-label="Volver al listado de proyectos"
              >
                <i class="fas fa-arrow-left"></i>
                Volver a proyectos
              </router-link>
            </div>
          </div>
        </header>
  
        <section class="mb-4" data-aos="fade-up">
          <h2 class="section-title">1. Contexto y problema</h2>
          <article class="panel-card mb-3">
            <h3 class="h6 fw-bold mb-2">Contexto</h3>
            <p class="mb-0">{{ project.context }}</p>
          </article>
          <article class="panel-card">
            <h3 class="h6 fw-bold mb-2">Problema a resolver</h3>
            <p class="mb-0">{{ project.problem }}</p>
          </article>
        </section>
  
        <section class="mb-4" data-aos="fade-up">
          <h2 class="section-title">2. Objetivos</h2>
          <article class="panel-card">
            <ul class="detail-list mb-0">
              <li v-for="goal in project.goals" :key="goal">{{ goal }}</li>
            </ul>
          </article>
        </section>
  
        <section class="mb-4" data-aos="fade-up">
          <h2 class="section-title">3. Stack y arquitectura</h2>
          <div class="row g-3">
            <div v-for="stackGroup in project.stack" :key="stackGroup.area" class="col-12 col-md-6">
              <article class="panel-card h-100">
                <h3 class="h6 fw-bold mb-2">{{ stackGroup.area }}</h3>
                <ul class="detail-list mb-0">
                  <li v-for="item in stackGroup.items" :key="item">{{ item }}</li>
                </ul>
              </article>
            </div>
          </div>
          <article class="panel-card architecture-card mt-3">
            <h3 class="h6 fw-bold mb-2">Arquitectura resumida</h3>
            <p class="mb-0">{{ project.architecture }}</p>
          </article>
        </section>
  
        <section class="mb-4" data-aos="fade-up">
          <h2 class="section-title">4. Funcionalidades destacadas</h2>
          <article v-for="feature in project.features" :key="feature.title" class="panel-card mb-3">
            <h3 class="h6 fw-bold mb-2">{{ feature.title }}</h3>
            <ul class="detail-list mb-0">
              <li v-for="featureItem in feature.items" :key="featureItem">{{ featureItem }}</li>
            </ul>
          </article>
        </section>
  
        <section class="mb-4" data-aos="fade-up">
          <h2 class="section-title">5. Capturas de producto</h2>
          <div class="row g-3">
            <div v-for="shot in project.screenshots" :key="shot.id" class="col-12 col-md-6">
              <figure class="panel-card screenshot-card h-100 mb-0">
                <img
                  v-if="shot.src"
                  :src="shot.src"
                  :alt="shot.alt"
                  class="screenshot-image"
                  loading="lazy"
                />
  
                <div
                  v-else
                  class="screenshot-placeholder"
                  role="img"
                  :aria-label="`Captura pendiente: ${shot.alt}`"
                >
                  <p class="placeholder-title">Captura pendiente</p>
                  <p class="placeholder-text">Añade la imagen en:</p>
                  <code>{{ shot.expectedPath }}</code>
                </div>
  
                <figcaption class="screenshot-caption">
                  <h3 class="h6 fw-bold mb-1">{{ shot.title }}</h3>
                  <p class="mb-0">{{ shot.description }}</p>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
  
        <section class="mb-4" data-aos="fade-up">
          <h2 class="section-title">6. Retos y soluciones</h2>
          <article
            v-for="challenge in project.challenges"
            :key="challenge.challenge"
            class="panel-card mb-3"
          >
            <h3 class="h6 fw-bold mb-2">{{ challenge.challenge }}</h3>
            <p class="mb-2"><strong>Solución:</strong> {{ challenge.solution }}</p>
            <p class="mb-0"><strong>Aprendizaje:</strong> {{ challenge.learning }}</p>
          </article>
        </section>
  
        <section class="mb-4" data-aos="fade-up">
          <h2 class="section-title">7. Resultados y aprendizajes</h2>
          <article class="panel-card">
            <ul class="detail-list mb-0">
              <li v-for="outcome in project.outcomes" :key="outcome.label">
                <strong>{{ outcome.label }}:</strong>
                {{ outcome.value }}
              </li>
            </ul>
          </article>
        </section>
  
        <section class="mb-4" data-aos="fade-up">
          <h2 class="section-title">8. Rol y colaboración</h2>
          <article class="panel-card">
            <ul class="detail-list mb-0">
              <li v-for="role in project.roles" :key="role">{{ role }}</li>
            </ul>
          </article>
        </section>
  
        <section class="panel-card cta-section" data-aos="fade-up">
          <h2 class="h4 fw-bold mb-3">Llamadas a la acción</h2>
          <p class="mb-3">
            Puedes revisar el código, navegar la demo o volver al listado para comparar más proyectos.
          </p>
          <div class="hero-actions">
            <a
              :href="project.links.github"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary custom-btn"
              :aria-label="`Revisar código de ${project.title}`"
            >
              <i class="fab fa-github"></i>
              Código
            </a>
            <a
              v-if="project.links.demo"
              :href="project.links.demo"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-secondary custom-btn"
              :aria-label="`Revisar demo de ${project.title}`"
            >
              <i class="fas fa-globe"></i>
              Demo
            </a>
            <a :href="cvUrl" download class="btn btn-outline-light custom-btn" aria-label="Descargar CV">
              <i class="fas fa-file-download"></i>
              Descargar CV
            </a>
            <router-link to="/projects" class="btn btn-outline-light custom-btn" aria-label="Volver a proyectos">
              <i class="fas fa-arrow-left"></i>
              Volver
            </router-link>
          </div>
        </section>
      </article>
    </main>
  </template>
  
  <script>
  import { getProjectBySlug } from "@/data/projects";
  
  const CV_URL = `${import.meta.env.BASE_URL}curriculo.pdf`;
  
  export default {
    name: "ProjectDetail",
    data() {
      return {
        cvUrl: CV_URL,
      };
    },
    computed: {
      project() {
        return getProjectBySlug(this.$route.params.slug);
      },
    },
    watch: {
      project: {
        immediate: true,
        handler(project) {
          if (!project) {
            this.$router.replace({
              name: "NotFound",
              query: { from: this.$route.fullPath },
            });
          }
        },
      },
    },
  };
  </script>
  
  <style scoped>
  .project-detail {
    color: var(--color-text-100);
    max-width: 1100px;
  }
  
  .hero-card {
    border: 1px solid var(--color-border-soft);
    border-radius: 18px;
    background: linear-gradient(135deg, rgba(22, 27, 42, 0.88), rgba(19, 35, 55, 0.72));
    box-shadow: var(--shadow-soft);
    display: grid;
    grid-template-columns: 1.05fr 1fr;
    gap: 0;
    overflow: hidden;
  }
  
  .hero-image {
    width: 100%;
    height: 100%;
    min-height: 300px;
    object-fit: cover;
    border-right: 1px solid var(--color-border-soft);
  }
  
  .hero-copy {
    padding: 1.25rem;
  }
  
  .hero-eyebrow {
    margin-bottom: 0.45rem;
    font-size: 0.9rem;
    color: var(--color-accent-emerald);
    font-weight: 600;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }
  
  .hero-title {
    margin-bottom: 0.5rem;
    font-size: 2rem;
    line-height: 1.2;
  }
  
  .hero-subtitle {
    margin-bottom: 1rem;
    color: var(--color-text-300);
  }
  
  .hero-actions {
    display: flex;
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
    min-width: 155px;
  }
  
  .custom-btn:hover {
    transform: translateY(-2px);
    border-color: var(--color-accent-cyan);
    box-shadow: 0 8px 20px rgba(8, 16, 34, 0.45);
    color: var(--color-text-100);
  }
  
  .custom-btn.btn-secondary {
    background: var(--color-btn-light);
    color: var(--color-btn-light-text);
    border-color: transparent;
  }
  
  .custom-btn.btn-secondary:hover {
    color: var(--color-btn-light-text);
  }
  
  .section-title {
    margin-bottom: 0.8rem;
    font-weight: 700;
  }
  
  .panel-card {
    border: 1px solid var(--color-border-soft);
    border-radius: 18px;
    background: linear-gradient(135deg, rgba(22, 27, 42, 0.88), rgba(19, 35, 55, 0.72));
    box-shadow: var(--shadow-soft);
    padding: 1rem 1.1rem;
  }
  
  .panel-card p {
    color: var(--color-text-300);
  }
  
  .detail-list {
    margin: 0;
    padding-left: 1.2rem;
    color: var(--color-text-300);
  }
  
  .detail-list li {
    margin-bottom: 0.45rem;
    line-height: 1.45;
  }
  
  .detail-list li:last-child {
    margin-bottom: 0;
  }
  
  .architecture-card p {
    color: var(--color-text-100);
  }
  
  .screenshot-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 0;
  }
  
  .screenshot-image {
    width: 100%;
    height: 240px;
    object-fit: cover;
    border-bottom: 1px solid var(--color-border-soft);
  }
  
  .screenshot-placeholder {
    height: 240px;
    padding: 1rem;
    border-bottom: 1px solid var(--color-border-soft);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.45rem;
    background: rgba(8, 14, 24, 0.75);
  }
  
  .placeholder-title {
    color: var(--color-text-100);
    font-weight: 700;
    margin: 0;
  }
  
  .placeholder-text {
    color: var(--color-text-300);
    margin: 0;
  }
  
  .screenshot-placeholder code {
    color: var(--color-accent-cyan);
    word-break: break-word;
  }
  
  .screenshot-caption {
    padding: 0.95rem 1rem 1rem;
  }
  
  .screenshot-caption p {
    color: var(--color-text-300);
  }
  
  .cta-section p {
    color: var(--color-text-300);
    max-width: 860px;
  }
  
  @media (max-width: 991.98px) {
    .hero-card {
      grid-template-columns: 1fr;
    }
  
    .hero-image {
      min-height: 250px;
      border-right: 0;
      border-bottom: 1px solid var(--color-border-soft);
    }
  }
  
  @media (max-width: 767.98px) {
    .project-detail {
      padding-top: 2rem !important;
    }
  
    .hero-title {
      font-size: 1.55rem;
    }
  
    .hero-actions {
      width: 100%;
    }
  
    .custom-btn {
      width: 100%;
      min-width: 0;
    }
  
    .screenshot-image,
    .screenshot-placeholder {
      height: 200px;
    }
  }
  </style>
  