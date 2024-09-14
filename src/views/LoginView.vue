<template>
  <div>
    <div v-if="mensajeError" class="alert alert-danger mt-3" role="alert">
      {{ mensajeError }}
    </div>
    <div v-if="mensajeExito" class="alert alert-success mt-3" role="alert">
      {{ mensajeExito }}
    </div>
    <div class="col-md-6">
      <form @submit.prevent="enviarDatos" role="form">
        <div class="form-group">
          <label for="correo" class="control-label">Correo electrónico:</label>
          <input v-model="correo" :class="{ 'has-error': !correoValido }" type="email" id="correo" class="form-control" placeholder="Ingrese su correo electrónico" />
          <div v-if="!correoValido" class="help-block">El correo electrónico es obligatorio</div>
        </div>
        <div class="form-group">
          <label for="contraseña" class="control-label">Contraseña:</label>
          <input v-model="contrasena" :class="{ 'has-error': !contrasenaValida }" type="password" id="contraseña" class="form-control" placeholder="Ingrese su contraseña" />
          <div v-if="!contrasenaValida" class="help-block">La contraseña es obligatoria</div>
        </div>
        <button class="btn btn-primary pull-right" type="submit">Enviar</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

let correo = ref('');
let contrasena = ref('');
let correoValido = ref(true);
let contrasenaValida = ref(true);
let mensajeError = ref('');
let mensajeExito = ref('');

const router = useRouter();
const store = useStore();

const enviarDatos = async () => {
  mensajeError.value = '';
  mensajeExito.value = '';

  correoValido.value = correo.value.trim() !== '';
  contrasenaValida.value = contrasena.value.trim() !== '';

  if (correoValido.value && contrasenaValida.value) {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/iniciar_sesion/', {
        correo_usuario: correo.value,
        contraseña_usuario: contrasena.value
      });

      if (response.status === 200) {
        store.dispatch('login', {
          usuario: response.data.datos_usuario,
          token: response.data.token
        });
        mensajeExito.value = `¡Bienvenido, ${response.data.usuario}!`;
        router.push({ name: 'inicio' });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400 && error.response.data.mensaje) {
          mensajeError.value = error.response.data.mensaje;
        } else {
          mensajeError.value = error.response.data.error;
        }
      } else if (error.request) {
        mensajeError.value = 'No se recibió respuesta del servidor';
      } else {
        mensajeError.value = 'Error al enviar la solicitud';
      }
    }
  }
};
</script>

<style scoped>
.has-error input {
  border-color: red;
}

.help-block {
  color: red;
}
</style>
