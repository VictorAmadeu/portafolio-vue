<template>
  <main class="container mt-5 projects-view">
    <header class="text-center mb-4" data-aos="fade-up">
      <h1 class="mb-2">Mis Proyectos</h1>
      <p class="projects-intro">
        Cada proyecto incluye su caso de estudio con problema, decisiones técnicas y aprendizajes.
      </p>
    </header>

    <section class="row g-4 justify-content-center" aria-label="Listado de proyectos">
      <article
        v-for="project in projects"
        :key="project.slug"
        class="col-12 col-lg-6"
        data-aos="fade-up"
      >
        <div class="card shadow-lg project-card h-100">
          <img
            :src="project.coverImage"
            class="card-img-top project-image"
            :alt="`Portada del proyecto ${project.title}`"
            loading="lazy"
          />

          <div class="card-body d-flex flex-column">
            <h2 class="card-title h5">{{ project.title }}</h2>
            <p class="project-subtitle">{{ project.subtitle }}</p>
            <p class="card-text flex-grow-1">{{ project.problem }}</p>

            <div class="project-actions">
              <router-link
                :to="{ name: 'ProjectDetail', params: { slug: project.slug } }"
                class="btn btn-detail"
                :aria-label="`Ver caso de estudio de ${project.title}`"
              >
                <i class="fas fa-book-open"></i>
                Detalles
              </router-link>

              <a
                :href="project.links.github"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary"
                :aria-label="`Abrir repositorio de ${project.title} en GitHub`"
              >
                <i class="fab fa-github"></i>
                GitHub
              </a>

              <a
                v-if="project.links.demo"
                :href="project.links.demo"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-secondary"
                :aria-label="`Abrir demo pública de ${project.title}`"
              >
                <i class="fas fa-globe"></i>
                Demo
              </a>
            </div>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<script>
import { getProjects } from "@/data/projects";

export default {
  name: "ProjectsView",
  data() {
    return {
      projects: getProjects(),
    };
  },
};
</script>

<style scoped>
.projects-view {
  color: var(--color-text-100);
}

.projects-intro {
  color: var(--color-text-300);
  margin: 0 auto;
  max-width: 760px;
}

.project-card {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--color-border-soft);
  background: linear-gradient(135deg, rgba(22, 27, 42, 0.88), rgba(19, 35, 55, 0.72));
  box-shadow: var(--shadow-soft);
}

.project-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-bottom: 1px solid var(--color-border-soft);
}

.card-title {
  color: var(--color-text-100);
  margin-bottom: 0.35rem;
}

.project-subtitle {
  color: var(--color-text-300);
  margin-bottom: 0.7rem;
  font-size: 0.95rem;
}

.card-text {
  color: var(--color-text-300);
}

.project-actions {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.project-actions .btn {
  border-radius: 14px;
  border: 1px solid var(--color-border-soft);
  padding: 10px 16px;
  color: var(--color-text-100);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.project-actions .btn-detail {
  background: rgba(24, 40, 56, 0.92);
}

.project-actions .btn-detail:hover {
  border-color: var(--color-accent-cyan);
  background: rgba(33, 51, 72, 0.96);
  color: var(--color-text-100);
}

.project-actions .btn-primary {
  background: rgba(27, 32, 45, 0.88);
}

.project-actions .btn-primary:hover {
  border-color: var(--color-accent-cyan);
  background: rgba(34, 42, 60, 0.95);
  color: var(--color-text-100);
}

.project-actions .btn-secondary {
  background: rgba(27, 32, 45, 0.72);
}

.project-actions .btn-secondary:hover {
  border-color: var(--color-accent-teal);
  background: rgba(34, 42, 60, 0.95);
  color: var(--color-text-100);
}

@media (max-width: 768px) {
  .project-image {
    height: 220px;
  }

  .project-actions .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
