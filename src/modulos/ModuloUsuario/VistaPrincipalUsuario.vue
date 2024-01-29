<template>
  <q-page padding>
    <q-card class="q-pt-lg q-pb-lg">
      <div class="row">
        <h6 class="col q-ma-sm q-ml-lg">Registro de usuarios</h6>
        <q-btn class="col-2 q-ma-sm q-mr-lg" text-color="white" color="secondary" size="md" label="Agregar usuario" @click="openModal" dense ellipsis/>
      </div>
    <q-separator style="margin:15px" />

  <!-- Tabla de usuarios -->
  <q-table class="my-sticky-header-table q-ma-lg" :rows="row" :columns="columns" header>

  <template v-slot:body="props">
    <q-tr :props="props">
      <q-td v-for="column in props.cols" :key="column.name" :props="props">
       <template v-if="column.name !== 'acciones' && column.name !== 'status'">{{ props.row[column.name] }}</template>

       <template v-if="column.name == 'status'">
        <q-chip v-if="props.row.status == 1" color="teal" text-color="white" label="Habilitado" />
        <q-chip v-else color="red" text-color="white" label="Deshabilitado" />
       </template>

       <template v-if="column.name == 'acciones'">
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
    <div class="col-12 col-12-full">

      <q-input v-model="nombre" label="Nombre *" hint="Ingrese el nombre del usuario" lazy-rules dense style="padding: 0px 10px 45px 10px"
      :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>

      <q-input v-model="username" label="Nombre de usuario *" hint="Nombre de usuario" lazy-rules dense style="padding: 0px 10px 45px 10px"
      :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>

      <q-input v-model="password" label="Contraseña *" hint="Ingrese la contraseña" lazy-rules dense style="padding: 0px 10px 45px 10px"
      :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>

      <q-select v-model="selectedDpto" :options="optsDptos" label="Departamento" lazy-rules dense style="padding: 0px 10px 25px 10px"  option-label="nombre"/>

      <q-select v-model="selectedRole" :options="optsRoles" label="Rol" lazy-rules dense style="padding: 0px 10px 15px 10px"  option-label="nombre"/>
    </div>

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
    <div class="col-12 col-12-full">

      <q-input v-model="nombre" label="Nombre *" hint="Ingrese el nombre del usuario" lazy-rules dense style="padding: 0px 10px 45px 10px"
        :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>

      <q-input v-model="username" label="Nombre de usuario *" hint="Ingrese el nombre de usuario" lazy-rules dense style="padding: 0px 10px 45px 10px"
        :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>

      <q-input v-if="false" v-model="password" label="Password *" hint="Ingrese la contraseña" lazy-rules dense style="padding: 0px 10px 45px 10px"
        :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>

      <q-select v-model="selectedDpto" :options="optsDptos" label="Departamento" lazy-rules dense style="padding: 0px 10px 25px 10px"  option-label="nombre"/>

      <q-select v-model="selectedRole" :options="optsRoles" label="Rol" lazy-rules dense style="padding: 0px 10px 25px 10px"  option-label="nombre"/>
    </div>

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

    <div class="col-1 text-center">
      <q-separator style="margin:8px"/>
        <q-btn label="Cancelar" @click="showModalConfirmarModificar=false" class="q-ml-sm q-mr-md" color="negative"/>
        <q-btn label="Aceptar" type="submit" @click=ModificarUsuario() class="btn-editar"/>
    </div>

</MiModal>

 </q-page>
</template>

<script setup>
import {ref} from "vue"
import { QBtn, QTable, QCard } from 'quasar'
import MiModal from '../../components/MiModal.vue'
import apiUsuario from '../ModuloUsuario/apiUsuario.js'
import { Loading,Notify, QSpinnerGears } from 'quasar'

const row = ref([])
const optsDptos = ref([])
const selectedDpto = ref([])
const optsRoles = ref([])
const selectedRole = ref([])

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

// Columnas
const columns = [
  { name: 'nombre', required: true, align: 'center', label: 'Nombre', field: 'nombre', format: val => `${val}`, sortable: true},
  { name: 'username', required: true, align: 'center', label: 'Username',align: 'center', field: 'username', sortable: true },
  { name: 'password', required: true, align: 'center', label: 'Rol',align: 'center', field: 'password', sortable: true },
  { name: 'status', required: true, align: 'center', label: 'Estatus',align: 'center', field: 'status', sortable: true },
  { name: 'acciones', align: 'center', label: 'Acciones',align: 'center', field: 'acciones', sortable: true }]

// Llenado de la tabla con información del backend
 const returnData =  async () =>{
  row.value=[];
    const data = await apiUsuario.getUsuarios();
        data.data.map((el) => {
         var obj = {
          nombre: el.nombre,
          username: el.username,
          password: el.rolNombre,
          status: el.status,
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
          rolId: selectedRole.value.rolId,
          status: 1,
          departamentoId:selectedDpto.value.departamentoId
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
          usuarioId.value = el.usuarioId,
          selectedRole.value= el.rol

          optsDptos.value.map(el => {
          if (el.departamentoId == el.departamentoId) {      
           selectedDpto.value = el 
          }
          });
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
          rolId: selectedRole.value.rolId,
          status: 1,
          departamentoId:selectedDpto.value.departamentoId
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
