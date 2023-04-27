// HTML de la pagina - Estructura de la pagina
<template>
<!-- Q-page: Es el componente que envuelve a toda nuestra página -->
  <q-page padding>
  <!-- Q-card es el cuadro blanco dentro de la pagina -->
    <q-card class="q-pt-lg q-pb-lg">
    <!-- Area del titulo y boton agregar -->
      <div class="row">
        <h6 class="col q-ma-sm q-ml-lg">Registro de Materias</h6>
        <q-btn class="col-2 q-ma-sm q-mr-lg" text-color="black" color="accent" size="md" label="Agregar materia" @click="openModal" dense ellipsis/>
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
    <h5 style="margin:0px"> Agregar Materia</h5>
  </div>
  <q-separator style="margin:15px"/>

  <div class="row col-12">

    <!-- Columna 1 del modal agregar Materia -->
    <div class="col-6 col-6-full">

      <!-- Input para ingresar la especialidad
      <q-input v-model="especialidad" label="Especialidad *" hint="Ingrese la especialidad de la materia" lazy-rules dense style="padding: 0px 10px 45px 10px"
      :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>-->

      <!-- Input para ingresar el nombre de la materia-->
      <q-input v-model="nombre" label="Materia *" hint="Ingrese el nombre de la materia" lazy-rules dense style="padding: 0px 10px 45px 10px"
      :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>

      <!-- Input para ingresar el area de la materia-->
      <q-input v-model="area" label="Área *" hint="Ingrese el área de la materia" lazy-rules dense style="padding: 0px 10px 45px 10px"
      :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>

      <!-- Input para ingresar el semestre de la materia-->
      <q-input v-model="semestre" label="Semestre *" hint="Ingrese el semestre de la materia" lazy-rules dense style="padding: 0px 10px 45px 10px"
      type="number" max="11" min="1" step="1" :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>
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
      :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>-->

    </div>

    <!-- Botones del modal -->
    <div class="col-12 text-center">
      <q-separator style="margin:8px"/>
      <q-btn label="Cancelar" @click="openModal" flat class="q-ml-sm q-mr-md" />
      <q-btn label="Enviar" type="submit" @click="agregarMateria" color="secondary"/>
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
//import apiDocente from '../ModuloDocente/apiDocente.js'
import apiMateria from '../ModuloMateria/apiMateria.js'

// Declaraciones de constantes
const row = ref([])

//Constantes para inputs de creación
const showModal = ref(false)
//const especialidad = ref('')
const nombre = ref('')
const area = ref('')
const semestre = ref('')
const competencia = ref('')
const urlVideo = ref('')
const urlPrograma = ref('')
//const estatus = ref('')


//Abrir y cerrar modal
function openModal(){
  showModal.value = !showModal.value
}

// Columnas de la tabla
// especialidad, nombre, area, semestre, competencia, urlVideo, urlPrograma, estatus
const columns = [
 // { name: 'especialidad', label: 'Especialidad', align: 'center', field: 'especialidad', format: val => `${val}`, sortable: true},
  { name: 'nombre', required: true, label: 'Materia', align: 'center', field: 'nombre', format: val => `${val}`, sortable: true},
  { name: 'area', align: 'center', label: 'Área',align: 'center', field: 'area', sortable: true },
  { name: 'semestre', required: true, align: 'center', label: 'Semestre',align: 'center', field: 'semestre', sortable: true },
  { name: 'competencia', required: true, align: 'center', label: 'Competencia',align: 'center', field: 'competencia', sortable: true},
  { name: 'urlVideo', align: 'center', label: 'Url del Vídeo',align: 'center', field: 'urlVideo', sortable: true },
  { name: 'urlPrograma', required: true, align: 'center', label: 'Url del Programa',align: 'center', field: 'urlPrograma', sortable: true }]

// Llenado de la tabla con información del backend
 const returnData =  async () =>{
    const data = await apiMateria.getMaterias();
    console.log(data)
        data.data.map((el) => {
         var obj = {
//          especialidad: el.especialidad == null ? "Sin especialidad" : el.especialidad,
          nombre: el.nombre,
          area: el.area,
          semestre: el.semestre,
          competencia: el.competencia.length > 40 ? el.competencia.substring(0, 40) + "..." : el.competencia,
          urlVideo: el.urlVideo.length > 40 ? el.urlVideo.substring(0, 40) + "..." : el.urlVideo,
          urlPrograma: el.urlPrograma.length > 40 ? el.urlPrograma.substring(0, 40) + "..." : el.urlPrograma,
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

//Agregar registros
const agregarMateria = async () => {

  if(nombre.value == "" || area.value == "" || semestre.value == ""
  || competencia.value == "" || urlVideo.value == "" || urlPrograma.value == ""){

    console.log("Debe llenar todos los campos")

  }else{
    const data = {
      //especialidad: especialidad.value;
      nombre: nombre.value,
      area: area.value,
      semestre: semestre.value,
      competencia: competencia.value,
      urlVideo: urlVideo.value,
      urlPrograma: urlPrograma.value,
      carreraId: 11,
      status: 1
    }
    console.log(data)

    try {
      await apiMateria.createMateria(data);
      openModal();
      nombre.value = "";
      area.value = "";
      semestre.value = "";
      competencia.value = "";
      urlVideo.value = "";
      urlPrograma.value = "";
      returnData();
    }catch (e) {
      console.log(e)
    }
  }

}
// especialidad, nombre, area, semestre, competencia, urlVideo, urlPrograma, estatus
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
