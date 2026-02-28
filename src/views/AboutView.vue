<template>
  <main class="about-view container py-5">
    <!-- Encabezado principal -->
    <header class="about-header mb-5" data-aos="fade-up">
      <span class="availability-badge">Abierto a oportunidades</span>
      <h1 class="display-5 fw-bold mt-2 mb-3">Sobre mí</h1>
      <p class="lead mb-4">
        Soy Victor Amadeu, Desarrollador Full Stack Júnior en la empresa Ekium - Equilibrio Tecnológico. Trabajo en el desarrollo de páginas web, apps híbridas
        offline-first y en mejoras full-stack donde se alinean interfaz (frontend), API, backend y base de datos.
      </p>

      <div class="header-actions">
        <router-link to="/contact" class="btn btn-primary custom-btn">Hablemos</router-link>
        <a :href="cvUrl" download class="btn btn-secondary custom-btn">Descargar CV</a>
      </div>
    </header>

    <!-- Propuesta de valor -->
    <section class="info-section mb-5" data-aos="fade-up">
      <h2 class="h4 fw-bold mb-3">Qué aporto</h2>
      <ul class="detail-list">
        <li v-for="item in valueProposition" :key="item">
          {{ item }}
        </li>
      </ul>
    </section>

    <!-- Stack principal -->
    <section class="info-section mb-5" data-aos="fade-up">
      <h2 class="h4 fw-bold mb-3">Stack principal</h2>
      <div class="row g-3">
        <div v-for="group in stackGroups" :key="group.title" class="col-12 col-md-6">
          <article class="panel-card h-100">
            <h3 class="h6 fw-bold mb-2">{{ group.title }}</h3>
            <p class="mb-0">{{ group.items }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Experiencia -->
    <section class="info-section mb-5" data-aos="fade-up">
      <h2 class="h4 fw-bold mb-3">Experiencia</h2>
      <article v-for="experience in experiences" :key="experience.role" class="panel-card mb-3">
        <h3 class="h6 fw-bold mb-1">{{ experience.role }}</h3>
        <p class="period mb-2">{{ experience.period }}</p>
        <ul class="detail-list mb-0">
          <li v-for="task in experience.tasks" :key="task">
            {{ task }}
          </li>
        </ul>
      </article>
    </section>

    <!-- Formación -->
    <section class="info-section mb-5" data-aos="fade-up">
      <h2 class="h4 fw-bold mb-3">Formación y desarrollo continuo</h2>
      <article v-for="item in education" :key="item.title" class="panel-card mb-3">
        <h3 class="h6 fw-bold mb-1">{{ item.title }}</h3>
        <p class="period mb-2">{{ item.period }}</p>
        <p class="mb-0">{{ item.description }}</p>
      </article>
    </section>

    <!-- CTA final -->
    <section class="info-section cta-section" data-aos="fade-up">
      <h2 class="h4 fw-bold mb-3">¿Hablamos?</h2>
      <p class="mb-3">
        Si necesitas apoyo en frontend, backend o mejora de procesos de desarrollo, puedo ayudarte.
      </p>
      <router-link to="/contact" class="btn btn-primary custom-btn">Ir a Contacto</router-link>
    </section>
  </main>
</template>

<script>
const CV_URL = `${import.meta.env.BASE_URL}curriculo.pdf`;

export default {
  name: "AboutView",
  data() {
    return {
      cvUrl: CV_URL,
      // Mensajes cortos para reforzar la propuesta profesional.
      valueProposition: [
        "Diseño y desarrollo de páginas web y apps híbridas con enfoque offline-first.",
        "Integración de APIs con mapeo de datos y control de errores.",
        "Visión full-stack para conectar frontend, backend y base de datos.",
        "Trabajo metódico, orientado a procesos y aprendizaje continuo (autodidacta).",
      ],
      // Stack agrupado para lectura rápida por parte de recruiters.
      stackGroups: [
        {
          title: "Frontend",
          items: "Ionic · Angular · TypeScript · Vue 3 · React · JavaScript · Tailwind · CSS3 · HTML5 · Bootstrap",
        },
        {
          title: "Backend y datos",
          items: "Symfony · PHP · Node/Express · PostgreSQL · Supabase · Meteor · Java · Python · MySQL",
        },
        {
          title: "Arquitectura de app",
          items: "Offline-first · Persistencia local SQL · Sincronización de datos · Capacitor · Android Nativo",
        },
        {
          title: "Prácticas de trabajo",
          items: "Git/GitHub · Bitbucket · Documentación técnica actualizada · Mejora continua",
        },
        {
          title: "Inteligencia Artificial",
          items: "Ingeniería de Prompt",
        }
      ],
      experiences: [
        {
          role: "Ekium — Desarrollador Full Stack Júnior",
          period: "Ene 2026 - Actualidad",
          tasks: [
            "Desarrollo de páginas web y apps híbridas offline-first con Ionic y Angular.",
            "Persistencia local SQL y sincronización al recuperar conectividad.",
            "Mejoras full-stack en ecosistema Intranek (Symfony/PostgreSQL + React/Meteor).",
          ],
        },
        {
          role: "Ekium — Becario de Desarrollo Web (DAW)",
          period: "Oct 2025 - Ene 2026",
          tasks: [
            "Soporte en frontend y backend para tareas de evolución de producto.",
            "Contacto directo con el cliente para resolver dudas.",
            "Uso de Git/GitHub, Bitbucket para PR y documentación técnica en entorno profesional.",
            "Aplicación de buenas prácticas de calidad y pruebas manuales.",
          ],
        },
      ],
      education: [
        {
          title: "CFGS Desarrollo de Aplicaciones Web (DAW) — CESUR",
          period: "2023 - 2026",
          description:
            "Formación en desarrollo web completo, bases de datos, despliegue y buenas prácticas.",
        },
        {
          title: "Formación continua técnica",
          period: "En curso",
          description:
            "Profundización práctica en Android, Symfony, React, Angular y Inteligencia Artificial. Soy una persona autodidacta y estoy siempre en evolución buscando más conocimiento por mi propia cuenta.",
        },
      ],
    };
  },
};
</script>

<style scoped>
.about-view {
  color: var(--color-text-100);
  max-width: 1100px;
}

.about-header {
  max-width: 920px;
}

.about-header .lead {
  color: var(--color-text-300);
}

.availability-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid rgba(0, 215, 163, 0.45);
  background: rgba(0, 215, 163, 0.15);
  color: var(--color-accent-emerald);
  font-size: 0.9rem;
}

.header-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
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
  gap: 8px;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  min-width: 145px;
  justify-content: center;
}

.custom-btn:hover {
  transform: translateY(-2px);
  border-color: var(--color-accent-cyan);
  box-shadow: 0 8px 20px rgba(8, 16, 34, 0.45);
  color: var(--color-text-100);
}

.custom-btn.btn-secondary {
  background: var(--color-btn-light);
  color: var(--color-btn-light-text);
  border-color: transparent;
}

.custom-btn.btn-secondary:hover {
  color: var(--color-btn-light-text);
}

.panel-card {
  border: 1px solid var(--color-border-soft);
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(22, 27, 42, 0.88), rgba(19, 35, 55, 0.72));
  box-shadow: var(--shadow-soft);
  padding: 1rem 1.1rem;
}

.panel-card p {
  color: var(--color-text-300);
}

.detail-list {
  margin: 0;
  padding-left: 1.2rem;
  color: var(--color-text-300);
}

.detail-list li {
  margin-bottom: 0.45rem;
  line-height: 1.45;
}

.detail-list li:last-child {
  margin-bottom: 0;
}

.period {
  color: var(--color-text-400);
  font-size: 0.95rem;
}

.cta-section p {
  color: var(--color-text-300);
  max-width: 780px;
}

@media (max-width: 768px) {
  .about-view {
    padding-top: 2rem !important;
  }

  .header-actions {
    width: 100%;
  }

  .custom-btn {
    width: 100%;
  }
}
</style>
