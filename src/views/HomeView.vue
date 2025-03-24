<template>
  <div class="home-container">
    <!-- Sección Hero con fondo degradado -->
    <section class="hero-section">
      <div class="hero-content">
        <!-- Contenedor de la imagen de perfil alineada a la izquierda -->
        <div class="profile-image-container">
          <img
            src="../assets/images/profile.jpg"
            alt="Foto de perfil"
            class="profile-image"
          />
        </div>

        <!-- Contenido de bienvenida alineado a la derecha -->
        <div class="hero-text">
          <h1 class="display-4 fw-bold hero-title">
            Bienvenido a Mi Portafolio
          </h1>
          <p class="lead hero-subtitle">
            Explora mis proyectos, conoce mi experiencia y ponte en contacto.
          </p>

          <!-- Botones de Redes Sociales y Descarga de Currículum -->
          <div class="social-buttons">
            <a
              href="https://www.linkedin.com/in/victor-amadeu-braga-heleno-583870266/"
              target="_blank"
              class="btn btn-primary custom-btn"
            >
              <i class="fab fa-linkedin fa-lg"></i> LinkedIn
            </a>
            <a
              href="https://www.instagram.com/victoramadeu_?igsh=MXQxeTllNDl5MHp4dA=="
              target="_blank"
              class="btn btn-danger custom-btn"
            >
              <i class="fab fa-instagram fa-lg"></i> Instagram
            </a>
            <a
              href="https://github.com/VictorAmadeu"
              target="_blank"
              class="btn btn-dark custom-btn"
            >
              <i class="fab fa-github fa-lg"></i> GitHub
            </a>
            <a
              href="https://victoramadeu.github.io/portafolio-vue/curriculo.pdf"
              download
              class="btn btn-secondary custom-btn"
            >
              <i class="fas fa-file-pdf fa-lg"></i> Descargar CV
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de Habilidades -->
    <section
      id="skills"
      class="skills-section text-center p-5 bg-dark text-white"
      data-aos="fade-up"
    >
      <h2 class="fw-bold" data-aos="flip-up">Mis Habilidades</h2>
      <div class="row mt-4">
        <div class="col-md-4" data-aos="flip-left">
          <div class="card shadow">
            <div class="card-body">
              <h5 class="card-title fw-bold">Desarrollo Web</h5>
              <p>Creación de interfaces modernas y responsivas.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4" data-aos="flip-left" data-aos-delay="200">
          <div class="card shadow">
            <div class="card-body">
              <h5 class="card-title fw-bold">Back-end</h5>
              <p>Desarrollo de APIs y gestión de bases de datos.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4" data-aos="flip-left" data-aos-delay="400">
          <div class="card shadow">
            <div class="card-body">
              <h5 class="card-title fw-bold">Diseño Responsivo</h5>
              <p>Optimización para diferentes dispositivos.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de Contacto -->
    <section class="contact-section text-center p-5" data-aos="fade-up">
      <h2 class="fw-bold">Contáctame</h2>
      <p>Si tienes alguna consulta, no dudes en enviarme un mensaje.</p>
      <a
        href="/portafolio-vue/#/contact"
        class="btn btn-outline-dark btn-lg mt-3 custom-btn"
        data-aos="zoom-in"
      >
        Enviar Mensaje
      </a>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style scoped>
/* 📌 Contenedor principal */
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 📌 Sección Hero con fondo degradado */
.hero-section {
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  color: white;
  padding: 100px 0;
  text-align: center;
  width: 100%;
}

/* 📌 Contenedor flexible para la imagen y el texto */
.hero-content {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;
  max-width: 1200px;
  padding: 30px;
  flex-wrap: wrap;
}

/* 📌 Imagen de perfil alineada a la izquierda */
.profile-image-container {
  width: 250px;
  height: 250px;
  overflow: hidden;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* 📌 Contenedor del texto de bienvenida */
.hero-text {
  text-align: left;
  max-width: 700px;
  margin-left: auto; /* Desplaza el contenido hacia la derecha */
}

/* 📌 Título */
.hero-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 15px;
}

/* 📌 Subtítulo */
.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 20px;
}

/* 📌 Botones sociales */
.social-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: flex-start;
}

/* 📌 Estilos para los botones */
.custom-btn {
  font-size: 1.1rem;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  position: relative;
  overflow: hidden;
}

.custom-btn::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300%;
  height: 300%;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.4s ease-in-out;
  transform: translate(-50%, -50%) scale(0);
  border-radius: 50%;
}

.custom-btn:hover::after {
  transform: translate(-50%, -50%) scale(1);
}

.custom-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
}

/* 📌 Sección de contacto */
.contact-section {
  background: #f8f9fa;
}

/* 📱 Responsive */
@media (max-width: 1024px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
  }

  .hero-text {
    margin-left: 0;
    text-align: center;
  }

  .social-buttons {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .custom-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
