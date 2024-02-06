<template>
  <q-page padding>
    <q-card class="my-card text-center">
      <q-card class="q-pa-lg">
        <q-tabs v-model="tab" class="bg-accent text-black" align="justify" narrow-indicator >
          <q-tab name="infoGeneral" label="Informacion general" />
          <q-tab v-if="tieneContenido" name="contenido" label="Contenido" />
        </q-tabs>
        <q-separator />
        <!-- PANEL 1: INFORMACION GENERAL -->
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="infoGeneral">
            <div class="text-h6 text-left q-ma-md">¡Bienvenido al módulo de creación de una sección</div>
            <div class="text-left q-mt-lg q-mx-lg">Selecciona al programa para el cual sera asignada las sección.</div>
            <q-select rounded outlined dense option-label="nombre" :options="optSelectPrograma" v-model="selectedPrograma" type="text" label="Programas" class="q-mx-lg" />
            <div class="text-left q-mt-lg q-mx-lg">A continuación llena cuidadosamente la información requerida para añadir
              una nueva sección a la página.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Seleccione el módulo al cual la sección pertenece</div>
            <div class="q-gutter-sm">
              <q-radio  v-for="(objeto, index) in objModulo" :key="index" v-model="moduloSeleccionado"
              :val="objeto.moduloId">
            {{objeto.nombre}}
              </q-radio>
            </div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">El nombre debe ser breve y conciso sobre
            lo que la sección desea presentar a los usuarios.</div>
            <q-input rounded outlined dense v-model="objSeccion.titulo" type="text" label="Nombre de sección" class="q-mx-lg" />
            <div class="text-left q-mt-lg q-mx-lg">Añade una descripción simple de la sección.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">El número maximo de palabras son: 250 palabras</div>
            <q-input v-model="objSeccion.descripcion" rows="3" rounded outlined type="textarea" class="q-mx-lg"
                     color="red-12" label="Descripción"/>
              <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Url para acceder a mas información.</div>
              <q-input rounded outlined dense v-model="objSeccion.url" type="text" label="Ingrese URL" class="q-mx-lg" />
            <q-toggle
              v-model="tieneContenido"
              label="¿Desea agregar contenido a la seccion?"
            ></q-toggle>
            <div class="text-right">
              <q-btn v-if="!tieneContenido" class="q-ma-lg q-px-md q-py-sm" color="primary" icon="check" label="Finalizar" @click="validarGeneral()" />
              <q-btn v-if="tieneContenido" class="q-ma-lg q-px-md q-py-sm" dense color="primary" icon="check" label="Siguiente" @click="validarInputInfoGral()" />
            </div>
          </q-tab-panel>
          <q-tab-panel name="contenido">
            <div class="text-h6 text-left q-ma-md">Bien hecho! Continue agregando contenido a {{objSeccion.titulo}}
            </div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">
              Agregue el contenido de la seccion
            </div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">
              {{objSeccion.titulo}}
            </div>
            <div style="
            display: grid;
             grid-template-columns: repeat(3, auto);
             gap: 15px;
            align-content: space-between;
            align-items: stretch;">
              <div v-for="(objeto, index) in objObjetos" :key="index">
                <q-card style="margin-bottom: 15px;">
                  <q-card-section class="bg-primary text-white">
                    <div>{{ objeto.descripcion }}</div>
                  </q-card-section>
                  <q-separator></q-separator>
                  <q-card-actions align="right">
                    <q-btn flat @click="editarObjeto(index)">
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
                padding="xl"
                round
                color="primary"
                @click="modalContenido = true"
              ><q-icon class="fa-sharp fa-light fa-plus" style="color: #ffffff;"></q-icon></q-btn>
              </div>
              </div>

            <div>
              <q-btn class="q-ma-lg q-px-md q-py-sm" color="primary" icon="check" label="Finalizar" @click="validarGeneral" />
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
                <q-btn @click="validarContenidoModal()" flat label="Agregar Elemento"></q-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>




  <q-dialog v-model="modalBorrarObjeto" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
        <span class="q-ml-sm">Estas a punto de eliminar este elemento.
        ¿Estas Seguro? Será de manera permanente </span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" v-close-popup />
        <q-btn flat label="Eliminar" color="primary" @click="eliminarObjeto(objetoIndex)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import authStore from '../../stores/userStore.js';
import apiSeccion from '../ModuloSecciones/apiSecciones'
import swal from 'sweetalert';
import { Loading, Notify, QSpinnerGears } from 'quasar'
import { useRouter } from 'vue-router';
import apiDocente from "src/modulos/ModuloDocente/apiDocente";

const router = useRouter();
const UserStore = authStore();
const tab = ref('infoGeneral')
const optSelectPrograma = ref(UserStore.getProgramas)
const selectedPrograma = ref(null)
const rows = ref([])
const moduloSeleccionado = ref({})
const objSeccion = ref({
  moduloId: 0,
  programaId: 0,
  titulo: '',
  descripcion: '',
  url:'',
  status: 1,
});

const objObjetos = ref([]);
let isEditar = ref(false);
let contenido = ref('');
let titulo = ref('');
let tieneContenido = ref(false);
let modalContenido = ref(false);
let modalBorrarObjeto = ref(false);
let objetoIndex = ref(0);

const objModulo = ref({
});
//llenar objetos modulos
const llenarModulos = async() => {
  Loading.show({ spinner: QSpinnerGears, })
  const data = await apiSeccion.getModulos();

  objModulo.value = data.data;

  Loading.hide();
};
llenarModulos();

// Agregar registros a la tabla
const agregarSeccion = async () => {
  Loading.show({ spinner: QSpinnerGears, })
  objSeccion.value.programaId = selectedPrograma.value.programaId;
  objSeccion.value.moduloId = moduloSeleccionado.value;
  const response = await apiSeccion.createSeccion(objSeccion.value);
  if(objObjetos.value.length>0) {
    const idSeccion = await apiSeccion.getLastIdSeccion(objSeccion.value.titulo,objSeccion.value.moduloId,objSeccion.value.programaId);
    objObjetos.value.forEach(objeto => {
      objeto.seccionId = idSeccion.data.seccionId;
    });
  }
  const responseObjetos = await apiSeccion.createObjetosMasvos(objObjetos.value);
  swal({
    position: 'top-end',
    icon: response.success==true  || (response.success==true && responseObjetos.success==true && tieneContenido == true)  ? 'success' : 'error',
    title: response.success==true  || (response.success==true && responseObjetos.success==true && tieneContenido == true)  ?'¡Se ha agregado correctamente la sección!'
      : '¡Ha ocurrido un error! Intentelo de nuevo',
    showConfirmButton: false,
    timer: 1500})
  router.push({path: "/vistaSeccion",});
  Loading.hide()
}
const crearContenido = () => {
    if(isEditar.value===true) {
        const objeto = objObjetos.value[objetoIndex.value];
        objeto.descripcion = contenido.value;
        objeto.titulo = titulo.value;
        objObjetos.value[objetoIndex.value] = objeto;
    }
    else{
        const objeto = {
            seccionId: objSeccion.value.seccionId,
            imagen: null,
            titulo: titulo.value,
            descripcion: contenido.value,
            status: 1,
        };
        objObjetos.value.push(objeto);
    }

    if(isEditar.value===true){
        isEditar.value = false;
    }
    contenido.value = '';
    titulo.value = '';
}

const editarObjeto = (index) => {
    isEditar.value = true;
    objetoIndex.value = index;
    titulo.value = objObjetos.value.at(objetoIndex.value).titulo;
    contenido.value = objObjetos.value.at(objetoIndex.value).descripcion;
    modalContenido.value = true;
}

const validarInputInfoGral = () => {
  if (selectedPrograma.value === null) {
    Notify.create({type: 'negative', message: 'Debe seleccionar a que programa pertence', position: 'top'})
  } else {
    if (objSeccion.value.nombre == '' || objModulo.value == null) {
      Notify.create({type: 'negative', message: 'Debe llenar todos los campos', position: 'top'})
    } else {
      tab.value = 'contenido'
    }
  }
}

const validarContenidoModal = () => {
    if(contenido.value==='' && titulo.value===''){
        Notify.create({type: 'negative', message: 'El contenido no puede estar vacio', position: 'top'})
    }
    else {
        crearContenido();
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

const limpiarContenido = () => {
    contenido.value = '';
    titulo.value = '';
}
const prepararBorrado = (index) => {
  modalBorrarObjeto.value = true;
  objetoIndex.value = index;
}
const eliminarObjeto = (objeto) => {
  objObjetos.value.splice(objeto,1);
  modalBorrarObjeto.value = false;
}
</script>

