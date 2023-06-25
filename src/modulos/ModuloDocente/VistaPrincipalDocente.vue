// HTML de la pagina - Estructura de la pagina
<template>
  <!-- Q-page: Es el componente que envuelve a toda nuestra página -->
  <q-page padding>
    <!-- Q-card es el cuadro blanco dentro de la pagina -->
    <q-card class="q-pt-lg q-pb-lg">
      <!-- Area del titulo y boton agregar -->

      <div class="row">
        <h6 class="col q-ma-sm q-ml-lg">Registro de docentes</h6>
        <q-select filled color="blue-10" v-model="carreras.label" :options="carrerasOptions" label="Carrera"
          transition-show="flip-up" transition-hide="flip-down" option-label="nombre" option-value="id"
          @update:model-value="leerCarreraId" />
        <q-btn class="col-2 q-ma-sm q-mr-lg" text-color="white" color="secondary" size="md" label="Agregar docente"
          @click="openModal" dense ellipsis />
      </div>
      <q-separator style="margin:15px" />
      <!-- Estructura de la tabla -->
      <q-table class="my-sticky-header-table q-ma-lg" :rows="row" :columns="columns" header>
        <!-- Agrega botones por cada registro de la tabla -->
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="column in props.cols" :key="column.name" :props="props">
              <template v-if="column.name !== 'acciones'">{{ props.row[column.name] }}</template>
              <template v-else>
                <q-btn-group>
                  <q-btn v-for="accion in props.row.acciones" :key="accion.nombre" @click="accion.funcion()"
                    :class="{ 'btn-editar': accion.nombre === 'Editar', 'btn-eliminar': accion.nombre === 'Eliminar' }"
                    :icon="accion.nombre === 'Editar' ? 'fa-solid fa-pencil' : 'fa-solid fa-trash'" size="11px" />
                </q-btn-group>
              </template>
            </q-td>
          </q-tr>
        </template>

      </q-table>
    </q-card>

    <MiModal v-model:show="showModal">
      <div class="col-12 text-center ">
        <h5 style="margin:0px">Agregar Docente</h5>
      </div>
      <q-separator style="margin:15px" />
      <div class="row col-12">
        <!-- Columna 1 del modal agregar Docente -->
        <div class="col-6 col-6-full">
          <!-- Input para ingresar el nombre -->
          <q-input v-model="nombre" label="Nombre *" hint="Ingrese el nombre completo" lazy-rules dense
            style="padding: 0px 10px 45px 10px" :rules="[val => val && val.length > 0 || 'Este campo es obligatorio']" />
          <!-- Input para ingresar su descripcion -->
          <q-input v-model="descripcion" label="Descripción *" hint="Ingrese la descripcion" lazy-rules dense
            style="padding: 0px 10px 45px 10px" :rules="[val => val && val.length > 0 || 'Este campo es obligatorio']" />
          <!-- Input para ingresar su información academica -->
          <q-input v-model="infoAcademica" label="Información academica *" hint="Ingrese su informacion academica *"
            lazy-rules dense style="padding: 0px 10px 45px 10px"
            :rules="[val => val && val.length > 0 || 'Este campo es obligatorio']" />
        </div>
        <!-- Columna 2 del modal agregar Docente -->
        <div class="col-6 col-6-full">
          <!-- Input para agregar materias -->
          <q-input type="text" v-model="materias" label="materias *" hint="Ingrese sus materias" lazy-rules dense
            style="padding: 0px 10px 45px 10px"
            :rules="[val => val !== null && val !== '' || 'Este campo es obligatorio']" />
          <!-- Input para agregar contacto -->
          <q-input v-model.number="contacto" label="Contacto *" hint="Ingrese su contacto" type="number" dense
            style="padding: 0px 10px 45px 10px" :rules="[val => val && val.length > 0 || 'Este campo es obligatorio']" />

          <q-input v-model="fotoPerfil" label="Url de la imagen *" hint="Ingrese el Url de su foto de perfil" lazy-rules
            dense style="padding: 0px 10px 45px 10px"
            :rules="[val => val && val.length > 0 || 'Este campo es obligatorio']" />
        </div>
        <!-- Botones del modal -->
        <div class="col-12 text-center ">
          <q-separator style="margin:8px" />
          <q-btn label="Cancelar" @click="ShowModal = false" class="q-ml-sm q-mr-md" color="negative" />
          <q-btn label="Enviar" type="submit" @click="showModalConfirmarAgregar = true" color="positive" />
        </div>
      </div>
    </MiModal>

    <!----------------MODAL CONFIRMAR AGREGAR DOCENTE---------------------->
    <MiModal v-model:show="showModalConfirmarAgregar">
      <div class="col-12 text-center ">
        <h5 style="margin:0px"> ¿Esta seguro que desea agregar al docente?</h5>
      </div>
      <q-separator style="margin:15px" />
      <!-- Botones del modal -->
      <div class="col-12 text-center">
        <q-separator style="margin:8px" />
        <q-btn label="Cancelar" @click="showModalConfirmarAgregar = false" class="q-ml-sm q-mr-md" color="negative" />
        <q-btn label="Enviar" type="submit" @click="agregarDocente()" color="positive" />
      </div>
    </MiModal>

    <MiModal v-model:show="showModalEliminar">
      <div class="col-12 text-center ">
        <h5 style="margin:0px">Esta seguro que desea eliminar este Docente?</h5>
      </div>
      <!-- Botones del modal -->
      <div class="col-12 text-center ">
        <q-separator style="margin:8px" />
        <q-btn label="Cancelar" @click="showModalEliminar = !showModalEliminar" flat class="q-ml-sm q-mr-md" />
        <q-btn label="Aceptar" type="submit" @click="eliminarDocente()" color="secondary" />
      </div>
    </MiModal>

    <MiModal v-model:show="showModalModificar">
      <div class="col-12 text-center ">
        <h5 style="margin:0px">Editar docente</h5>
      </div>
      <q-separator style="margin:15px" />
      <div class="row col-12">
        <!-- Columna 1 del modal agregar Docente -->
        <div class="col-6 col-6-full">
          <!-- Input para ingresar el nombre -->
          <q-input v-model="nombre" label="Nombre *" hint="Ingrese el nombre completo" lazy-rules dense
            style="padding: 0px 10px 45px 10px" :rules="[val => val && val.length > 0 || 'Este campo es obligatorio']" />
          <!-- Input para ingresar su descripcion -->
          <q-input v-model="descripcion" label="Descripción *" hint="Ingrese la descripcion" lazy-rules dense
            style="padding: 0px 10px 45px 10px" />
          <!-- Input para ingresar su información academica -->
          <q-input v-model="infoAcademica" label="Información academica *" hint="Ingrese su informacion academica *"
            lazy-rules dense style="padding: 0px 10px 45px 10px"
            :rules="[val => val && val.length > 0 || 'Este campo es obligatorio']" />
        </div>
        <!-- Columna 2 del modal agregar Docente -->
        <div class="col-6 col-6-full">
          <!-- Input para agregar materias -->
          <q-input type="text" v-model="materias" label="materias *" hint="Ingrese sus materias" lazy-rules dense
            style="padding: 0px 10px 45px 10px"
            :rules="[val => val !== null && val !== '' || 'Este campo es obligatorio']" />
          <!-- Input para agregar contacto -->
          <q-input v-model.number="contacto" label="Contacto *" hint="Ingrese su contacto" type="text" dense
            style="padding: 0px 10px 45px 10px" :rules="[val => val && val.length > 0 || 'Este campo es obligatorio']" />

          <q-input v-model="fotoPerfil" label="Url de la imagen *" hint="Ingrese el Url de su foto de perfil" lazy-rules
            dense style="padding: 0px 10px 45px 10px"
            :rules="[val => val && val.length > 0 || 'Este campo es obligatorio']" />
        </div>
        <!-- Botones del modal -->
        <div class="col-12 text-center ">
          <q-separator style="margin:8px" />
          <q-btn label="Cancelar" @click="showModalModificar = false" class="q-ml-sm q-mr-md" color="negative" />
          <q-btn label="Enviar" type="submit" @click="showModalConfirmarModificar = true" color="positive" />
        </div>
      </div>
    </MiModal>

    <!----------------MODAL CONFIRMAR ACTUALIZAR DOCENTE---------------------->
    <MiModal v-model:show="showModalConfirmarModificar">
      <div class="col-1 text-center ">
        <h5 style="margin:0px"> ¿Estas seguro que quieres modificar los datos de esta materia?</h5>
      </div>

      <!-- Botones del modal -->
      <div class="col-1 text-center">
        <q-separator style="margin:8px" />
        <q-btn label="Cancelar" @click="showModalConfirmarModificar = false" class="q-ml-sm q-mr-md" color="negative" />
        <q-btn label="Aceptar" type="submit" @click=modificarDocente() color="positive" />
      </div>

    </MiModal>

  </q-page>
</template>

// JavaScript de la página - Estructura de la página
<script setup>
// Importaciones de Vue
import { ref } from "vue"
import authStore from '../../stores/userStore.js';
// Importaciones de componentes
import MiModal from '../../components/MiModal.vue'
// Llamadas al backend
import apiDocente from '../ModuloDocente/apiDocente.js'
// outside of a Vue file
import { Loading, Notify, QSpinnerGears } from 'quasar'
// Declaraciones de constantes
const row = ref([])
const UserStore = authStore();


// Constantes para inputs de creación
const showModal = ref(false)
const showModalConfirmarAgregar = ref(false)
const showModalConfirmarModificar = ref(false)
const showModalEliminar = ref(false)
const showModalModificar = ref(false)
const nombre = ref('')
const descripcion = ref('')
const infoAcademica = ref('')
const materias = ref('')
const contacto = ref('')
const fotoPerfil = ref('')
const docenteId = ref('')
const idEliminar = ref('')

//select carreras
const carrerasOptions = UserStore.fillSelectCarreras;

const carreras = ref(
  {
    label: carrerasOptions[0].nombre,
    value: carrerasOptions[0].id,
    options: carrerasOptions
  }
);


const leerCarreraId = () => {
  row.value = [];
  returnData(2);
}
// Abrir y cerrar modal
function openModal() {
  showModal.value = !showModal.value
}

// Columnas de la tabla
const columns = [
  { name: 'id', align: 'center', label: 'ID Docente', align: 'center', field: 'id', sortable: true },
  { name: 'nombre', required: true, label: 'Nombre', align: 'center', field: 'nombre', format: val => `${val}`, sortable: true },
  { name: 'contacto', align: 'center', label: 'Contacto', align: 'center', field: 'contacto', sortable: true },
  { name: 'materias', align: 'center', label: 'Materias', align: 'center', field: 'materias', sortable: true },
  { name: 'acciones', align: 'center', label: 'Acciones', align: 'center', field: 'acciones', sortable: true }]

// Llenado de la tabla con información del backend
const returnData = async (mode) => {

  /*
  mode es el caso en el que se obtiene información del backend, si el modo es 1, se ejecuta cuando la página recarga, si es el
  por el caso 2, es cuando se cambia de valor en el select
  */
  let id = 0;

  switch (mode) {

    case 1: {
      id = carreras.value.value;
      break;
    }

    case 2: {
      id = carreras.value.label.id;
      break;
    }
  }
  //según el id se crea un objeto para enviarse y hacer la petición
  const obj = {
    carreraId: id
  }
  console.log(obj);
  const data = await apiDocente.getDocentesByCarreraId(obj);
  data.data.map((el) => {
    //console.log(authStore().getUserRolesId)
    var obj = {
      id: el.docenteId,
      nombre: el.nombre,
      contacto: el.contacto,
      materias: el.materias.length > 40 ? el.materias.substring(0, 40) + "..." : el.materias,
      acciones: [
        { nombre: 'Editar', funcion: () => { datosDocenteModificar(el) }, class: 'btn-primary' },
        { nombre: 'Eliminar', funcion: () => { idEliminar.value = el.docenteId, showModalEliminar.value = true }, class: 'btn-negative' }
      ],
    };
    row.value.push(obj);
  });
  return data;
};
returnData(1);


//Eliminar registros de la tabla
const eliminarDocente = async () => {
  const data = {
    docenteId: idEliminar.value,
    status: 0
  }
  try {
    Loading.show({ spinner: QSpinnerGears, })
    await apiDocente.createDocente(data);
    Loading.hide()
    showModalEliminar.value = false
    Notify.create('Se ha realizado correctamente')
    returnData();
  }

  catch (e) {
    console.log(e)
    returnData();
  }
}

// Agregar registros a la tabla
const agregarDocente = async () => {

  if (nombre.value == "") {
    console.log("Debe llenar todos los campos")
  }

  else {
    const data = {
      nombre: nombre.value,
      descripcion: descripcion.value,
      informacionAcademica: infoAcademica.value,
      materias: materias.value,
      contacto: contacto.value,
      urlImagen: fotoPerfil.value,
      carreraId: 11,
      status: 1,
    }
    console.log(data)
    try {
      Loading.show({ spinner: QSpinnerGears, })
      await apiDocente.createDocente(data);
      showModal.value = false;
      showModalConfirmarAgregar.value = false;
      Loading.hide()
      nombre.value = "",
        descripcion.value = "",
        infoAcademica.value = "",
        materias.value = "",
        contacto.value = "",
        fotoPerfil.value = "",
        Notify.create('Se ha realizado correctamente')
      returnData();
    } catch (e) {
      console.log(e)
    }
  }
}

// Lleno el modal con los valores del docente
const datosDocenteModificar = async (el) => {
  showModalModificar.value = true

  nombre.value = el.nombre,
    descripcion.value = el.descripcion,
    infoAcademica.value = el.informacionAcademica,
    materias.value = el.materias,
    contacto.value = el.contacto,
    fotoPerfil.value = el.urlImagen,
    docenteId.value = el.docenteId
}

// Modificar registros a la tabla
const modificarDocente = async () => {
  const data = {
    docenteId: docenteId.value,
    nombre: nombre.value,
    descripcion: descripcion.value,
    informacionAcademica: infoAcademica.value,
    materias: materias.value,
    contacto: contacto.value,
    urlImagen: fotoPerfil.value,
    carreraId: 11,
    status: 1,
  }

  if (nombre.value != "") {
    try {
      Loading.show({ spinner: QSpinnerGears, })
      await apiDocente.createDocente(data);
      showModalModificar.value = false
      showModalConfirmarModificar.value = false
      Loading.hide()
      Notify.create('Se ha realizado correctamente')
      returnData();
    } catch (e) {
      toast.error("No se pudo modificar el docente");
    }
  } else {
    Notify.create('El nombre del docente es obligatorio')
  }

  Notify.create({
    message: 'Danger, Will Robinson! Danger!',
    position: 'top-right',
    color: 'positive',
  });
}
</script>

// Diseño de la tabla - Estilos de la tabla
<style lang="scss">
@import '../../css/quasar.variables.scss';


.my-sticky-header-table {
  thead tr:first-child th {
    background-color: $table;
    font-weight: bold;
    color: white;
  }
}

.btn-editar {
  background-color: $secondary;
  color: white;
}

.btn-eliminar {
  background-color: $negative;
  color: white;
}
</style>
