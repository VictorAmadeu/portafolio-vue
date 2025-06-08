<template>
  <div class="messages">
    <h2>Mensajes Recibidos</h2>
    <ul>
      <li v-for="mensaje in mensajes" :key="mensaje.id">
        <p><strong>{{ mensaje.nombre }}</strong> - {{ mensaje.email }}</p>
        <p>{{ mensaje.asunto }}</p>
        <p>{{ mensaje.mensaje }}</p>
        <hr />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/services/supabase';

const mensajes = ref([]);

const cargarMensajes = async () => {
  const { data, error } = await supabase.from('mensajes').select('*').order('fecha', { ascending: false });
  if (error) {
    console.error('Error al cargar mensajes:', error.message);
  } else {
    mensajes.value = data;
  }
};

onMounted(cargarMensajes);
</script>

<style scoped>
.messages { max-width: 800px; margin: auto; padding: 20px; }
li { margin-bottom: 15px; }
</style>
