<template>
  <div>
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
        <li><a href="https://www.gob.mx/sct" target="_blank">SICT</a></li>
        <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
        <li><a href="../inicio">Sistema de Ofuscación en Ambientes de desarrollo.</a></li>
        <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
        <li class="pag">Ofuscación</li>
      </ol>
    </nav>

    <br><br>

    <div class="container">
      <div class="row">
        <div class="row-con">
          <a href="/BMySql"><img src="../assets/O1.png" alt="" class="of-one"></a>
          <div class="container container-green">
            <a href="/BMySql"><h2>MySql.</h2></a>
          </div>
        </div>
        <div class="row-con">
          <a href="/BPostgreSql"><img src="../assets/O2.png" alt=""></a>
          <div class="container container-green">
            <a href="/BPostgreSql"><h2>PostgreSql.</h2></a>
          </div>
        </div>
        <div class="row-con">
          <a href="/BOracle"><img src="../assets/O3.png" alt=""></a>
          <div class="container container-green">
            <a href="/BOracle"><h2>Oracle.</h2></a>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="row-con">
          <a href="/BSqlLite"><img src="../assets/O4.png" alt=""></a>
          <div class="container container-green cn">
            <a href="/BSqlLite"><h2>SqlLite.</h2></a>
          </div>
        </div>
        <div class="row-con">
          <a href="/BSqlServer"><img src="../assets/O5.png" alt=""></a>
          <div class="container container-green cn">
            <a href="/BSqlServer" style="margin-left: 20%;"><h2>SqlServer.</h2></a>
          </div>
        </div>
        <div class="row-con">
          <a href="/Bprogress"><img src="../assets/O8.png" alt=""></a>
          <div class="container container-green cn" style="margin-left: 31px;">
            <a href="/Bprogress" style="margin-left: 20%;"><h2>Progress.</h2></a>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="row-con">
          <a href="/BMongoDB"><img src="../assets/O9.png" alt=""></a>
          <div class="container container-green cno" style="margin-left: 25px;">
            <a href="/BMongoDB" style="margin-left: 20%;"><h2>MongoDB.</h2></a>
          </div>
        </div>
        <div class="row-con">
          <a href="/BDB2"><img src="../assets/O7.png" alt=""></a>
          <div class="container container-green cno" style="margin-left: 25px;">
            <a href="/BDB2" style="margin-left: 20%;"><h2>DB2.</h2></a>
          </div>
        </div>
      </div>
      <a href="../inicio"><button class="btn btn-primary pull-left" type="button">Regresar</button></a>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  // Definición del componente Vue aquí
}
</script>

<style scoped>
.container {
  text-align: center;
}

.row {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.row a {
  display: block; /* Convertir el enlace en un elemento de bloque */
  width: 200px; /* Ancho igual al de la imagen */
  height: auto; /* Altura ajustada automáticamente */
  margin: 0 30px; /* Margen entre cada imagen */
}

.row img {
  width: 100%; /* Ancho del 100% del contenedor (el enlace) */
  height: auto; /* Altura ajustada automáticamente */
  margin-bottom: 10px;
  transition: transform 0.3s ease; /* Agregar transición suave */
}

.container-green {
  position: absolute;
  width: 200px;
  height: 195px;
  background: #ffffff;
  border-radius: 20px;
  top: 167.5px;
  margin-left: 32.5px;
  text-align: center;
  align-items: center;
  opacity: 0;
  transition: all 1s;
}

.container-green a {
  position: relative;
  top: 25%;
  left: -25%;
  text-decoration: none;
  color: #000000;
  border: none;
  border-style: none;
}

.container-green h2 {
  font-weight: bolder;
  font-size: 30px;
}

.row-con:hover > .container-green {
  opacity: 1;
}

.cn {
  top: 386px;
  width: 255px !important;
}

.img-cn {
  border-radius: 20px;
  height: 194px !important;
  width: 194px !important;
  object-fit: cover;
}

.cno {
  top: 607.5px;
  width: 255px !important;
  height: 250px !important;
}
</style>
