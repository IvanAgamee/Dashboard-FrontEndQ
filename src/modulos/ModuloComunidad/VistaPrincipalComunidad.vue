<template>
  <q-page padding>
    <q-card class="q-pt-lg q-pb-lg">
      <div class="row">
        <h6 class="col q-ma-sm q-ml-lg">Registro de comunidades</h6>
        <q-select filled color="blue-10" v-model="selectedPrograma" :options="optionsProgramas"
        label="Programa" option-label="nombre" option-value="id" />
        <q-btn class="col-2 q-ma-sm q-mr-lg" text-color="white" color="secondary" size="md" label="Agregar Comunidad"
          @click="irAgregarDocente()" dense ellipsis />
      </div>

      <!-- Buscador -->
      <q-separator style="margin:15px" />
      <q-input class="q-ma-lg" v-model="search" label="Buscar comunidad" dense outlined clearable> <template
          v-slot:prepend>
          <q-icon name="search" />
        </template> </q-input>

      <!-- Table de comunidades -->
      <q-table class="my-sticky-header-table q-ma-lg" :rows="filteredRows" :columns="columns" header
        :rows-per-page-options="[10, 20, 50]">
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
import { Loading, QSpinnerGears } from 'quasar'
import { useRouter } from 'vue-router';
import authStore from '../../stores/userStore.js';
import apiComunidad from '../ModuloComunidad/apiComunidad.js'
import swal from 'sweetalert';

const router = useRouter();
const $q = useQuasar();
const row = ref([])
const UserStore = authStore();
const search = ref();

const optionsProgramas = UserStore.getProgramas;
const selectedPrograma = ref(UserStore.getProgramas[0])

// Columnas
const columns = [
  { name: 'nombre', align: 'center', label: 'Nombre', align: 'center', field: 'nombre', sortable: true },
  { name: 'descripcion', align: 'center', label: 'Descripción', align: 'center', field: 'quienesSomos', sortable: true },
  { name: 'acciones', align: 'center', label: 'Acciones', align: 'center', field: 'acciones', sortable: true }]

// Filtrado
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

// Obtener datos de las comunidades
const getComunidadesData = async (id) => {
  row.value = [];
  Loading.show({ spinner: QSpinnerGears, })
  const data = await apiComunidad.getComunidadByProgramaId(id);
  data.data.map((el) => {
    var obj = {
      id: el.comunidadId,
      nombre: el.nombre,
      descripcion: el.quienesSomos.length > 80 ? el.quienesSomos.substring(0, 80) + "..." : el.quienesSomos,
      acciones: [
        { nombre: 'Editar', funcion: () => { navegarEditarComunidad(el) }, class: 'btn-primary' },
        { nombre: 'Eliminar', funcion: () => { eliminarComunidad(el.comunidadId) }, class: 'btn-negative' }
      ],
    };
    row.value.push(obj);
  });
  Loading.hide()
};

getComunidadesData(selectedPrograma.value.programaId)

// Obtiene los datos de las comunidades 
// segun el cambio del select de programas
watch(selectedPrograma, (newVal) => {
  getComunidadesData(newVal.programaId)
});

// Navegar con spinners
const irAgregarDocente = async () => {
  Loading.show({ spinner: QSpinnerGears, })
  router.push({ path: "/agregarComunidad", });
  Loading.hide()
}

const navegarEditarComunidad = (el) => {
  Loading.show({ spinner: QSpinnerGears, })
  router.push({ name: "editComunidad", params: { id: el.comunidadId } });
  Loading.hide()
}

//Eliminar registros de la tabla
const eliminarComunidad = async (id) => {
  $q.dialog({
    title: 'Eliminar Comunidad',
    message: '¿Está seguro de eliminar esta comunidad?',
    cancel: true,
    color: 'blue'
  }).onOk(async () => {
    const data = {
      comunidadId: id,
      status: 0
    }
    Loading.show({ spinner: QSpinnerGears, })
    const response = await apiComunidad.createComunidades(data);
    swal({
      position: 'top-end',
      icon: response.success == true ? 'success' : 'error',
      title: response.success == true ? '¡Se ha eliminado la comunidad!'
        : '¡Ha ocurrido un error! Intentelo de nuevo',
      showConfirmButton: false,
      timer: 1500
    })
    Loading.hide()
    filteredRows;
    row.value = [];
    getComunidadesData(selectedPrograma.value.programaId);
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

