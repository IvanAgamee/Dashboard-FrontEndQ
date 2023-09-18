// HTML de la pagina - Estructura de la pagina
<template>
  <!-- Q-page: Es el componente que envuelve a toda nuestra página -->
  <q-page padding>
    <!-- Q-card es el cuadro blanco dentro de la pagina -->
    <q-card class="q-pt-lg q-pb-lg">
      <!-- Area del titulo y boton agregar -->
      <div class="row">
        <h6 class="col q-ma-sm q-ml-lg">Registro de materias</h6>
        <q-select filled color="blue-10" v-model="selectedPrograma" :options="optionsProgramas" label="Programa"
          transition-show="flip-up" transition-hide="flip-down" option-label="nombre" option-value="id"/>
        <q-btn class="col-2 q-ma-sm q-mr-lg" text-color="white" color="secondary" size="md" label="Agregar materia"
          @click="irAgregarMateria()" dense ellipsis />
      </div>
      <q-separator style="margin:15px" />
      <q-input class="q-ma-lg" v-model="search" label="Buscar una materia" dense outlined clearable> <template v-slot:prepend>
       <q-icon name="search" />
      </template> </q-input>
      <!-- Estructura de la tabla -->
      <q-table class="my-sticky-header-table q-ma-lg" :rows="filteredRows" :columns="columns" :rows-per-page-options="[10, 20, 50]">
        <!-- Agrega botones por cada registro de botones -->
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

// JavaScript de la página - Estructura de la página
<script setup>
// Importaciones de Vue
import { ref, computed, watch } from "vue"
// Importaciones de componentes
import { QBtn, QTable, QCard } from 'quasar'
import MiModal from '../../components/MiModal.vue'
// Llamadas al backend
//import apiRaM from '../ModuloEjemplo/apiRickAndMorty.js'
import apiMateria from '../ModuloMateria/apiMateria.js'
// outside of a Vue file
import { Loading, Notify, QSpinnerGears } from 'quasar'
import { Warning } from "postcss"
import authStore from '../../stores/userStore.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const UserStore = authStore();

// Declaraciones de constantes
const row = ref([])
const search = ref();
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

const optionsProgramas = UserStore.getProgramas;
console.log(UserStore.getUserProgramas)
const selectedPrograma = ref(UserStore?.getUserProgramas.programaId)


//Abrir y cerrar modal
function openModal() {
  showModal.value = !showModal.value
}

// Columnas de la tabla
const columns = [
  { name: 'nombre', required: true, label: 'Nombre', align: 'center', field: 'nombre', format: val => `${val}`, sortable: true },
  // { name: 'especialidad', align: 'center', label: 'Especialidad', align: 'center', field: 'especialidad', sortable: true },
  { name: 'competencia', required: true, align: 'center', label: 'Competencia', align: 'center', field: 'competencia', sortable: true },
  { name: 'area', align: 'center', label: 'Area', align: 'center', field: 'area', sortable: true },
  { name: 'acciones', align: 'center', label: 'Acciones', align: 'center', field: 'acciones', sortable: true }]

// const programasOptions = UserStore().fillSelectProgramas;

// const programas = ref(
//   {
//     label: programasOptions[0].nombre,
//     value: programasOptions[0].id,
//     options: programasOptions
//   }
// );

// Observar cambios en el select
 watch(selectedPrograma, (newVal, oldVal) => {
 returnData(newVal.programaId)});

const filteredRows = computed(() => {
  if (search.value) {
    const searchTerm = search.value.toLowerCase();
    return row.value.filter(row => {
      return Object.values(row).some(value =>
        String(value).toLowerCase().includes(searchTerm)
      );
    });
  }
  return row.value;
});

const leerProgramaId = () => {
  row.value = [];
  returnData(2);
}

// Llenado de la tabla con información del backend
const returnData = async (id) => {
  Loading.show({ spinner: QSpinnerGears, })
  const obj = { programaId: id}
  row.value = [];
  const data = await apiMateria.getMateriasByProgramaId(obj);
  data.data.map((el) => {
    var obj = {
      especialidad: el.especialidad == null ? "Sin especialidad" : el.especialidad.nombre,
      nombre: el.nombre,
      area: el.area,
      semestre: el.semestre,
      competencia: el.competencia?.length > 60 ? el.competencia.substring(0, 60) + "..." : el.competencia,
      urlVideo: el.urlVideo?.length > 40 ? el.urlVideo.substring(0, 40) + "..." : el.urlVideo,
      urlPrograma: el.urlPrograma?.length > 40 ? el.urlPrograma.substring(0, 40) + "..." : el.urlPrograma,
      acciones: [
        { nombre: "Editar", funcion: () => { datosModificarMateria(el), console.log(el) } },
        { nombre: 'Eliminar', funcion: () => { idEliminar.value = el.materiaId, showModalEliminar.value = true } }
      ],
    };
    row.value.push(obj);
  });
  Loading.hide()
};
returnData(selectedPrograma.value.programaId);

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

// Navegar con spinners
const irAgregarMateria = async () => {
Loading.show({ spinner: QSpinnerGears, })
router.push({path: "/agregarMateria",});
Loading.hide()
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
      programaId: 11,
      status: 1
    }
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
    programaId: 11,
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

.btn-editar {
  background-color: $secondary;
  color: white;
}

.btn-eliminar {
  background-color: $negative;
  color: white;
}
</style>
