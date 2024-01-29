<template>
  <q-page padding>
    <q-card class="q-pt-lg q-pb-lg">
      <div class="row">
        <h6 class="col q-ma-sm q-ml-lg">Programas autorizados</h6>
      </div>
      <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">A continuación se muestran los programas a los que su usuario
        tiene permiso de gestionar.</div>
      <q-separator style="margin:15px" />

      <!-- TABLA DE PERMISOS -->
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

<script setup>
import { ref } from "vue"
import { QBtn, QTable, QCard } from 'quasar'
import UserStore from 'src/stores/userStore';

const row = ref([])

// Columnas
const columns = [
  { name: 'nombre', required: true, label: 'Nombre de la carrera', align: 'center', field: 'nombre', format: val => `${val}`, sortable: true },
  { name: 'departamentoNombre', align: 'center', label: 'Nombre del departamento', align: 'center', field: 'departamento', sortable: true }
  ]

// Obtiene los programas que pertenecen al usuario logueado
const getProgramasByUserId = async () => {
  var departamento = {
    "departamentoId": UserStore().getUserDepartamento
  }
  const data = UserStore().getProgramas;
  console.log(data)
  data.map((el) => {
    var obj = {
      nombre: el.nombre,
      departamentoNombre: el.departamento.nombre,
      acciones: [
        { nombre: 'Editar', funcion: () => console.log('Editar') },
        { nombre: 'Eliminar', funcion: () => console.log(idEliminar.value = el.docenteId, eliminarDocente) }
      ],
    };
    row.value.push(obj);
  });
  return data;
};
getProgramasByUserId();

//Eliminar docente
const eliminarDocente = async () => {
  const data = {
    docenteId: idEliminar.value,
    status: 0
  }
  try {
    await apiDocente.createDocente(data);
    getProgramasByUserId();
  } catch (e) {
    console.log(e)
    getProgramasByUserId();
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
