// HTML de la pagina - Estructura de la pagina
<template>
<!-- Q-page: Es el componente que envuelve a toda nuestra página -->
  <q-page padding>
  <!-- Q-card es el cuadro blanco dentro de la pagina -->
    <q-card class="q-pt-lg q-pb-lg">
    <!-- Area del titulo y boton agregar -->
      <div class="row">
        <h6 class="col q-ma-sm q-ml-lg">Registro de Usuario</h6>
        <q-btn class="col-2 q-ma-sm q-mr-lg" text-color="black" color="accent" size="md" label="Agregar usuario" @click="openModal" dense ellipsis/>
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
           <!--<q-btn v-for="(accion, index) in props.row.acciones" :key="accion.nombre" dense :class="`boton-${index}`" @click="accion.funcion()"><q-icon :name="accion.icono" /></q-btn> -->
           <q-btn v-for="(accion, index) in props.row.acciones" :key="accion.nombre" :label="accion.nombre" :class="`boton-${index}`" @click="accion.funcion()" />
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
    <div class="col-6 col-6-full">

<!-- Input para ingresar el nombre de la materia-->
<q-input v-model="nombre" label="nombre *" hint="Ingrese el nombre" lazy-rules dense style="padding: 0px 10px 45px 10px"
:rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>

<!-- Input para ingresar el area de la materia-->
<q-input v-model="username" label="Nombre usuario *" hint="Ingrese el nombre de usuario" lazy-rules dense style="padding: 0px 10px 45px 10px"
:rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>

<!-- Input para ingresar el semestre de la materia-->
<q-input v-model="password" label="Contraseña *" hint="Ingrese una contraseña" lazy-rules dense style="padding: 0px 10px 45px 10px"
type="number" max="11" step="1" :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>
</div>

<!-- Columna 2 del modal agregar Materia -->
<!--<div class="col-6 col-6-full">-->
<!-- Input para ingresar la competencia de la materia-->
<!--<q-input v-model="competencia" label="Competencia *" hint="Ingrese la competencia de la materia" lazy-rules dense style="padding: 0px 10px 45px 10px"
:rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>-->


<!-- Input para ingresar el url del vídeo de la materia-->
<!--<q-input v-model="urlVideo" label="URL del Vídeo *" hint="Ingrese el URL del Vídeo" lazy-rules dense style="padding: 0px 10px 45px 10px"
:rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>-->

<!-- Input para ingresar el url del programa de la materia-->
<!--<q-input v-model="urlPrograma" label="URL del Programa *" hint="Ingrese el URL del Programa" lazy-rules dense style="padding: 0px 10px 45px 10px"
:rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>-->

<!-- Input para ingresar el estatus de la materia-->
<!--<q-input v-model="estatus" label="Estatus *" hint="Ingrese el estatus de la materia" lazy-rules dense style="padding: 0px 10px 45px 10px"
  :rules="[val => val && val.length > 0 || 'Este campo es obligatorio', val => /^[0-9]+$/.test(val) || 'Ingrese solo números']"
  type="number"/>
</div>-->

<!-- Botones del modal -->
<div class="col-12 text-center">
<q-separator style="margin:8px"/>
<q-btn label="Cancelar" @click="openModal" flat class="q-ml-sm q-mr-md" />
<q-btn label="Enviar" type="submit" @click="agregarUsuario" color="negative"/>
</div>
  </div>

</MiModal>
<!----------------MODAL AGREGAR ASEGURAR---------------------->



<!----------------MODAL ELIMINAR---------------------->

    <MiModal v-model:show="showModalEliminar">
        <div class ="col-1 text-center ">
          <h5 style="margin:0px"> ¿Deseas eliminar este usuario?</h5>
        </div>



    <!-- Botones del modal -->
    <div class="col-1 text-center">
    <q-separator style="margin:8px"/>
    <q-btn label="Cancelar" @click="showModalEliminar=false" flat class="q-ml-sm q-mr-md" />
    <q-btn label="Aceptar" type="submit" @click="eliminarUsuario()" color="negative"/>
    </div>

</MiModal>


<!----------------MODAL ACTUALIZAR---------------------->


<MiModal v-model:show="showModalModificar">
    <div class ="col-12 text-center ">
      <h5 style="margin:0px"> Actualizar Usuario</h5>
    </div>


  <q-separator style="margin:15px"/>

  <div class="row col-12">
    <!-- Columna 1 del modal agregar usuario -->
    <div class="col-6 col-6-full">

<!-- Input para ingresar el nombre -->
<q-input v-model="nombre" label="nombre *" hint="Ingrese el nombre" lazy-rules dense style="padding: 0px 10px 45px 10px"
:rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>

<!-- Input para ingresar el nombre del usuario-->
<q-input v-model="username" label="Nombre usuario *" hint="Ingrese el nombre de usuario" lazy-rules dense style="padding: 0px 10px 45px 10px"
:rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>

<!-- Input para ingresar la contraseña-->
<q-input v-model="password" label="Contraseña *" hint="Ingrese una contraseña" lazy-rules dense style="padding: 0px 10px 45px 10px"
:rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>
</div>

<!-- Columna 2 del modal agregar Materia -->
<!-- <div class="col-6 col-6-full"> -->
<!-- Input para ingresar la competencia de la materia-->
<!-- <q-input v-model="competencia" label="Competencia *" hint="Ingrese la competencia de la materia" lazy-rules dense style="padding: 0px 10px 45px 10px"
:rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>-->

<!-- Input para ingresar el url del vídeo de la materia-->
<!-- <q-input v-model="urlVideo" label="URL del Vídeo *" hint="Ingrese el URL del Vídeo" lazy-rules dense style="padding: 0px 10px 45px 10px"
:rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>-->

<!-- Input para ingresar el url del programa de la materia-->
<!-- <q-input v-model="urlPrograma" label="URL del Programa *" hint="Ingrese el URL del Programa" lazy-rules dense style="padding: 0px 10px 45px 10px"
:rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"/>-->

<!-- Input para ingresar el estatus de la materia
<q-input v-model="estatus" label="Estatus *" hint="Ingrese el estatus de la materia" lazy-rules dense style="padding: 0px 10px 45px 10px"
  :rules="[val => val && val.length > 0 || 'Este campo es obligatorio', val => /^[0-9]+$/.test(val) || 'Ingrese solo números']"
  type="number"/>
</div>-->

<!-- Botones del modal -->
<div class="col-12 text-center">
<q-separator style="margin:8px"/>
<q-btn label="Cancelar" @click="showModalModificar=false" flat class="q-ml-sm q-mr-md" />
<q-btn label="Actualizar" type="submit" @click="showModalAsegurarModificar=true" color="negative"/>
</div>
  </div>

</MiModal>

<!----------------MODAL ACTUALIZAR ¿estas seguro?---------------------->
<MiModal v-model:show="showModalAsegurarModificar">
        <div class ="col-1 text-center ">
          <h5 style="margin:0px"> ¿Estas seguro que quieres modificar el usuario?</h5>
        </div>

    <!-- Botones del modal -->
    <div class="col-1 text-center">
    <q-separator style="margin:8px"/>
    <q-btn label="Cancelar" @click="showModalAsegurarModificar=false" flat class="q-ml-sm q-mr-md" />
    <q-btn label="Aceptar" type="submit" @click=modificarUsuario() color="negative"/>
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
import { toast } from "vue3-toastify"


// Declaraciones de constantes
const row = ref([])

//Constantes para inputs de creación
const showModal = ref(false)
//const especialidad = ref('')
const usuarioId = ref('')
const nombre = ref('')
const username = ref('')
const password = ref('')
const showModalEliminar = ref(false)
const idEliminar = ref('')
const showModalModificar = ref(false)
const showModalAsegurarModificar = ref(false)
function openModal(){
  showModal.value = !showModal.value
}

// Columnas de la tabla
const columns = [
  { name: 'nombre', required: true, label: 'Nombre', align: 'center', field: 'nombre', format: val => `${val}`, sortable: true},
  { name: 'username', align: 'center', label: 'Nombre de usuario',align: 'center', field: 'username', sortable: true },
  { name: 'password', required: true, align: 'center', label: 'Contraseña',align: 'center', field: 'password', sortable: true },
  { name: 'acciones', align: 'center', label: 'Acciones',align: 'center', field: 'acciones', sortable: true }]

// Llenado de la tabla con información del backend
 const returnData =  async () =>{
    const data = await apiUsuario.getUsers();
    console.log(data)
        data.data.map((el) => {
         var obj = {
          nombre: el.nombre,
          username: el.username,
          password: el.password,
          acciones: [
            { nombre: 'Editar', funcion: () =>  {datosModificarUsuario(el), console.log(el)}},
            { nombre: 'Eliminar', funcion: () => {idEliminar.value=el.usuarioId, showModalEliminar.value=true} }
          ],
        };
        row.value.push(obj);
        });
       return data;
   };
   returnData();

//Eliminar datos de la tabla
const eliminarUsuario = async () => {
    const data = {
      usuarioId: idEliminar.value,
      status: 0,
      //this.data.splice(this.data.indexOf(data),1)
    }

    try {
      await apiUsuario.createUsuario(data);
      showModalEliminar.value = false
      return data;
    } catch (e) {
      console.log(e)
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
          //usuarioId: usuarioId.value,
          nombre: nombre.value,
          username: username.value,
          password: password.value,
          rolId: 1,
          status:1
        }
        console.log(data)

        try{
          await apiUsuario.createUsuario(data);
          openModal();
          returnData();

        }catch (e){
          console.log(e)
        }
      }

   }


   //Llena el modal de editar con los valores de la materia
   const datosModificarUsuario = async(el) =>{
    showModalModificar.value = true
          nombre.value = el.nombre,
          username.value = el.username,
          password.value = el.password,
          usuarioId.value = el.usuarioId
   }

   //Modificar los valores de la materia
   const modificarUsuario = async () =>{
      const data = {
          usuarioId: usuarioId.value,
          nombre: nombre.value,
          username: username.value,
          password: password.value,
          rolId: 1,
          status:1
      }

      try{
        await apiUsuario.createUsuario(data);
        showModalModificar.value = false
        showModalAsegurarModificar.value = false
        returnData();
      }catch(e){
        toast.error("No se pudo modificar el usuario");
      }
      }

    /* const abrirModal = async () =>{
      showModalAsegurarModificar.value = true
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

  .boton-0 {
  background-color: blue;
  color: white;
}

.boton-1 {
  background-color: red;
  color: black;
}
}
</style>
