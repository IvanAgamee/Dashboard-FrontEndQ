<template>
  <q-page padding>
    <q-card class="q-pt-lg q-pb-lg">
      <div class="row">
        <h6 class="col q-ma-sm q-ml-lg">Registro de materias</h6>
        <q-select filled color="blue-10" v-model="selectedPrograma" :options="optionsProgramas" 
        label="Programa" option-label="nombre" option-value="id"/>
        <q-btn class="col-2 q-ma-sm q-mr-lg" text-color="white" color="secondary" size="md" label="Agregar materia"
          @click="irAgregarMateria()" dense ellipsis />
      </div>
      <q-separator style="margin:15px" />
      <q-input class="q-ma-lg" v-model="search" label="Buscar una materia" dense outlined clearable> <template v-slot:prepend>
       <q-icon name="search" />
      </template> </q-input>

      <!-- Tabla materias -->
      <q-table class="my-sticky-header-table q-ma-lg" :rows="filteredRows" :columns="columns" :rows-per-page-options="[10, 20, 50]">
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
import { ref, computed, watch } from "vue"
import { QBtn, QTable, QCard } from 'quasar'
import apiMateria from '../ModuloMateria/apiMateria.js'
import { Loading, QSpinnerGears } from 'quasar'
import authStore from '../../stores/userStore.js';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import swal from 'sweetalert';

const router = useRouter();
const UserStore = authStore();
const $q = useQuasar();

const row = ref([])
const search = ref();

const optionsProgramas = UserStore.getProgramas;
const selectedPrograma = ref(UserStore.getProgramas[0])


// Columnas
const columns = [
  { name: 'nombre', required: true, label: 'Nombre', align: 'center', field: 'nombre', format: val => `${val}`, sortable: true },
  { name: 'competencia', required: true, align: 'center', label: 'Competencia', align: 'center', field: 'competencia', sortable: true },
  { name: 'area', align: 'center', label: 'Area', align: 'center', field: 'area', sortable: true },
  { name: 'acciones', align: 'center', label: 'Acciones', align: 'center', field: 'acciones', sortable: true }]

// Observar cambios en el select
 watch(selectedPrograma, (newVal) => {
 getMateriasData(newVal.programaId)});

// Filtrar materias
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

// Obtener materias
const getMateriasData = async (id) => {
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
        { nombre: 'Editar', funcion: () => {navegarEditarDocente(el)}},
        { nombre: 'Eliminar', funcion: () => { eliminarMateria(el.materiaId)} }
      ],
    };
    row.value.push(obj);
  });
  Loading.hide()
};

getMateriasData(selectedPrograma.value.programaId);

const navegarEditarDocente =  (el) => {
  Loading.show({ spinner: QSpinnerGears, })
    router.push({name: "editMateria",params: { id: el.materiaId }});
  Loading.hide()
}


// Eliminar Materia
const eliminarMateria = async (id) => {
    $q.dialog({
      title: 'Eliminar materia',
      message: '¿Estás seguro de eliminar esta materia?',
      cancel: true,
      color: 'blue'
    }).onOk( async() => {
      const data = {
        materiaId: id,
        status: 0
      }
    Loading.show({ spinner: QSpinnerGears, })
      const response = await apiMateria.createMaterias(data);
        swal({
        position: 'top-end',
        icon: response.success==true ? 'success' : 'error',
        title: response.success==true ? '¡Se ha eliminado la materia!'
        : '¡Ha ocurrido un error! Intentelo de nuevo',
        showConfirmButton: false,
        timer: 1500})
      Loading.hide()
      filteredRows;
      row.value = [];
      getMateriasData(selectedPrograma.value.programaId);
    })
  }

// Navegar con spinners
const irAgregarMateria = async () => {
  Loading.show({ spinner: QSpinnerGears, })
  router.push({path: "/agregarMateria",});
  Loading.hide()
}

</script>

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
