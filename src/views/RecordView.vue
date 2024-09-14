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
        <li><a href="http://localhost:8080/inicio" _blank><i class="glyphicon glyphicon-home"></i></a></li>
        <li><a href="../inicio">Sistema de Ofuscación en Ambientes de desarrollo.</a></li>
        <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
        <li class="pag">Bitacora</li>
      </ol>
    </nav>
    <div>
      <div class="busqueda">
        <input class="form-control" placeholder="Buscar" type="text">
      </div>
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Movimiento realizado</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>IP</th>
            <th>Puerto</th>
          </tr>
        </thead>
        <tbody>
          <!-- Aquí puedes agregar filas con datos -->
          <tr>
            <td>Usuario1</td>
            <td>Movimiento1</td>
            <td>2024-03-20</td>
            <td>12:30 PM</td>
            <td>192.168.1.1</td>
            <td>8080</td>
          </tr>
          <tr>
            <td>Usuario2</td>
            <td>Movimiento2</td>
            <td>2024-03-20</td>
            <td>01:45 PM</td>
            <td>192.168.1.2</td>
            <td>8080</td>
          </tr>
        </tbody>
      </table>
    </div>
    <a href="../inicio"><button class="btn btn-primary pull-left" type="button">Regresar</button></a>
  </div>
    
  
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const cerrarSesion = () => {
  // Borrar el token de sesión del almacenamiento local
  localStorage.removeItem('token');
  // Redirigir al usuario a la vista de inicio de sesión
  router.push({ name: 'login' });
};
</script>

<style scoped>
.busqueda {
  margin-bottom: 10px;
  margin-left: 80%; /* Mover el campo de búsqueda a la derecha */
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
  margin-bottom: 20px;
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

.regresar-button {
  text-align: center;
}

.sidebar {
  margin-top: -110px;
}
</style>
