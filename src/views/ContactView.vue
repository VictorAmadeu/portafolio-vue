<template>
  <div class="contact">
    <h2>Contacto</h2>
    <form @submit.prevent="enviarMensaje">
      <input v-model="nombre" type="text" placeholder="Nombre" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="asunto" type="text" placeholder="Asunto" required />
      <textarea v-model="mensaje" placeholder="Mensaje" required></textarea>
      <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '@/services/supabase';

const nombre = ref('');
const email = ref('');
const asunto = ref('');
const mensaje = ref('');

const enviarMensaje = async () => {
  const { error } = await supabase.from('mensajes').insert([{
    nombre: nombre.value,
    email: email.value,
    asunto: asunto.value,
    mensaje: mensaje.value,
    fecha: new Date().toISOString()
  }]);
  if (error) {
    console.error('Error al enviar mensaje:', error.message);
  } else {
    alert('Mensaje enviado con éxito');
    nombre.value = '';
    email.value = '';
    asunto.value = '';
    mensaje.value = '';
  }
};
</script>

<style scoped>
.contact { max-width: 500px; margin: auto; padding: 20px; }
input, textarea { width: 100%; margin-bottom: 10px; padding: 8px; }
</style>
