<template>
  <q-page padding>
    <q-card class="q-pt-lg q-pb-lg">
      <div class="row">
        <h6 class="col q-ma-sm q-ml-lg">Registro de lineas de investigación</h6>
        <q-select filled color="blue-10" v-model="selectedPrograma" :options="optionsProgramas" 
        label="Programa" option-label="nombre" option-value="id"/>
        <q-btn class="col-2 q-ma-sm q-mr-lg" text-color="white" color="secondary" size="md" label="Agregar linea de inv."
          @click="openModal" dense ellipsis />
      </div>
    <q-separator style="margin:15px" />
    <q-input class="q-ma-lg" v-model="search" label="Buscar linea de investigación" dense outlined clearable> <template v-slot:prepend>
      <q-icon name="search" />
    </template> </q-input>

  <!-- TABLA -->
  <q-table class="my-sticky-header-table q-ma-lg" :rows="filteredRows" :columns="columns" header>
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
  
<!----------------MODAL AGREGAR LINEA DE INV ---------------------->
<MiModal v-model:show="showModal">
  <div class ="col-12 text-center ">
    <h6 style="margin:0px"> Nueva linea de investigación</h6>
  </div>
    <q-separator style="margin:15px"/>

  <div class="row col-12">
    <div class="col-12 col-12-full">
      <q-input v-model="lineaInv.nombre" label="Nombre" lazy-rules dense style="padding: 0px 10px 20px 10px"/>
      <q-input v-model="lineaInv.objetivo" label="Objetivo" lazy-rules dense style="padding: 0px 10px 20px 10px"/>
      <q-input v-model="lineaInv.integrantes" label="Integrantes" lazy-rules dense style="padding: 0px 10px 20px 10px"/>
      <q-select color="blue-10" v-model="selectedPrograma" :options="optionsProgramas" 
        label="Programa" option-label="nombre" option-value="id" style="padding: 0px 5px 25px 10px"/>
    </div>

    <div class="col-12 text-center">
    <q-separator style="margin:8px"/>
      <q-btn label="Cancelar" @click="showModal=false" class="q-ml-sm q-mr-md" color="negative"/>
      <q-btn label="Agregar" type="submit" @click="agregarUsuario()" class="btn-editar"/>
    </div>
  </div>

</MiModal>

<!----------------MODAL EDITAR LINEA ---------------------->
<MiModal v-model:show="showModalModificar">
  <div class="col-12 text-center ">
    <h6 style="margin:0px">Editar especialidad</h6>
  </div>
  <q-separator style="margin:15px" />

  <div class="row col-12">
    <div class="col-12 col-12-full">
      <q-input v-model="lineaInv.nombre" label="Nombre" lazy-rules dense style="padding: 0px 10px 20px 10px"/>
      <q-input v-model="lineaInv.objetivo" label="Objetivo" lazy-rules dense style="padding: 0px 10px 20px 10px"/>
      <q-input v-model="lineaInv.integrantes" label="Integrantes" lazy-rules dense style="padding: 0px 10px 20px 10px"/>
      <q-select color="blue-10" v-model="selectedPrograma" :options="optionsProgramas" 
        label="Programa" option-label="nombre" option-value="id" style="padding: 0px 5px 25px 10px"/>
    </div>

    <div class="col-12 text-center ">
      <q-separator style="margin:8px" />
        <q-btn label="Cancelar" @click="showModalModificar=false" class="q-ml-sm q-mr-md" color="negative"/>
        <q-btn label="Editar" type="submit" @click="ModificarUsuario()" class="btn-editar"/>
    </div>
  </div>
</MiModal>

<!----------------MODAL CONFIRMAR ELIMINAR ---------------------->
<MiModal v-model:show="showModalConfirmarModificar">
  <div class ="col-1 text-center ">
    <h5 style="margin:0px"> ¿Estas seguro que quieres modificar los datos de este usuario?</h5>
  </div>

  <div class="col-1 text-center">
    <q-separator style="margin:8px"/>
      <q-btn label="Cancelar" @click="showModalConfirmarModificar=false" class="q-ml-sm q-mr-md" color="negative"/>
      <q-btn label="Aceptar" type="submit" @click=ModificarUsuario() class="btn-editar"/>
  </div>
</MiModal>

 </q-page>
</template>

<script setup>
import {ref, watch, computed} from "vue"
import { QBtn, QTable, QCard } from 'quasar'
import { useQuasar } from 'quasar';
import MiModal from '../../components/MiModal.vue'
import apiLineasInv from '../ModuloLineasInv/apiLineasInv.js'
import apiUsuario from '../ModuloUsuario/apiUsuario.js'
import { Loading,Notify, QSpinnerGears } from 'quasar'
import UserStore from 'src/stores/userStore';
import swal from 'sweetalert';
const search = ref();

const $q = useQuasar();

const row = ref([])
const optsDptos = ref([])
const optsRoles = ref([])

const optionsProgramas = UserStore().getProgramas;
const selectedPrograma = ref(UserStore().getProgramas[0])

const showModal = ref(false)
const showModalConfirmarAgregar = ref(false)
const showModalModificar = ref(false)
const showModalConfirmarModificar = ref(false)
const lineaInv = ref({
    id: 0,
    nombre: "",
    objetivo: "",
    integrantes: "",
    programaId: 1,
    status: 1
})

//Abrir y cerrar modal
function openModal(){
  showModal.value = !showModal.value
  clearInput()
}

// Observar cambios en el select
 watch(selectedPrograma, () => {
 returnData()});

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

// Columnas de la tabla
const columns = [
  { name: 'nombre', required: true, align: 'center', label: 'Nombre', field: 'nombre', format: val => `${val}`, sortable: true},
  { name: 'objetivo', required: true, align: 'center', label: 'Objetivo', field: 'objetivo', format: val => `${val}`, sortable: true},
  { name: 'integrantes', required: true, align: 'center', label: 'Integrantes', field: 'integrantes', format: val => `${val}`, sortable: true},
  { name: 'acciones', align: 'center', label: 'Acciones',align: 'center', field: 'acciones', sortable: true }]

// Llenado de la tabla con información del backend
 const returnData =  async () =>{
  row.value=[];
    const data = await apiLineasInv.getLineasDeInv(selectedPrograma.value.programaId);
        data.data.map((el) => {
         var obj = {
          nombre: el.nombre?.length > 80 ? el.nombre.substring(0, 80) + "..." : el.nombre,
          objetivo: el.objetivo?.length > 40 ? el.objetivo.substring(0, 40) + "..." : el.objetivo,
          integrantes: el.integrantes?.length > 40 ? el.integrantes.substring(0, 40) + "..." : el.integrantes,
          acciones: [
            { nombre: 'Editar', funcion: () => {datosModificarUsuario(el)} },
            { nombre: 'Eliminar', funcion: () =>{eliminarEspecialidad(el.lineaInvestigacionId)} }
          ],
        };
       row.value.push(obj);
        });
       return data;
   };
   returnData();

 //Eliminar registros de la tabla
const eliminarEspecialidad = async (id) => {
    $q.dialog({
      title: 'Eliminar linea de investigación',
      message: '¿Estas seguro de eliminar esta linea de investigación?',
      cancel: true,
      color: 'blue'
    }).onOk( async() => {
    const data = {
    lineaInvestigacionId: id,
    status: 0}
    Loading.show({ spinner: QSpinnerGears, })
    const response = await apiLineasInv.crudLineaInv(data);
    swal({
    position: 'top-end',
    icon: response.success==true ? 'success' : 'error',
    title: response.success==true ? '¡Se ha eliminado la linea de investigación!'
    : '¡Ha ocurrido un error! Intentelo de nuevo',
    showConfirmButton: false,
    timer: 1500})
    Loading.hide()
    returnData();
    })
  }

   //Agregar registros a la tabla
   const agregarUsuario = async () => {

      if(lineaInv.value.nombre == "" || lineaInv.value.objetivo == "" || lineaInv.value.integrantes == ""){
       Notify.create({ type: 'negative', message: 'Todos los campos son obligatorios', position: 'top' }) 
      }
      else{
        const data = {
          nombre: lineaInv.value.nombre,
          objetivo: lineaInv.value.objetivo,
          integrantes: lineaInv.value.integrantes,
          programaId: selectedPrograma.value.programaId,
          status: 1
        }
        try{
          Loading.show({  spinner: QSpinnerGears,})
          await apiLineasInv.crudLineaInv(data);
          showModal.value = false;
          showModalModificar.value = false;
          showModalConfirmarAgregar.value = false;
          Loading.hide()
          lineaInv.value.nombre = "",
          lineaInv.value.objetivo = "",
          lineaInv.value.integrantes = "",
          Notify.create({ type: 'positive', message: 'Se ha realizado con exito', position: 'top' }) 
          // window.location.reload()
          returnData();
        }catch(e){
          console.log(e)
        }
      }
   }

//Llena el modal de editar con los valores del usuario
const datosModificarUsuario = async(el) =>{
    showModalModificar.value = true,
    lineaInv.value = el
   }

   const clearInput = () =>{
    lineaInv.value.nombre = "",
    lineaInv.value.objetivo = "",
    lineaInv.value.integrantes = ""
   }

   //Modificar los valores del usuario
   const ModificarUsuario = async () =>{
      if (lineaInv.value.nombre !== "" && lineaInv.value.objetivo !== "" && lineaInv.value.integrantes !== "") {
      try{
        Loading.show({  spinner: QSpinnerGears,})
        const obj = await apiLineasInv.crudLineaInv(lineaInv.value);
        showModalModificar.value = false
        showModalConfirmarModificar.value = false
        Loading.hide()
        Notify.create({ type: 'positive', message: 'Se ha realizado con exito', position: 'top' }) 
        returnData();
      }catch(e){
        Notify.create({ type: 'negative', message: 'Ha ocurrido un error', position: 'top' }) 
        Loading.hide()
      }
        } else {
        Notify.create({ type: 'negative', message: 'Todos los campos son obligatorios', position: 'top' }) 
      }
      }

   const loadData = async () =>{
      optsDptos.value = await apiUsuario.getDptos();
      optsRoles.value = await apiUsuario.getRoles();
      }
  loadData()
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
