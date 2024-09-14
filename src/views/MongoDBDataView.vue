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
        <li><a href="../MongoDB">MongoDB.</a></li>
        <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
        <li class="pag">Datos.</li>
      </ol>
    </nav>
    <h3>Estas conectado a: {{ dbName }}</h3>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Tabla</th>
            <th>Seleccionar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="collection in collections" :key="collection">
            <td>{{ collection }}</td>
            <td>
              <label class="radio-container">
                <input type="radio" :value="collection" v-model="selectedCollection" name="collection" class="select-radio" />
                <span class="checkmark"></span>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="filteredColumns.length">
      <h3>Campos en la tabla {{ selectedCollection }}:</h3>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Campos</th>
              <th>Seleccionar para ofuscar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="column in filteredColumns" :key="column">
              <td>{{ column }}</td>
              <td>
                <label class="checkbox-container">
                  <input type="checkbox" :value="column" v-model="selectedColumns" class="select-checkbox" />
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="button-container">
        <button @click="obfuscateData" class="btn-danger" style="margin-left: 150px; top: 50px; position: relative;">Ofuscar</button>
        <button @click="deobfuscateData" class="btn-default" style="margin-left: 150px; top: 50px; position: relative;">DesOfuscar</button>
      </div>
    </div>
    <div v-if="documents.length">
      <h3>Documents in {{ selectedCollection }}:</h3>
      <pre>{{ documents }}</pre>
    </div>
  </div>
</template>

<script>
import { getCollectionNames, getCollectionData, getCollectionColumns, obfuscateCollectionData, deobfuscateCollectionData } from '@/services/mongoService';

export default {
  data() {
    return {
      collections: [],
      columns: [],
      documents: [],
      selectedCollection: '',
      selectedColumns: [],
      dbName: ''
    };
  },
  async created() {
    this.dbName = this.$route.params.dbName;
    await this.fetchCollections();
  },
  watch: {
    selectedCollection(newCollection) {
      if (newCollection) {
        this.fetchCollectionData(newCollection);
        this.fetchCollectionColumns(newCollection);
      }
    }
  },
  computed: {
    filteredColumns() {
      return this.columns.filter(column => !column.startsWith('original_'));
    }
  },
  methods: {
    async fetchCollections() {
      try {
        const response = await getCollectionNames();
        this.collections = response.data.collections;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchCollectionData(collectionName) {
      try {
        const response = await getCollectionData(collectionName);
        this.documents = response.data.documents;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchCollectionColumns(collectionName) {
      try {
        const response = await getCollectionColumns(collectionName);
        this.columns = response.data.columns;
      } catch (error) {
        console.error(error);
      }
    },
    async obfuscateData() {
      try {
        await obfuscateCollectionData(this.selectedCollection, this.selectedColumns);
        this.fetchCollectionData(this.selectedCollection);
      } catch (error) {
        console.error(error);
      }
    },
    async deobfuscateData() {
      try {
        await deobfuscateCollectionData(this.selectedCollection, this.selectedColumns);
        this.fetchCollectionData(this.selectedCollection);
      } catch (error) {
        console.error(error);
      }
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
