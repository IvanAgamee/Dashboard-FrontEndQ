<template>
  <q-page padding>
<q-card class="q-pt-lg q-pb-lg">
      <div class="row">
        <h6 class="col q-ma-sm q-ml-lg">Registro de docentes</h6>
        <q-btn class="col-2 q-ma-sm q-mr-lg" text-color="black" color="accent" size="md" label="Agregar usuario" @click="openModal" dense ellipsis/>
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

    <MiModal v-model:show="showModal">
     <div class="col-12 text-center ">
      <h5 style="margin:0px">Agregar Docente</h5> 
    </div>
    <q-separator style="margin:15px" />
      <div class="row col-12">
              <div class="col-6 col-6-full">
              <q-input
      
                  v-model="nombre"
                  label="Nombre *"
                  hint="Ingrese el nombre completo"
                  lazy-rules
                  dense
                  style="padding: 0px 10px 45px 10px"
                  :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>
                  <q-input
                  
                  v-model="informacionAcademica"
                  label="Información academica *"
                  hint="Ingrese la formación academica del docente"
                  lazy-rules
                  dense
                  style="padding: 0px 10px 45px 10px"
                  :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>
                  <q-input
                  
                  v-model="programa"
                  label="Programa(s) *"
                  hint="Programa(s) en las que imparte clases"
                  lazy-rules
                  dense
                  style="padding: 0px 10px 45px 10px"
                  :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>
              </div>


              <div class="col-6 col-6-full">
                <q-input
                  
                  type="number"
                  v-model="contacto"
                  label="Contacto *"
                  hint="Ingrese el correo o el numero del docente"
                  lazy-rules
                  dense
                  style="padding: 0px 10px 45px 10px"
                  :rules="[ val => val !== null && val !== '' || 'Este campo es obligatorio']"/>
                <q-input
                  
                  v-model="descripcion"
                  label="Descripción *"
                  hint="Añade una pequeña descripción del docente"
                  lazy-rules
                  dense
                  style="padding: 0px 10px 45px 10px"
                  :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>
                <q-input
                  
                  v-model="fotodeperfil"
                  label="Foto de perfil *"
                  hint="Ingrese el Url de su foto de perfil"
                  lazy-rules
                  dense
                  style="padding: 0px 10px 45px 10px"
                  :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>
              </div>
            <div class="col-12 text-center ">
            <q-separator style="margin:8px" />
            <q-btn label="Cancelar" @click="openModal" flat class="q-ml-sm q-mr-md" />
            <q-btn label="Enviar" type="submit" @click="addRow" color="secondary"/>
            </div>
      </div>
    </MiModal>
  </q-page>
</template>

<script setup>
// Importaciones
import { ref } from 'vue'
import { QBtn, QTable, QCard } from 'quasar'
import MiModal from '../components/MiModal.vue'


const showModal = ref(false)

// Constantes para inputs creación/edición
const nombre = ref('')
const contacto = ref('')
const programa = ref('')
const descripcion = ref('')
const informacionAcademica = ref('')
const materias = ref('')
const fotodeperfil = ref('')
const row = ref([])

// Abrir y cerrar modal
function openModal () {
  showModal.value = !showModal.value
}

// Columnas de la tabla
const columns = [
  { name: 'nombre', required: true, label: 'Nombre', align: 'center', field: 'nombre', format: val => `${val}`, sortable: true},
  { name: 'contacto', align: 'center', label: 'Contacto',align: 'center', field: 'contacto', sortable: true },
  { name: 'programa', label: 'Programa',align: 'center', field: 'programa', sortable: true },
  { name: 'descripcion', label: 'Descripción', field: 'descripcion',align: 'center' },
  { name: 'informacionAcademica', label: 'Información academica',align: 'center', field: 'informacionAcademica' },
  { name: 'fotoPerfil', label: 'Foto perfil', field: 'fotoPerfil',align: 'center', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'acciones', label: 'Acciones', field: 'acciones', align: 'center', sortable: false }]

// Filas de la tabla
row.value = [
{
  nombre: 'Ivan Agame Malpica',
  contacto: '2299063184',
  programa: 'Ingenieria en Sistemas Computacionales',
  descripcion: 'Programador con 10 años de experiencia en cowbol',
  informacionAcademica: 'Egresado de la programa del Cetis 15',
  fotoPerfil: 'www.fotodeperfil.com',
  acciones: [
    { nombre: 'Editar', funcion: () => console.log('Editar') },
    { nombre: 'Eliminar', funcion: () => console.log('Eliminar') }
  ]
}]

// Añador nueva fila a la tabla
function addRow () {
  row.value.push({
    nombre: nombre.value,
    contacto: contacto.value,
    programa: programa.value,
    descripcion: descripcion.value,
    informacionAcademica: informacionAcademica.value,
    fotoPerfil: fotodeperfil.value,
    acciones: [
      { nombre: 'Editar', funcion: () => console.log(nombre.value) },
      { nombre: 'Eliminar', funcion: () => console.log('Eliminar') }
    ]
  })
  openModal()
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
</style>