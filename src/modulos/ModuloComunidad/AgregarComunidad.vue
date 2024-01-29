<template>
  <q-page padding>
    <q-card class="my-card text-center">
      <q-card class="q-pa-lg">
        <q-tabs v-model="tab" class="bg-accent text-black" align="justify" narrow-indicator>
          <q-tab name="infoGeneral" label="Informacion general" />
          <q-tab name="archivos" label="Adjuntos" />
        </q-tabs>
        <q-separator />

        <!-- PANEL 1: INFORMACION GENERAL -->
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="infoGeneral">
            <div class="text-h6 text-left q-ma-md">¡Bienvenido al módulo de creación de una nueva comunidad!</div>
            <div class="text-left q-mt-lg q-mx-lg">A continuación llene cuidadosamente la información requerida para
              añadir correctamente la comunidad.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Es importante que se siga el siguiente 
              formato: Comunidad de Industrial</div>
            <q-input rounded outlined dense v-model="objComunidad.nombre" type="text" label="Nombre de la comunidad"
              class="q-mx-lg" />
            <div class="text-left q-mt-lg q-mx-lg">Describe lo que representa la comunidad.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">El número máximo es de 100 caracteres</div>
              <q-input v-model="objComunidad.quienesSomos" rows="3" rounded outlined type="textarea" class="q-mx-lg"
            color="red-12" label="Descripción" maxlength="100"/>
            <div class="text-left q-mt-lg q-mx-lg">Ahora escribe un resumen sobre las actividades que realizan.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">El número máximo es de 250 caracteres</div>
            <q-input v-model="objComunidad.queHacemos" rows="15" rounded outlined type="textarea" class="q-mx-lg"
              color="red-12" label="Actividades" maxlength="250" />
            <div class="text-right">
              <div class="text-left q-mt-lg q-mx-lg">Seleccione la carrera a la que pertenece la comunidad
              <div class="text-caption text-weight-light text-left">Usted solo puede agregar comunidades a las carreras
                a las que su usuario tiene permiso.
              <q-select rounded outlined dense option-label="nombre" :options="optSelectPrograma"
               class="q-mt-md" v-model="selectedPrograma" type="text" label="Programas" />
            </div>
              </div>
              <q-btn class="q-ma-lg q-px-md q-py-sm" dense color="primary" icon="check" label="Siguiente"
                @click="validarInputInfoGral()" />
            </div>
          </q-tab-panel>

          <!-- PANEL 2: ADJUNTOS -->
          <q-tab-panel name="archivos">

            <div class="q-pa-md row" style="align-items: center;"
            v-if="arrayImg.logo != null || arrayImg.img1 != null || arrayImg.img2 != null" >
            
            <div v-if="arrayImg.logo != null" class="col-6">
            <!-- Logo -->
            <q-avatar size="250px" class="q-mb-sm">
             
              <img  :src="arrayImg.logo">
            </q-avatar> 
            <div class="q-mt-md q-mx-md text-bold text-center">Logo de {{objComunidad.nombre}}</div>
            </div>


              <div class="col-6">
                <!-- Imagenes de la comunidad -->
                <q-carousel
                  arrows
                  swipeable
                  animated
                  v-model="slide"
                  thumbnails
                  infinite
                  class="q-mx-lg"
                  height="300px"
                >
                <q-carousel-slide v-if="arrayImg.img1 != null" :name="1" :img-src="arrayImg.img1">
                  <div class="absolute-bottom custom-caption">
                    <div class="text-subtitle1">Imagen 1</div>
                  </div>
                </q-carousel-slide>
                <q-carousel-slide v-if="arrayImg.img2 != null" :name="2" :img-src="arrayImg.img2">
                  <div class="absolute-bottom custom-caption">
                    <div class="text-subtitle1">Imagen 2</div>
                  </div>
                </q-carousel-slide>
                </q-carousel> 
              </div>
            </div>
            
            <div class="text-h6 text-left q-ma-md">¡Ya casi terminamos! Ahora agrega elementos multimedia de la comunidad
            </div>
            <div class="text-left q-mt-lg q-mx-lg">Agregue la imágen del logo de la comunidad. Recuerda que esta foto será
              visualizada en la pagina oficial de la carrera, por ello es importante cuidar la calidad de la misma.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">La foto puede ser en formato png o jpg.</div>
            <q-file dense class="q-mx-lg" outlined v-model="inputLogo" standout @change="uploadImageFunc"
              accept=".jpg, image/*" use-chips label="Subir logo de la comunidad">
              <template v-slot:append><q-icon name="attachment" color="orange" /></template>
            </q-file>

            <div class="text-left q-mt-lg q-mx-lg">Agregue las fotos de la comunidad. Recuerda que las fotos serán visualizadas en
              la pagina oficial de la carrera, por ello es importante cuidar la calidad de las mismas.
            </div>
            <div class="text-caption text-weight-light q-mb-md q-mx-lg text-left">Da click a continuación para agregar las imagenes.</div>

            <div class="flex d-flex row">
              <!-- Imagen 1 -->
              <q-file  accept=".jpg, image/*" use-chips dense class="q-ml-lg q-mr-sm col" outlined v-model="inputFiles" standout
                label="Subir imagen 1">
                <template v-slot:append><q-icon name="attachment" color="orange" /></template>
              </q-file>

              <!-- Imagen 2 -->
              <q-file  accept=".jpg, image/*" use-chips dense class="q-mr-lg q-ml-sm col" outlined v-model="uploadImg2" standout
                label="Subir imagen 2">
                <template v-slot:append><q-icon name="attachment" color="orange" /></template>
              </q-file>
            </div>

            <div class="text-right">
              <q-btn class="q-mt-lg q-mx-lg" label="Volver" @click="tab = 'infoGeneral'" />
              <q-btn class="q-mt-lg" color="primary" icon="check" label="Finalizar" @click="agregarComunidad()" />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, watch } from 'vue'
import authStore from '../../stores/userStore.js';
import apiComunidad from './apiComunidad';
import swal from 'sweetalert';
import { Loading, Notify, QSpinnerGears } from 'quasar'
import { useRouter } from 'vue-router';

const router = useRouter();
const UserStore = authStore();
const tab = ref('infoGeneral')
const optSelectPrograma = ref(UserStore.getProgramas)
const selectedPrograma = ref(null)
const slide = ref(1)
const inputFiles = ref()
const uploadImg2 = ref()
const arrayImg = ref({
  img1: null,
  img2: null,
  logo: null
});

const inputLogo = ref()
const fileImageComunidad = ref()
const envRoute = ref("http://localhost:3010/imagenes/")
const objComunidad = ref({
  nombre: '',
  quienesSomos: '',
  queHacemos: '',
  logo: null,
  fotosComunidad: null,
  programaId: '',
  status: 1,
});

// Actualiza el valor del programa seleccionado para la comunidad
watch(selectedPrograma, (newVal) => {
  objComunidad.value.programaId = newVal.programaId;
});

// Sube las fotos al storage
watch([inputFiles,uploadImg2], async () => {
   Loading.show({ spinner: QSpinnerGears, })
  if (typeof (inputFiles.value) !== 'string' && 
      typeof (uploadImg2.value) !== 'string') {

    console.log(inputFiles.value)
    console.log(uploadImg2.value)

    const allImages = [inputFiles.value, uploadImg2.value]

    console.log(allImages)

    const response = await apiComunidad.uploadFiles(allImages, objComunidad.value.nombre, selectedPrograma.value.programaId)
    
    console.log(response)
    
    fileImageComunidad.value = createRouteImage(response.pathFile, response.filenames);
    
    console.log(fileImageComunidad.value)
    
    const fotosComunidad = response.filenames.join(',');
    
    console.log(fotosComunidad)
    
    objComunidad.value.fotosComunidad = !!response.filenames ? fotosComunidad : null
    
    console.log(objComunidad.value.fotosComunidad)
    console.log(response.filenames[0])
    console.log(response.filenames[1])
    
    arrayImg.value.img1 = response.filenames[0] == undefined ? null 
    :  envRoute.value + response.pathFile + '/' + response.filenames[0]

    arrayImg.value.img2 = response.filenames[1] == undefined ? null  
     : envRoute.value + response.pathFile + '/' + response.filenames[1]
  }
  Loading.hide()
});

// Sube el logo al storage
watch(inputLogo, async () => {
   Loading.show({ spinner: QSpinnerGears, })
  if (typeof (inputLogo.value) !== 'string') {
    const id = objComunidad.value.programaId;
    const response = await apiComunidad.uploadFiles([inputLogo.value], objComunidad.value.nombre, id)

    fileImageComunidad.value = createRouteImage(response.pathFile, response.filenames[0]);
    objComunidad.value.logo = !!response.filenames ? response.filenames[0] : null
    console.log(response)
    arrayImg.value.logo = response.filenames[0] == undefined ? null  
     : envRoute.value + response.pathFile + '/' + response.filenames[0]
    console.log(response)
  }
   Loading.hide()
});

// Construye la ruta de la imagen
const createRouteImage = (pathFile, nameFile) => {
  return envRoute.value + pathFile + "/" + nameFile;
}

// Agregar comunidad
const agregarComunidad = async () => {
  Loading.show({ spinner: QSpinnerGears, })
  if (validarInputFiles()){
  const response = await apiComunidad.createComunidades(objComunidad.value);
  swal({
    position: 'top-end',
    icon: response.success == true ? 'success' : 'error',
    title: response.success == true ? '¡Comunidad registrada con éxito!'
      : '¡Ha ocurrido un error! Intentelo de nuevo',
    showConfirmButton: false,
    timer: 1500
  })
  router.push({ path: "/vistaComunidad", });}
  Loading.hide()
}

// Validaciones
const validarInputInfoGral = () => {
  if (objComunidad.value.nombre == '' || objComunidad.value.quienesSomos == '' || objComunidad.value.queHacemos == '') {
    Notify.create({ type: 'negative', message: 'Debe llenar todos los campos', position: 'top' })
  } else {
    tab.value = 'archivos'
  }
}

const validarInputFiles = () => {
  if (objComunidad.value.logo == null || objComunidad.value.fotosComunidad == null) {
    Notify.create({ type: 'negative', message: 'Debe subir un logo y al menos una foto de la comunidad', position: 'top' })
    return false
  } else {
    return true
  }
}

</script>

<style lang="sass" scoped>
.custom-caption
  text-align: right
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)

</style>