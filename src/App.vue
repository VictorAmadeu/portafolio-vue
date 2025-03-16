<template>
  <div>
    <!-- Navbar fixa na parte superior -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <!-- Logo com ícone na navbar -->
        <router-link to="/" class="navbar-brand fw-bold">
          <i class="fas fa-laptop-code"></i> Mi Portafolio
        </router-link>

        <!-- Botão de colapso para dispositivos móveis -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Alternar navegação"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Menú de navegação -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <!-- Link correto para a página de início -->
              <router-link to="/" class="nav-link">
                <i class="fas fa-home"></i> Inicio
              </router-link>
            </li>
            <li class="nav-item">
              <!-- Link correto para a página de contato -->
              <router-link to="/contact" class="nav-link">
                <i class="fas fa-envelope"></i> Contacto
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Conteúdo principal dinâmico -->
    <router-view></router-view>

    <!-- Rodapé -->
    <footer class="footer bg-dark text-white text-center py-4">
      <div class="container">
        <p class="mb-3">© 2025 Mi Portafolio. Todos los derechos reservados.</p>

        <!-- Ícones de redes sociais -->
        <div class="footer-icons">
          <a href="https://www.linkedin.com/in/victor-amadeu-braga-heleno-583870266/" target="_blank">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="https://www.instagram.com/victoramadeu_?igsh=MXQxeTllNDl5MHp4dA==" target="_blank">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://github.com/VictorAmadeu" target="_blank">
            <i class="fab fa-github"></i>
          </a>
          <a href="mailto:victor@example.com">
            <i class="fas fa-envelope"></i>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App", // Nome do componente principal
};
</script>

<style scoped>
/* ====== Estilos para a Navbar ====== */
.navbar {
  padding: 15px 20px; /* Espaçamento interno para melhorar a aparência */
  transition: background-color 0.3s ease-in-out; /* Transição suave ao mudar de cor */
}

/* Estilos dos links na navbar */
.navbar-nav .nav-link {
  font-size: 1.1rem; /* Ajusta o tamanho do texto */
  font-weight: 500; /* Deixa o texto em negrito moderado */
  transition: color 0.3s ease-in-out, border-bottom 0.3s ease-in-out;
}

/* Efeito hover nos links */
.navbar-nav .nav-link:hover {
  color: #ffdd57 !important; /* Cor amarela ao passar o mouse */
}

/* ====== Estilos para o rodapé ====== */
.footer {
  background-color: #343a40; /* Cor de fundo escura */
  color: white; /* Texto branco */
  text-align: center;
  padding: 20px 0;
}

/* Ícones do rodapé */
.footer-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

/* Estilização dos ícones */
.footer-icons a {
  font-size: 1.8rem;
  color: white;
  transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;
}

/* Efeito hover nos ícones */
.footer-icons a:hover {
  transform: scale(1.2);
  color: #ffc107; /* Cor amarela ao passar o mouse */
}
</style>
