<template>
  <!-- <div id="app">
    <h1>Mi Aplicación Vue.js</h1>
    <button @click="realizarSolicitud">Realizar Solicitud al Backend</button>
    <div v-if="mensajeConexion" class="mensaje-exitoso">{{ mensajeConexion }}</div>
    <div v-if="errorConexion" class="mensaje-error">{{ errorConexion }}</div>
  </div> -->
  <div class="container">
    <div class="bottom-buffer">
      <RouterView/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      mensajeConexion: null,
      errorConexion: null,
    };
  },
  methods: {
    realizarSolicitud() {
      axios.get('http://127.0.0.1:8000/')
        // .then(response => {
        //   this.mensajeConexion = 'Conexión exitosa';  // Agregamos este mensaje
        //   this.errorConexion = null;  // Limpiar el mensaje de error si hubo alguno antes
        // })
        // .catch(error => {
        //   console.error('Error en la solicitud al backend', error);
        //   this.mensajeConexion = null;
        //   this.errorConexion = 'Hubo un problema al realizar la solicitud al backend.';
        // });
    },
  },
};
</script>

<style>
/* Estilos para tu componente App.vue */
  body {
      overflow-x: hidden;
      font-family: 'Montserrat';
  }  

  #app {
    margin-top: 50px;
}

  .container {
    margin-bottom: 50px;
  }

  .control-label {
        margin-left: 10px;
    }

    #breadcrumb ol {
      list-style-type: none;
      margin: 0;
      padding: 0;
      font-family: sans-serif; 
      margin-top: -25px;
      margin-bottom: 20px;
    }

#breadcrumb ol li {
  display: inline; /* Asegura que los elementos estén en línea */
}

#breadcrumb ol li a {
  color: #545454; /* Cambia el color de los enlaces a gris */
  text-decoration: none; /* Elimina la subrayado predeterminado */
}

#breadcrumb ol li a:hover {
  text-decoration: underline; /* Agrega subrayado al pasar el mouse sobre los enlaces */
}

#breadcrumb ol li:not(:last-child) {
  margin-right: 1px; /* Añade espacio entre los elementos */
  padding-right: 1px; /* Añade espacio alrededor de los elementos */
}

#breadcrumb ol li:not(:first-child) {
  margin-left: 1px; /* Ajusta el espacio entre los elementos */
}

.icons {
  font-size: small;
  margin-left: 5px;
}

li.pag {
  color: #5454545b;
}

.sidebar {
  top: 100px;
    left: 0;
    height: 70vh;
    width: 120px; /* Ancho de la barra lateral */
    background-color: #ffffff00; /* Color de fondo de la barra lateral */
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Alinear los botones al lado izquierdo */
    padding-top: 90px; /* Ajusta según necesites */
    position: absolute;
}

.separator {
  width: 25px; /* Ancho inicial del botón, oculto */
    height: 50px;
    padding: 25px;
    margin: 4mm 0; /* Separación entre botones */
    border: none;
    background-color: #13322B; /* Color de fondo del botón */
    color: white; /* Color del texto */
    cursor: pointer;
    transition: width 0.3s ease; /* Transición suave del ancho */
    overflow: hidden; /* Oculta cualquier contenido que desborde */
    display: flex;
    align-items: center; /* Centra verticalmente el contenido */
    justify-content: center; /* Centra horizontalmente el contenido */
    border-top-right-radius: 10px; /* Redondea el lado derecho superior */
    border-bottom-right-radius: 10px; /* Redondea el lado derecho inferior */
    margin-left: -5px; /* Márgen negativo para esconder más a la izquierda */ 
}

.separator i{
  margin-right: 5px;
}

.separator span{
  margin: 0 auto; /* Centra horizontalmente el texto */          
  display: none; /* Oculta el texto por defecto */
}

.separator:hover{
  width: 200px; /* Ancho aumentado al pasar el mouse */
}

.separator:hover span{
  display: inline;
}

</style>