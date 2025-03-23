<template>
  <!-- Contêiner principal com margem superior (mt-5) -->
  <div class="container mt-5">
    <!-- Título centralizado para a seção de contato -->
    <h2 class="text-center mb-4">Contato</h2>

    <!-- Formulário que chama o método sendMessage ao ser enviado -->
    <!-- O modificador .prevent impede o comportamento padrão (recarregar a página) -->
    <form @submit.prevent="sendMessage">
      
      <!-- Campo Nome -->
      <div class="mb-3">
        <label for="name" class="form-label">Nome</label>
        <!-- Campo de texto vinculado a form.name com v-model -->
        <input
          type="text"
          v-model="form.name"
          class="form-control"
          id="name"
          required
        />
      </div>

      <!-- Campo Email -->
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <!-- Campo do tipo email com validação automática do navegador -->
        <input
          type="email"
          v-model="form.email"
          class="form-control"
          id="email"
          required
        />
      </div>

      <!-- Campo Assunto -->
      <div class="mb-3">
        <label for="subject" class="form-label">Assunto</label>
        <!-- Campo de texto para o assunto do contato -->
        <input
          type="text"
          v-model="form.subject"
          class="form-control"
          id="subject"
          required
        />
      </div>

      <!-- Campo Mensagem -->
      <div class="mb-3">
        <label for="message" class="form-label">Mensagem</label>
        <!-- Área de texto com 5 linhas de altura -->
        <textarea
          v-model="form.message"
          class="form-control"
          id="message"
          rows="5"
          required
        ></textarea>
      </div>

      <!-- Botão de envio do formulário -->
      <button type="submit" class="btn btn-primary">Enviar</button>
    </form>
  </div>
</template>

<script>
/*
  Este componente Vue chama a API do backend ao enviar o formulário.
  Os dados são enviados via método POST no formato JSON.
*/
export default {
  // Nome do componente (boa prática para debug)
  name: "ContactView",

  // Dados reativos do componente
  data() {
    return {
      // Objeto form agrupa todos os campos do formulário
      form: {
        name: "",     // Nome do remetente
        email: "",    // Email do remetente
        subject: "",  // Assunto da mensagem
        message: "",  // Texto da mensagem
      },
    };
  },

  // Métodos disponíveis no componente
  methods: {
    // Função assíncrona responsável por enviar os dados ao servidor
    async sendMessage() {
      try {
        // Faz a requisição POST para o backend hospedado no Render
        const response = await fetch("https://portafolio-vue.onrender.com/contact", {
          method: "POST", // Método de envio de dados
          headers: {
            "Content-Type": "application/json", // Indica que estamos enviando JSON
          },
          // Converte o objeto form em uma string JSON
          body: JSON.stringify(this.form),
        });

        // Aguarda a resposta convertida em JSON
        const data = await response.json();

        // Verifica se o envio foi bem-sucedido
        if (response.ok) {
          // Mostra alerta de sucesso
          alert("Mensagem enviada com sucesso!");

          // Limpa o formulário
          this.form = {
            name: "",
            email: "",
            subject: "",
            message: ""
          };
        } else {
          // Se o servidor respondeu com erro, mostra mensagem apropriada
          alert(data.error || "Erro ao enviar mensagem.");
        }
      } catch (err) {
        // Captura erros de rede ou exceções
        console.error("Erro:", err);
        alert("Erro ao enviar mensagem.");
      }
    },
  },
};
</script>

<style scoped>
/* Aplica os estilos apenas neste componente */

/* Define uma largura máxima para o container */
.container {
  max-width: 900px;
}

/* Adiciona margem ao botão para separá-lo dos campos acima */
.btn-primary {
  margin-top: 1rem;
}
</style>
