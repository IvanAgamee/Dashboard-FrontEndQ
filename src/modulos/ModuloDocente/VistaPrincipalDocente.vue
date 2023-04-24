// HTML de la pagina - Estructura de la pagina
<template>
<!-- Q-page: Es el componente que envuelve a toda nuestra página -->
  <q-page padding>
  <!-- Q-card es el cuadro blanco dentro de la pagina -->
    <q-card class="q-pt-lg q-pb-lg"> 
    <!-- Area del titulo y boton agregar -->
      <div class="row">
        <h6 class="col q-ma-sm q-ml-lg">Registro de docentes</h6>
        <q-btn class="col-2 q-ma-sm q-mr-lg" text-color="black" color="accent" size="md" label="Agregar docente" @click="openModal" dense ellipsis/>
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

// JavaScript de la página - Estructura de la página
<script setup>
// Importaciones de Vue
import {ref} from "vue"
// Importaciones de componentes
import { QBtn, QTable, QCard } from 'quasar'
import MiModal from '../../components/MiModal.vue'
// Llamadas al backend
import apiRaM from '../ModuloEjemplo/apiRickAndMorty.js'
import apiDocente from '../ModuloDocente/apiDocente.js'

// Declaraciones de constantes
const row = ref([])

// Columnas de la tabla
const columns = [
  { name: 'nombre', required: true, label: 'Nombre', align: 'center', field: 'nombre', format: val => `${val}`, sortable: true},
  { name: 'contacto', align: 'center', label: 'Contacto',align: 'center', field: 'contacto', sortable: true },
  { name: 'materias', align: 'center', label: 'Materias',align: 'center', field: 'materias', sortable: true },
  { name: 'descripcion', align: 'center', label: 'Descripcion',align: 'center', field: 'descripcion', sortable: true},
  { name: 'informacionAcademica', align: 'center', label: 'Información Academica',align: 'center', field: 'informacionAcademica', sortable: true },
  { name: 'urlImagen', align: 'center', label: 'Url de Imagen',align: 'center', field: 'urlImagen', sortable: true }]

// Llenado de la tabla con información del backend
 const returnData =  async () =>{
    const data = await apiDocente.getDocentes();
    console.log(data)
        data.data.map((el) => {
         var obj = {
          nombre: el.nombre,
          contacto: el.contacto,
          materias: el.materias.length > 40 ? el.materias.substring(0, 40) + "..." : el.materias,
          descripcion: el.descripcion.length > 40 ? el.descripcion.substring(0, 40) + "..." : el.descripcion,
          informacionAcademica: el.informacionAcademica.length > 40 ? el.informacionAcademica.substring(0, 40) + "..." : el.informacionAcademica,
          urlImagen: el.urlImagen.length > 40 ? el.urlImagen.substring(0, 40) + "..." : el.urlImagen,
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

// Diseño de la tabla - Estilos de la tabla
<style lang="scss">
.my-sticky-header-table {
  thead tr:first-child th {
    background-color: $table;
    font-weight: bold;
    color: white;
  }
}
</style>