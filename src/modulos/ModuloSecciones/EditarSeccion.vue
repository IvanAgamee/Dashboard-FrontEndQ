<template>
  <q-page padding>
    <q-card class="my-card text-center">
      <q-card class="q-pa-lg">
        <q-tabs v-model="tab" class="bg-accent text-black" align="justify" narrow-indicator>
          <q-tab name="infoGeneral" label="Informacion general"/>
          <q-tab v-if="objSeccion.objeto.length > 0 || tieneContenido===true && nuevosObjetos.length===0" name="contenido" label="contenido"/>
          <q-tab v-if="nuevosObjetos.length > 0" name="contenidoNuevo" label="Nuevo Contenido"/>
          <q-tab v-if="objetosABorrar.length > 0" name="contenidoBorrar" label="Contenido a Borrar"/>
        </q-tabs>
        <q-separator/>
        <!-- PANEL 1: INFORMACION GENERAL -->
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="infoGeneral">
            <div class="text-h6 text-center q-ma-md">¡Bienvenido al módulo de edición de Seccion!</div>
            <div class="text-left q-mt-lg q-mx-lg">A continuación se muestran los datos de la seccion. En caso de no
              querer editar algun dato, no borrarlo:
            </div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Puedes editar el nombre de la
              seccion. Recuerda que una vez
              guardado será visible en el sitio web
            </div>
            <q-input rounded outlined dense v-model="objSeccion.titulo" type="text" label="Nombre de la seccion"
                     class="q-mx-lg"/>
            <div class="text-left q-mt-lg q-mx-lg">Edición de la descripcion de la seccion.</div>
              <q-input rounded outline dense v-model="objSeccion.descripcion" type="text"
              label="Descripción de la seccion"></q-input>
<!--            <div class="text-right">
              <q-btn class="q-ma-lg q-px-md q-py-sm" dense color="primary" icon="check" label="Siguiente"
                     @click="validarInputInfoGral()"/>
            </div>-->
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">URL para acceder a más información.</div>
            <q-input rounded outlined dense v-model="objSeccion.url" type="text" label="Ingrese URL" class="q-mx-lg" />
            <q-toggle
                v-if="objSeccion.objeto.length===0"
                v-model="tieneContenido"
                label="¿Desea agregar contenido a la seccion?"
            ></q-toggle>
            <div class="text-right">
              <q-btn v-if="tieneContenido && nuevosObjetos.length===0 && objetosABorrar.length===0" class="q-ma-lg q-px-md q-py-sm" color="primary" icon="check" label="Finalizar" @click="validarGeneral()" />
              <q-btn v-if="!tieneContenido" class="q-ma-lg q-px-md q-py-sm" dense color="primary" icon="check" label="Siguiente" @click="validarInputInfoGral()" />
            </div>
          </q-tab-panel>
          <!-- PANEL 2: contenido -->
          <q-tab-panel name="contenido">
            <div class="text-h6 text-left q-ma-md">Bien hecho! Continue editando la siguiente información: edición del contenido de la seccion {{objSeccion.titulo}}
            </div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">
              Recuerde, que solo puede editar el contenido de las secciones que tenga acceso solamente

            </div>
            <div class="h6-text text-center">
              {{objSeccion.titulo}}
            </div>
            <div style="
            display: grid;
             grid-template-columns: repeat(3, auto);
             gap: 15px;
            align-content: space-between;
            align-items: stretch;">
              <div v-for="(objeto, index) in objSeccion.objeto" :key="index">
                <q-card style="margin-bottom: 15px;">
                  <q-card-section class="bg-primary text-white">

                    <div>{{ objeto.descripcion}}
                    </div>
                  </q-card-section>
                  <q-separator></q-separator>
                  <q-card-actions align="right">
                    <q-btn flat @click="editarObjeto(objeto,false)">
                      <q-icon class="fa-solid fa-file-pen" style="color: #eb9705;"></q-icon>
                    </q-btn>
                    <q-btn flat
                           @click="prepararBorrado(index)"
                    >
                      <q-icon class="fa-sharp fa-solid fa-trash" style="color: #cc0000;"></q-icon>
                    </q-btn>
                  </q-card-actions>
                </q-card>
              </div>
              <div>
                <q-btn
                    v-if="nuevosObjetos.length===0"
                  padding="xl"
                  round
                  color="primary"
                  @click="modalContenido = true"
                ><q-icon class="fa-sharp fa-light fa-plus" style="color: #ffffff;"></q-icon></q-btn>
              </div>
            </div>

            <div class="text-right">

              <q-btn class="q-mt-lg q-mx-lg" label="Volver" @click="tab='infoGeneral'" />
            </div>
            <div class="text-right">
              <q-btn
                  v-if="nuevosObjetos.length===0 && objetosABorrar.length===0"
                  class="q-ma-lg q-px-md q-py-sm"
                  dense color="primary" icon="check" label="Finalizar" @click="validarGeneral()" />
              <q-btn
                  v-if="nuevosObjetos.length>0 && objetosABorrar.length===0"
                  class="q-ma-lg q-px-md q-py-sm"
                  dense color="primary" icon="check" label="Siguiente" @click="tab='contenidoBorrar'" />
              <q-btn
                  v-if="nuevosObjetos.length===0 && objetosABorrar.length>0"
                  class="q-ma-lg q-px-md q-py-sm"
                  dense color="primary" icon="check" label="Siguiente" @click="tab='contenidoBorrar'" />
              <q-btn
                  v-if="nuevosObjetos.length>0 && objetosABorrar.length>0"
                  class="q-ma-lg q-px-md q-py-sm"
                  dense color="primary" icon="check" label="Siguiente" @click="tab='contenidoNuevo'" />
            </div>
          </q-tab-panel>

          <!-- PANEL 3: contenido  Nuevo-->
          <q-tab-panel name="contenidoNuevo">
            <div class="text-h6 text-left q-ma-md">
              Nuevo Contenido
            </div>
            <div class="h6-text text-center">
              {{objSeccion.titulo}}
            </div>
            <div style="
            display: grid;
             grid-template-columns: repeat(3, auto);
             gap: 15px;
            align-content: space-between;
            align-items: stretch;">
              <div v-for="(objeto, index) in nuevosObjetos" :key="index">
                <q-card style="margin-bottom: 15px;">
                  <q-card-section class="bg-green text-white">
                    <div>{{ objeto.descripcion}}
                    </div>
                  </q-card-section>
                  <q-separator></q-separator>
                  <q-card-actions align="right">
                    <q-btn flat @click="editarObjeto(objeto,true)">
                      <q-icon class="fa-solid fa-file-pen" style="color: #eb9705;"></q-icon>
                    </q-btn>
                    <q-btn flat
                           @click="confirmacionBorradoNuevo(objeto)"
                    >
                      <q-icon class="fa-sharp fa-solid fa-trash" style="color: #cc0000;"></q-icon>
                    </q-btn>
                  </q-card-actions>
                </q-card>
              </div>
              <div>
                <q-btn
                    padding="xl"
                    round
                    color="primary"
                    @click="modalContenido = true"
                ><q-icon class="fa-sharp fa-light fa-plus" style="color: #ffffff;"></q-icon></q-btn>
              </div>
            </div>

            <div class="text-right">
              <q-btn class="q-mt-lg q-mx-lg" label="Volver" @click="tab='contenido'" />
            </div>
            <div class="text-right">
              <q-btn v-if="objetosABorrar.length===0"
                     class="q-ma-lg q-px-md q-py-sm"
                     dense color="primary" icon="check" label="Finalizar" @click="validarGeneral()" />
              <q-btn v-if="objetosABorrar.length>0"
                     class="q-ma-lg q-px-md q-py-sm"
                     dense color="primary" icon="check" label="Siguiente" @click="tab='contenidoBorrar'" />
            </div>
          </q-tab-panel>

          <!-- PANEL 4: contenido a Borrar -->
          <q-tab-panel name="contenidoBorrar">
            <div class="text-h6 text-left q-ma-md">
            Contenido a Borrar
            </div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">
              Recuerde, que solo puede editar el contenido de las secciones que tenga acceso solamente

            </div>
            <div class="h6-text text-center">
              {{objSeccion.titulo}}
            </div>
            <div style="
            display: grid;
             grid-template-columns: repeat(3, auto);
             gap: 15px;
            align-content: space-between;
            align-items: stretch;">
              <div v-for="(objeto, index) in objetosABorrar" :key="index">
                <q-card style="margin-bottom: 15px;">
                  <q-card-section class="bg-red-14 text-white">

                    <div>{{ objeto.descripcion}}
                    </div>
                  </q-card-section>
                  <q-separator></q-separator>
                  <q-card-actions align="right">
                    <q-btn flat @click="recuperarObjeto(index)">
                      <q-icon class="fa-solid fa-trash-can-arrow-up" style="color: #2b2b2b;"></q-icon>
                      <q-item-label>Deshacer</q-item-label>
                    </q-btn>
                  </q-card-actions>
                </q-card>
              </div>
            </div>
            <div class="text-right">

              <q-btn v-if="nuevosObjetos.length>0" class="q-mt-lg q-mx-lg" label="Volver" @click="tab='contenidoNuevo'" />
              <q-btn v-if="nuevosObjetos.length===0" class="q-mt-lg q-mx-lg" label="Volver" @click="tab='contenido'" />
            </div>
            <div class="text-right">
              <q-btn
                     class="q-ma-lg q-px-md q-py-sm"
                     dense color="primary" icon="check" label="Finalizar" @click="validarGeneral()" />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-card>
  </q-page>

  <q-dialog v-model="modalContenido" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Agregar Elemento</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-item-label>Titulo:</q-item-label>
        <q-input dense v-model="titulo" autofocus @keyup.enter="prompt = false"></q-input>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-item-label>Contenido:</q-item-label>
        <q-input dense v-model="contenido" autofocus @keyup.enter="prompt = false"></q-input>
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancelar" v-close-popup @click="limpiarContenido()"></q-btn>
        <q-btn @click="validarContenidoModal" flat label="Agregar Elemento"></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>



  <q-dialog v-model="modalBorrarObjeto" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">Estas a punto de eliminar este elemento.
        ¿Estas Seguro? Será de manera permanente el eleemento: {{objSeccion.objeto[objetoIndex].descripcion}} </span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" v-close-popup />
        <q-btn flat label="Eliminar" color="primary" @click="eliminarObjeto(objetoIndex)" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="modalBorrarObjetoNuevo" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">Estas a punto de eliminar este elemento.
        ¿Estas Seguro? Será de manera permanente el eleemento: {{objetoBorradoNuevo.descripcion}} </span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" v-close-popup />
        <q-btn flat label="Eliminar" color="primary" @click="eliminarObjeto(objetoIndex)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>


<script setup>
import {ref, watch} from 'vue'
import authStore from '../../stores/userStore.js';
import apiDocente from '../ModuloDocente/apiDocente.js'
import apiSeccion from '../ModuloSecciones/apiSecciones';
import swal from 'sweetalert';
import {Loading, Notify, QSpinnerGears} from 'quasar'
import {useRouter} from 'vue-router';

const router = useRouter();
const UserStore = authStore();
const tab = ref('infoGeneral')
const optSelectPrograma = ref(UserStore.getProgramas)
const selectedPrograma = ref(null)
const rows = ref([])
const moduloSeleccionado = ref({})
const objSeccion = ref({
    seccionId: 0,
    moduloId: 0,
    programaId: 0,
    titulo: '',
    descripcion: '',
    url:'',
    status: 1,
    objeto:[]
});

const nuevosObjetos = ref([]);
const objetosABorrar = ref([]);
let objObjetos = ref([]);
let isEditar = ref(false);
let contenido = ref('');
let titulo = ref('');
let tieneContenido = ref(false);
let modalContenido = ref(false);
let modalBorrarObjeto = ref(false);
let modalBorrarObjetoNuevo = ref(false);
let objetoIndex = ref(0);
let objetoBorradoNuevo = null;
const objModulo = ref({
});

const llenarSeccion = async () => {
  Loading.show({spinner: QSpinnerGears,});
  var id = {
    seccionId: props.id
  }
  console.log(props.id);

  const data = await apiSeccion.getSeccionById(id.seccionId);

  selectedPrograma.value = optSelectPrograma.value.find(programa => programa.programaId === data.data.programaId);
  objSeccion.value.seccionId = data.data.seccionId;
  objSeccion.value.moduloId = data.data.moduloId;
  objSeccion.value.programaId = data.data.programaId;
  objSeccion.value.titulo = data.data.titulo;
  objSeccion.value.descripcion = data.data.descripcion;
  objSeccion.value.objeto = data.data.objeto;
  objSeccion.value.status = data.data.status;
  objSeccion.value.url = data.data.url;
  if(objSeccion.value.objeto.length>0){
    objObjetos.value = objSeccion.value.objeto.slice();
  }
  Loading.hide()
  return data;
}
llenarSeccion();
objetoBorradoNuevo = null;


const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})
// Agregar registros a la tabla
const agregarSeccion = async () => {
  Loading.show({ spinner: QSpinnerGears, })
  const responseSeccion = await apiSeccion.createSeccion(objSeccion.value);
  const responseObjetos = await  apiSeccion.createObjetosMasvos(objSeccion.value.objeto);
  console.log(responseSeccion);
  console.log(responseObjetos);
  if(nuevosObjetos.value.length>0){
    nuevosObjetos.value.forEach(objeto => {
      objeto.seccionId = objSeccion.value.seccionId;
      objeto.moduloId = objSeccion.value.moduloId;
    });
    const responseNuevosObjetos = await apiSeccion.createObjetosMasvos(nuevosObjetos.value);
  }
  if(objetosABorrar.value.length>0){
    const data = await apiSeccion.borrarObjetos(objetosABorrar.value);
    console.log(data);
  }
  swal({
    position: 'top-end',
    icon: responseSeccion.success==true  || (responseSeccion.success==true && responseObjetos.success==true && tieneContenido == true)  ? 'success' : 'error',
    title: responseSeccion.success==true  ||
    (responseSeccion.success==true && responseObjetos.success==true && tieneContenido == true) ?'¡Se ha agregado correctamente la sección!'
        : '¡Ha ocurrido un error! Intentelo de nuevo',
    showConfirmButton: false,
    timer: 1500})
  router.push({path: "/vistaSeccion",});
  Loading.hide()
}

const validarInputInfoGral = () => {
  if (selectedPrograma.value === null) {
    Notify.create({type: 'negative', message: 'Debe seleccionar a que programa pertence', position: 'top'})
  } else {
    if (objSeccion.value.nombre == '' || objSeccion.value.descripcion == '' || objModulo.value == null) {
      Notify.create({type: 'negative', message: 'Debe llenar todos los campos', position: 'top'})
    } else {
      tab.value = 'contenido'
    }
  }
}

const validarGeneral = () => {
  if (selectedPrograma.value === null) {
    Notify.create({type: 'negative', message: 'Debe seleccionar a que programa pertenece la seccion', position: 'top'})
  } else {
    if (tieneContenido == true && objSeccion.value.objeto.length == 0) {
      Notify.create({type: 'negative', message: 'Contenido vacio', position: 'top'})
    } else {
      agregarSeccion();
    }
  }
}

const validarContenidoModal = () => {
  if(contenido.value===''){
    Notify.create({type: 'negative', message: 'El contenido no puede estar vacio', position: 'top'})
  }
  else {
    crearContenido();
  }
}


const limpiarContenido = () => {
  contenido.value = '';
  titulo.value = '';
}
const crearContenido = () => {
  debugger;
  let objeto = null;
  if(isEditar.value===true) {

    if (objSeccion.value.objeto.indexOf(objetoBorradoNuevo) !== -1) {
      objeto = objSeccion.value.objeto.at(objSeccion.value.objeto.indexOf(objetoBorradoNuevo));
      objeto.titulo = titulo.value;
      objeto.descripcion = contenido.value;
      objSeccion.value.objeto[objetoIndex] = objeto;
    } else if (nuevosObjetos.value.indexOf(objetoBorradoNuevo) !== -1) {
      objeto = nuevosObjetos.value.at(nuevosObjetos.value.indexOf(objetoBorradoNuevo));
      objeto.titulo = titulo.value;
      objeto.descripcion = contenido.value;
      nuevosObjetos.value[objetoIndex] = objeto;
    }
    objetoBorradoNuevo = null;
    }
    else{
        const objeto = {
            seccionId: objSeccion.value.seccionId,
            imagen: null,
            titulo: titulo.value,
            descripcion: contenido.value,
            status: 1
        };
        nuevosObjetos.value.push((objeto));
        tab.value="contenidoNuevo";
    }

    if(isEditar.value===true){
        isEditar.value = false;
    }

    contenido.value = '';
    titulo.value = '';
}


const editarObjeto = (objeto,nuevo) => {
  debugger;
  isEditar.value = true;
   if(nuevo!==true) {
     titulo.value = objSeccion.value.objeto.at(
         objSeccion.value.objeto.indexOf(objeto)
     ).titulo;
     contenido.value = objSeccion.value.objeto.at(
         objSeccion.value.objeto.indexOf(objeto)
     ).descripcion;
     modalContenido.value = true;
   }

   else{
     titulo.value = nuevosObjetos.value.at(objSeccion.value.objeto.indexOf(objeto)).titulo;
     contenido.value = nuevosObjetos.value.at(
         objSeccion.value.objeto.indexOf(objeto)
     ).descripcion;
     modalContenido.value = true;
   }
   objetoBorradoNuevo = objeto;
}

const recuperarObjeto = (index) => {

  objSeccion.value.objeto.push(objetosABorrar.value.at(index));
  objetosABorrar.value.splice(index,1);
  if(objetosABorrar.value.length===0){
    tab.value = "contenido";
  }
}
const prepararBorrado = (index) => {
  modalBorrarObjeto.value = true;
  objetoIndex.value = index;
}
const eliminarObjeto = (objeto) => {
  if(objetoBorradoNuevo!==null){
    eliminarObjetoNuevo(objetoBorradoNuevo);
    objetoBorradoNuevo = null;
    if(nuevosObjetos.value.length===0){
      tab.value="contenido";
    }
  }
  else {
    const objetoBorrar = objSeccion.value.objeto.at(objeto);
    objetosABorrar.value.push(objetoBorrar);
    if (objetoBorrar === objSeccion.value.objeto.at(objSeccion.value.objeto.indexOf(objetoBorrar))) {
      objSeccion.value.objeto.splice(objSeccion.value.objeto.indexOf(objetoBorrar), 1);
      modalBorrarObjeto.value = false;
    }
    if (objSeccion.value.objeto.length === 0) {
      tab.value = "contenidoBorrar"
    }
  }
}

const confirmacionBorradoNuevo = (objetoNuevo) => {
  modalBorrarObjetoNuevo.value = true;
  objetoIndex = nuevosObjetos.value.indexOf(objetoNuevo);
  objetoBorradoNuevo = objetoNuevo;
}
const eliminarObjetoNuevo = (objeto) => {
  nuevosObjetos.value.splice(nuevosObjetos.value.indexOf(objeto),1);
  modalBorrarObjetoNuevo.value = false;
  objetoBorradoNuevo = null;

}

</script>
