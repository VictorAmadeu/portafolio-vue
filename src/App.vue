<!-- ******************** INICIO DE App.vue ******************** -->
<template>
  <div>
    <!-- ******************** NAVBAR ******************** -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">

        <!-- ******************** LOGO E ÍCONE ******************** -->
        <router-link to="/" class="navbar-brand fw-bold">
          <i class="fas fa-laptop-code"></i>
          Mi Portafolio
        </router-link>
        <!-- Fin del logo e ícono -->

        <!-- ******************** BOTÓN DE COLAPSO ******************** -->
        <button
          class="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          :aria-expanded="isMenuOpen ? 'true' : 'false'"
          aria-label="Alternar navegação"
          @click="toggleMenu"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- Fin del botón de colapso -->

        <!-- ******************** MENÚ DE NAVEGACIÓN ******************** -->
        <div
          class="collapse navbar-collapse"
          :class="{ show: isMenuOpen }"
          id="navbarNav"
        >
          <ul class="navbar-nav ms-auto">

            <!-- ******************** ÍTEM 1: INICIO ******************** -->
            <li class="nav-item">
              <router-link to="/" class="nav-link" @click="handleMenuItemClick">
                <i class="fas fa-home"></i>
                Inicio
              </router-link>
            </li>

            <!-- ******************** ÍTEM 2: CONTACTO ******************** -->
            <li class="nav-item">
              <router-link to="/contact" class="nav-link" @click="handleMenuItemClick">
                <i class="fas fa-envelope"></i>
                Contacto
              </router-link>
            </li>

            <!-- ******************** ÍTEM 3: MENSAJES NUEVO ******************** -->
            <li class="nav-item">
              <router-link to="/messages" class="nav-link" @click="handleMenuItemClick">
                <i class="fas fa-inbox"></i>
                Mensajes
              </router-link>
            </li>

          </ul>
        </div>
        <!-- Fin del menú -->
      </div>
    </nav>
    <!-- Fin de la navbar -->

    <!-- ******************** CONTENIDO PRINCIPAL DINÁMICO ******************** -->
    <router-view></router-view>

    <!-- ******************** FOOTER O RODAPÉ ******************** -->
    <footer class="footer bg-dark text-white text-center py-4">
      <div class="container">
        <p class="mb-3">© 2025 Mi Portafolio. Todos los derechos reservados.</p>
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
          <a href="mailto:victoremmadrid@outlook.com">
            <i class="fas fa-envelope"></i>
          </a>
        </div>
      </div>
    </footer>
    <!-- Fin del footer -->

  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isMenuOpen: false,
      menuTimeout: null,
    };
  },
  methods: {
    toggleMenu() {
      // Si ya está abierto, ciérralo y cancela timeout
      if (this.isMenuOpen) {
        this.isMenuOpen = false;
        if (this.menuTimeout) {
          clearTimeout(this.menuTimeout);
          this.menuTimeout = null;
        }
        return;
      }
      // Si está cerrado, ábrelo y cierra después de 3 segundos
      this.isMenuOpen = true;
      if (this.menuTimeout) clearTimeout(this.menuTimeout);
      this.menuTimeout = setTimeout(() => {
        this.isMenuOpen = false;
        this.menuTimeout = null;
      }, 3000);
    },
    handleMenuItemClick() {
      // Al hacer clic en cualquier opción, cierra el menú y el timeout
      this.isMenuOpen = false;
      if (this.menuTimeout) {
        clearTimeout(this.menuTimeout);
        this.menuTimeout = null;
      }
    }
  },
  beforeDestroy() {
    if (this.menuTimeout) clearTimeout(this.menuTimeout);
  }
};
</script>

<style scoped>
/* ====== Estilos para la Navbar ====== */

.navbar {
  padding: 15px 20px;
  transition: background-color 0.3s ease-in-out;
}

.navbar-nav .nav-link {
  font-size: 1.1rem;
  font-weight: 500;
  transition: color 0.3s ease-in-out, border-bottom 0.3s ease-in-out;
}

.navbar-nav .nav-link:hover {
  color: #ffdd57 !important;
}

/* ====== Estilos para el footer ====== */

.footer {
  background-color: #343a40;
  color: white;
  text-align: center;
  padding: 20px 0;
}

.footer-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.footer-icons a {
  font-size: 1.8rem;
  color: white;
  transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;
}

.footer-icons a:hover {
  transform: scale(1.2);
  color: #ffc107;
}
</style>
<!-- ******************** FIN DE App.vue ******************** -->
