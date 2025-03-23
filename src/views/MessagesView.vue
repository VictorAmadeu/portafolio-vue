<template>
  <div class="container py-5 mt-5">
    <h1 class="text-center mb-4">Mensajes Recibidos</h1>
    <div v-if="messages.length === 0" class="alert alert-warning text-center">
      No hay mensajes registrados.
    </div>
    <div v-else class="row g-3">
      <div class="col-md-6" v-for="(msg, index) in messages" :key="index">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">
              <i class="fas fa-user"></i> {{ msg.name }}
            </h5>
            <p class="card-text"><strong>Email:</strong> {{ msg.email }}</p>
            <p class="card-text"><strong>Mensaje:</strong> {{ msg.message }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
    };
  },
  async created() {
    try {
      const response = await fetch("https://portafolio-vue.onrender.com/messages");
      const data = await response.json();
      this.messages = data.reverse(); // exibe os mais recentes primeiro
    } catch (error) {
      console.error("Error al cargar mensajes:", error);
    }
  },
};
</script>

<style scoped>
.card {
  transition: transform 0.3s ease;
}
.card:hover {
  transform: translateY(-5px);
}
</style>
