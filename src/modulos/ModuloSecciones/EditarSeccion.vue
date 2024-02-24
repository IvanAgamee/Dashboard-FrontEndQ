<template>
  <q-page padding>
    <q-card class="my-card text-center">
      <q-card class="q-pa-lg">
        <q-tabs v-model="tab" class="bg-accent text-black" align="justify" narrow-indicator>
          <q-tab name="infoGeneral" label="Informacion general"/>
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
            <h4>{{objSeccion.titulo}}</h4>
            <div v-if="controlSeccion.hasDescription(objSeccion.titulo)" class="text-left q-mx-lg q-mt-lg">Edición de la descripcion de la seccion.</div>
              <q-input v-if="controlSeccion.hasDescription(objSeccion.titulo)"
                rounded outline dense autogrow v-model="objSeccion.descripcion" type="text"
              label="Descripción de la seccion"></q-input>
<!--            <div class="text-right">
              <q-btn class="q-ma-lg q-px-md q-py-sm" dense color="primary" icon="check" label="Siguiente"
                     @click="validarInputInfoGral()"/>
            </div>-->
            <q-input
              v-if="controlSeccion.hasLink(objSeccion.titulo)"
              rounded outlined dense v-model="objSeccion.url" type="text" label="Ingrese URL" class="q-mx-lg" />

            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">
              Recuerde, que solo puede editar el contenido de las secciones que tenga acceso solamente
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
                    <q-img alt="icon"
                           :src="route_file.concat(icons.pathFile).concat(objeto.imagen)"
                           width="7em" height="7em"
                           style="background-color: white;
                           border-radius: 100%; margin-bottom: 1em"></q-img>
                    <q-separator></q-separator>
                    <div class="text-body1 text-justify"
                         style="background-color: white;
                         color: black;
                         padding: 1em"
                    >{{ objeto.descripcion}}
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
                  v-if="controlSeccion.hasSeccions(objSeccion.titulo)"
                  padding="xl"
                  round
                  color="primary"
                  @click="modalContenido = true;"
                ><q-icon class="fa-sharp fa-light fa-plus" style="color: #ffffff;"></q-icon></q-btn>
              </div>
            </div>

            <div class="text-right">
<!--              <q-btn
                v-if="nuevosObjetos.length===0 && objetosABorrar.length===0"
                class="q-ma-lg q-px-md q-py-sm"
                dense color="primary" icon="check" label="Finalizar" @click="validarGeneral()" />
              -->
              <q-btn
                class="q-ma-lg q-px-md q-py-sm"
                dense color="primary" icon="check"
                :label="dataButton.label"
                @click="dataButton.finish ? validarGeneral() : tab=dataButton.tab" />
            </div>

<!--              <div v-if="!controlSeccion.hasSeccions(objSeccion.titulo)" class="text-right">
                <q-btn v-if="tieneContenido && nuevosObjetos.length===0 || objetosABorrar.length===0" class="q-ma-lg q-px-md q-py-sm" color="primary" icon="check" label="Finalizar" @click="validarGeneral()" />
                <q-btn v-if="tieneContenido" class="q-ma-lg q-px-md q-py-sm" dense color="primary" icon="check" label="Siguiente" @click="validarInputInfoGral()" />
              </div>-->
          </q-tab-panel>

          <!-- PANEL 3: contenido  Nuevo-->
          <q-tab-panel name="contenidoNuevo">
            <h4>{{objSeccion.titulo}}</h4>
            <div class="text-h6 text-left q-ma-md">
              Nuevo Contenido
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
                    <q-img alt="icon"
                           :src="route_file.concat(icons.pathFile).concat(objeto.imagen)"
                           width="7em" height="7em"
                           style="background-color: white;
                           border-radius: 100%; margin-bottom: 1em"></q-img>
                    <q-separator></q-separator>
                    <div class="text-body1 text-justify"
                         style="background-color: white;
                         color: black;
                         padding: 1em"
                    >{{ objeto.descripcion}}
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
                    @click="modalContenido = true;"
                ><q-icon class="fa-sharp fa-light fa-plus" style="color: #ffffff;"></q-icon></q-btn>
              </div>
            </div>

            <div class="text-right">
              <q-btn class="q-mt-lg q-mx-lg" label="Volver" @click="tab='infoGeneral'" />
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
            <h4>{{objSeccion.titulo}}</h4>
            <div class="text-h4 text-left q-ma-md">
             Contenido Deshabilitado
            </div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">
              El contenido presente en este panel esta marcado como deshabilitado, y por lo tanto no se visualizar&aacute; en la p&aacute;gina p&uacute;blica:
            </div>
            <div style="
            display: grid;
             grid-template-columns: repeat(3, auto);
             gap: 15px;
            align-content: space-between;
            align-items: stretch;">
              <div v-for="(objeto, index) in objetosABorrar" :key="index">
                <q-card style="margin-bottom: 15px;">
                  <q-card-section class="bg-red-7 text-white">
                      <q-img alt="icon"
                             :src="route_file.concat(icons.pathFile).concat(objeto.imagen)"
                             width="7em" height="7em"
                             style="background-color: white;
                           border-radius: 100%; margin-bottom: 1em"></q-img>
                      <q-separator></q-separator>
                    <div class="text-body1 text-justify"
                         style="background-color: white;
                         color: black;
                         padding: 1em"
                    >{{ objeto.descripcion}}
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
              <q-btn v-if="nuevosObjetos.length===0" class="q-mt-lg q-mx-lg" label="Volver" @click="tab='infoGeneral'" />
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

  <!--- Modal para agregar punto -->
  <q-dialog v-model="modalContenido" persistent>
    <q-card style="max-width:100vh">
      <q-card-section>
        <div class="text-h6">Agregar Elemento</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-item-label>{{controlSeccion.obtenerCategoriaPunto(objSeccion.titulo)}} :</q-item-label>
        <q-input dense
                 v-model="contenido" autofocus
                 @keyup.enter="prompt = false"
                 autogrow></q-input>
        <div class="text-h6">Selecciona el icono para asignar al {{controlSeccion.obtenerCategoriaPunto(objSeccion.titulo).toLowerCase()}}: </div>
        <div class="row" >
          <div v-for="(icon, index) in icons.icons">
            <q-radio v-model="icon_selected"
                     :val="icon">
            </q-radio>
            <q-img :src="`${route_file.concat(icons.pathFile.concat(icon))}`"
                   alt="icon"
                   width="40px" height="30px"
                   style="margin: 2em"/>
          </div>
        </div>
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
        ¿Estas Seguro? Será de manera permanente el elemento: {{objSeccion.objeto[objetoIndex].descripcion}} </span>
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
        ¿Estas Seguro? Será de manera permanente el elemento: {{objetoBorradoNuevo.descripcion}} </span>
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
import apiSeccion from '../ModuloSecciones/apiSecciones';
import apiIcons from '../Apis/apiIcons';
import swal from 'sweetalert';
import {Loading, Notify, QSpinnerGears} from 'quasar'
import {useRouter} from 'vue-router';
import controlSeccion from './seccionControlEdit'

const route_file = process.env.URL_FILES;
let icon_selected = ref('');
const icons = {pathFile:"", icons:[]};
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
let dataButton = ref({
  label: "", tab:"",click:"", finish: false
})

const puntos = ['objetivos educacionales', 'perfil de ingreso', 'perfil de egreso']
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
let seccionesDesglose = ref(false);
const objModulo = ref({
});


const llenarSeccion = async () => {
  Loading.show({spinner: QSpinnerGears,});
  var id = {
    seccionId: props.id
  }

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

  if(controlSeccion.hasSeccions(objSeccion.value.titulo)) {
    let iconData = await apiIcons.getIconsByPromgramaId({programaId: selectedPrograma.value.programaId});
    icons.pathFile = iconData.data.pathFile;
    icons.icons = iconData.data.icons;
  }
  seccionesDesglose.value = controlSeccion.hasSeccions(objSeccion.value.titulo)
  Loading.hide()
  dataButton.value = controlSeccion.controlButton(nuevosObjetos.value,objetosABorrar.value,objSeccion.value.titulo)
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

  if(nuevosObjetos.value.length>0){
    nuevosObjetos.value.forEach(objeto => {
      objeto.seccionId = objSeccion.value.seccionId;
      objeto.moduloId = objSeccion.value.moduloId;
    });
    const responseNuevosObjetos = await apiSeccion.createObjetosMasvos(nuevosObjetos.value);
  }
  if(objetosABorrar.value.length>0){
    const data = await apiSeccion.borrarObjetos(objetosABorrar.value);
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

const validarGeneral = () => {
/*  debugger;*/
  if (selectedPrograma.value === null) {
    Notify.create({type: 'negative', message: 'Debe seleccionar a que programa pertenece la seccion', position: 'top'})
  } else {
    if (tieneContenido == true && objSeccion.value.objeto.length == 0) {
      Notify.create({type: 'negative', message: 'Todos los campos requeridos no pueden estar vacios', position: 'top'})
    }
    else if(controlSeccion.validarDescription(objSeccion.value.titulo,objSeccion.value.descripcion) ||
      controlSeccion.validarLink(objSeccion.value.titulo,objSeccion.value.url))
    {
      Notify.create({type: 'negative', message: 'Todos los campos requeridos no pueden estar vacios', position: 'top'})
    }
    else {
      agregarSeccion();
    }
  }
}
/*Debo checarlo*/
const validarContenidoModal = () => {
  if(contenido.value==='' || icon_selected.value===''){
    Notify.create({type: 'negative', message: 'El contenido no puede estar vacio y contar con su respectivo icono', position: 'top'})
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
      objeto.imagen = icon_selected.value;
      objSeccion.value.objeto[objetoIndex] = objeto;
    } else if (nuevosObjetos.value.indexOf(objetoBorradoNuevo) !== -1) {
      objeto = nuevosObjetos.value.at(nuevosObjetos.value.indexOf(objetoBorradoNuevo));
      objeto.titulo = titulo.value;
      objeto.descripcion = contenido.value;
      objeto.imagen = icon_selected.value;
      nuevosObjetos.value[objetoIndex] = objeto;
    }
    objetoBorradoNuevo = null;
    }
    else{
        const objeto = {
            seccionId: objSeccion.value.seccionId,
            imagen: icon_selected.value,
            titulo: titulo.value,
            descripcion: contenido.value,
            status: 1
        };
        nuevosObjetos.value.push((objeto));
        tab.value="contenidoNuevo";
        dataButton.value = controlSeccion.controlButton(nuevosObjetos.value,objetosABorrar.value,objSeccion.value.titulo);
    }

    if(isEditar.value===true){
        isEditar.value = false;
    }

    contenido.value = '';
    titulo.value = '';
    modalContenido.value = false;

}


const editarObjeto = (objeto,nuevo) => {
  isEditar.value = true;
   if(nuevo!==true) {
     titulo.value = objSeccion.value.objeto.at(
         objSeccion.value.objeto.indexOf(objeto)
     ).titulo;
     contenido.value = objSeccion.value.objeto.at(
         objSeccion.value.objeto.indexOf(objeto)
     ).descripcion;
     icon_selected.value = objSeccion.value.objeto.at(
       objSeccion.value.objeto.indexOf(objeto)
     ).imagen;
     modalContenido.value = true;
   }

   else{
     contenido.value = nuevosObjetos.value.at(
       nuevosObjetos.value.indexOf(objeto)
     ).descripcion;
     icon_selected.value = nuevosObjetos.value.at(nuevosObjetos.value.indexOf(objeto)).imagen;
     modalContenido.value = true;
   }
   objetoBorradoNuevo = objeto;
}

const recuperarObjeto = (index) => {

  objSeccion.value.objeto.push(objetosABorrar.value.at(index));
  objetosABorrar.value.splice(index,1);
  dataButton.value = controlSeccion.controlButton(nuevosObjetos.value,objetosABorrar.value,objSeccion.value.titulo);

  if(objetosABorrar.value.length===0){
    tab.value = "infoGeneral";
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
      tab.value="infoGeneral";
    }
  }
  else {
    const objetoBorrar = objSeccion.value.objeto.at(objeto);
    objetosABorrar.value.push(objetoBorrar);
    dataButton.value = controlSeccion.controlButton(nuevosObjetos.value,objetosABorrar.value,objSeccion.value.titulo);
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
  dataButton.value = controlSeccion.controlButton(nuevosObjetos.value,objetosABorrar.value,objSeccion.value.titulo);
  modalBorrarObjetoNuevo.value = false;
  objetoBorradoNuevo = null;

}

</script>
