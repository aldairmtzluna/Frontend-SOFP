<template>
  <div>
    <div class="sidebar">
      <button class="separator" id="button1">
        <i class="glyphicon glyphicon-user"></i><span>Cuenta</span>
      </button>
      <button class="separator" id="button2">
        <i class="glyphicon glyphicon-list-alt"></i><span>Actividad</span>
      </button>
      <a href="../usuarios">
        <button class="separator" id="button4">
          <i class="glyphicon glyphicon-tasks"></i><span>Usuarios</span>
        </button>
      </a>
      <button class="separator" id="button4">
        <i class="glyphicon glyphicon-log-out"></i><span>Salir</span>
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
        <li>
          <a href="../inicio">Sistema de Ofuscación en Ambientes de desarrollo.</a>
        </li>
        <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
        <li><a href="../ofuscacion">Ofuscación.</a></li>
        <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
        <li><a href="../SqlLite">SqlLite.</a></li>
        <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
        <li class="pag">Datos.</li>
      </ol>
    </nav>
    <h1>Estas conectado a {{ dbConnectionData.dbName }}</h1>
    <h3>Tablas en la base de datos:</h3>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Tabla</th>
            <th>Seleccionar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="table in tableNames" :key="table">
            <td>{{ table }}</td>
            <td>
              <label class="radio-container">
                <input type="radio" :value="table" v-model="selectedTable" name="table" class="select-radio" @change="fetchColumns(table)" />
                <span class="checkmark"></span>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="selectedTable">
      <h3>Campos en la tabla: {{ selectedTable }}</h3>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Campos</th>
              <th>Seleccionar para ofuscar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="column in columns" :key="column">
              <td>{{ column }}</td>
              <td>
                <div class="checkbox-container">
                  <input type="checkbox" :value="column" v-model="selectedColumns" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="button-container">
        <button @click="obfuscateData" class="btn-danger">Ofuscar</button>
        <button @click="deobfuscateData" class="btn-default">DesOfuscar</button>
      </div>
    </div>

    <div class="button-container">
      <button @click="goBack" class="btn-secondary">Regresar</button>
    </div>
  </div>
</template>

<script>
import { connectToDatabase, getColumns, obfuscateData, deobfuscateData } from '@/services/sqliteService';

export default {
  data() {
    return {
      dbConnectionData: JSON.parse(localStorage.getItem('dbConnectionData')) || {},
      tableNames: JSON.parse(localStorage.getItem('dbConnectionData'))?.tableNames || [],
      selectedTable: '',
      columns: [],
      selectedColumns: [],
      obfuscationKey: ''
    };
  },
  methods: {
    async fetchColumns(tableName) {
      try {
        const response = await getColumns(this.dbConnectionData.dbName, tableName);
        this.columns = response.data.columns;
      } catch (error) {
        console.error('Error al obtener columnas:', error);
      }
    },
    async obfuscateData() {
      try {
        const response = await obfuscateData(this.dbConnectionData.dbName, this.selectedTable, this.selectedColumns);
        this.obfuscationKey = response.data.key;
        alert('Datos ofuscados exitosamente.');
      } catch (error) {
        console.error('Error al ofuscar datos:', error);
      }
    },
    async deobfuscateData() {
      try {
        await deobfuscateData(this.dbConnectionData.dbName, this.selectedTable, this.selectedColumns, this.obfuscationKey);
        alert('Datos desofuscados exitosamente.');
      } catch (error) {
        console.error('Error al desofuscar datos:', error);
      }
    },
    goBack() {
      this.$router.push({ path: '/SqlLite' });  // Cambia la ruta aquí
    }
  }
};
</script>

<style scoped>
.radio-container {
  display: inline-block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  user-select: none;
}

.radio-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: grey;
  border-radius: 50%;
}

.radio-container:hover input ~ .checkmark {
  background-color: #13322B;
}

.radio-container input:checked ~ .checkmark {
  background-color: #13322B;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.radio-container input:checked ~ .checkmark:after {
  display: block;
}

.radio-container .checkmark:after {
  top: 9px;
  left: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.table-container {
  max-width: 80%;
  position: relative;
  left: 10%;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  text-align: center;
}

th, td {
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #545454;
  color: #ffffff;
  position: relative;
}

.styled-table {
  border: 1px solid #ddd;
  border-collapse: collapse;
  width: 100%;
  margin: 25px 0;
  font-size: 18px;
  text-align: left;
}

.styled-table th, .styled-table td {
  padding: 12px 15px;
}

.styled-table thead tr {
  background-color: #0C231E;
  color: #ffffff;
  text-align: left;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #0C231E;
}

.styled-table tbody tr.active-row {
  font-weight: bold;
  color: #0C231E;
}

.table-two {
  max-height: 500px;
  overflow-y: scroll;
  overflow-x: scroll;
  top: 20px;
}

h3 {
  position: relative;
  left: 100px;
}

h1 {
  text-align: left;
  color: #0C231E;
  font-size: larger;
}

.selected {
  background-color: #868686;
}

.checkbox-container {
  margin-top: 5px;
}

.checkbox-container input[type="checkbox"] {
  cursor: pointer;
  accent-color: #0C231E;
}

.button-container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
