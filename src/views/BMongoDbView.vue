<template>
  <div class="sidebar">
      <button class="separator" id="button1"><i class="glyphicon glyphicon-user"></i><span>Cuenta</span></button>
      <button class="separator" id="button2"><i class="glyphicon glyphicon-list-alt"></i><span>Actividad</span></button>
      <a href="../usuarios"><button class="separator" id="button4"><i class="glyphicon glyphicon-tasks"></i><span>Usuaurios</span></button></a>
      <button class="separator" id="button4"><i class="glyphicon glyphicon-log-out"></i><span>Salir</span></button>
    </div>

    <nav id="breadcrumb">
      <ol>
        <li><a href="https://www.gob.mx/" target="_blank"><i class="glyphicon glyphicon-home"></i></a></li>
        <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
        <li><a href="https://www.gob.mx/sct" target="_blank">SCIT</a></li>
        <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
        <li><a href="../inicio">Sistema de Ofuscación en Ambientes de desarrollo.</a></li>
        <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
        <li><a href="../ofuscacion">Ofuscación.</a></li>
        <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
        <li class="pag">MongoDB.</li>
      </ol>
    </nav>
  <div class="container mt-4">
    <form @submit.prevent="updateConnection" class="needs-validation" novalidate>
      <div class="form-group">
        <label for="dbName">Nombre de la base de datos. *</label>
        <input v-model="dbName" id="dbName" class="form-control" placeholder="Ingrese el Nombre." required />
      </div>
      <div class="form-group">
        <label for="host">Host de la base de datos. *</label>
        <input v-model="host" id="host" class="form-control" placeholder="Ingrese el Host." required />
      </div>
      <div class="form-group">
        <label for="port">Puerto de la base de datos. *</label>
        <input v-model="port" id="port" class="form-control" placeholder="Ingrese el Puerto." required />
      </div>
      <div class="form-group">
        <label for="username">Usuaurio de la base de datos. *</label>
        <input v-model="username" id="username" class="form-control" placeholder="Ingrese el Usuario." required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña de la base de datos. *</label>
        <input v-model="password" id="password" class="form-control" placeholder="Ingrese la Contraseña." type="password" required />
      </div>
      <button type="submit" class="btn btn-primary">Conectar</button>
      <a href="../ofuscacion" class="btn btn-default ml-2" style="margin-left: 15px;">Regresar</a>
    </form>
  </div>
</template>


<script>
import { updateMongoConnection } from '@/services/mongoService';

export default {
  data() {
    return {
      dbName: '',
      host: 'localhost',
      port: 27017,
      username: '',
      password: ''
    };
  },
  methods: {
    async updateConnection() {
      try {
        const dbConfig = {
          db_name: this.dbName,
          host: this.host,
          port: this.port,
          username: this.username,
          password: this.password
        };
        await updateMongoConnection(dbConfig);
        this.$router.push({ name: 'mongodb-datos', params: { dbName: this.dbName } });
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>