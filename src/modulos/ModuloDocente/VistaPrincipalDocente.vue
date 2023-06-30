<template>
  <q-page padding>
    <q-card class="q-pt-lg q-pb-lg">
      <div class="row">
        <h6 class="col q-ma-sm q-ml-lg">Registro de docentes</h6>
        <q-select filled color="blue-10" v-model="carreras.label" :options="carrerasOptions" label="Carrera"
          transition-show="flip-up" transition-hide="flip-down" option-label="nombre" option-value="id"
          @update:model-value="leerCarreraId" />
        <q-btn class="col-2 q-ma-sm q-mr-lg" text-color="white" color="secondary" size="md" label="Agregar docente"
          @click="irAgregarDocente()" dense ellipsis />
      </div>
      <q-separator style="margin:15px" />
      <!-- Estructura de la tabla -->
        <video width="" height="" controls>
    
  </video>

  <iframe src="https://www.youtube.com/embed/Y3NULCmQ5zg"></iframe>
      <q-table class="my-sticky-header-table q-ma-lg" :rows="row" :columns="columns" header >
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
  </q-page>
</template>

<script setup>
import { ref } from "vue"
import { useQuasar } from 'quasar';
import authStore from '../../stores/userStore.js';
import MiModal from '../../components/MiModal.vue'
import apiDocente from '../ModuloDocente/apiDocente.js'
import { Loading, Notify, QSpinnerGears } from 'quasar'
import { useRouter } from 'vue-router';

const router = useRouter();
const $q = useQuasar();
const row = ref([])
const UserStore = authStore();
//select carreras
const carrerasOptions = UserStore.fillSelectCarreras;
const carreras = ref(
  {
    label: carrerasOptions[0].nombre,
    value: carrerasOptions[0].id,
    options: carrerasOptions
  });

const irAgregarDocente = async () => {
Loading.show({ spinner: QSpinnerGears, })
router.push({path: "/agregarDocente",});
Loading.hide()
}

const leerCarreraId = () => {
  row.value = [];
  returnData(2);
}

// Columnas de la tabla
const columns = [
  // { name: 'id', align: 'center', label: 'ID Docente', align: 'center', field: 'id', sortable: true },
  { name: 'nombre', required: true, label: 'Nombre', align: 'center', field: 'nombre', format: val => `${val}`, sortable: true },
  { name: 'contacto', align: 'center', label: 'Contacto', align: 'center', field: 'contacto', sortable: true },
  { name: 'materias', align: 'center', label: 'Materias', align: 'center', field: 'materias', sortable: true },
  { name: 'acciones', align: 'center', label: 'Acciones', align: 'center', field: 'acciones', sortable: true }]

// Llenado de la tabla con información del backend
const returnData = async (mode) => {
Loading.show({ spinner: QSpinnerGears, })
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
    carreraId: id}
  const data = await apiDocente.getDocentesByCarreraId(obj);
  data.data.map((el) => {
    var obj = {
      id: el.docenteId,
      nombre: el.nombre,
      contacto: el.contacto,
      materias: el.materias.length > 40 ? el.materias.substring(0, 40) + "..." : el.materias,
      acciones: [
        { nombre: 'Editar', funcion: () => { navegarEditarDocente(el) }, class: 'btn-primary' },
        { nombre: 'Eliminar', funcion: () => { idEliminar.value = el.docenteId, eliminarDocente() }, class: 'btn-negative' }
      ],
    };
    row.value.push(obj);
  });
  Loading.hide()
  return data;
};
returnData(1);

const navegarEditarDocente =  (el) => {
  console.log(el.docenteId)
Loading.show({ spinner: QSpinnerGears, })
router.push({name: "editDocente",params: { id: el.docenteId }});
Loading.hide()}

//Eliminar registros de la tabla
const eliminarDocente = async () => {
    $q.dialog({
      title: 'Eliminar Docente',
      message: '¿Estas seguro de eliminar este docente?',
      cancel: true,
      color: 'blue'
    }).onOk( async() => {
    const data = {
    docenteId: idEliminar.value,
    status: 0}
    Loading.show({ spinner: QSpinnerGears, })
    await apiDocente.createDocente(data);
    Loading.hide()
    Notify.create('Se ha realizado correctamente')
    returnData();
    })
  }

// Agregar registros a la tabla
// const agregarDocente = async () => {

//   if (nombre.value == "") {
//     console.log("Debe llenar todos los campos")
//   }

//   else {
//     const data = {
//       nombre: nombre.value,
//       descripcion: descripcion.value,
//       informacionAcademica: infoAcademica.value,
//       materias: materias.value,
//       contacto: contacto.value,
//       urlImagen: fotoPerfil.value,
//       carreraId: 11,
//       status: 1,
//     }
//     console.log(data)
//     try {
//       Loading.show({ spinner: QSpinnerGears, })
//       await apiDocente.createDocente(data);
//       showModal.value = false;
//       showModalConfirmarAgregar.value = false;
//       Loading.hide()
//       nombre.value = "",
//         descripcion.value = "",
//         infoAcademica.value = "",
//         materias.value = "",
//         contacto.value = "",
//         fotoPerfil.value = "",
//         Notify.create('Se ha realizado correctamente')
//       returnData();
//     } catch (e) {
//       console.log(e)
//     }
//   }
// }
</script>

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
