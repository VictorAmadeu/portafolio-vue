<!-- ******************** INICIO DE App.vue ******************** -->
<template> <!-- Apertura de la sección del template donde definimos la estructura visual -->
  <div> <!-- Contenedor principal para agrupar navbar, contenido y footer -->
  
    <!-- ******************** NAVBAR ******************** -->
    <!-- Barra de navegación fija en la parte superior, con clase de Bootstrap -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container"> <!-- Contenedor de Bootstrap que centra y da espaciado -->
      
        <!-- ******************** LOGO E ÍCONE ******************** -->
        <!-- router-link: para navegar entre rutas en Vue sin recargar la página -->
        <router-link to="/" class="navbar-brand fw-bold">
          <!-- ícono de Font Awesome -->
          <i class="fas fa-laptop-code"></i> 
          Mi Portafolio
        </router-link>
        <!-- Fin del logo e ícono -->

        <!-- ******************** BOTÓN DE COLAPSO ******************** -->
        <!-- Se muestra en móviles para expandir/colapsar el menú -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Alternar navegação"
        >
          <span class="navbar-toggler-icon"></span> <!-- Ícono tipo hamburguesa -->
        </button>
        <!-- Fin del botón de colapso -->

        <!-- ******************** MENÚ DE NAVEGACIÓN ******************** -->
        <!-- collapse: se expande o se colapsa al hacer clic en el botón en móviles -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <!-- ul: lista de elementos de navegación -->
          <ul class="navbar-nav ms-auto">
            <!-- ms-auto: empuja los ítems a la derecha -->

            <!-- ******************** ÍTEM 1: INICIO ******************** -->
            <li class="nav-item">
              <!-- router-link a la ruta raíz "/" -->
              <router-link to="/" class="nav-link">
                <!-- ícono de casa (home) con Font Awesome -->
                <i class="fas fa-home"></i> 
                Inicio
              </router-link>
            </li>
            <!-- Fin del ítem 1 de navegación -->

            <!-- ******************** ÍTEM 2: CONTACTO ******************** -->
            <li class="nav-item">
              <!-- router-link a la ruta "/contact" -->
              <router-link to="/contact" class="nav-link">
                <!-- ícono de sobre (envelope) con Font Awesome -->
                <i class="fas fa-envelope"></i>
                Contacto
              </router-link>
            </li>
            <!-- Fin del ítem 2 de navegación -->

            <!-- ******************** ÍTEM 3: MENSAJES NUEVO ******************** -->
            <li class="nav-item">
              <!-- router-link a la ruta "/messages" 
                   donde mostraremos la lista de mensajes del formulario -->
              <router-link to="/messages" class="nav-link">
                <!-- ícono de inbox con Font Awesome -->
                <i class="fas fa-inbox"></i>
                Mensajes
              </router-link>
            </li>
            <!-- Fin del ítem 3 de navegación -->

          </ul> <!-- Fin de la lista de ítems de navegación -->
        </div> <!-- Fin del contenedor con la clase collapse navbar-collapse -->
      </div> <!-- Fin de .container -->
    </nav>
    <!-- Fin de la navbar -->


    <!-- ******************** CONTENIDO PRINCIPAL DINÁMICO ******************** -->
    <!-- router-view: Aquí Vue inyecta los componentes de cada ruta -->
    <router-view></router-view>
    <!-- Fin del contenido dinámico -->


    <!-- ******************** FOOTER O RODAPÉ ******************** -->
    <footer class="footer bg-dark text-white text-center py-4">
      <div class="container">
        <!-- Texto de derechos reservados -->
        <p class="mb-3">© 2025 Mi Portafolio. Todos los derechos reservados.</p>

        <!-- Íconos de redes sociales -->
        <div class="footer-icons">
          <!-- Enlace a LinkedIn -->
          <a 
            href="https://www.linkedin.com/in/victor-amadeu-braga-heleno-583870266/" 
            target="_blank"
          >
            <i class="fab fa-linkedin"></i>
          </a>
          <!-- Enlace a Instagram -->
          <a 
            href="https://www.instagram.com/victoramadeu_?igsh=MXQxeTllNDl5MHp4dA==" 
            target="_blank"
          >
            <i class="fab fa-instagram"></i>
          </a>
          <!-- Enlace a GitHub -->
          <a 
            href="https://github.com/VictorAmadeu" 
            target="_blank"
          >
            <i class="fab fa-github"></i>
          </a>
          <!-- Enlace al correo (mailto) -->
          <a href="mailto:victor@example.com">
            <i class="fas fa-envelope"></i>
          </a>
        </div>
      </div>
    </footer>
    <!-- Fin del footer -->

  </div> <!-- Fin de la envoltura principal -->
</template> <!-- Cierre del template -->

<script>
/*
  Este script define el componente principal App,
  que únicamente administra la estructura global:
  - Navbar
  - <router-view> para el contenido
  - Footer
*/
export default {
  name: "App", // Nombre identificativo del componente principal
};
</script>

<style scoped>
/* ====== Estilos para la Navbar ====== */

/* .navbar: clase de Bootstrap para la barra de navegación */
.navbar {
  padding: 15px 20px; /* Margen interno para más espacio en la barra */
  transition: background-color 0.3s ease-in-out; /* Transición suave al cambiar color */
}

/* Estilos para los enlaces de la navbar */
.navbar-nav .nav-link {
  font-size: 1.1rem; /* Tamaño de fuente más grande */
  font-weight: 500;  /* Negrita moderada */
  transition: color 0.3s ease-in-out, border-bottom 0.3s ease-in-out;
}

/* Hover en los enlaces: cambio a color amarillo */
.navbar-nav .nav-link:hover {
  color: #ffdd57 !important; /* !important para sobrescribir estilo por defecto */
}

/* ====== Estilos para el footer ====== */

/* Clase footer: color de fondo oscuro, texto blanco */
.footer {
  background-color: #343a40;
  color: white;
  text-align: center;
  padding: 20px 0; /* Espacio vertical */
}

/* footer-icons: contenedor de íconos en el footer */
.footer-icons {
  display: flex;
  justify-content: center; /* Centra los íconos horizontalmente */
  gap: 15px;               /* Espacio entre íconos */
}

/* Estilos para los íconos del footer */
.footer-icons a {
  font-size: 1.8rem;      /* Íconos algo grandes */
  color: white;           /* Color blanco */
  transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;
}

/* Efecto hover en íconos: se agrandan y cambian a color amarillo */
.footer-icons a:hover {
  transform: scale(1.2);
  color: #ffc107;
}
</style>
<!-- ******************** FIN DE App.vue ******************** -->