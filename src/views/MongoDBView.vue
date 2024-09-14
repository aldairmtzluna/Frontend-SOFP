<template>
  <div>
    <div class="sidebar">
      <button class="separator" id="button1"><i class="glyphicon glyphicon-user"></i><span>Cuenta</span></button>
      <button class="separator" id="button2"><i class="glyphicon glyphicon-list-alt"></i><span>Actividad</span></button>
      <a href="../usuarios"><button class="separator" id="button4"><i class="glyphicon glyphicon-tasks"></i><span>Usuarios</span></button></a>
      <!-- <button @click="cerrarSesion" class="separator" id="button4"><i class="glyphicon glyphicon-log-out"></i><span>Salir</span></button> -->
    </div>

    <nav id="breadcrumb">
      <ol>
        <li><a href="https://www.gob.mx/" target="_blank"><i class="glyphicon glyphicon-home"></i></a></li>
        <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
        <li><a href="https://www.gob.mx/sct" target="_blank">SICT</a></li>
        <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
        <li><a href="../inicio">Sistema de Ofuscación en Ambientes de desarrollo.</a></li>
        <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
        <li><a href="../ofuscacion">Ofuscación.</a></li>
        <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
        <li><a href="../BMongoDB">Conexiones de MongoDb.</a></li>
        <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
        <li class="pag">MongoDb.</li>
      </ol>
    </nav>

    <br>
    <div>
      <h1 style="font-weight: bolder;">MongoDB.</h1>
    </div>
    <br><br>
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
            <label for="dbName">Nombre de la base de datos*:</label>
            <input type="text" class="form-control" placeholder="Ingrese Nombre" id="dbName" v-model="formData.dbName">
          </div>
        </div>

        <div class="col-md-4">
          <div class="form-group">
            <span class="glyphicon glyphicon-lock" aria-hidden="true"></span>
            <label class="control-label" for="dbUser">Usuario de la base de datos*:</label>
            <input type="text" class="form-control" placeholder="Ingrese Usuario" id="dbUser" v-model="formData.dbUser">
          </div>
        </div>

        <div class="col-md-4">
          <div class="form-group">
            <span class="glyphicon glyphicon-tasks" aria-hidden="true"></span>
            <label for="dbPassword">Contraseña de la base de datos*:</label>
            <input type="password" class="form-control" placeholder="Ingrese Contraseña" id="dbPassword" v-model="formData.dbPassword">
          </div>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <span class="icon-world" aria-hidden="true"></span>
            <label for="dbHost">Host de la base de datos*:</label>
            <input type="text" class="form-control" placeholder="Ingrese Host" id="dbHost" v-model="formData.dbHost">
          </div>
        </div>

        <div class="col-md-4">
          <div class="form-group">
            <span class="glyphicon glyphicon-hdd" aria-hidden="true"></span>
            <label for="dbPort">Puerto de la base de datos*:</label>
            <input type="number" class="form-control" placeholder="Ingrese Puerto" id="dbPort" v-model="formData.dbPort">
          </div>
        </div>
      </div>
      <br><br><br>
      <div class="col-md-12" style="margin-left: -130px; position: relative; top: -47.5px;">
        <a href="../BMongoDB"><button class="btn btn-default pull-right" type="button">Regresar</button></a>
      </div>
      <div class="row">
        <div class="col-md-2" style="margin-top: -90px;">
          <button class="btn btn-primary pull-right" type="submit">Enviar</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import axios from 'axios'; // Asegúrate de tener axios instalado

export default defineComponent({
  name: 'MySqlView',
  setup() {
    const formData = reactive({
      dbName: '',
      dbUser: '',
      dbPassword: '',
      dbHost: '',
      dbPort: '',
    });

    const submitForm = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/mongodb-connections/', {
          nombre_conexion: formData.dbName,
          usuario_conexion: formData.dbUser,
          password_conexion: formData.dbPassword,
          host_conexion: formData.dbHost,
          puerto_conexion: formData.dbPort,
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
