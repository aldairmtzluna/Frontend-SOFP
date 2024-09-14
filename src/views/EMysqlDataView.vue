<template>
    <div>
      <div class="sidebar">
        <button class="separator" id="button1"><i class="glyphicon glyphicon-user"></i><span>Cuenta</span></button>
        <button class="separator" id="button2"><i class="icon-calendar"></i><span>Catalogos</span></button>
        <button class="separator" id="button4"><i class="glyphicon glyphicon-tasks"></i><span>Administracion</span></button>
        <button @click="cerrarSesion" class="separator" id="button4"><i class="glyphicon glyphicon-log-out"></i><span>Salir</span></button>
      </div>
  
      <nav id="breadcrumb">
        <ol>
          <li><a href="http://localhost:8080/inicio" target="_blank"><i class="glyphicon glyphicon-home"></i></a></li>
          <li><a href="../inicio">Sistema de Ofuscación en Ambientes de desarrollo.</a></li>
          <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
          <li class="pag"><a href="../BMysql">Conexiones</a></li>
          <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
          <li class="pag">Editar Conexión</li>
        </ol>
      </nav>
  
      <div>
        <h1>Editar Conexión MySQL</h1>
      <form @submit.prevent="confirmarModificacion">
        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <label for="nombre_conexion" class="control-label">Nombre de la Conexión*:</label>
              <input type="text" id="nombre_conexion" class="form-control" placeholder="Ingrese el nombre de la conexión" v-model="conexion.nombre_conexion">
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label for="usuario_conexion" class="control-label">Usuario*:</label>
              <input type="text" id="usuario_conexion" class="form-control" placeholder="Ingrese el usuario" v-model="conexion.usuario_conexion">
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label for="password_conexion" class="control-label">Contraseña*:</label>
              <input type="password" id="password_conexion" class="form-control" placeholder="Ingrese la contraseña" v-model="conexion.password_conexion">
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <label for="host_conexion" class="control-label">Host*:</label>
              <input type="text" id="host_conexion" class="form-control" placeholder="Ingrese el host" v-model="conexion.host_conexion">
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label for="puerto_conexion" class="control-label">Puerto*:</label>
              <input type="number" id="puerto_conexion" class="form-control" placeholder="Ingrese el puerto" v-model="conexion.puerto_conexion">
            </div>
          </div>
        </div>
<br><br>
        <div class="row">
          <div class="col-md-3">
            <a href="../BMySql"><button class="btn btn-default pull-right" type="button">Regresar</button></a>
          </div>
        </div>
        <div class="col-md-3"  style="    margin-left: 830px; position: relative; top: -50px;">
          <button class="btn btn-primary pull-right" type="submit">Guardar cambios</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'; // Importar SweetAlert2

export default {
  data() {
    return {
      conexion: {
        id_conexion: null,
        nombre_conexion: '',
        usuario_conexion: '',
        password_conexion: '',
        host_conexion: '',
        puerto_conexion: null  
      }
    };
  },
  created() {
    this.obtenerConexion();
  },
  methods: {
    async obtenerConexion() {
      const conexionId = this.$route.params.id_conexion;
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/cargar-mysql/${conexionId}/`);
        this.conexion = response.data;
      } catch (error) {
        console.error('Error al cargar los datos de la conexión:', error);
      }
    },
    async confirmarModificacion() {
      const confirmacion = await Swal.fire({
        title: '<h3 style="font-weight: 300; color: #9D2449;">¿Estás seguro?</h3>',
        html: '<span style="font-size: 18px; margin-bottom: 20px;">Estás a punto de modificar esta conexión.</span>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '<span style="font-weight: 300; color: black; font-size: 16px;">Sí, modificar conexión</span>',
        cancelButtonText: '<span style="font-weight: 300; color: black; font-size: 16px;">Cancelar</span>',
        confirmButtonColor: '#229954',
      });

      if (confirmacion.isConfirmed) {
        this.guardarCambios();
      }
    },
    async guardarCambios() {
      try {
        await axios.put(`http://127.0.0.1:8000/api/cargar-mysql/${this.conexion.id_conexion}/`, this.conexion);
        
        this.$router.push({ name: 'BMysql' }); 
      } catch (error) {
        console.error('Error al guardar los cambios:', error);
      }
    }
  }
};
</script>

<style scoped>
.sidebar {
  margin-top: -60px;
}

.control-label {
  font-weight: bold;
}
</style>
  