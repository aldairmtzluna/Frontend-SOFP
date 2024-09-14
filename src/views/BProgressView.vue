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
        <li><a href="https://www.gob.mx/" _blank><i class="glyphicon glyphicon-home"></i></a></li>
        <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
        <li><a href="https://www.gob.mx/sct" _blank>SICT</a></li>
        <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
        <li><a href="../inicio">Sistema de Ofuscación en Ambientes de desarrollo.</a></li>
        <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
        <li><a href="../ofuscacion">Ofuscación.</a></li>
        <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
        <li class="pag">Bases de Datos</li>
      </ol>
    </nav>
  
    <div class="busqueda">
      <input class="form-control" placeholder="Buscar" type="text" v-model="filtro" @input="buscar">
    </div>
  
    <table>
      <thead style="width: 100%;">
        <tr>
          <th style="width: 10%;">#</th>
          <th style="width: 60%;">Nombre de la Base de Datos</th>
          <th style="width: 30%;">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(baseDatos, index) in basesDatosFiltradas" :key="baseDatos.id">
          <td>{{ index + 1 }}</td>
          <td>{{ baseDatos.nombre }}</td>
          <td class="acciones">
            <a :href="'../editar-base-datos/' + baseDatos.id">
              <button type="button" class="btn btn-default btn-sm">
                <span>&#9998;</span> Editar
              </button>
            </a>
            <button type="button" class="btn btn-primary btn-sm" title="Desactivar Base de Datos">
              <span class="glyphicon glyphicon-remove"></span>
            </button>
            <button type="button" class="btn btn-active btn-sm" title="Activar Base de Datos">
              <span class="glyphicon glyphicon-ok"></span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  
    <br>
    <div class="/Progress">
    <a href="/Progress">
      <button class="btn btn-primary">Agregar Base de Datos </button>
    </a>
  </div>

  <div class="col-md-3"  style="    margin-left: 830px; position: relative; top: -50px;">
          <a href="../ofuscacion"><button class="btn btn-default pull-right" type="button">Regresar</button></a>
        </div>
  
    <br>
    <br>
  </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onBeforeMount } from 'vue';
  import axios from 'axios';
  
  interface BaseDatos {
    id: number;
    nombre: string;
  }
  
  export default defineComponent({
    setup() {
      const basesDatos = ref<BaseDatos[]>([]);
      const basesDatosFiltradas = ref<BaseDatos[]>([]);
      const filtro = ref<string>('');
  
      const cargarDatos = async () => {
        try {
          const response = await axios.get<{ basesDatos: BaseDatos[] }>('http://127.0.0.1:8000/api/bases-datos/');
          basesDatos.value = response.data.basesDatos;
          basesDatosFiltradas.value = [...basesDatos.value];
        } catch (error) {
          console.error('Error al cargar los datos:', error);
        }
      };
  
      const buscar = () => {
        const filtroUpper = filtro.value.toUpperCase();
        basesDatosFiltradas.value = basesDatos.value.filter(baseDatos => {
          return baseDatos.nombre.toUpperCase().includes(filtroUpper);
        });
      };
  
      onBeforeMount(() => {
        cargarDatos();
      });
  
      return { basesDatosFiltradas, filtro, buscar };
    }
  });
  </script>
  
  <style scoped>
  .busqueda {
    margin-bottom: 10px;
    margin-left: 80%;
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
  