<template>
  <div>
    <div class="sidebar">
      <button class="btn btn-outline-secondary separator" id="button1"><i class="glyphicon glyphicon-user"></i><span>Cuenta</span></button>
      <button class="btn btn-outline-secondary separator" id="button2"><i class="glyphicon glyphicon-list-alt"></i><span>Actividad</span></button>
      <a href="../usuarios">
        <button class="btn btn-outline-secondary separator" id="button4"><i class="glyphicon glyphicon-tasks"></i><span>Usuarios</span></button>
      </a>
      <button class="btn btn-outline-secondary separator" id="button4"><i class="glyphicon glyphicon-log-out"></i><span>Salir</span></button>
    </div>

    <nav id="breadcrumb" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="https://www.gob.mx/" target="_blank"><i class="glyphicon glyphicon-home"></i></a></li>
        <li class="breadcrumb-item"><a href="https://www.gob.mx/sct" target="_blank">SCIT</a></li>
        <li class="breadcrumb-item"><a href="../inicio">Sistema de Ofuscación en Ambientes de desarrollo.</a></li>
        <li class="breadcrumb-item"><a href="../ofuscacion">Ofuscación.</a></li>
         <li class="pag">SqlLite.</li>
      </ol>
    </nav>

    <div id="app" class="container mt-4">
      <h1 class="mb-4">Conectar a SQLite</h1>
      <form @submit.prevent="connectToDatabase">
        <div class="form-group">
          <label for="databasePath">Ruta de la Base de Datos SQLite:</label>
          <input type="text" v-model="databasePath" id="databasePath" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">Conectar</button>
        <a href="../ofuscacion" class="btn btn-default ml-2" style="margin-left: 15px;">Regresar</a>
      </form>
      <p v-if="message" class="mt-3 alert alert-info">{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          databasePath: '',
          message: '',
      };
  },
  methods: {
      async connectToDatabase() {
          try {
              const response = await fetch('http://localhost:8000/api/connect_sqlite/', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ database_path: this.databasePath })
              });

              const data = await response.json();
              if (response.ok) {
                  this.message = data.message;
                  // Guardar los datos de la conexión en el localStorage
                  localStorage.setItem('dbConnectionData', JSON.stringify({
                      dbName: this.databasePath,
                      tableNames: data.tables
                  }));
                  // Redirigir a la nueva vista
                  this.$router.push({ name: 'SqlLiteDataView' });
              } else {
                  this.message = data.message;
              }
          } catch (error) {
              this.message = 'Error al conectar a la base de datos.';
              console.error(error);  // Muestra errores en la consola
          }
      }
  }
};
</script>

<style scoped></style>