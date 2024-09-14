<template>
    <div>
      <div class="sidebar">
        <button class="btn btn-outline-secondary separator" id="button1"><i class="glyphicon glyphicon-user"></i><span>Cuenta</span></button>
        <button class="btn btn-outline-secondary separator" id="button2"><i class="glyphicon glyphicon-list-alt"></i><span>Actividad</span></button>
        <a href="../usuarios">
          <button class="btn btn-outline-secondary separator" id="button4"><i class="glyphicon glyphicon-tasks"></i><span>Usuarios</span></button>
        </a>
        <button class="btn btn-outline-secondary separator" id="button4"><i class="glyphicon glyphicon-log-out"></i><span>Salir</span></button>
      </div>
  
      <nav id="breadcrumb">
    <ol>
      <li><a href="https://www.gob.mx/" _blank><i class="glyphicon glyphicon-home"></i></a></li>
      <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
      <li><a href="https://www.gob.mx/sct" _blank>SICT</a></li>
      <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
      <li><a href="../inicio">Sistema de Ofuscación en Ambientes de desarrollo.</a></li>
      <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
      <li><a href="../ofuscacion">Ofuscación.</a></li>
      <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
      <li><a href="../BSqlLite">Conexiones SqlLite.</a></li>
      <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
      <li class="pag">SqlLite.</li>
    </ol>
  </nav>
  
      <div id="app" class="container mt-4">
        <h1 class="mb-4">Conectar a SQLite</h1>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="databasePath">Ruta de la Base de Datos SQLite:</label>
            <input type="text" v-model="formData.databasePath" id="databasePath" class="form-control" required>
          </div>
          <br><br><br>
          <div class="col-md-12"  style="margin-left: -130px; position: relative; top: -47.5px;">
          <a href="../BSqlLite"><button class="btn btn-default pull-right" type="button">Regresar</button></a>
        </div>
      <div class="row">
        <div class="col-md-2" style="margin-top: -90px;">
          <button class="btn btn-primary pull-right" type="submit">Enviar</button>
        </div>
      </div>
        </form>
      </div>

      
    </div>
  </template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'SqLiteView',
  setup() {
    const formData = reactive({
      databasePath: '',
    });

    const submitForm = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/sqlite-connections/', {
          ruta_conexion: formData.databasePath,
        });
        alert('Datos enviados correctamente');
      } catch (error) {
        alert('Error al enviar los datos');
        console.error(error);
      }
    };

    return {
      formData,
      submitForm, 
    };
  }
});
</script>

<style scoped></style>