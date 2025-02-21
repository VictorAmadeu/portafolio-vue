<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center">{{ msg }}</h1>
    <div class="card p-4 shadow">
      <button class="btn btn-primary w-100" @click="count++">
        Count is {{ count }}
      </button>
      <p class="mt-3 text-muted text-center">
        Edit <code>components/HelloWorld.vue</code> to test HMR
      </p>
    </div>
  </div>
</template>

<style scoped>
.text-muted {
  font-size: 0.9rem;
}
</style>
