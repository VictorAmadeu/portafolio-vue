<!-- ******************** INICIO DE App.vue ******************** -->
<template>
  <div class="main-wrapper">
    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
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
          aria-label="Alternar navegação"
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
              <router-link to="/contact" class="nav-link" @click="closeMenu">
                <i class="fas fa-envelope"></i>
                Contacto
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/messages" class="nav-link" @click="closeMenu">
                <i class="fas fa-inbox"></i>
                Mensajes
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- FIN NAVBAR -->

    <!-- CONTENIDO PRINCIPAL -->
    <div class="main-content">
      <router-view></router-view>
    </div>

    <!-- FOOTER -->
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
      if (this.closeTimeout) clearTimeout(this.closeTimeout);
    },
    handleResize() {
      if (window.innerWidth >= 992) {
        this.isMenuOpen = false;
      }
    }
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
    if (this.closeTimeout) clearTimeout(this.closeTimeout);
  }
};
</script>

<style scoped>
/* ====== Main Wrapper & Content ====== */
.main-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main-content {
  flex: 1 0 auto;
  margin-top: 80px;
  padding-bottom: 2rem;
}

/* ====== Navbar y Menú ====== */
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

/* ====== Footer ====== */
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

/* ============================= */
/* ====== RESPONSIVIDAD ======== */
/* ============================= */

/* ---- Tablets (≤991.98px) ---- */
@media (max-width: 991.98px) {
  .navbar-collapse {
    position: absolute;
    top: 56px;
    left: 0;
    width: 100vw;
    background: #222;
    z-index: 1000;
    padding: 1rem 0;
    transition: all 0.2s;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }
  .navbar-collapse ul {
    flex-direction: column;
    align-items: flex-start;
    padding-left: 2rem;
    gap: 0.7rem;
  }
  .navbar-nav .nav-link {
    font-size: 1rem;
    padding: 10px 0;
    width: 100%;
  }
}

/* ---- Móviles (≤767.98px) ---- */
@media (max-width: 767.98px) {
  .container {
    max-width: 100vw !important;
    padding-left: 8px !important;
    padding-right: 8px !important;
  }
  .navbar-brand {
    font-size: 1.15rem;
  }
  .footer-icons {
    gap: 10px;
  }
  .footer-icons a {
    font-size: 1.4rem;
  }
  .footer {
    font-size: 0.97rem;
    padding: 15px 0;
  }
  .main-content {
    margin-top: 64px;
    padding-left: 6px;
    padding-right: 6px;
  }
}

/* ---- Pantallas muy pequeñas (≤480px) ---- */
@media (max-width: 480px) {
  .navbar-brand {
    font-size: 1rem;
    gap: 5px;
  }
  .footer-icons a {
    font-size: 1.1rem;
  }
  .footer {
    padding: 10px 0;
    font-size: 0.90rem;
  }
}

/* Evita doble scroll en móvil cuando el menú está abierto */
body.menu-open {
  overflow: hidden;
}
</style>
<!-- ******************** FIN DE App.vue ******************** -->
