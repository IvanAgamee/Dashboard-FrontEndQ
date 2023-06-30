// HTML de la pagina - Estructura de la pagina
<template>
  <!-- Q-page: Es el componente que envuelve a toda nuestra página -->
  <q-page padding>
    <!-- Q-card es el cuadro blanco dentro de la pagina -->
    <q-card class="q-pt-lg q-pb-lg">
      <!-- Area del titulo y boton agregar -->
      <div class="row">
        <h6 class="col q-ma-sm q-ml-lg">Registro de materias</h6>
        <q-select filled color="blue-10" v-model="carreras.label" :options="carrerasOptions" label="Carrera"
          transition-show="flip-up" transition-hide="flip-down" option-label="nombre" option-value="id"
          @update:model-value="leerCarreraId" />
        <q-btn class="col-2 q-ma-sm q-mr-lg" text-color="white" color="secondary" size="md" label="Agregar materia"
          @click="openModal" dense ellipsis />
      </div>
      <q-separator style="margin:15px" />

      <!-- Estructura de la tabla -->
      <q-table class="my-sticky-header-table q-ma-lg" :rows="row" :columns="columns" header>
        <!-- Agrega botones por cada registro de botones -->
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="column in props.cols" :key="column.name" :props="props">
              <template v-if="column.name !== 'acciones'">{{ props.row[column.name] }}</template>
              <template v-else>
                <q-btn-group>
                  <q-btn v-for="(accion, index) in props.row.acciones" :key="accion.nombre" :label="accion.nombre"
                    :class="`boton-${index}`" @click="accion.funcion()" />
                </q-btn-group>
              </template>
            </q-td>
          </q-tr>
        </template>

      </q-table>
    </q-card>
    <!----------------MODAL AGREGAR MATERIA---------------------->
    <MiModal v-model:show="showModal">
      <div class="col-12 text-center ">
        <h5 style="margin:0px"> Agregar Materia</h5>
      </div>

      <q-separator style="margin:15px" />

      <div class="row col-12">
        <!-- Columna 1 del modal agregar Materia -->
        <div class="col-6 col-6-full">

          <!-- Input para ingresar la especialidad
<q-input v-model="especialidad" label="Especialidad *" hint="Ingrese la especialidad de la materia" lazy-rules dense style="padding: 0px 10px 45px 10px"
:rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>-->

          <!-- Input para ingresar el nombre de la materia-->
          <q-input v-model="nombre" label="Nombre *" hint="Ingrese el nombre de la materia" lazy-rules dense
            style="padding: 0px 10px 45px 10px" :rules="[val => val && val?.length > 0 || 'Este campo es obligatorio']" />

          <!-- Input para ingresar el area de la materia-->
          <q-input v-model="area" label="Área *" hint="Ingrese el área de la materia" lazy-rules dense
            style="padding: 0px 10px 45px 10px" :rules="[val => val && val?.length > 0 || 'Este campo es obligatorio']" />

          <!-- Input para ingresar el semestre de la materia-->
          <q-input v-model="semestre" label="Semestre *" hint="Ingrese el semestre de la materia" lazy-rules dense
            style="padding: 0px 10px 45px 10px" type="number" max="11" step="1"
            :rules="[val => val && val?.length > 0 || 'Este campo es obligatorio']" />
        </div>

        <!-- Columna 2 del modal agregar Materia -->
        <div class="col-6 col-6-full">
          <!-- Input para ingresar la competencia de la materia-->
          <q-input v-model="competencia" label="Competencia *" hint="Ingrese la competencia de la materia" lazy-rules
            dense style="padding: 0px 10px 45px 10px"
            :rules="[val => val && val?.length > 0 || 'Este campo es obligatorio']" />

          <!-- Input para ingresar el url del vídeo de la materia-->
          <q-input v-model="urlVideo" label="URL del Vídeo *" hint="Ingrese el URL del Vídeo" lazy-rules dense
            style="padding: 0px 10px 45px 10px" :rules="[val => val && val?.length > 0 || 'Este campo es obligatorio']" />

          <!-- Input para ingresar el url del programa de la materia-->
          <q-input v-model="urlPrograma" label="URL del Programa *" hint="Ingrese el URL del Programa" lazy-rules dense
            style="padding: 0px 10px 45px 10px" :rules="[val => val && val?.length > 0 || 'Este campo es obligatorio']" />

          <!-- Input para ingresar el estatus de la materia
<q-input v-model="estatus" label="Estatus *" hint="Ingrese el estatus de la materia" lazy-rules dense style="padding: 0px 10px 45px 10px"
  :rules="[val => val && val.length > 0 || 'Este campo es obligatorio', val => /^[0-9]+$/.test(val) || 'Ingrese solo números']"
  type="number"/>-->
        </div>

        <!-- Botones del modal -->
        <div class="col-12 text-center">
          <q-separator style="margin:8px" />
          <q-btn label="Cancelar" @click="showModal = false" class="q-ml-sm q-mr-md" color="negative" />
          <q-btn label="Enviar" type="submit" @click="showModalConfirmarAgregar = true" color="positive" />
        </div>
      </div>

    </MiModal>
    <!----------------MODAL CONFIRMAR AGREGAR MATERIA---------------------->
    <MiModal v-model:show="showModalConfirmarAgregar">
      <div class="col-12 text-center ">
        <h5 style="margin:0px"> ¿Esta seguro que desea agregar la materia?</h5>
      </div>
      <q-separator style="margin:15px" />
      <!-- Botones del modal -->
      <div class="col-12 text-center">
        <q-separator style="margin:8px" />
        <q-btn label="Cancelar" @click="showModalConfirmarAgregar = false" class="q-ml-sm q-mr-md" color="negative" />
        <q-btn label="Enviar" type="submit" @click="agregarMateria()" color="positive" />
      </div>
    </MiModal>

    <!----------------MODAL ELIMINAR MATERIA---------------------->
    <MiModal v-model:show="showModalEliminar">
      <div class="col-12 text-center ">
        <h5 style="margin:0px"> ¿Esta seguro que desea eliminar la materia?</h5>
      </div>
      <q-separator style="margin:15px" />
      <!-- Botones del modal -->
      <div class="col-12 text-center">
        <q-separator style="margin:8px" />
        <q-btn label="Cancelar" @click="showModalEliminar = false" class="q-ml-sm q-mr-md" color="negative" />
        <q-btn label="Enviar" type="submit" @click="eliminarMaterias()" color="positive" />
      </div>
    </MiModal>
    <!----------------MODAL ACTUALIZAR MATERIA---------------------->
    <MiModal v-model:show="showModalModificar">

      <div class="col-12 text-center ">
        <h5 style="margin:0px">Editar materia</h5>
      </div>
      <q-separator style="margin:15px" />

      <div class="row col-12">

        <!-- Columna 1 del modal agregar Docente -->
        <div class="col-6 col-6-full">
          <!-- Input para ingresar la especialidad
              <q-input v-model="especialidad" label="Especialidad *" hint="Ingrese la especialidad de la materia" lazy-rules dense style="padding: 0px 10px 45px 10px"
              :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>-->

          <!-- Input para ingresar el nombre de la materia-->
          <q-input v-model="nombre" label="Nombre *" hint="Ingrese el nombre de la materia" lazy-rules dense
            style="padding: 0px 10px 45px 10px" :rules="[val => val && val?.length > 0 || 'Este campo es obligatorio']" />

          <!-- Input para ingresar el area de la materia-->
          <q-input v-model="area" label="Área *" hint="Ingrese el área de la materia" lazy-rules dense
            style="padding: 0px 10px 45px 10px" :rules="[val => val && val?.length > 0 || 'Este campo es obligatorio']" />

          <!-- Input para ingresar el semestre de la materia-->
          <q-input v-model="semestre" label="Semestre *" hint="Ingrese el semestre de la materia" lazy-rules dense
            style="padding: 0px 10px 45px 10px" type="number" max="11" step="1"
            :rules="[val => val && val?.length > 0 || 'Este campo es obligatorio']" />
        </div>

        <!-- Columna 2 del modal agregar Materia -->
        <div class="col-6 col-6-full">
          <!-- Input para ingresar la competencia de la materia-->
          <q-input v-model="competencia" label="Competencia *" hint="Ingrese la competencia de la materia" lazy-rules
            dense style="padding: 0px 10px 45px 10px"
            :rules="[val => val && val?.length > 0 || 'Este campo es obligatorio']" />

          <!-- Input para ingresar el url del vídeo de la materia-->
          <q-input v-model="urlVideo" label="URL del Vídeo *" hint="Ingrese el URL del Vídeo" lazy-rules dense
            style="padding: 0px 10px 45px 10px" :rules="[val => val && val?.length > 0 || 'Este campo es obligatorio']" />

          <!-- Input para ingresar el url del programa de la materia-->
          <q-input v-model="urlPrograma" label="URL del Programa *" hint="Ingrese el URL del Programa" lazy-rules dense
            style="padding: 0px 10px 45px 10px" :rules="[val => val && val?.length > 0 || 'Este campo es obligatorio']" />

          <!-- Input para ingresar el estatus de la materia
              <q-input v-model="estatus" label="Estatus *" hint="Ingrese el estatus de la materia" lazy-rules dense style="padding: 0px 10px 45px 10px"
                :rules="[val => val && val.length > 0 || 'Este campo es obligatorio', val => /^[0-9]+$/.test(val) || 'Ingrese solo números']"
                type="number"/>-->
        </div>

        <!-- Botones del modal -->
        <div class="col-12 text-center ">
          <q-separator style="margin:8px" />
          <q-btn label="Cancelar" @click="showModalModificar = false" class="q-ml-sm q-mr-md" color="negative" />
          <q-btn label="Enviar" type="submit" @click="showModalConfirmarModificar = true" color="positive" />
        </div>
      </div>
    </MiModal>

    <!----------------MODAL CONFIRMAR ACTUALIZAR MATERIA---------------------->
    <MiModal v-model:show="showModalConfirmarModificar">
      <div class="col-1 text-center ">
        <h5 style="margin:0px"> ¿Estas seguro que quieres modificar los datos de esta materia?</h5>
      </div>

      <!-- Botones del modal -->
      <div class="col-1 text-center">
        <q-separator style="margin:8px" />
        <q-btn label="Cancelar" @click="showModalConfirmarModificar = false" class="q-ml-sm q-mr-md" color="negative" />
        <q-btn label="Aceptar" type="submit" @click=modificarMateria() color="positive" />
      </div>

    </MiModal>

  </q-page>
</template>

// JavaScript de la página - Estructura de la página
<script setup>
// Importaciones de Vue
import { ref } from "vue"
// Importaciones de componentes
import { QBtn, QTable, QCard } from 'quasar'
import MiModal from '../../components/MiModal.vue'
// Llamadas al backend
//import apiRaM from '../ModuloEjemplo/apiRickAndMorty.js'
import apiMateria from '../ModuloMateria/apiMateria.js'
// outside of a Vue file
import { Loading, Notify, QSpinnerGears } from 'quasar'
import { Warning } from "postcss"
import UserStore from 'src/stores/userStore';

// Declaraciones de constantes
const row = ref([])
//Constantes para inputs de creación
const showModal = ref(false)
const showModalEliminar = ref(false)
const showModalConfirmarAgregar = ref(false)
const showModalModificar = ref(false)
const showModalConfirmarModificar = ref(false)
//const especialidad = ref('')
const nombre = ref('')
const area = ref('')
const semestre = ref('')
const competencia = ref('')
const urlVideo = ref('')
const urlPrograma = ref('')
const idEliminar = ref('')
const materiaId = ref('')
//Abrir y cerrar modal
function openModal() {
  showModal.value = !showModal.value
}

// Columnas de la tabla
const columns = [
  { name: 'nombre', required: true, label: 'Nombre', align: 'center', field: 'nombre', format: val => `${val}`, sortable: true },
  { name: 'especialidad', align: 'center', label: 'Especialidad', align: 'center', field: 'especialidad', sortable: true },
  { name: 'area', align: 'center', label: 'Area', align: 'center', field: 'area', sortable: true },
  { name: 'competencia', required: true, align: 'center', label: 'Competencia', align: 'center', field: 'competencia', sortable: true },
  { name: 'acciones', align: 'center', label: 'Acciones', align: 'center', field: 'acciones', sortable: true }]

const carrerasOptions = UserStore().fillSelectCarreras;

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

// Llenado de la tabla con información del backend
const returnData = async (mode) => {
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

  const obj = {
    carreraId: id
  }

  const data = await apiMateria.getMateriasByCarreraId(obj);
  data.data.map((el) => {
    var obj = {
      especialidad: el.especialidad == null ? "Sin especialidad" : el.especialidad.nombre,
      nombre: el.nombre,
      area: el.area,
      semestre: el.semestre,
      competencia: el.competencia?.length > 40 ? el.competencia.substring(0, 40) + "..." : el.competencia,
      urlVideo: el.urlVideo?.length > 40 ? el.urlVideo.substring(0, 40) + "..." : el.urlVideo,
      urlPrograma: el.urlPrograma?.length > 40 ? el.urlPrograma.substring(0, 40) + "..." : el.urlPrograma,
      acciones: [
        { nombre: "Editar", funcion: () => { datosModificarMateria(el), console.log(el) } },
        { nombre: 'Eliminar', funcion: () => { idEliminar.value = el.materiaId, showModalEliminar.value = true } }
      ],
    };
    row.value.push(obj);
  });
  return data;
};
returnData(1);

//Eliminar registros de la tabla
const eliminarMaterias = async () => {
  const data = {
    materiaId: idEliminar.value,
    status: 0
  }

  try {
    Loading.show({ spinner: QSpinnerGears, })
    await apiMateria.createMaterias(data);
    Loading.hide()
    showModalEliminar.value = false
    Notify.create('Se ha realizado correctamente')
    returnData();
  } catch (e) {
    console.log(e)
    returnData();
  }
}

//Agregar registros a la tabla
const agregarMateria = async () => {

  if (nombre.value == "" || area.value == "" || semestre.value == "" || competencia.value == "" ||
    urlVideo.value == "" || urlPrograma.value == "") {
    console.log("Debe llenar todos los campos")
  }

  else {
    const data = {
      nombre: nombre.value,
      area: area.value,
      semestre: semestre.value,
      competencia: competencia.value,
      urlVideo: urlVideo.value,
      urlPrograma: urlPrograma.value,
      carreraId: 11,
      status: 1
    }
    console.log(data)
    try {
      Loading.show({ spinner: QSpinnerGears, })
      await apiMateria.createMaterias(data);
      showModal.value = false;
      showModalConfirmarAgregar.value = false;
      Loading.hide()
      nombre.value = "",
        area.value = "",
        semestre.value = "",
        competencia.value = "",
        urlVideo.value = "",
        urlPrograma.value = "",
        Notify.create('Se ha realizado correctamente')
      returnData();
    } catch (e) {
      console.log(e)
    }
  }
}

//Llena el modal de editar con los valores de la materia
const datosModificarMateria = async (el) => {
  showModalModificar.value = true
  nombre.value = el.nombre,
    area.value = el.area,
    semestre.value = el.semestre,
    competencia.value = el.competencia,
    urlVideo.value = el.urlVideo,
    urlPrograma.value = el.urlPrograma,
    materiaId.value = el.materiaId
}

//Modificar los valores de la materia
const modificarMateria = async () => {
  const data = {
    materiaId: materiaId.value,
    nombre: nombre.value,
    area: area.value,
    semestre: semestre.value,
    competencia: competencia.value,
    urlVideo: urlVideo.value,
    urlPrograma: urlPrograma.value,
    carreraId: 11,
    status: 1
  }

  try {
    Loading.show({ spinner: QSpinnerGears, })
    await apiMateria.createMaterias(data);
    showModalModificar.value = false
    showModalConfirmarModificar.value = false
    Loading.hide()
    Notify.create('Se ha realizado correcta');
    returnData();
  } catch (e) {
    toast.error("No se pudo modificar la materia");
  }
}


</script>

// Diseño de la tabla - Estilos de la tabla
<style lang="scss">
.my-sticky-header-table {
  thead tr:first-child th {
    background-color: $table;
    font-weight: bold;
    color: white;
  }
}

.boton-0 {
  background-color: #0099FF;
  color: black;
}

.boton-1 {
  background-color: red;
  color: black;
}
</style>
