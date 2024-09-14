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
        <li><a href="../SqlServer">SqlServer.</a></li>
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
                <input type="radio" :value="table" v-model="selectedTable" name="table" class="select-radio" />
                <span class="checkmark"></span>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="selectedTable">
      <h3>Columnas en la tabla: {{ selectedTable }}</h3>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Columna</th>
              <th>Seleccionar para ofuscar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="column in tableData[selectedTable]?.columns" :key="column">
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
      <div class="button-container" v-if="buttonsVisible">
        <button @click="maskData(3)" class="btn-danger" style="margin-left: 150px; top: 50px; position: relative;">Ofuscar</button>
        <button @click="unmaskData(3)" class="btn-default" style="margin-left: 150px; top: 50px; position: relative;">DesOfuscar</button>
      </div>
    </div>
    <br>
    <br>
    
    <div v-for="(data, tableName) in tableData" :key="tableName" style="display: none;">
      <h3 style="position: relative; left: 100px;">Tabla: {{ tableName }}</h3>

      <div class="table-container table-two" v-if="tableData">
        <table border="1">
          <thead>
            <tr>
              <th v-for="col in data.columns" :key="col">{{ col }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in data.rows" :key="row[0]">
              <td v-for="cell in row" :key="cell">{{ cell }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="button-container">
      <button @click="goBack" class="btn-secondary">Regresar</button>
    </div>

  </div>
</template>


<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'PostgresDataView',
  setup() {
    const dbConnectionData = ref({
      dbName: '',
      dbUser: '',
      dbHost: '',
      dbPort: '',
    });

    const selectedColumns = ref<string[]>([]);
    const tableNames = ref<string[]>([]);
    const selectedTable = ref<string | null>(null);
    const tableData = ref<Record<string, any>>({});
    const buttonsVisible = ref<boolean>(false);

    onMounted(async () => {
      const data = localStorage.getItem('dbConnectionData');
      if (data) {
        dbConnectionData.value = JSON.parse(data);

        try {
          const response = await axios.get('http://127.0.0.1:8000/api/sqlserver/tablas/');
          tableNames.value = response.data.tables;
        } catch (error) {
          console.error('Error al obtener los nombres de las tablas:', error);
        }
      }
    });

    watch(selectedTable, async (newTable) => {
      if (newTable) {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/sqlserver/tablas/datos/', {
            tables: [newTable]
          });
          tableData.value = response.data.data;
          selectedColumns.value = [];
          buttonsVisible.value = true;
        } catch (error) {
          console.error('Error al obtener los datos de las tablas:', error);
        }
      }
    });

    const maskData = async () => {
      if (selectedTable.value && selectedColumns.value.length > 0) {
        try {
          await axios.post('http://127.0.0.1:8000/api/sqlserver/tablas/enmascarar/', {
            table: selectedTable.value,
            columns: selectedColumns.value,
            action: 'mask'
          });
          alert('Columnas enmascaradas y actualizadas exitosamente.');
        } catch (error) {
          console.error('Error al enmascarar y actualizar las columnas:', error);
        }
      } else {
        alert('Por favor seleccione al menos una columna para enmascarar.');
      }
    };

    const unmaskData = async () => {
      if (selectedTable.value && selectedColumns.value.length > 0) {
        try {
          await axios.post('http://127.0.0.1:8000/api/sqlserver/tablas/enmascarar/', {
            table: selectedTable.value,
            columns: selectedColumns.value,
            action: 'unmask'
          });
          alert('Columnas desofuscadas y actualizadas exitosamente.');
        } catch (error) {
          console.error('Error al desofuscar y actualizar las columnas:', error);
        }
      } else {
        alert('Por favor seleccione al menos una columna para desofuscar.');
      }
    };

    const goBack = () => {
      window.history.back();
    };

    return {
      dbConnectionData,
      tableNames,
      selectedTable,
      tableData,
      selectedColumns,
      buttonsVisible,
      maskData,
      unmaskData,
      goBack,
    };
  },
});
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