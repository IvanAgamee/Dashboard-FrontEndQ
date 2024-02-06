<template>
  <q-page padding>
<q-card class="q-pt-lg q-pb-lg">
      <div class="row">
        <h6 class="col q-ma-sm q-ml-lg">Registro de Modulos</h6>
        <q-btn class="col-2 q-ma-sm q-mr-lg" text-color="black" color="accent" size="md" label="Agregar modulo" @click="openModal" dense ellipsis/>
    </div>
        <q-separator style="margin:15px" />
<q-table class="my-sticky-header-table q-ma-lg" :rows="row" :columns="columns" header>
  <template v-slot:body="props">
    <q-tr :props="props">
      <q-td v-for="column in props.cols" :key="column.name" :props="props">
        <template v-if="column.name !== 'acciones'">{{ props.row[column.name] }}</template>
        <template v-else>
          <q-btn-group>
            <q-btn v-for="accion in props.row.acciones" :key="accion.nombre" label="accion.nombre" @click="accion.funcion()" />
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
import {ref} from "vue"
import { QBtn, QTable, QCard } from 'quasar'
import apiRaM from '../ModuloEjemplo/apiRickAndMorty.js'

const row = ref([])

// Columnas de la tabla
const columns = [
  { name: 'moduloid', required: true, label: 'ModuloId', align: 'center', field: 'moduloid', format: val => `${val}`, sortable: true},
  { name: 'nombre', align: 'center', label: 'Nombre',align: 'center', field: 'nombre', sortable: true }]

// Filas de la tabla
row.value = [
{
  moduloid: '1',
  nombre: 'Modulo1',
  acciones: [
    { nombre: 'Editar', funcion: () => console.log('Editar') },
    { nombre: 'Eliminar', funcion: () => console.log('Eliminar') }
  ]
}]

 const returnData =  async () =>{
       const data = await apiRaM.getModulos();
         data.data.map((el) => {
        var obj = {
         moduloid: el.moduloId,
         nombre: el.nombre,
         acciones: [
           { nombre: 'Editar', funcion: () => console.log('Editar') },
           { nombre: 'Eliminar', funcion: () => console.log('Eliminar') }
         ],
       };
       row.value.push(obj);
       });
       return data;
   };
   returnData();

</script>

<style lang="scss">
.my-sticky-header-table {
  thead tr:first-child th {
    background-color: $table;
    font-weight: bold;
    color: white;
  }
}
</style>