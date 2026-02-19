<template>
  <div class="main-wrapper">
    <!-- Navbar principal -->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
      <div class="container">
        <router-link to="/" class="navbar-brand fw-bold">
          <i class="fas fa-laptop-code"></i>
          Mi Portafolio
        </router-link>

        <button
          class="navbar-toggler"
          type="button"
          @click="toggleMenu"
          :aria-expanded="isMenuOpen ? 'true' : 'false'"
          aria-label="Alternar navegación"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          class="collapse navbar-collapse"
          :class="{ show: isMenuOpen }"
          id="navbarNav"
        >
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link" @click="closeMenu">
                <i class="fas fa-home"></i>
                Inicio
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/projects" class="nav-link" @click="closeMenu">
                <i class="fas fa-code"></i>
                Proyectos
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/contact" class="nav-link" @click="closeMenu">
                <i class="fas fa-envelope"></i>
                Contacto
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Contenido principal -->
    <div class="main-content">
      <router-view></router-view>
    </div>

    <!-- Footer -->
    <footer class="footer text-center py-4">
      <div class="container">
        <p class="mb-3">© 2026 Mi Portafolio. Todos los derechos reservados.</p>
        <div class="footer-icons">
          <a
            href="https://www.linkedin.com/in/victor-amadeu-braga-heleno-583870266/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fab fa-linkedin"></i>
          </a>
          <a
            href="https://www.instagram.com/victoramadeu_/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fab fa-instagram"></i>
          </a>
          <a
            href="https://github.com/VictorAmadeu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fab fa-github"></i>
          </a>
          <a href="mailto:victoremmadrid@outlook.com">
            <i class="fas fa-envelope"></i>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isMenuOpen: false,
      closeTimeout: null,
      lastToggle: 0,
    };
  },
  methods: {
    toggleMenu() {
      if (this.isMenuOpen) {
        this.closeMenu();
        return;
      }
      this.isMenuOpen = true;
      document.body.classList.add("menu-open");
      this.lastToggle = Date.now();
      if (this.closeTimeout) clearTimeout(this.closeTimeout);
      this.closeTimeout = setTimeout(() => {
        if (Date.now() - this.lastToggle >= 2900) {
          this.isMenuOpen = false;
        }
      }, 3000);
    },
    closeMenu() {
      this.isMenuOpen = false;
      document.body.classList.remove("menu-open");
      if (this.closeTimeout) clearTimeout(this.closeTimeout);
    },
    handleResize() {
      if (window.innerWidth >= 992) {
        this.isMenuOpen = false;
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
    if (this.closeTimeout) clearTimeout(this.closeTimeout);
  },
};
</script>

<style scoped>
/* Estructura base */
.main-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1 0 auto;
  margin-top: 82px;
  padding-bottom: 2rem;
  color: var(--color-text-100);
}

/* Navbar */
.navbar {
  padding: 15px 20px;
  background: rgba(4, 9, 20, 0.88);
  border-bottom: 1px solid var(--color-border-soft);
  backdrop-filter: blur(10px);
}

.navbar-brand {
  color: var(--color-text-100) !important;
}

.navbar-toggler {
  border-color: var(--color-border-soft);
}

.navbar-toggler:focus {
  box-shadow: none;
}

.navbar-nav .nav-link {
  color: var(--color-text-300) !important;
  font-size: 1.1rem;
  font-weight: 500;
  margin-left: 8px;
  padding: 10px 16px;
  border-radius: 16px;
  border: 1px solid transparent;
  transition: all 0.25s ease-in-out;
}

.navbar-nav .nav-link:hover {
  color: var(--color-text-100) !important;
  background: rgba(27, 32, 45, 0.65);
  border-color: var(--color-border-soft);
}

.navbar-nav .router-link-exact-active {
  color: var(--color-text-100) !important;
  background: var(--color-btn-dark);
  border-color: var(--color-border-soft);
}

/* Footer */
.footer {
  background: rgba(4, 9, 20, 0.94);
  border-top: 1px solid var(--color-border-soft);
  color: var(--color-text-300);
}

.footer-icons {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.footer-icons a {
  width: 46px;
  height: 46px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  font-size: 1.35rem;
  color: var(--color-text-100);
  background: rgba(27, 32, 45, 0.58);
  border: 1px solid var(--color-border-soft);
  transition: transform 0.25s ease, border-color 0.25s ease, color 0.25s ease;
}

.footer-icons a:hover {
  transform: translateY(-2px);
  border-color: var(--color-accent-cyan);
  color: var(--color-accent-cyan);
}

/* Responsive navbar */
@media (max-width: 991.98px) {
  .navbar-collapse {
    position: absolute;
    top: 62px;
    left: 0;
    width: 100vw;
    z-index: 1000;
    padding: 1rem 0;
    background: rgba(6, 12, 24, 0.96);
    border: 1px solid var(--color-border-soft);
    border-top: none;
    border-bottom-left-radius: 14px;
    border-bottom-right-radius: 14px;
  }

  .navbar-collapse ul {
    flex-direction: column;
    align-items: flex-start;
    padding-left: 1rem;
    gap: 0.5rem;
  }

  .navbar-nav .nav-link {
    margin-left: 0;
    width: 100%;
  }
}

@media (max-width: 767.98px) {
  .container {
    max-width: 100vw !important;
    padding-left: 8px !important;
    padding-right: 8px !important;
  }

  .navbar-brand {
    font-size: 1.05rem;
  }

  .main-content {
    margin-top: 72px;
    padding-left: 6px;
    padding-right: 6px;
  }

  .footer-icons a {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }
}

/* Evita doble scroll al abrir menú móvil */
:global(body.menu-open) {
  overflow: hidden;
}
</style>
