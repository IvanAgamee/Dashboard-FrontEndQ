// HTML de la pagina - Estructura de la pagina
<template>
<!-- Q-page: Es el componente que envuelve a toda nuestra página -->
  <q-page padding>
  <!-- Q-card es el cuadro blanco dentro de la pagina -->
    <q-card class="q-pt-lg q-pb-lg">
    <!-- Area del titulo y boton agregar -->
      <div class="row">
        <h6 class="col q-ma-sm q-ml-lg">Registro de usuarios</h6>
        <q-btn class="col-2 q-ma-sm q-mr-lg" text-color="white" color="secondary" size="md" label="Agregar usuario" @click="openModal" dense ellipsis/>
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
<!----------------MODAL AGREGAR USUARIO---------------------->
<MiModal v-model:show="showModal">
  <div class ="col-12 text-center ">
    <h5 style="margin:0px"> Agregar Usuario</h5>
  </div>

  <q-separator style="margin:15px"/>

  <div class="row col-12">
    <!-- Columna 1 del modal agregar Materia -->
    <div class="col-12 col-12-full">

<!-- Input para ingresar el nombre del usuario-->
<q-input v-model="nombre" label="Nombre *" hint="Ingrese el nombre del usuario" lazy-rules dense style="padding: 0px 10px 45px 10px"
:rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>

<!-- Input para ingresar el username del usuario-->
<q-input v-model="username" label="Username *" hint="Ingrese el username" lazy-rules dense style="padding: 0px 10px 45px 10px"
:rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>

<!-- Input para ingresar la password del usuario-->
<q-input v-model="password" label="Contraseña *" hint="Ingrese la contraseña" lazy-rules dense style="padding: 0px 10px 45px 10px"
:rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>
</div>

<!-- Botones del modal -->
<div class="col-12 text-center">
<q-separator style="margin:8px"/>
<q-btn label="Cancelar" @click="showModal=false" class="q-ml-sm q-mr-md" color="negative"/>
<q-btn label="Enviar" type="submit" @click="agregarUsuario()" class="btn-editar"/>
</div>
</div>

</MiModal>



<!----------------MODAL ACTUALIZAR USUARIO---------------------->
<MiModal v-model:show="showModalModificar">

<div class="col-12 text-center ">
  <h5 style="margin:0px">Editar usuario</h5>
</div>
  <q-separator style="margin:15px" />

<div class="row col-12">

  <!-- Columna 1 del modal agregar Docente -->
                <div class="col-12 col-12-full">
                    <!-- Input para ingresar el nombre del usuario-->
                    <q-input v-model="nombre" label="Nombre *" hint="Ingrese el nombre del usuario" lazy-rules dense style="padding: 0px 10px 45px 10px"
                    :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>

                    <!-- Input para ingresar el username del usuario-->
                    <q-input v-model="username" label="Username *" hint="Ingrese el username" lazy-rules dense style="padding: 0px 10px 45px 10px"
                    :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>

                    <!-- Input para ingresar la password del usuario-->
                    <q-input v-model="password" label="Password *" hint="Ingrese la contraseña" lazy-rules dense style="padding: 0px 10px 45px 10px"
                    :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>
                    </div>


   <!-- Botones del modal -->
          <div class="col-12 text-center ">
          <q-separator style="margin:8px" />
            <q-btn label="Cancelar" @click="showModalModificar=false, clearInput()" class="q-ml-sm q-mr-md" color="negative"/>
            <q-btn label="Enviar" type="submit" @click="ModificarUsuario()" class="btn-editar"/>
        </div>
  </div>
</MiModal>

<!----------------MODAL CONFIRMAR ACTUALIZAR MATERIA---------------------->
<MiModal v-model:show="showModalConfirmarModificar">
        <div class ="col-1 text-center ">
          <h5 style="margin:0px"> ¿Estas seguro que quieres modificar los datos de este usuario?</h5>
        </div>

    <!-- Botones del modal -->
    <div class="col-1 text-center">
    <q-separator style="margin:8px"/>
    <q-btn label="Cancelar" @click="showModalConfirmarModificar=false" class="q-ml-sm q-mr-md" color="negative"/>
    <q-btn label="Aceptar" type="submit" @click=ModificarUsuario() class="btn-editar"/>
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
import apiUsuario from '../ModuloUsuario/apiUsuario.js'
// outside of a Vue file
import { Loading,Notify, QSpinnerGears } from 'quasar'
import UserStore from 'src/stores/userStore';



const prueba = ref(UserStore().getUserIsAdmin)
// Declaraciones de constantes
const row = ref([])

//Constantes para inputs de creación
const showModal = ref(false)
const showModalEliminar = ref(false)
const showModalConfirmarAgregar = ref(false)
const showModalModificar = ref(false)
const showModalConfirmarModificar = ref(false)
const nombre = ref('')
const username = ref('')
const password = ref('')
const idEliminar = ref('')
const usuarioId = ref('')
//Abrir y cerrar modal
function openModal(){
  clearInput()
  showModal.value = !showModal.value
}

// Columnas de la tabla
const columns = [
  { name: 'nombre', required: true, align: 'center', label: 'Nombre', field: 'nombre', format: val => `${val}`, sortable: true},
  { name: 'username', required: true, align: 'center', label: 'Username',align: 'center', field: 'username', sortable: true },
  { name: 'password', required: true, align: 'center', label: 'Password',align: 'center', field: 'password', sortable: true },
  { name: 'acciones', align: 'center', label: 'Acciones',align: 'center', field: 'acciones', sortable: true }]

// Llenado de la tabla con información del backend
 const returnData =  async () =>{
  row.value=[];
    const data = await apiUsuario.getUsuarios();
        data.data.map((el) => {
         var obj = {
          nombre: el.nombre,
          username: el.username,
          password: el.password,
          acciones: [
            { nombre: 'Editar', funcion: () => {datosModificarUsuario(el)} },
            { nombre: 'Eliminar', funcion: () =>{idEliminar.value=el.usuarioId, showModalEliminar.value = true} }
          ],
        };
       row.value.push(obj);
        });
       return data;
   };
   returnData();

   //Eliminar registros de la tabla
 const eliminarUsuarios = async () => {
  const data = {
    usuarioId: idEliminar.value,
    status: 0 }

    try {
      Loading.show({  spinner: QSpinnerGears,})
      await apiUsuario.createUsuarios(data);
      Loading.hide()
      showModalModificar.value = false;
      showModalEliminar.value = false
      Notify.create({ type: 'positive', message: 'Se ha realizado con exito', position: 'top' })  
      returnData();
    } catch (e) {
      returnData();
    }
 }

   //Agregar registros a la tabla
   const agregarUsuario = async () => {

      if(nombre.value == "" || username.value == "" || password.value == ""){
        console.log("Debe llenar todos los campos")
      }

      else{
        const data = {
          nombre: nombre.value,
          username: username.value,
          password: password.value,
          rolId: 1,
          status: 1,
          departamentoId:1
        }
        try{
          Loading.show({  spinner: QSpinnerGears,})
          await apiUsuario.createUsuarios(data);
          showModal.value = false;
          showModalModificar.value = false;
          showModalConfirmarAgregar.value = false;
          Loading.hide()
          nombre.value = "",
          username.value = "",
          password.value = "",
          clearInput()
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

    showModalModificar.value = true
          nombre.value = el.nombre,
          username.value = el.username,
          password.value = el.password,
          usuarioId.value = el.usuarioId
   }

   const clearInput = () =>{
    nombre.value = "",
    username.value = "",
    password.value = ""
   }

   //Modificar los valores del usuario
   const ModificarUsuario = async () =>{
      const data = {
          usuarioId: usuarioId.value,
          nombre: nombre.value,
          username: username.value,
          password: password.value,
          rolId: 1,
          status:1,
          departamentoId:1
      }
      if (nombre.value != "" ) {
      try{
        Loading.show({  spinner: QSpinnerGears,})
        await apiUsuario.createUsuarios(data);
        showModalModificar.value = false
        showModalConfirmarModificar.value = false
        Loading.hide()
        Notify.create({ type: 'positive', message: 'Se ha realizado con exito', position: 'top' }) 
        returnData();
      }catch(e){
        toast.error("No se pudo modificar la materia");
      }
        } else {
        Notify.create({ type: 'negative', message: 'Todos los campos son obligatorios', position: 'top' }) 
      }
      }
</script>

// Diseño de la tabla - Estilos de la tabla
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
