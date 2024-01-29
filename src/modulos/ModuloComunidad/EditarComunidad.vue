<template>
  <q-page padding>
    <q-card class="my-card text-center">
      <q-card class="q-pa-lg">
        <q-tabs v-model="tab" class="bg-accent text-black" align="justify" narrow-indicator>
          <q-tab name="infoGeneral" label="Informacion general" />
          <q-tab name="archivos" label="Adjuntos" />
          <!--  <q-tab name="materias" label="Materias" />-->
        </q-tabs>
        <q-separator />

        <!-- PANEL 1: INFORMACION GENERAL -->
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="infoGeneral">
            <div class="text-h6 text-left q-ma-md">¡Bienvenido al módulo de edición de comunidad!</div>
            <div class="text-left q-mt-lg q-mx-lg">A continuación se muestran los datos de la comunidad a editar. En caso
              de no querer editar algun dato, no borrarlo</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Puedes editar el nombre de la
              comunidad Recuerda, solo se permiten caracteres alfabeticos</div>
            <q-input rounded outlined dense disable v-model="objComunidad.nombre" type="text" label="Nombre completo del docente"
              class="q-mx-lg" />
            <div class="text-left q-mt-lg q-mx-lg">Edición de la descripción de la comunidad.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">El número máximo es de 250 caracteres</div>
            <q-input v-model="objComunidad.quienesSomos" rows="3" rounded outlined type="textarea" class="q-mx-lg"
              color="red-12" label="Descripción" maxlength="250" />
            <div class="text-left q-mt-lg q-mx-lg">Edición del resumen de su informacion academica.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">El número máximo es de 250 caracteres</div>
            <q-input v-model="objComunidad.queHacemos" rows="15" rounded outlined type="textarea" class="q-mx-lg"
              color="red-12" label="Información academica" maxlength="250" />
              <div class="text-left q-mt-lg q-mx-md">Edita el programa academico.</div>
            <div class="text-caption text-weight-light q-mx-md text-left">Usted solo editar comunidades a las carrera 
              a las que su usuario tiene permiso.
              <q-select disable rounded outlined dense option-label="nombre" :options="optSelectPrograma"
               class="q-mt-md" v-model="selectedPrograma" type="text" label="Programas" />
            </div>
            <div class="text-right">
              <q-btn class="q-ma-lg q-px-md q-py-sm" dense color="primary" icon="check" label="Siguiente"
                @click="validarInputInfoGral()" />
            </div>
          </q-tab-panel>

          <!-- PANEL 2: ADJUNTOS -->
          <q-tab-panel name="archivos">
            <div class="text-h6 text-left q-ma-md">¡Ya casi terminamos! Ahora edite cuidadosamente 
              los elementos multimedia de la comunidad
            </div>
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

            <!-- Subir archivos -->
            <div class="text-left q-mt-lg q-mx-lg">Cambiar imagen del logo de la comunidad. Recuerda que esta foto será
              visualizada en la pagina oficial de la carrera, por ello es importante cuidar la calidad de la misma.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Recuerda que si editas la foto,
              se sobrescribira la foto actual y no será posible recuperarla. La foto puede ser en formato png o jpg.</div>
            <q-file dense class="q-mx-lg" outlined v-model="inputLogo" standout
              accept=".jpg, image/*" use-chips @change="uploadImageFunc" label="Editar logo de comunidad">
              <template v-slot:append><q-icon name="attachment" color="orange" /></template>
            </q-file>

            <div class="text-left q-mt-lg q-mx-lg">Editar fotos de la comunidad. Recuerda las fotos será visualizada en
              la pagina oficial de la carrera, por ello es importante cuidar la calidad de las mismas.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Recuerda que si editas las
              fotos, se sobrescribiran las fotos actuales y no será posible recuperarlas.</div>
            
              <div class="flex d-flex row">
              <!-- Imagen 1 -->
              <q-file  accept=".jpg, image/*" use-chips dense class="q-ml-lg q-mr-sm col" outlined v-model="inputFiles" standout
                label="Editar imagen 1">
                <template v-slot:append><q-icon name="attachment" color="orange" /></template>
              </q-file>

              <!-- Imagen 2 -->
              <q-file  accept=".jpg, image/*" use-chips dense class="q-mr-lg q-ml-sm col" outlined v-model="uploadImg2" standout 
                label="Editar imagen 2">
                <template v-slot:append><q-icon name="attachment" color="orange" /></template>
              </q-file>
            </div>

            <div class="text-right">
              <q-btn class="q-mt-lg q-mx-lg" label="Volver" @click="tab = 'infoGeneral'" />
              <q-btn class="q-mt-lg" color="primary" icon="check" label="Finalizar" @click="validarInputAdjuntos()" />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, watch } from 'vue'
import UserStore from 'src/stores/userStore';
import apiComunidad from '../ModuloComunidad/apiComunidad.js'
import { Loading, Notify, QSpinnerGears } from 'quasar'
import { useRouter } from 'vue-router';

const optSelectPrograma = ref(UserStore().getProgramas)
const selectedPrograma = ref();

const inputFiles = ref()
const uploadImg2 = ref()

const inputLogo = ref()
const envRoute = ref("http://localhost:3010/imagenes/")
const pathFile = ref()
const slide = ref(1)
const fileImageComunidad = ref()
const router = useRouter();
const tab = ref('infoGeneral')
const arrayImg = ref({
  img1: null,
  img2: null,
  logo: null
});
const fotosComunidad = ref([]);
const objComunidad = ref({
  comunidadId: '',
  nombre: '',
  quienesSomos: '',
  queHacemos: '',
  logo: null,
  fotosComunidad: null,
  programaId: '',
  status: 1,
});


const llenarDatosComunidad = async () => {
  Loading.show({ spinner: QSpinnerGears, })
  var id = {
    comunidadId: props.id
  }
  const data = await apiComunidad.getComunidadById(id.comunidadId);

  optSelectPrograma.value.map(element => {
    if (element.programaId == data.data.programaId) {
      selectedPrograma.value = element 
    }
  });
  
  
  pathFile.value = data.data.pathFile
  console.log(data.data)
  arrayImg.value.img1 = data.data.fotosComunidad[0] == undefined ? null 
    :  envRoute.value + pathFile.value + '/' + data.data.fotosComunidad[0]

  arrayImg.value.img2 = data.data.fotosComunidad[1] == undefined ? null  
     : envRoute.value + pathFile.value + '/' + data.data.fotosComunidad[1]
     
  fotosComunidad.value[0] = data.data.fotosComunidad[0] == undefined ? null 
    : data.data.fotosComunidad[0]

  fotosComunidad.value[1] = data.data.fotosComunidad[1] == undefined ? null 
    : data.data.fotosComunidad[1]

  arrayImg.value.logo =  envRoute.value + pathFile.value + '/' + data.data.logo
  objComunidad.value.comunidadId = id.comunidadId;
  objComunidad.value.nombre = data.data.nombre;
  objComunidad.value.quienesSomos = data.data.quienesSomos;
  objComunidad.value.queHacemos = data.data.queHacemos;
  objComunidad.value.logo = data.data.logo;
  objComunidad.value.fotosComunidad = data.data.fotosComunidad.join(',');
  objComunidad.value.programaId = data.data.programaId;
  inputFiles.value = data.data.fotoComunidad;
  fileImageComunidad.value = createRouteImage(data.data.pathFile, data.data.urlImagen);
  Loading.hide()
  return data;
}
llenarDatosComunidad()



const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const createRouteImage = (pathFile, nameFile) => {
  return envRoute.value + pathFile + "/" + nameFile;
}

watch(selectedPrograma, (newVal, oldVal) => {
  objComunidad.value.programaId = newVal.id;
});



watch(inputFiles, async () => {
   Loading.show({ spinner: QSpinnerGears, })
  if (typeof (inputFiles.value) !== 'string' && 
      typeof (uploadImg2.value) !== 'string') {

    console.log(inputFiles.value)
    console.log(uploadImg2.value)

    const allImages = [inputFiles.value]

    console.log(allImages)

    const response = await apiComunidad.uploadFiles(allImages, objComunidad.value.nombre, selectedPrograma.value.programaId)
    
    console.log(response)
    
    fileImageComunidad.value = createRouteImage(response.pathFile, response.filenames);
    
    console.log(fileImageComunidad.value)
    

    
    console.log(objComunidad.value.fotosComunidad)
    console.log(response.filenames[0])
    console.log(response.filenames[1])
    
    arrayImg.value.img1 = response.filenames[0] == undefined ? null 
    :  envRoute.value + pathFile.value + '/' + response.filenames[0]
    
    fotosComunidad.value[0] = response.filenames[0] == undefined ? null 
    : response.filenames[0]
  }
  Loading.hide()
});

watch(uploadImg2, async () => {
   Loading.show({ spinner: QSpinnerGears, })
  if (typeof (inputFiles.value) !== 'string' && 
      typeof (uploadImg2.value) !== 'string') {

    console.log(inputFiles.value)
    console.log(uploadImg2.value)

    const allImages = [uploadImg2.value]

    console.log(allImages)

    const response = await apiComunidad.uploadFiles(allImages, objComunidad.value.nombre, selectedPrograma.value.programaId)
    
    console.log(response)
    
    fileImageComunidad.value = createRouteImage(response.pathFile, response.filenames);
    
    console.log(fileImageComunidad.value)
    

    
    console.log(objComunidad.value.fotosComunidad)
    console.log(response.filenames[0])
    console.log(response.filenames[1])

    arrayImg.value.img2 = response.filenames[0] == undefined ? null  
     : envRoute.value + pathFile.value + '/' + response.filenames[0]

     fotosComunidad.value[1] = response.filenames[0] == undefined ? null  
     : response.filenames[0]
  }
  Loading.hide()
});

watch(inputLogo, async (newVal, oldVal) => {
   Loading.show({ spinner: QSpinnerGears, })
  if (typeof (inputLogo.value) !== 'string') {
    const response = await apiComunidad.uploadFiles([inputLogo.value], objComunidad.value.nombre, selectedPrograma.value.programaId)
    console.log(response.filenames)
    fileImageComunidad.value = createRouteImage(response.pathFile, response.filenames[0]);
    objComunidad.value.logo = !!response.filenames ?  response.filenames[0] : null
    
    arrayImg.value.logo = response.filenames[0] == undefined ? null 
    :  envRoute.value + pathFile.value + '/' + objComunidad.value.logo

    console.log(arrayImg.value.logo)
  }
  Loading.hide()
});

const agregarComunidad = async () => {
  Loading.show({ spinner: QSpinnerGears, })

  if (validarInputFiles()) {
    
  

  const fotosPost = fotosComunidad.value.filter(item => item !== null).join(',');
    
    console.log(fotosPost)
    
    objComunidad.value.fotosComunidad = !!fotosPost ? fotosPost : null

  const response = await apiComunidad.createComunidades(objComunidad.value);
  Notify.create({ type: 'positive', message: 'Se ha actualizado correctamente', position: 'top' })
  router.push({ path: "/vistaComunidad", });
  }
  Loading.hide()
}

const validarInputInfoGral = () => {
  if (objComunidad.value.nombre == '' || objComunidad.value.quienesSomos == '' || objComunidad.value.queHacemos == '') {
    Notify.create({ type: 'negative', message: 'Debe llenar todos los campos', position: 'top' })
  } else {
    tab.value = 'archivos'
  }
}

const validarInputAdjuntos = () => {
  agregarComunidad();
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