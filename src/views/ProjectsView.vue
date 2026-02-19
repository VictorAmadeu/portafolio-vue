<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Mis Proyectos</h1>

    <!-- Grid de tarjetas: 2 columnas en escritorio, 1 en móvil -->
    <div class="row g-4 justify-content-center">
      <div v-for="project in projects" :key="project.id" class="col-12 col-lg-6">
        <div class="card shadow-lg project-card h-100">
          <img
            :src="project.image"
            class="card-img-top project-image"
            :alt="`Captura de ${project.title}`"
          />
          <div class="card-body d-flex flex-column text-center">
            <h5 class="card-title">{{ project.title }}</h5>
            <p class="card-text flex-grow-1">{{ project.description }}</p>

            <!-- Acciones del proyecto -->
            <div class="project-actions">
              <a
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary"
              >
                <i class="fab fa-github"></i> Ver en GitHub
              </a>

              <a
                v-if="project.demo"
                :href="project.demo"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-secondary"
              >
                <i class="fas fa-globe"></i> Ver demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mediaKitImage from "@/assets/images/projects/media-kit-jhulyana.jpg";
import victorAiBlogImage from "@/assets/images/projects/victorai-blog.jpg";

export default {
  name: "ProjectsView",
  data() {
    return {
      // Proyectos reales publicados
      projects: [
        {
          id: 1,
          title: "Media Kit Jhulyana",
          description:
            "Proyecto web orientado a presentación de media kit y contenido digital.",
          image: mediaKitImage,
          github: "https://github.com/VictorAmadeu/media-kit-jhulyana",
          demo: "https://victoramadeu.github.io/media-kit-jhulyana/",
        },
        {
          id: 2,
          title: "VictorAI Blog",
          description:
            "Blog de aprendizaje del roadmap de IA desarrollado con Angular y Bootstrap.",
          image: victorAiBlogImage,
          github: "https://github.com/VictorAmadeu/victorai-blog",
          demo: "https://victorai-blog.vercel.app/",
        },
      ],
    };
  },
};
</script>

<style scoped>
.project-card {
  border-radius: 12px;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.project-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 12px;
}

@media (max-width: 768px) {
  .project-image {
    height: 220px;
  }

  .project-actions .btn {
    width: 100%;
  }
}
</style>
