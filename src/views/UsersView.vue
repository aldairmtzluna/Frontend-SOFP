<template>
  <div>
  <div class="sidebar">
        <button class="separator" id="button1"><i class="glyphicon glyphicon-user"></i><span>Cuenta</span></button>
        <button class="separator" id="button2"><i class="glyphicon glyphicon-list-alt"></i><span>Actividad</span></button>
        <a href="../ofuscacion" style="text-decoration: none;"><button class="separator" id="button4"><i class="glyphicon glyphicon-tasks"></i><span>Ofuscación</span></button></a>
        <button class="separator" id="button4"><i class="glyphicon glyphicon-log-out"></i><span>Salir</span></button>
  </div>

  <nav id="breadcrumb">
   <ol>
    <li><a href="http://localhost:8080/inicio" _blank><i class="glyphicon glyphicon-home"></i></a></li>
    <li><a href="../inicio">Sistema de Ofuscación en Ambientes de desarrollo.</a></li>
     <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
     <li class="pag">Usuarios</li>
   </ol>
 </nav>
 <div class="busqueda">
   <input class="form-control" placeholder="Buscar" type="text" v-model="filtro" @input="buscar">
 </div>

 <table>
   <thead style="width: 100%;">
     <tr>
       <th style="width: 20%;">Nombre</th>
       <th style="width: 20%;">Correo</th>
       <th style="width: 20%;">Rol</th>
       <th style="width: 20%;">Estado</th>
       <th style="width: 20%;">Acciones</th>
     </tr>
   </thead>
   <tbody>
     <tr v-for="usuario in usuariosFiltrados" :key="usuario.id_usuario">
       <td>{{ usuario.nombre_usuario }} {{ usuario.apellidop_usuario }} {{ usuario.apellidom_usuario }}</td>
       <td>{{ usuario.correo_usuario }}</td>
       <td>{{ usuario.id_rol_usuario === 1 ? 'Administrador' : 'Usuario' }}</td>
       <td :style="{ color: usuario.estado_usuario === 1 ? '#229954' : '#9D2449' }">
         {{ usuario.estado_usuario === 1 ? 'Activo' : 'Inactivo' }}
     </td>
       <td class="acciones">
         <a :href="'../editar-usuario/' + usuario.id_usuario">
           <button type="button" class="btn btn-default btn-sm">
             <span>&#9998;</span> Editar
           </button>
         </a>
         <button v-if="usuario.estado_usuario === 1" type="button" class="btn btn-primary btn-sm" title="Desactivar Usuario" @click="cambiarEstadoUsuario(usuario.id_usuario)">
           <span class="glyphicon glyphicon-remove"></span> 
         </button>

         <!-- Botón para usuarios inactivos -->
         <button v-if="usuario.estado_usuario === 0" type="button" class="btn btn-active btn-sm" title="Activar Usuario" @click="cambiarEstadoUsuario(usuario.id_usuario)">
           <span class="glyphicon glyphicon-ok"></span> 
         </button> 
       </td>
     </tr>
   </tbody>
 </table>

 <br>
 <div class="registrar-button">
   <a href="../registro"><button class="btn btn-primary pull-right">Registrar Usuario Nuevo</button></a>
   <a href="../inicio"><button class="btn btn-primary pull-left" type="button">Regresar</button></a>
 </div>

 <br>
 <br>
</div>
</template>


<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importar SweetAlert2

interface Usuario {
 id_usuario: number;
 nombre_usuario: string;
 apellidom_usuario: string;
 apellidop_usuario: string;
 correo_usuario: string;
 id_rol_usuario: number;
 estado_usuario: number;
}

export default defineComponent({
 setup() {
   const usuarios = ref<Usuario[]>([]);
   const usuariosFiltrados = ref<Usuario[]>([]);
   const filtro = ref<string>('');

   const cargarDatos = async () => {
     try {
       const responseUsuarios = await axios.get<{ usuarios: Usuario[] }>('http://127.0.0.1:8000/api/usuarios/');
       // Ordenar usuarios por id_usuario ascendente antes de asignarlo
       usuarios.value = responseUsuarios.data.usuarios.sort((a, b) => a.id_usuario - b.id_usuario);
       // Llenar la lista de usuarios filtrados con todos los usuarios inicialmente
       usuariosFiltrados.value = [...usuarios.value];
     } catch (error) {
       console.error('Error al cargar los datos:', error);
     }
   };

  const buscar = () => {
      const filtroUpper = filtro.value.toUpperCase();
      usuariosFiltrados.value = usuarios.value.filter(usuario => {
        const nombreCompleto = `${usuario.nombre_usuario} ${usuario.apellidop_usuario} ${usuario.apellidom_usuario}`.toUpperCase();
        const correoUpper = usuario.correo_usuario.toUpperCase();
        return nombreCompleto.includes(filtroUpper) || correoUpper.includes(filtroUpper);
      });
    };

   const cambiarEstadoUsuario = async (idUsuario: number) => {
     const confirmacion = await Swal.fire({
       title: '<h3 style="font-weight: 300; color: #9D2449;">¿Estás seguro?</h3>',
       html: '<span style="font-size: 18px; margin-bottom: 20px;">Estás a punto de cambiar el estado de este usuario.</span>',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonText: '<span style="font-weight: 300; color: black; font-size: 16px;">Sí, cambiar estado</span>',
       cancelButtonText: '<span style="font-weight: 300; color: black; font-size: 16px;">Cancelar</span>',
       confirmButtonColor: '#229954',
     });

     if (confirmacion.isConfirmed) {
       try {
         await axios.put('http://127.0.0.1:8000/api/usuarios/', { id_usuario: idUsuario });
         cargarDatos(); // Volver a cargar la lista de usuarios después de cambiar el estado
       } catch (error) {
         console.error('Error al cambiar estado del usuario:', error);
       }
     }
   };

   onBeforeMount(() => {
     cargarDatos();
   });

   return { usuariosFiltrados, filtro, buscar, cambiarEstadoUsuario };
 }
});

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
  
  .acciones button {
    margin: 0 5px;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
  }
  
  .registrar-button {
    text-align: center;
  }

  .btn-active {
    color: #229954;
  }

  .btn-active:hover {
    background-color: #229954;
    color: white;
  }

 </style>