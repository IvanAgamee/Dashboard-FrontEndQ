<template>
  <q-page padding>
    <q-card class="q-pt-lg q-pb-lg">
      <div class="row">
        <h6 class="col q-ma-sm q-ml-lg">Registro de Secciones</h6>
        <q-select filled color="blue-10" v-model="selectedPrograma" :options="optionsProgramas" label="Programa"
                  transition-show="flip-up" transition-hide="flip-down" option-label="nombre" option-value="id"/>
        <q-btn class="col-2 q-ma-sm q-mr-lg" text-color="white" color="secondary" size="md" label="Agregar seccion"
               @click="irAgregarseccion()" dense ellipsis />
      </div>
      <q-separator style="margin:15px" />
      <q-input class="q-ma-lg" v-model="search" label="Buscar una seccion" dense outlined clearable> <template v-slot:prepend>
        <q-icon name="search" />
      </template> </q-input>
      <!-- Estructura de la tabla -->
      <q-table class="my-sticky-header-table q-ma-lg" :rows="filteredRows" :columns="columns" header :rows-per-page-options="[10, 20, 50]">
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
import { ref, watch, computed } from "vue"
import { useQuasar } from 'quasar';
import authStore from '../../stores/userStore.js';
import MiModal from '../../components/MiModal.vue'
import apiSeccion from '../ModuloSecciones/apiSecciones.js';
import swal from 'sweetalert';
import { Loading, Notify, QSpinnerGears } from 'quasar'
import { useRouter } from 'vue-router';

const router = useRouter();
const $q = useQuasar();
const row = ref([])
const UserStore = authStore();
const search = ref();

const optionsProgramas = UserStore.getProgramas;
const selectedPrograma = ref(UserStore.getProgramas[0])

// Columnas de la tabla
const columns = [
  // { name: 'id', align: 'center', label: 'ID seccion', align: 'center', field: 'id', sortable: true },
  { name: 'titulo', required: true, label: 'Titulo', align: 'center', field: 'titulo', format: val => `${val}`, sortable: true },
  { name: 'descripcion', align: 'center', label: 'Descripcion', align: 'center', field: 'descripcion', sortable: true },
  //{name: 'objeto', align: 'center', label: 'Objeto', align: 'center', field: 'objeto', sortable: true },
  { name: 'acciones', align: 'center', label: 'Acciones', align: 'center', field: 'acciones', sortable: true }]

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

// Llenado de la tabla a traves del parametro id de carrera
const returnData = async (id) => {
  row.value = [];
  Loading.show({ spinner: QSpinnerGears, })
  const data = await apiSeccion.getSeccionByProgramaId(id);
  data.data.map((el) => {
    var obj = {
      id: el.seccionId,
      titulo: el.titulo,
      descripcion: el.descripcion?.length > 40 ? el.descripcion.substring(0, 40) + "..." : el.descripcion ?? '-',
      objeto: Array.isArray(el.objeto) ? el.objeto.map(item => item.descripcion).join(', ').substring(0,50) : (el.objeto && typeof el.objeto === 'object' ? el.objeto.descripcion : '-'),
      acciones: [
        { nombre: 'Editar', funcion: () => {navegarEditarseccion(el)}, class: 'btn-primary' }//,
      /*  { nombre: 'Eliminar', funcion: () => {eliminarseccion(el.seccionId)}, class: 'btn-negative' }*/
      ],
    };
    row.value.push(obj);
  });
  Loading.hide()
};

returnData(selectedPrograma.value.programaId)

// Observar cambios en el select
watch(selectedPrograma, (newVal, oldVal) => {
  returnData(newVal.programaId)});

// Navegar con spinners
const irAgregarseccion = async () => {
  Loading.show({ spinner: QSpinnerGears, })
  router.push({path: "/agregarseccion",});
  Loading.hide()
}

const navegarEditarseccion =  (el) => {
  Loading.show({ spinner: QSpinnerGears, })
  router.push({ name: 'editarSeccion', query:{id: el.seccionId}});
  Loading.hide()}

//Eliminar registros de la tabla
const eliminarSeccion = async (id) => {
  $q.dialog({
    title: 'Eliminar seccion',
    message: '¿Estas seguro de eliminar este seccion?',
    cancel: true,
    color: 'blue'
  }).onOk( async() => {
    const data = {
      seccionId: id,
      status: 0}
    Loading.show({ spinner: QSpinnerGears, })
    const response = await apiseccion.createseccion(data);
    swal({
      position: 'top-end',
      icon: response.success==true ? 'success' : 'error',
      title: response.success==true ? '¡Se ha eliminado el seccion!'
        : '¡Ha ocurrido un error! Intentelo de nuevo',
      showConfirmButton: false,
      timer: 1500})
    Loading.hide()
    filteredRows;
    row.value = [];
    returnData(selectedPrograma.value.programaId);
  })
}
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
