<template>
  <div class="home-container">
    <section class="hero-section">
      <div class="hero-content">
        <div class="profile-image-container">
          <img
            src="../assets/images/victor-nueva.jpg"
            alt="Foto de Victor Amadeu Braga Heleno"
            class="profile-image"
          />
        </div>

        <div class="hero-text">
          <span class="availability-badge">Disponible para contratar</span>

          <h1 class="hero-title">Victor Amadeu Braga Heleno</h1>

          <p class="hero-subtitle">
            Desarrollador Full Stack Junior | Apps hibridas Offline-first + Integracion de APIs |
            Android/Ionic/Angular/TS | Symfony/PHP + PostgreSQL | React/Meteor + IA
          </p>

          <ul class="hero-highlights">
            <li>Formación técnica en FP de Grado Superior (Cesur, Madrid).</li>
            <li>
              Base reforzada con certificaciones en React, NodeJS, PHP, Git/GitHub, Inteligencia
              Artificial, JavaScript, Java y MySQL.
            </li>
            <li>Aprendizaje continuo en IA, frontend, backend y fundamentos de programacion.</li>
          </ul>

          <div class="hero-actions">
            <router-link to="/contact" class="btn btn-primary custom-btn">
              Hablemos
            </router-link>
            <router-link to="/projects" class="btn btn-outline-light custom-btn">
              Ver proyectos
            </router-link>
            <a href="#certificaciones" class="btn btn-outline-light custom-btn">
              Ver certificaciones
            </a>
            <a :href="cvUrl" download class="btn btn-secondary custom-btn">
              Descargar CV
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="education-section container py-5" data-aos="fade-up">
      <h2 class="section-title">Formación</h2>

      <article v-for="item in education" :key="item.id" class="info-card">
        <h3 class="card-title">{{ item.center }}</h3>
        <p class="card-degree">{{ item.degree }}</p>
        <p class="card-date">{{ item.period }}</p>
      </article>
    </section>

    <section class="experience-section container pb-5" data-aos="fade-up">
      <h2 class="section-title">Experiencia profesional</h2>

      <article v-for="experience in professionalExperience" :key="experience.id" class="info-card">
        <h3 class="card-title">{{ experience.company }}</h3>
        <p class="card-degree">Puesto: {{ experience.role }}</p>
        <p class="card-date">Periodo: {{ experience.period }}</p>
      </article>
    </section>

    <section
      id="certificaciones"
      class="certifications-section container pb-5"
      data-aos="fade-up"
    >
      <h2 class="section-title">Licencias y certificaciones</h2>
      <p class="section-description">
        Resumen basado en mis certificaciones y licencias.
      </p>

      <div class="cert-grid">
        <article v-for="cert in certifications" :key="cert.id" class="cert-card">
          <h3 class="cert-title">{{ cert.title }}</h3>
          <p class="cert-issuer">{{ cert.issuer }}</p>
          <p class="cert-date">Duracion: {{ cert.duration }}</p>
        </article>
      </div>
    </section>

    <section class="contact-section text-center p-5" data-aos="fade-up">
      <h2 class="fw-bold">¿Quieres que revisemos una oportunidad?</h2>
      <p>
        Estoy disponible para colaborar en proyectos Full Stack, con foco en calidad tecnica y
        aprendizaje continuo.
      </p>
      <router-link
        to="/contact"
        class="btn btn-outline-dark btn-lg mt-3 custom-btn contact-cta-btn"
      >
        Enviar mensaje
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
      education: [
        {
          id: 1,
          center: "Cesur",
          degree:
            "Formación Profesional de Grado Superior, Gestión web/multimedia y webmaster",
          city: "Madrid",
        },
      ],
      professionalExperience: [
        {
          id: 1,
          company: "Ekium - Equilibrio Tecnológico",
          role: "Desarrollador Full Stack Junior",
          period: "Actualidad",
        },
      ],
      certifications: [
        {
          id: 1,
          title: "INTELIGENCIA ARTIFICIAL: MODULO 02",
          issuer: "Curso em Video",
          duration: "40 horas",
        },
        {
          id: 2,
          title: "Certificado del Curso de los fundamentos de React",
          issuer: "ScholarHat",
          duration: "20 horas",
        },
        {
          id: 3,
          title: "Getting Started with NodeJS",
          issuer: "Simplilearn",
          duration: "20 horas",
        },
        {
          id: 4,
          title: "Curso de Git y GitHub",
          issuer: "Curso em Video",
          duration: "20 horas",
        },
        {
          id: 5,
          title: "CURSO DE PHP MODERNO: MODULO 01",
          issuer: "Curso em Video",
          duration: "40 horas",
        },
        {
          id: 6,
          title: "Curso online IA Responsable y Prompt Engineering",
          issuer: "Founderz",
          duration: "20 horas",
        },
        {
          id: 7,
          title: "Inteligencia artificial",
          issuer: "Curso em Video",
          duration: "40 horas",
        },
        {
          id: 8,
          title: "MYSQL",
          issuer: "Curso em Video",
          duration: "40 horas",
        },
        {
          id: 9,
          title: "Java Basico",
          issuer: "Curso em Video",
          duration: "40 horas",
        },
        {
          id: 10,
          title: "HTML5 y CSS3",
          issuer: "Curso em Video",
          duration: "40 horas",
        },
        {
          id: 11,
          title: "Curso de JavaScript",
          issuer: "Curso em Video",
          duration: "40 horas",
        },
        {
          id: 12,
          title: "Conceptos de la Programacion",
          issuer: "OpenBootcamp",
          duration: "20 horas",
        },
        {
          id: 13,
          title: "Intro to programming",
          issuer: "Rocketseat",
          duration: "2 horas",
        },
        {
          id: 14,
          title: "Algoritmo informatico",
          issuer: "Curso em Video",
          duration: "40 horas",
        },
      ],
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
  width: 100%;
}

.hero-section {
  background:
    radial-gradient(circle at 12% 22%, rgba(0, 184, 153, 0.16) 0%, rgba(0, 184, 153, 0) 34%),
    radial-gradient(circle at 47% 48%, rgba(83, 89, 255, 0.18) 0%, rgba(83, 89, 255, 0) 42%),
    linear-gradient(130deg, rgba(6, 12, 24, 0.85), rgba(5, 9, 20, 0.9), rgba(8, 14, 30, 0.88));
  border-bottom: 1px solid var(--color-border-soft);
  width: 100%;
  padding: 84px 0;
}

.hero-content {
  width: 100%;
  max-width: 1220px;
  margin: 0 auto;
  padding: 26px;
  display: flex;
  align-items: center;
  gap: 32px;
}

.profile-image-container {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--color-surface-800);
  border: 1px solid var(--color-border-soft);
  box-shadow: var(--shadow-soft);
  flex-shrink: 0;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-text {
  max-width: 780px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.availability-badge {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid rgba(0, 215, 163, 0.45);
  background: rgba(0, 215, 163, 0.14);
  color: var(--color-accent-emerald);
  font-weight: 600;
  padding: 6px 12px;
  margin-bottom: 14px;
}

.hero-title {
  font-size: 2.45rem;
  line-height: 1.22;
  margin-bottom: 14px;
}

.hero-subtitle {
  color: var(--color-text-300);
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 18px;
}

.hero-highlights {
  color: var(--color-text-300);
  padding-left: 1.25rem;
  margin: 0 0 1.3rem;
}

.hero-highlights li {
  margin-bottom: 0.42rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.custom-btn {
  font-size: 1rem;
  padding: 11px 18px;
  border-radius: 14px;
  border: 1px solid var(--color-border-soft);
  color: var(--color-text-100);
  background: rgba(27, 32, 45, 0.78);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: transform 0.24s ease, border-color 0.24s ease, box-shadow 0.24s ease;
  min-width: 155px;
}

.custom-btn:hover {
  transform: translateY(-2px);
  border-color: var(--color-accent-cyan);
  box-shadow: 0 8px 20px rgba(8, 16, 34, 0.45);
  color: var(--color-text-100);
}

.custom-btn.btn-outline-light {
  color: var(--color-text-100);
}

.custom-btn.btn-outline-light:hover {
  background: rgba(34, 42, 60, 0.95);
}

.custom-btn.btn-secondary {
  background: var(--color-btn-light);
  color: var(--color-btn-light-text);
  border-color: transparent;
}

.custom-btn.btn-secondary:hover {
  color: var(--color-btn-light-text);
}

.section-title {
  margin-bottom: 1rem;
  font-weight: 700;
}

.section-description {
  color: var(--color-text-300);
  margin-bottom: 1.1rem;
}

.info-card {
  border: 1px solid var(--color-border-soft);
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(22, 27, 42, 0.88), rgba(19, 35, 55, 0.72));
  box-shadow: var(--shadow-soft);
  padding: 1rem 1.1rem;
}

.card-title {
  margin-bottom: 0.45rem;
  font-size: 1.12rem;
}

.card-degree {
  margin-bottom: 0.4rem;
  color: var(--color-text-300);
}

.card-date {
  margin-bottom: 0;
  color: var(--color-text-400);
}

.cert-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.cert-card {
  border: 1px solid var(--color-border-soft);
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(22, 27, 42, 0.88), rgba(19, 35, 55, 0.72));
  box-shadow: var(--shadow-soft);
  padding: 0.9rem;
}

.cert-title {
  font-size: 0.96rem;
  line-height: 1.35;
  margin-bottom: 0.4rem;
  color: var(--color-text-100);
}

.cert-issuer {
  margin-bottom: 0.3rem;
  color: var(--color-text-300);
  font-size: 0.92rem;
}

.cert-date {
  margin-bottom: 0;
  color: var(--color-text-400);
  font-size: 0.9rem;
}

.contact-section {
  width: 100%;
  color: var(--color-text-100);
}

.contact-section p {
  color: var(--color-text-300);
  max-width: 860px;
  margin: 0 auto;
}

.contact-section .btn-outline-dark {
  background: rgba(27, 32, 45, 0.72);
  color: var(--color-text-100);
  border: 1px solid var(--color-border-strong);
}

.contact-section .btn-outline-dark:hover {
  background: rgba(33, 40, 58, 0.88);
  border-color: var(--color-accent-cyan);
  color: var(--color-text-100);
}

.contact-section .contact-cta-btn {
  min-width: 230px;
  width: auto;
}

@media (max-width: 1100px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
    gap: 18px;
  }

  .hero-text {
    align-items: center;
    text-align: center;
    max-width: 100%;
  }

  .hero-highlights {
    text-align: left;
    max-width: 100%;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-title {
    font-size: 2rem;
  }

  .cert-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 767.98px) {
  .hero-section {
    padding: 42px 0 26px;
  }

  .profile-image-container {
    width: 180px;
    height: 180px;
  }

  .hero-title {
    font-size: 1.6rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-actions {
    width: 100%;
  }

  .custom-btn {
    width: 100%;
    min-width: 0;
  }

  .cert-grid {
    grid-template-columns: 1fr;
  }
}
</style>
