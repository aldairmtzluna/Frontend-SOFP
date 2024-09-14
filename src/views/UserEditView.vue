<template>
  <div>
    <div class="sidebar">
      <button class="separator" id="button1">
        <i class="glyphicon glyphicon-user"></i>
        <span>Cuenta</span>
      </button>
      <button class="separator" id="button2">
        <i class="icon-calendar"></i>
        <span>Catálogos</span>
      </button>
      <button class="separator" id="button4">
        <i class="glyphicon glyphicon-tasks"></i>
        <span>Administración</span>
      </button>
      <button @click="cerrarSesion" class="separator" id="button4">
        <i class="glyphicon glyphicon-log-out"></i>
        <span>Salir</span>
      </button>
    </div>

    <nav id="breadcrumb">
      <ol>
        <li><a href="http://localhost:8080/inicio" _blank><i class="glyphicon glyphicon-home"></i></a></li>
        <li><a href="../inicio">Sistema de Ofuscación en Ambientes de desarrollo.</a></li>
        <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
        <li class="pag"><a href="../usuarios">Usuarios</a></li>
        <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
        <li class="pag">Editar Usuario</li>
      </ol>
    </nav>

    <div>
      <h1>Editar Usuario</h1>
      <form @submit.prevent="confirmarModificacion">
        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
              <label for="name" class="control-label">Nombre(s)*:</label>
              <input type="text" id="name" class="form-control" placeholder="Ingrese su nombre" v-model="usuario.nombre_usuario">
            </div>
          </div>

          <div class="col-md-4">
            <div class="form-group">
              <label for="last-name" class="control-label">Apellido Paterno*:</label>
              <input type="text" id="last-name" class="form-control" placeholder="Ingrese su apellido paterno" v-model="usuario.apellidop_usuario">
            </div>
          </div>

          <div class="col-md-4">
            <div class="form-group">
              <label for="second-last-name" class="control-label">Apellido Materno*:</label>
              <input type="text" id="second-last-name" class="form-control" placeholder="Ingrese su apellido materno" v-model="usuario.apellidom_usuario">
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <span class="glyphicon glyphicon-envelope" aria-hidden="true"></span>
              <label for="email-01" class="control-label">Correo electrónico*:</label>
              <input placeholder="Correo electrónico" type="text" id="email-01" class="form-control" v-model="usuario.correo_usuario" @input="usuario.correo_usuario = usuario.correo_usuario.toLowerCase()">
              <div class="help-custom-error-text">Solo se aceptan letras en minuscula</div>
              <div class="help-custom-error-text">Solo se permiten los dominios @sct.gob.mx y @sict.gob.mx</div>
              <div class="help-custom-error-text">Correo electrónico es obligatorio</div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="form-group">
              <span class="glyphicon glyphicon-briefcase" aria-hidden="true"></span>
              <label for="rol" class="control-label">Rol*:</label>
              <select id="rol" class="form-control" v-model="usuario.id_rol_usuario">
                <option :value="1">Administrador</option>
                <option :value="2">Usuario</option>
              </select>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <button class="btn btn-primary pull-right" type="submit">Enviar</button>
            <button @click="regresar" class="btn btn-primary pull-left" type="button">Regresar</button>
          </div>
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
      usuario: {
        id_usuario: null,
        nombre_usuario: '',
        apellidop_usuario: '',
        apellidom_usuario: '',
        correo_usuario: '',
        id_rol_usuario: null,
        estado_usuario: null,
        contraseña_usuario: null
      }
    };
  },
  async created() {
    const usuarioId = this.$route.params.id_usuario;
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/usuario/${usuarioId}/`);
      this.usuario = response.data;
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
    }
  },
  methods: {
    async confirmarModificacion() {
      const confirmacion = await Swal.fire({
        title: '<h3 style="font-weight: 300; color: #9D2449;">¿Estás seguro?</h3>',
        html: '<span style="font-size: 18px; margin-bottom: 20px;">Estás a punto de modificar este usuario.</span>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '<span style="font-weight: 300; color: black; font-size: 16px;">Sí, modificar usuario</span>',
        cancelButtonText: '<span style="font-weight: 300; color: black; font-size: 16px;">Cancelar</span>',
        confirmButtonColor: '#229954', // Color de fondo del botón de confirmación
      });

      if (confirmacion.isConfirmed) {
        this.guardarCambios();
      }
    },
    async guardarCambios() {
      try {
        await axios.put(`http://127.0.0.1:8000/api/usuario/${this.usuario.id_usuario}/`, this.usuario);
        // Redirigir a la vista de usuarios después de guardar los cambios
        this.$router.push({ name: 'usuarios' });
      } catch (error) {
        console.error('Error al guardar los cambios:', error);
      }
    },
    cerrarSesion() {
      // Implementa la lógica para cerrar sesión aquí
      console.log("Cerrando sesión");
    },
    regresar() {
      this.$router.push({ name: 'usuarios' });
    }
  }
};
</script>

<style scoped>
.sidebar {
  margin-top: -60px;
}
</style>
