<template>
  <div>
    <!-- Navbar fija en la parte superior -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <!-- Logo con ícono en la navbar -->
        <a class="navbar-brand fw-bold" href="/">
          <i class="fas fa-laptop-code"></i> Mi Portafolio
        </a>

        <!-- Botón de colapso para dispositivos móviles -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Menú de navegación (se han eliminado los apartados "Proyectos" y "Sobre Mí") -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <!-- Enlace a la página de Inicio con ícono -->
              <router-link to="/" class="nav-link">
                <i class="fas fa-home"></i> Inicio
              </router-link>
            </li>
            <li class="nav-item">
              <!-- Enlace a la sección de Contacto con ícono -->
              <router-link to="/contact" class="nav-link">
                <i class="fas fa-envelope"></i> Contacto
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Contenido principal dinámico -->
    <router-view></router-view>

    <!-- Pie de página -->
    <footer class="footer bg-dark text-white text-center py-4">
      <div class="container">
        <p class="mb-3">© 2025 Mi Portafolio. Todos los derechos reservados.</p>

        <!-- Íconos de Redes Sociales -->
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
  name: "App", // Nombre del componente principal
};
</script>

<style scoped>
/* ====== ESTILOS PARA LA NAVBAR ====== */
.navbar {
  padding: 15px 20px; /* Espaciado interno para mejorar la apariencia */
  transition: background-color 0.3s ease-in-out; /* Transición suave en cambios de color */
}

/* Estilos generales de los enlaces en la navbar */
.navbar-nav .nav-link {
  font-size: 1.1rem; /* Ajusta el tamaño del texto */
  font-weight: 500; /* Negrita moderada */
  transition: color 0.3s ease-in-out, border-bottom 0.3s ease-in-out; /* Transiciones suaves */
}

/* Efecto hover en los enlaces */
.navbar-nav .nav-link:hover {
  color: #ffdd57 !important; /* Color amarillo más claro al pasar el cursor */
}

/* ====== ESTILOS PARA EL FOOTER ====== */
.footer {
  background-color: #343a40; /* Color de fondo oscuro */
  color: white; /* Texto en color blanco */
  text-align: center; /* Centra el contenido */
  padding: 20px 0; /* Espaciado interno */
}

/* Estilos de los íconos en el footer */
.footer-icons {
  display: flex; /* Usa flexbox para organizar los íconos */
  justify-content: center; /* Centra los íconos horizontalmente */
  gap: 15px; /* Espaciado entre los íconos */
}

/* Estilos generales de los íconos de redes sociales */
.footer-icons a {
  font-size: 1.8rem; /* Ajusta el tamaño de los íconos */
  color: white; /* Color blanco predeterminado */
  transition: transform 0.3s ease-in-out, color 0.3s ease-in-out; /* Transiciones suaves */
}

/* Efecto hover en los íconos de redes sociales */
.footer-icons a:hover {
  transform: scale(1.2); /* Aumenta ligeramente el tamaño */
  color: #ffc107; /* Cambia el color a amarillo */
}
</style>
