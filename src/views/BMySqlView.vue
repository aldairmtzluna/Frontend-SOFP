<template>
  <div>
    <div class="sidebar">
      <button class="separator" id="button1">
        <i class="glyphicon glyphicon-user"></i>
        <span>Cuenta</span>
      </button>
      <button class="separator" id="button2">
        <i class="glyphicon glyphicon-list-alt"></i>
        <span>Actividad</span>
      </button>
      <a href="../ofuscacion">
        <button class="separator" id="button4">
          <i class="glyphicon glyphicon-tasks"></i>
          <span>Ofuscación</span>
        </button>
      </a>
      <button class="separator" id="button4">
        <i class="glyphicon glyphicon-log-out"></i>
        <span>Salir</span>
      </button>
    </div>

    <nav id="breadcrumb">
      <ol>
        <li>
          <a href="https://www.gob.mx/" target="_blank">
            <i class="glyphicon glyphicon-home"></i>
          </a>
        </li>
        <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
        <li><a href="https://www.gob.mx/sct" target="_blank">SICT</a></li>
        <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
        <li><a href="../inicio">Sistema de Ofuscación en Ambientes de desarrollo.</a></li>
        <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
        <li><a href="../ofuscacion">Ofuscación.</a></li>
        <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
        <li class="pag">Bases de Datos MySql</li>
      </ol>
    </nav>

    
    <div>
      <div class="busqueda">
        <input
          class="form-control"
          placeholder="Buscar"
          type="text"
          v-model="filtro"
          @input="buscar"
          style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px; width: 20%; box-sizing: border-box; text-align: center; margin-left: 80%;"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre de la Base de Datos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(baseDatos, index) in basesDatosFiltradas" :key="baseDatos.id">
            <td>{{ index + 1 }}</td>
            <td>{{ baseDatos.nombre }}</td>
            <td class="acciones">
              <template v-if="esRolSocio">
                <!-- Mostrar solo para rol 'Socio' -->
                <a :href="'' + baseDatos.id">
                  <button type="button" class="btn btn-default btn-sm">
                    Conectar
                  </button>
                </a>
              </template>
              <template v-else>
                <!-- Mostrar solo para rol 'Administrador' -->
                <a :href="'../editar-mysql/' + baseDatos.id">
                  <button type="button" class="btn btn-default btn-sm">
                    <span>&#9998;</span> Editar
                  </button>
                </a>
                <button type="button" class="btn btn-danger btn-sm" @click="abrirModal(baseDatos)" style="margin-left: 10px;">
                  <span class="glyphicon glyphicon-eye-open"></span> Ver detalles
                </button>
                <button type="button" class="btn btn-primary btn-sm" @click="confirmarEliminacion(baseDatos)" style="margin-left: 10px;">
                  <span class="glyphicon glyphicon-trash"></span>
                </button>
                <div v-if="modalActivo === baseDatos.id" class="popup-overlay">
                  <div class="popup">
                    <div class="popup-header">
                      <h5 class="popup-title">Detalles de {{ baseDatos.nombre }}</h5>
                      <button class="close-button" @click="cerrarModal">&times;</button>
                    </div>
                    <div class="popup-body">
                      <form @submit.prevent="enviarFormulario">
                        <div class="form-row">
                          <div class="col">
                            <div class="form-group">
                              <label for="db-id">ID:</label>
                              <input type="text" id="db-id" class="form-control" :value="baseDatos.id" readonly />
                            </div>
                          </div>
                          <div class="col">
                            <div class="form-group">
                              <label for="db-name">Nombre de la Base de Datos:</label>
                              <input type="text" id="db-name" class="form-control" :value="baseDatos.nombre" readonly />
                            </div>
                          </div>
                        </div>
                        <div v-if="conexionDetalle && conexionDetalle.id_conexion === baseDatos.id">
                          <div class="form-group">
                            <label for="conn-name">Nombre de la Conexión:</label>
                            <input type="text" id="conn-name" class="form-control" :value="conexionDetalle.nombre_conexion" readonly />
                          </div>
                          <div class="form-group">
                            <label for="conn-user">Usuario:</label>
                            <input type="text" id="conn-user" class="form-control" :value="conexionDetalle.usuario_conexion" readonly />
                          </div>
                          <div class="form-group">
                            <label for="conn-password">Password:</label>
                            <input type="text" id="conn-password" class="form-control" :value="conexionDetalle.password_conexion" readonly />
                          </div>
                          <div class="form-group">
                            <label for="conn-host">Host:</label>
                            <input type="text" id="conn-host" class="form-control" :value="conexionDetalle.host_conexion" readonly />
                          </div>
                          <div class="form-group">
                            <label for="conn-port">Puerto:</label>
                            <input type="text" id="conn-port" class="form-control" :value="conexionDetalle.puerto_conexion" readonly />
                          </div>
                        </div>
                        <p v-if="!conexionDetalle || conexionDetalle.id_conexion !== baseDatos.id" class="text-muted">Cargando detalles...</p>
                        <div class="popup-footer">
                          <button type="button" class="btn btn-secondary" @click="cerrarModal">Cancelar</button>
                          <button type="submit" class="btn btn-primary" @click="conectar">Conectar</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </template>
            </td>
          </tr>
        </tbody>
      </table>

      <br /><br /><br />

      <div class="/MySql">
        <a href="/MySql">
          <button class="btn btn-primary">Agregar Base de Datos</button>
        </a>
      </div>

      <div class="col-md-3" style="margin-left: 830px; position: relative; top: -50px;">
        <a href="../ofuscacion"><button class="btn btn-default pull-right" type="button">Regresar</button></a>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onBeforeMount, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const basesDatos = ref([]);
    const basesDatosFiltradas = ref([]);
    const filtro = ref('');
    const modalActivo = ref(null); // Para controlar qué modal está activo

    // Para almacenar los detalles de la conexión
    const conexionDetalle = ref({
      id: null,
      nombre_conexion: '',
      usuario_conexion: '',
      password_conexion: '',
      host_conexion: '',
      puerto_conexion: '',
    });

    // Computed property to determine if the user is 'Socio'
    const esRolSocio = computed(() => {
      const usuario = store.state.usuario || {};
      return usuario.id_rol_usuario === 2;
    });

    const cargarDatos = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/bases-mysql/');
        basesDatos.value = response.data.basesDatos;

        // Ordenar por ID ascendente
        basesDatos.value.sort((a, b) => a.id - b.id);

        basesDatosFiltradas.value = [...basesDatos.value];
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };

    const cargarConexion = async (idConexion) => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/cargar-mysql/${idConexion}/`);
        conexionDetalle.value = response.data; // Almacenar los detalles de la conexión
      } catch (error) {
        console.error(`Error al cargar la conexión con ID ${idConexion}:`, error);
        conexionDetalle.value = null;
      }
    };

    const buscar = () => {
      const filtroUpper = filtro.value.toUpperCase();
      basesDatosFiltradas.value = basesDatos.value.filter(baseDatos => {
        return baseDatos.nombre.toUpperCase().includes(filtroUpper);
      });
    };

    const abrirModal = async (baseDatos) => {
      await cargarConexion(baseDatos.id);
      modalActivo.value = baseDatos.id;
    };

    const cerrarModal = () => {
      modalActivo.value = null;
    };

    const enviarFormulario = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/mysql/', conexionDetalle.value);
        console.log(response.data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "La conexión ha sido exitosa.",
          showConfirmButton: false,
          timer: 2000
        });

        // Guardar los datos en localStorage para usarlos en MysqlDataView
        localStorage.setItem('dbConnectionData', JSON.stringify(conexionDetalle.value));
        // Redirigir a MysqlDataView
        router.push({ name: 'mysql-datos' });
      } catch (error) {
        console.error(error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error al conectarte.",
          showConfirmButton: false,
          timer: 2000
        });
      }
    };

    const confirmarEliminacion = (baseDatos) => {
      Swal.fire({
        title: '<h3 style="font-weight: 300; color: #9D2449;">¿Estás seguro?</h3>',
        html: `<span style="font-size: 18px; margin-bottom: 20px;">Eliminarás la conexión: ${baseDatos.nombre}</span>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '<span style="font-weight: 300; color: black; font-size: 16px;">Sí, eliminar</span>',
        cancelButtonText: '<span style="font-weight: 300; color: black; font-size: 16px;">Cancelar</span>',
        confirmButtonColor: '#229954', // Color de fondo del botón de confirmación
      }).then((result) => {
        if (result.isConfirmed) {
          eliminarConexion(baseDatos.id);
        }
      });
    };

    const eliminarConexion = async (idConexion) => {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/eliminar-mysql/${idConexion}/`);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "La conexión ha sido eliminada.",
          showConfirmButton: false,
          timer: 2000
        });
        cargarDatos(); // Recargar los datos después de eliminar
      } catch (error) {
        console.error(`Error al eliminar la conexión con ID ${idConexion}:`, error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Hubo un problema al eliminar la conexión.",
          showConfirmButton: false,
          timer: 2000
        });
      }
    };

    onBeforeMount(() => {
      cargarDatos();
    });

    return {
      basesDatosFiltradas,
      filtro,
      modalActivo,
      conexionDetalle,
      esRolSocio,
      abrirModal,
      cerrarModal,
      confirmarEliminacion,
      buscar,
      enviarFormulario,
    };
  },
});
</script>

<style scoped>
.busqueda {
  margin-bottom: 10px;
}

.busqueda input[type="text"] {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup {
  background: #ffffff; /* Fondo blanco */
  padding: 20px;
  border-radius: 8px;
  width: 600px; /* Ancho ajustado para dos columnas */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.popup label {
  color: #12322B;
  font-weight: bolder;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  background: #8a6d3b;
  border-radius: 5px;
}

.popup-title {
  position: relative;
  left: 15px;
  top: 5px;
  margin: 0;
  font-size: 18px;
  color: #ffffff;
  font-weight: bolder;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  color: #ffffff;
  cursor: pointer;
  font-weight: bolder;
  position: relative;
  top: 5px;
  right: 5px;
}

.popup-body {
  margin-bottom: 15px;
}

.popup-footer {
  display: flex;
  justify-content: flex-end;
}

.popup-footer button {
  margin-left: 10px;
}

.form-row {
  display: flex;
  justify-content: space-between;
}

.col {
  flex: 1;
  margin-right: 10px;
}

/* Estilos de los botones */
.btn {
  padding: 8px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
