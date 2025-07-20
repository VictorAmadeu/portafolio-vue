<template>
  <div class="home-container">
    <!-- Sección Hero con fondo degradado -->
    <section class="hero-section">
      <div class="hero-content">
        <!-- IMAGEN DE PERFIL -->
        <div class="profile-image-container">
          <img
            src="../assets/images/profile.jpg"
            alt="Foto de perfil"
            class="profile-image"
          />
        </div>
        <!-- CONTENIDO DE BIENVENIDA -->
        <div class="hero-text">
          <h1 class="display-4 fw-bold hero-title">
            Bienvenido a Mi Portafolio
          </h1>
          <p class="lead hero-subtitle">
            Explora mis proyectos, conoce mi experiencia y ponte en contacto.
          </p>
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
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Hero con fondo degradado */
.hero-section {
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  color: white;
  padding: 100px 0;
  text-align: center;
  width: 100%;
}

/* Contenedor flexible para la imagen y el texto */
.hero-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  max-width: 1200px;
  padding: 30px;
  flex-wrap: nowrap;
  margin: 0 230px;
  width: 100%;
}

/* IMAGEN */
.profile-image-container {
  width: 100%;
  max-width: 250px;
  overflow: hidden;
  border-radius: 50%;      /* círculo perfecto */
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;      /* rellena el círculo */
  object-position: center;
  border-radius: 50%;     /* círculo perfecto */
  display: block;
  /* margin-left: 30px;   <-- Elimina esta línea */
}


/* TEXTO */
.hero-text {
  text-align: left;
  max-width: 700px;
  margin-left: 215px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.hero-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 15px;
}
.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 20px;
  /* Para evitar que se corte, haz que salte de línea */
  word-break: break-word;
  white-space: normal;
  max-width: 100%;
  line-height: 1.4;
}
.social-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: flex-start;
}
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
  min-width: 120px;
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

/* Sección de Contacto */
.contact-section {
  background: #f8f9fa;
}

/* =================== RESPONSIVIDAD =================== */

/* Para pantallas medianas */
@media (max-width: 1200px) {
  .hero-content {
    margin: 0 30px;
    gap: 18px;
    padding: 18px;
  }
  .hero-text {
    margin-left: 20px;
    max-width: 600px;
  }
  .profile-image-container {
    max-width: 200px;
  }
}

/* Para tablets: columna, todo centrado */
@media (max-width: 1024px) {
  .hero-content {
    flex-direction: column;
    align-items: center;
    margin: 0 5vw;
    gap: 15px;
    padding: 15px 4vw;
    width: 100%;
  }
  .profile-image-container {
    margin-bottom: 10px;
    margin-left: 0;
    width: 100%;
    max-width: 200px;
  }
  .profile-image {
    margin-left: 0;
  }
  .hero-text {
    margin-left: 0;
    align-items: center;
    text-align: center;
    max-width: 100%;
  }
  .social-buttons {
    justify-content: center;
    width: 100%;
  }
  .hero-title {
    font-size: 2rem;
  }
  .hero-section {
    padding: 60px 0 30px 0;
  }
}

/* Para móviles grandes */
@media (max-width: 768px) {
  .hero-section {
    padding: 30px 0 12px 0;
  }
  .hero-title {
    font-size: 1.28rem;
  }
  .hero-subtitle {
    font-size: 1.07rem;
    padding: 0 10px;
    max-width: 100vw;
  }
  .profile-image-container {
    max-width: 160px;
  }
  .social-buttons {
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }
  .custom-btn {
    width: 100%;
    justify-content: center;
    font-size: 1rem;
    padding: 10px 4px;
  }
}

/* Para móviles pequeños */
@media (max-width: 480px) {
  .hero-section {
    padding: 12vw 0 2vw 0;
  }
  .hero-content {
    padding: 2vw 0;
    margin: 0 0;
    gap: 12px;
    width: 100vw;
  }
  .profile-image-container {
    width: 95vw;
    max-width: 240px;
    margin: 0 auto 10px auto;
  }
  .profile-image {
    margin-left: 0;
  }
  .hero-text {
    padding: 0 6vw;
    margin: 0;
    max-width: 100vw;
    align-items: center;
    text-align: center;
  }
  .hero-title {
    font-size: 1.03rem;
  }
  .hero-subtitle {
    font-size: 0.98rem;
    padding: 0;
    max-width: 100vw;
    overflow-wrap: break-word;
    word-break: break-word;
  }
}

/* Habilidades en columna en móvil */
@media (max-width: 767px) {
  .skills-section .row {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  .skills-section .col-md-4 {
    width: 100%;
    max-width: 350px;
  }
}
</style>
