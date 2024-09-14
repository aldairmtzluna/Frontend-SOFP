<template>
  <div>
  <div class="sidebar">
    <button class="separator" id="button1"><i class="glyphicon glyphicon-user"></i><span>Cuenta</span></button>
    <button class="separator" id="button2"><i class="icon-calendar"></i><span>Catalogos</span></button>
    <button class="separator" id="button4"><i class="glyphicon glyphicon-tasks"></i><span>Administracion</span></button>
    <button  @click="cerrarSesion" class="separator" id="button4"><i class="glyphicon glyphicon-log-out"></i><span>Salir</span></button>
</div>
<nav id="breadcrumb">
<ol>
  <li><a href="https://www.gob.mx/" _blank><i class="glyphicon glyphicon-home"></i></a></li>
  <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
  <li><a href="https://www.gob.mx/sct" _blank>SICT</a></li>
  <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
  <li><a href="../inicio">Sistema de Ofuscación en Producción</a></li>
  <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
  <li class="pag"><a href="../usuarios">Usuarios</a></li>
  <li><span class="icons icon-arrow" aria-hidden="true"></span></li>
  <li class="pag">Registrar Usuario</li>
</ol>
</nav>
<div>
<div v-if="mensajeError" class="alert alert-danger mt-3" role="alert">
  ¡Error al enviar la información!
</div>
<br />

<div v-if="mensajeExito" class="alert alert-success mt-3" role="alert">
  ¡La información se envió correctamente!
</div>
<br />

<form @submit.prevent="enviarDatos" id="miFormulario">
  <div class="row">
    <div class="col-md-4">
      <div class="form-group">
        <IconsGneralVue class="glyphicon glyphicon-user" aria-hidden="true" />
        <LabelForm for="name" class="control-label">Nombre(s)*:</LabelForm>
        <input v-model="nombre" :class="{ 'has-error': !nombreValido }" type="text" id="name" class="form-control" placeholder="Ingrese su nombre" />
        <div v-if="!nombreValido" class="help-block">Nombre es obligatorio</div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="form-group">
        <LabelForm for="last-name" class="control-label">Apellido Paterno*:</LabelForm>
        <input v-model="apellido_paterno" :class="{ 'has-error': !apellidoPaternoValido }" type="text" id="last-name" class="form-control" placeholder="Ingrese su apellido paterno" />
        <div v-if="!apellidoPaternoValido" class="help-block">Apellido paterno es obligatorio</div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="form-group">
        <LabelForm for="second-last-name" class="control-label">Apellido Materno*:</LabelForm>
        <input v-model="apellido_materno" :class="{ 'has-error': !apellidoMaternoValido }" type="text" id="second-last-name" class="form-control" placeholder="Ingrese su apellido materno" />
        <div v-if="!apellidoMaternoValido" class="help-block">Apellido materno es obligatorio</div>
      </div>
    </div>
  </div>
  <br />
 
  <div class="row">
    <div class="col-md-4">
     <div class="form-group">
        <IconsGneralVue class="glyphicon glyphicon-envelope" aria-hidden="true" />
        <LabelForm for="email-01" class="control-label">Correo electrónico*:</LabelForm>
        <input v-model="correo" @input="correo = correo.toLowerCase()" :class="{ 'has-error': !correoValido }" placeholder="Correo electrónico" type="text" id="email-01" class="form-control" />
        <div>Solo se aceptan letras en minuscula</div>
        <div v-if="correoValido && !validarDominioCorreo(correo)" class="help-custom-error-text">Solo se permiten los dominios @sct.gob.mx y @sict.gob.mx</div>
        <div v-if="!correoValido && correo === ''" class="help-block">Correo electrónico es obligatorio</div>
        <div v-if="!correoValido && correo !== ''" class="help-block">El correo no cuenta con el dominio correcto</div>
        <div v-if="correoRegistrado" class="help-block">El correo ya está registrado</div>
      </div>
    </div>
  
    <div class="col-md-4">
      <div class="form-group">
        <IconsGneralVue class="glyphicon glyphicon-briefcase" aria-hidden="true" />
        <LabelForm for="rol" class="control-label">Rol*:</LabelForm>
        <select v-model="id_rol" class="form-control" :class="{ 'has-error': !rolValido }">
          <option value="0" selected>Seleccione un rol</option>
          <option v-for="rol in roles" :value="rol.id_rol" :key="rol.id_rol">{{ rol.nombre_rol }}</option>
        </select>
        <div v-if="!rolValido" class="help-block">Por favor, seleccione un rol válido.</div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="form-group">
        <IconsGneralVue class="glyphicon glyphicon-list-alt" aria-hidden="true" />
        <LabelForm for="unidad-administrativa" class="control-label">Unidad Administrativa*:</LabelForm>
        <select v-model="id_unidad" class="form-control" :class="{ 'has-error': !unidadValida }">
          <option value="0" selected>Seleccione una unidad</option>
          <option v-for="unidad in unidades" :value="unidad.id_unidad" :key="unidad.id_unidad">{{ unidad.nombre_unidad }}</option>
        </select>
        <div v-if="!unidadValida" class="help-block">Por favor, seleccione una unidad válida.</div>
      </div>
    </div>
  </div>
  <br />
    <div class="row">
    <div class="col-md-4">
      <div class="form-group">
       <IconsGneralVue class="glyphicon glyphicon-book" aria-hidden="true" />
        <LabelForm for="cargo" class="control-label">Cargo*:</LabelForm>
        <select v-model="id_cargo" class="form-control" :class="{ 'has-error': !cargoValido }">
          <option value="0" selected>Seleccione un cargo</option>
          <option v-for="cargo in cargos" :value="cargo.id_cargo" :key="cargo.id_cargo">{{ cargo.nombre_cargo }}</option>
        </select>
        <div v-if="!cargoValido" class="help-block">Por favor, seleccione un cargo válido.</div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="form-group">
        <IconsGneralVue class="glyphicon glyphicon-lock" aria-hidden="true" />
        <LabelForm for="password-01" class="control-label">Contraseña:</LabelForm>
        <input v-model="contrasena" :class="{ 'has-error': !contrasenaValida }" placeholder="Contraseña" type="password" id="password-01" class="form-control" />
        <div v-if="!contrasenaValida" class="help-block">Contraseña es obligatoria</div>
        <div v-if="contrasena.length > 0 && contrasena.length < 8" class="help-custom-error-text">La contraseña debe tener al menos 8 caracteres.</div>
        <div v-if="!/[A-Z]/.test(contrasena)" class="help-custom-error-text">La contraseña debe contener al menos una letra mayúscula.</div>
        <div v-if="!/[a-z]/.test(contrasena)" class="help-custom-error-text">La contraseña debe contener al menos una letra minúscula.</div>
        <div v-if="!/\d/.test(contrasena)" class="help-custom-error-text">La contraseña debe contener al menos un número.</div>
        <div v-if="!/[!@#$%^&*(),.?{}|<>]/.test(contrasena)" class="help-custom-error-text">La contraseña debe contener al menos un carácter especial.</div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="form-group">
        <IconsGeneralVue class="glyphicon glyphicon-lock" aria-hidden="true" />
        <LabelForm for="password-02" class="control-label">Repetir Contraseña:</LabelForm>
        <input v-model="confirmacionContrasena" :class="{ 'has-error': !confirmacionContrasenaValida }" placeholder="Repetir Contraseña" type="password" id="password-02" class="form-control" />
        <div v-if="!contrasenaValida" class="help-block">Confirmar contraseña es obligatorio</div>
        <div v-if="!confirmacionContrasenaValida" class="help-block">Repetir contraseña es obligatoria</div>
        <div v-if="contrasena !== confirmacionContrasena" class="help-block">Las contraseñas no coinciden.</div>
      </div>
    </div>
  </div>
  <br />
  <div class="row" style="display: flex;">
    <div class="col-md-12"  style="margin-left: 900px;">
      <a href="../usuarios"><button class="btn btn-default pull-right" type="button">Cancelar</button></a>
    </div>
    <div class="col-md-12">
      <button class="btn btn-primary pull-right" type="submit">Enviar</button>
    </div>
  </div>
</form>
</div>
</div>
</template>

<script setup lang="ts">
import IconsGneralVue from "../components/forms/IconsGeneral.vue";
import axios from 'axios';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const cerrarSesion = () => {
  localStorage.removeItem('token');
  router.push({ name: 'login' });
};

const obtenerFechaHoraCDMX = () => {
  const fechaActual = new Date();
  fechaActual.setHours(fechaActual.getHours() - 6);
  return fechaActual.toISOString().slice(0, 19).replace('T', ' ');
};

let correoRegistrado = ref(false);  //let
let nombre = ref('');
let apellido_paterno = ref('');
let apellido_materno = ref('');
let correo = ref(''); //let
let id_rol = ref(0);
let id_unidad = ref(0);
let id_cargo = ref(0);
let contrasena = ref('');
let estado = ref(1);
let fecha_creacion = ref(obtenerFechaHoraCDMX());
let fecha_modificacion = ref('2024-03-04T12:00:00');
let confirmacionContrasena = ref('');

let nombreValido = ref(true);
let apellidoPaternoValido = ref(true);
let apellidoMaternoValido = ref(true);
let correoValido = ref(true);
let contrasenaValida = ref(true);

let mensajeError = ref(false);
let mensajeExito = ref(false);
let confirmacionContrasenaValida = ref(true);
let rolValido = ref(true);
let unidadValida = ref(true);
let cargoValido = ref(true);

let roles = ref<{ id_rol: number; nombre_rol: string }[]>([]);
let unidades = ref<{ id_unidad: number; nombre_unidad: string }[]>([]);
let cargos = ref<{ id_cargo: number; nombre_cargo: string }[]>([]);

const cargarDatos = async () => {
  try {
    const responseRoles = await axios.get('http://127.0.0.1:8000/api/cargar-roles/');
    roles.value = responseRoles.data.roles;

    const responseUnidades = await axios.get('http://127.0.0.1:8000/api/cargar-unidades/');
    unidades.value = responseUnidades.data.unidades;

    const responseCargos = await axios.get('http://127.0.0.1:8000/api/cargar-cargos/');
    cargos.value = responseCargos.data.cargos;
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
};

onMounted(cargarDatos);

const validarDominioCorreo = (email: string): boolean => {
  const dominiosPermitidos = ['sct.gob.mx', 'sict.gob.mx'];
  const dominioCorreo = email.split('@')[1];
  return dominiosPermitidos.includes(dominioCorreo);
};

const verificarCorreo = async () => {
    try {
        const response = await axios.get('http://localhost:8000/verificar-correo/', {
            params: {
                correo: correo.value
            }
        });

        if (response.data.existe) {
            console.log('El correo ya está registrado');
            correoRegistrado.value = true;
        } else {
            correoRegistrado.value = false;
        }
    } catch (error) {
        console.error('Error al verificar el correo:', error);
        // Maneja el error adecuadamente, muestra un mensaje de error, etc.
    }
};

const enviarDatos = async () => {
    await verificarCorreo();

    

if (nombre.value == '') {
  nombreValido.value = false;
} else {
  nombreValido.value = true;
}
if (apellido_paterno.value == '') {
  apellidoPaternoValido.value = false;
} else {
  apellidoPaternoValido.value = true;
}
if (apellido_materno.value == '') {
  apellidoMaternoValido.value = false;
} else {
  apellidoMaternoValido.value = true;
}
if (correo.value == '') {
  correoValido.value = false;
} else {
  correoValido.value = true;
}

if (correo.value == '' || !validarDominioCorreo(correo.value)) {
  correoValido.value = false;
}

if (id_unidad.value == 0 || id_unidad.value == null) {
        unidadValida.value = false;
      } else {
        unidadValida.value = true;
      }if (id_cargo.value == 0 || id_cargo.value == null) {
        cargoValido.value = false;
      } else {
        cargoValido.value = true;
      }
      if (id_rol.value == 0 || id_rol.value == null) {
        rolValido.value = false;
      } else {
        rolValido.value = true;
      }
if (contrasena.value == '') {
  contrasenaValida.value = false;
} else {
  contrasenaValida.value = true;
}
if (contrasena.value !== confirmacionContrasena.value) {
  confirmacionContrasenaValida.value = false;
} else {
  confirmacionContrasenaValida.value = true;
}

if (correoRegistrado.value) {
        console.log('El correo ya está registrado');
        // Muestra un mensaje al usuario indicando que el correo ya está registrado
        return;
    }

if (
    nombre.value != '' &&
    apellido_paterno.value != '' &&
    apellido_materno.value != '' &&
    correo.value != '' &&
    contrasena.value !== '' &&
    confirmacionContrasena.value !== '' &&
    correoValido.value &&
    id_rol.value != 0 && id_unidad.value != 0 && id_cargo.value != 0 &&
    contrasenaValida.value &&
    confirmacionContrasenaValida.value
  ) {
    try {
      const response = await axios.post('http://localhost:8000/ingresar-usuario/', {
        nombre: nombre.value,
        apellido_paterno: apellido_paterno.value,
        apellido_materno: apellido_materno.value,
        correo: correo.value,
        id_rol: id_rol.value,
        id_unidad: id_unidad.value,
        id_cargo: id_cargo.value,
        contrasena: contrasena.value,
        estado: estado.value,
        fecha_creacion: fecha_creacion.value,
        fecha_modificacion: fecha_modificacion.value
      });

      if (response.status === 200) {
            mensajeExito.value = true;
            setTimeout(() => {
                mensajeError.value = false;
                mensajeExito.value = false; 
            }, 3000);
        } else {
            mensajeExito.value = false;
            setTimeout(() => {
                mensajeError.value = true;
            }, 3000);
        }
      // Limpiar los campos después de enviar los datos
      nombre.value = '';
      apellido_paterno.value = '';
      apellido_materno.value = '';
      correo.value = '';
      id_rol.value = 0;
      id_unidad.value = 0;
      id_cargo.value = 0;
      contrasena.value = '';
      confirmacionContrasena.value = '';
    } catch (error) {
      mensajeError.value = true;
      console.error('Error al enviar datos:', error);
    }
    
  }
};
</script>

<style scoped>
.has-error input {
border-color: red;
}

.help-block {
color: red;
}

.help-custom-error-text {
color: black;
font-size: small;
}

</style>