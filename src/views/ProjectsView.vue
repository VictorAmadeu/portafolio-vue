<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Meus Projetos</h1>

    <!-- Carrossel de Projetos -->
    <div id="carouselProjects" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div v-for="(project, index) in projects" :key="project.id" 
             :class="['carousel-item', { active: index === 0 }]">
          <div class="card mx-auto text-center shadow-lg" style="max-width: 800px;">
            <img :src="project.image" class="card-img-top img-fluid" :alt="project.title" />
            <div class="card-body">
              <h5 class="card-title">{{ project.title }}</h5>
              <p class="card-text">{{ project.description }}</p>
              <a :href="project.github" target="_blank" class="btn btn-primary">
                <i class="fab fa-github"></i> Ver no GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Controles do Carrossel -->
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselProjects" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselProjects" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Próximo</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectsView",
  data() {
    return {
      projects: [
        {
          id: 1,
          title: "Projeto 1",
          description: "Descrição detalhada do projeto 1.",
          image: "https://via.placeholder.com/800x400",
          github: "https://github.com/seuusuario/projeto1",
        },
        {
          id: 2,
          title: "Projeto 2",
          description: "Descrição detalhada do projeto 2.",
          image: "https://via.placeholder.com/800x400",
          github: "https://github.com/seuusuario/projeto2",
        },
        {
          id: 3,
          title: "Projeto 3",
          description: "Descrição detalhada do projeto 3.",
          image: "https://via.placeholder.com/800x400",
          github: "https://github.com/seuusuario/projeto3",
        },
      ],
    };
  },
};
</script>

<style scoped>
.carousel-item {
  transition: transform 0.6s ease-in-out;
}

.card {
  border-radius: 10px;
}

.card img {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.card-body {
  padding: 20px;
}
</style>
