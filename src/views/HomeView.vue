<template>
  <div>
    <div class="sidebar">
      <button class="separator" id="button1"><i class="glyphicon glyphicon-user"></i><span>Cuenta</span></button>
      <button class="separator" id="button4"><i class="glyphicon glyphicon-file"></i><span>Logs</span></button>
      <button @click="cerrarSesion" class="separator" id="button4"><i class="glyphicon glyphicon-log-out"></i><span>Salir</span></button>
    </div>

    <nav id="breadcrumb">
      <ol>
        <li><a _blank href="http://localhost:8080/inicio"><i class="glyphicon glyphicon-home"></i></a></li>
        <li>Sistema de Ofuscación en Ambientes de desarrollo.</li>
        <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
        <li class="pag">Inicio</li>
      </ol>
    </nav>

    <div class="col-md-12">
      <h3>Bienvenido: {{ usuario?.nombre_usuario }} {{ usuario?.apellido_paterno_usuario }} {{ usuario?.apellido_materno_usuario }}</h3>
      <p>Correo: {{ usuario?.correo_usuario }}</p>
      <p>Rol: {{ obtenerNombreRol(usuario?.id_rol_usuario) }}</p>
    </div>
    <br><br><br><br><br><br>
    <div class="row" style="position: relative; left: 100px;">
      <div v-if="usuario?.id_rol_usuario !== 2" class="col-md-4">
        <div class="col-md-6 text-center">
          <a href="../bitacora">
            <img src="../assets/2.jpg" alt="imagen de ejemplo" id="imagen-inte">
            <p class="hover-text"></p>
          </a>
        </div>
      </div>
      <div v-if="usuario?.id_rol_usuario !== 2" class="col-md-4">
        <div class="col-md-6 text-center">
          <a href="../usuarios">
            <img src="../assets/3.jpg" alt="imagen de ejemplo" id="imagen-inte">
            <p class="hover-text"></p>
          </a>
        </div>
      </div>
      <div class="col-md-4">
        <div class="col-md-6 text-center">
          <a href="../ofuscacion">
            <img src="../assets/1.jpg" alt="imagen de ejemplo" id="imagen-inte">
            <p class="hover-text"></p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();

// Obtén el usuario desde el estado del store Vuex
const usuario = computed(() => store.state.usuario || {});

const router = useRouter();

const cerrarSesion = () => {
  // Borrar el token de sesión del almacenamiento local
  localStorage.removeItem('token');
  // Redirigir al usuario a la vista de inicio de sesión
  router.push({ name: 'login' });
};

const menuVisible = ref(false);

const mostrarMenu = () => {
  menuVisible.value = !menuVisible.value;
};

// Función para obtener el nombre del rol basado en el id
const obtenerNombreRol = (id: number) => {
  switch(id) {
    case 1:
      return 'Administrador';
    case 2:
      return 'Socio';
    default:
      return 'Rol Desconocido';
  }
};
</script>

<style scoped>
.menu {
  text-align: center;
  font-family: sans-serif; /* tipo de letra */
  position: absolute; /* no afecta componentes */
  top: 100px; /* posición vertical */
  left: -65px; /* posición horizontal hacia la izquierda */
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px; /* radio de los bordes */
  padding: 20px; /* separacion */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: none; /*ocultar menu */
  z-index: 1;
  border-radius: 0px;
}

.contenido h3 {
  margin-top: 0;
}

.acciones {
  margin-top: 20px;
}

.acciones button {
  text-align: center; /* justificacion de texto */
  width: 210px; /* tamaño del boton */
  margin-right: 10px;
  margin-bottom: 10px; /* Agregar espacio entre los botones */
  padding: 8px 30px;
  border: none;
  background-color: #ffffff; /* fondo del boton sin hover */
  color: #000000; /* fondo de letra del boton sin hover */
  transition: all 1s; /* duracion de efecto del boton */
  border-radius: 3px; /* borde del boton */
  cursor: pointer; /* cursor encima efecto */
  transition: background-color 0.3s ease; /* Transición suave para el cambio de color de fondo */
}

.acciones button:hover {
  background-color: #13322B; /* Cambiar el color de fondo al hacer hover */
  color: #ffffff; /* Cambiar el color de letra al hacer hover */
}

.imagen-inte {
  width: 10px;
  height: 10px;
}

#imagen-inte {
  width: 140px; /* tamaño de la imagen */
  height: 140px;
  border: solid 0px; 
  border-radius: 10%; /* borde de la imagen */
  transition: transform 0.5s; /* Agrega una transición suave */
}

#imagen-inte:hover {
  transform: scale(1.1) translateZ(10px); /* Escala la imagen un 10% más grande y la mueve hacia adelante en el eje Z */
}

.hover-text:hover {
  color: red; /* Cambia esto a tu efecto de hover deseado */
}

.menu.visible {
  display: block;
}
</style>