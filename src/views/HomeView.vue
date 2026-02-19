<template>
  <div class="home-container">
    <!-- Hero principal -->
    <section class="hero-section">
      <div class="hero-content">
        <!-- Imagen de perfil -->
        <div class="profile-image-container">
          <img
            src="../assets/images/victor-nueva.jpg"
            alt="Foto de Victor Amadeu"
            class="profile-image"
          />
        </div>

        <!-- Texto de presentación -->
        <div class="hero-text">
          <h1 class="display-4 fw-bold hero-title">
            Bienvenido(a) a Mi Portafolio
          </h1>
          <p class="lead hero-subtitle">
            Explora mis proyectos, conoce mi experiencia y ponte en contacto.
          </p>

          <div class="social-buttons">
            <a
              href="https://www.linkedin.com/in/victor-amadeu-braga-heleno-583870266/"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary custom-btn"
            >
              <i class="fab fa-linkedin fa-lg"></i> LinkedIn
            </a>
            <a
              href="https://www.instagram.com/victoramadeu_/"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-danger custom-btn"
            >
              <i class="fab fa-instagram fa-lg"></i> Instagram
            </a>
            <a
              href="https://github.com/VictorAmadeu"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-dark custom-btn"
            >
              <i class="fab fa-github fa-lg"></i> GitHub
            </a>
            <a
              :href="cvUrl"
              download
              class="btn btn-secondary custom-btn"
            >
              <i class="fas fa-file-pdf fa-lg"></i> Descargar CV
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Habilidades -->
    <section
      id="skills"
      class="skills-section text-center p-5"
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

    <!-- Contacto -->
    <section class="contact-section text-center p-5" data-aos="fade-up">
      <h2 class="fw-bold">Contáctame</h2>
      <p>Si tienes alguna consulta, no dudes en enviarme un mensaje.</p>
      <router-link
        to="/contact"
        class="btn btn-outline-dark btn-lg mt-3 custom-btn contact-cta-btn"
        data-aos="zoom-in"
      >
        Enviar Mensaje
      </router-link>
    </section>
  </div>
</template>

<script>
const CV_URL = `${import.meta.env.BASE_URL}curriculo.pdf`;

export default {
  name: "HomeView",
  data() {
    return {
      cvUrl: CV_URL,
    };
  },
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-text-100);
}

/* Hero */
.hero-section {
  background:
    radial-gradient(circle at 10% 20%, rgba(0, 184, 153, 0.16) 0%, rgba(0, 184, 153, 0) 32%),
    radial-gradient(circle at 45% 48%, rgba(83, 89, 255, 0.18) 0%, rgba(83, 89, 255, 0) 40%),
    linear-gradient(130deg, rgba(6, 12, 24, 0.85), rgba(5, 9, 20, 0.9), rgba(8, 14, 30, 0.88));
  border-bottom: 1px solid var(--color-border-soft);
  color: var(--color-text-100);
  padding: 100px 0;
  text-align: center;
  width: 100%;
}

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

/* Imagen */
.profile-image-container {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--color-surface-800);
  border: 1px solid var(--color-border-soft);
  box-shadow: var(--shadow-soft);
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Texto */
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
  margin-bottom: 15px;
}

.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: var(--color-text-300);
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

/* Botones comunes */
.custom-btn {
  font-size: 1.05rem;
  padding: 12px 20px;
  border-radius: 14px;
  border: 1px solid var(--color-border-soft);
  color: var(--color-text-100);
  background: rgba(27, 32, 45, 0.75);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  min-width: 130px;
}

.custom-btn:hover {
  transform: translateY(-2px);
  border-color: var(--color-accent-cyan);
  box-shadow: 0 8px 20px rgba(8, 16, 34, 0.45);
  color: var(--color-text-100);
}

/* Variantes para que mantengan la paleta del diseño */
.custom-btn.btn-primary,
.custom-btn.btn-danger,
.custom-btn.btn-dark {
  background: rgba(27, 32, 45, 0.82);
}

.custom-btn.btn-secondary {
  background: var(--color-btn-light);
  color: var(--color-btn-light-text);
  border-color: transparent;
}

/* Sección de habilidades */
.skills-section {
  width: 100%;
  background: transparent !important;
  color: var(--color-text-100) !important;
  border-top: 1px solid var(--color-border-soft);
  border-bottom: 1px solid var(--color-border-soft);
}

.skills-section .card {
  border-radius: 20px;
  border: 1px solid var(--color-border-soft);
  background: linear-gradient(135deg, rgba(22, 27, 42, 0.85), rgba(19, 35, 55, 0.7));
  color: var(--color-text-100);
  box-shadow: var(--shadow-soft);
}

.skills-section .card p {
  color: var(--color-text-300);
}

/* Sección de contacto */
.contact-section {
  width: 100%;
  background: transparent;
  color: var(--color-text-100);
}

.contact-section p {
  color: var(--color-text-300);
}

.contact-section .btn-outline-dark {
  background: rgba(27, 32, 45, 0.72);
  color: var(--color-text-100);
  border: 1px solid var(--color-border-strong);
}

.contact-section .btn-outline-dark:hover {
  background: rgba(33, 40, 58, 0.88);
  color: var(--color-text-100);
  border-color: var(--color-accent-cyan);
}

/* Botón de CTA de contacto con ancho ajustado */
.contact-section .contact-cta-btn {
  width: auto;
  min-width: 220px;
  justify-content: center;
}

/* Responsive */
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

  .contact-section .contact-cta-btn {
    width: auto;
    padding: 10px 20px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 12vw 0 2vw 0;
  }

  .hero-content {
    padding: 2vw 0;
    margin: 0;
    gap: 12px;
    width: 100vw;
  }

  .profile-image-container {
    width: 95vw;
    max-width: 240px;
    margin: 0 auto 10px auto;
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
