// HTML de la pagina - Estructura de la pagina
<template>
  <!-- Q-page: Es el componente que envuelve a toda nuestra página -->
  <q-page padding>
    <!-- Q-card es el cuadro blanco dentro de la pagina -->
    <q-card class="q-pt-lg q-pb-lg">
      <!-- Area del titulo y boton agregar -->
      <div class="row">
        <h6 class="col q-ma-sm q-ml-lg">Programas autorizados</h6>
        <!-- <q-btn class="col-2 q-ma-sm q-mr-lg" text-color="white" color="secondary" size="md" label="Agregar carrera" -->
          <!-- @click="openModal" dense ellipsis /> -->
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

  </q-page>
</template>

// JavaScript de la página - Estructura de la página
<script setup>
// Importaciones de Vue
import { ref } from "vue"
// Importaciones de componentes
import { QBtn, QTable, QCard } from 'quasar'
//import MiModal from '../../components/MiModal.vue'
// Llamadas al backend
import apiPrograma from '../ModuloPrograma/apiPrograma.js'
import UserStore from 'src/stores/userStore';

// Declaraciones de constantes
const row = ref([])


// Columnas de la tabla
const columns = [
  { name: 'nombre', required: true, label: 'Nombre de la carrera', align: 'center', field: 'nombre', format: val => `${val}`, sortable: true },
  { name: 'departamentoNombre', align: 'center', label: 'Nombre del departamento', align: 'center', field: 'departamento', sortable: true }
  // { name: 'acciones', align: 'center', label: 'Acciones', align: 'center', field: 'acciones', sortable: true }
  ]


// Llenado de la tabla con información del backend
const returnData = async () => {
  var departamento = {
    "departamentoId": UserStore().getUserDepartamento
  }
  const data = await apiPrograma.getProgramasByDepartment(departamento);
  data.data.map((el) => {
    var obj = {
      nombre: el.nombre,
      departamentoNombre: el.departamentoNombre,
      acciones: [
        { nombre: 'Editar', funcion: () => console.log('Editar') },
        { nombre: 'Eliminar', funcion: () => console.log(idEliminar.value = el.docenteId, eliminarDocente) }
      ],
    };
    row.value.push(obj);
  });
  return data;
};
returnData();

//Eliminar registros de la tabla
const eliminarDocente = async () => {
  const data = {
    docenteId: idEliminar.value,
    status: 0
  }

  try {
    await apiDocente.createDocente(data);
    returnData();
  } catch (e) {
    console.log(e)
    returnData();
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
