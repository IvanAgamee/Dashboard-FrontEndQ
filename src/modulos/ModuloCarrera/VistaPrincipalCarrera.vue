// HTML de la pagina - Estructura de la pagina
<template>
<!-- Q-page: Es el componente que envuelve a toda nuestra página -->
  <q-page padding>
  <!-- Q-card es el cuadro blanco dentro de la pagina -->
    <q-card class="q-pt-lg q-pb-lg">
    <!-- Area del titulo y boton agregar -->
      <div class="row">
        <h6 class="col q-ma-sm q-ml-lg">Registro de Carreras</h6>
        <q-btn class="col-2 q-ma-sm q-mr-lg" text-color="black" color="accent" size="md" label="Agregar Carrera" @click="openModal" dense ellipsis/>
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

<MiModal v-model:show="showModal">
  <div class ="col-12 text-center ">
    <h5 style="margin:0px"> Agregar Carrera</h5>
  </div>

  <q-separator style="margin:15px"/>

  <div class="row col-12">
    <!-- Columna 1 del modal agregar Materia -->
    <div class="col-6 col-6-full">

<!-- Input para ingresar la especialidad
<q-input v-model="especialidad" label="Especialidad *" hint="Ingrese la especialidad de la materia" lazy-rules dense style="padding: 0px 10px 45px 10px"
:rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>-->

<!-- Input para ingresar el nombre de la materia-->
<q-input v-model="nombre" label="nombre *" hint="Ingrese el nombre de la carrera" lazy-rules dense style="padding: 0px 10px 45px 10px"
:rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>

<!-- Input para ingresar el area de la materia-->
<q-input v-model="deártamento" label="Área *" hint="Ingrese el área de la materia" lazy-rules dense style="padding: 0px 10px 45px 10px"
:rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>

<!-- Input para ingresar el semestre de la materia-->
<q-input v-model="semestre" label="Semestre *" hint="Ingrese el semestre de la materia" lazy-rules dense style="padding: 0px 10px 45px 10px"
type="number" max="11" step="1" :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>
</div>

<!-- Columna 2 del modal agregar Materia -->
<div class="col-6 col-6-full">
<!-- Input para ingresar la competencia de la materia-->
<q-input v-model="competencia" label="Competencia *" hint="Ingrese la competencia de la materia" lazy-rules dense style="padding: 0px 10px 45px 10px"
:rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>

<!-- Input para ingresar el url del vídeo de la materia-->
<q-input v-model="urlVideo" label="URL del Vídeo *" hint="Ingrese el URL del Vídeo" lazy-rules dense style="padding: 0px 10px 45px 10px"
:rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>

<!-- Input para ingresar el url del programa de la materia-->
<q-input v-model="urlPrograma" label="URL del Programa *" hint="Ingrese el URL del Programa" lazy-rules dense style="padding: 0px 10px 45px 10px"
:rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>

<!-- Input para ingresar el estatus de la materia
<q-input v-model="estatus" label="Estatus *" hint="Ingrese el estatus de la materia" lazy-rules dense style="padding: 0px 10px 45px 10px"
  :rules="[val => val && val.length > 0 || 'Este campo es obligatorio', val => /^[0-9]+$/.test(val) || 'Ingrese solo números']"
  type="number"/>-->
</div>

<!-- Botones del modal -->
<div class="col-12 text-center">
<q-separator style="margin:8px"/>
<q-btn label="Cancelar" @click="openModal" flat class="q-ml-sm q-mr-md" />
<q-btn label="Enviar" type="submit" @click="agregarMateria" color="negative"/>
</div>
  </div>

</MiModal>
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
//import apiRaM from '../ModuloEjemplo/apiRickAndMorty.js'
import apiCarrera from '../ModuloCarrera/apiCarrera.js'

// Declaraciones de constantes
const row = ref([])

//Constantes para inputs de creación
const showModal = ref(false)
//const especialidad = ref('')
const carrera = ref('')
const departamento = ref('')
//Abrir y cerrar modal
function openModal(){
  showModal.value = !showModal.value
}

// Columnas de la tabla
const columns = [
  { name: 'nombre', required: true, label: 'Carrera', align: 'center', field: 'nombre', format: val => `${val}`, sortable: true},
  { name: 'departamentoNombre', align: 'center', label: 'Departamento',align: 'center', field: 'departamentoNombre', sortable: true }]

// Llenado de la tabla con información del backend
 const returnData =  async () =>{
    const data = await apiCarrera.getCarreras();
    console.log(data)
        data.data.map((el) => {
         var obj = {
          nombre: el.nombre,
          departamentoNombre: el.departamentoNombre,
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

   //Agregar registros a la tabla
   /* const agregarMateria = async () => {
      if(nombre.value == "" || area.value == "" || semestre.value == "" || competencia.value == "" || urlVideo.value == "" || urlPrograma.value == ""){
        console.log("Debe llenar todos los campos")
      }

      else{
        const data = {
          carrera: carrera.value,
          departamento: departamento.value,
          carreraId: 11,
          status:1
        }
        console.log(data)

        try{
          await apiCarrera.createCarrera(data);
          openModal();
          returnData();

        }catch (e){
          console.log(e)
        }
      }

   }*/
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
