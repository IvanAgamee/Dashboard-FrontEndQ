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
              de no querer
              editar algun dato, no borrarlo:</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Puedes editar el nombre de la
              comunidad
              Recuerda, solo se permiten caracteres alfabeticos</div>
            <q-input rounded outlined dense disable v-model="objComunidad.nombre" type="text" label="Nombre completo del docente"
              class="q-mx-lg" />
            <div class="text-left q-mt-lg q-mx-lg">Edición de la descripción del docente.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">El número maximo de palabras
              son: 250 palabras</div>
            <q-input v-model="objComunidad.quienesSomos" rows="3" rounded outlined type="textarea" class="q-mx-lg"
              color="red-12" label="Descripción" />
            <div class="text-left q-mt-lg q-mx-lg">Edición del resumen de su informacion academica.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">El número maximo de palabras
              son: 250 palabras</div>
            <q-input v-model="objComunidad.queHacemos" rows="15" rounded outlined type="textarea" class="q-mx-lg"
              color="red-12" label="Información academica" />
              <div class="text-left q-mt-lg q-mx-md">Edita el programa academico.</div>
            <div class="text-caption text-weight-light q-mx-md text-left">Usted solo puede agregar
              comunidades a las carreras
              a las que su usuario tiene permiso.
              <q-select rounded outlined dense option-label="nombre" :options="optSelectPrograma" disable
               class="q-mt-md" v-model="selectedPrograma" type="text" label="Programas" />
            </div>
            <div class="text-right">
              <q-btn class="q-ma-lg q-px-md q-py-sm" dense color="primary" icon="check" label="Siguiente"
                @click="validarInputInfoGral()" />
            </div>
          </q-tab-panel>
          <!-- PANEL 2: ADJUNTOS -->
          <q-tab-panel name="archivos">
            <div class="text-h6 text-left q-ma-md">¡Ya casi terminamos! Ahora edite cuidadosamente los elementos
              multimedia de la comunidad
            </div>
            <div class="q-pa-md row" style="align-items: center;">
            <div class="col-6">
             <q-avatar size="250px" class="q-mb-sm">
            <img :src="arrayImg.logo">
            </q-avatar> 
            <div class="q-mt-md q-mx-md text-bold text-center">Logo de {{objComunidad.nombre}}</div>
            </div>
            <div class="col-6">
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
            <q-carousel-slide :name="1" :img-src="arrayImg.img1" />
            <q-carousel-slide :name="2" :img-src="arrayImg.img2" />
            </q-carousel> 
            </div>

            
            </div>
            <div class="text-left q-mt-lg q-mx-lg">Cambiar Imagen del logo de la comunidad. Recuerda que esta foto será
              visualizada en
              la pagina oficial de la carrera, por ello
              es importante cuidar la calidad de la misma.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Recuerda que si editas la foto,
              se sobrescribira
              la foto actual y no será posible recuperarla. La foto puede ser en formato png o jpg.</div>
            <q-file dense class="q-mx-lg" outlined v-model="inputLogo" standout
              @change="uploadImageFunc" label="Da click aqui y seleccione un archivo de su computador">
              <template v-slot:append><q-icon name="attachment" color="orange" /></template>
            </q-file>

            <div class="text-left q-mt-lg q-mx-lg">Editar fotos de la comunidad. Recuerda las fotos será visualizada en
              la pagina oficial de la carrera, por ello
              es importante cuidar la calidad de las mismas.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Recuerda que si editas las
              fotos,
              se sobrescribiran
              las fotos actuales y no será posible recuperarlas. La fotos puede ser en formato png o jpg.</div>
            <q-file dense class="q-mx-lg" outlined v-model="inputFiles" standout multiple max-files="2" label="Da click aqui y seleccione dos archivos de su computador">
              <template v-slot:append><q-icon name="attachment" color="orange" /></template>
            </q-file>

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
import swal from 'sweetalert';
import { Loading, Notify, QSpinnerGears } from 'quasar'
import { useRouter } from 'vue-router';

const optSelectPrograma = ref(UserStore().getProgramas)
const selectedPrograma = ref();
const inputFiles = ref()
const inputLogo = ref()
const envRoute = ref("http://localhost:3010/imagenes/")
const pathFile = ref()
const slide = ref(1)
const fileImageComunidad = ref()
const router = useRouter();
const tab = ref('infoGeneral')
const arrayImg = ref({
  img1: '',
  img2: '',
  logo: ''
});
const objComunidad = ref({
  comunidadId: '',
  nombre: '',
  quienesSomos: '',
  queHacemos: '',
  logo: 'logo.png',
  fotosComunidad: 'fotos.png',
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
  arrayImg.value.img1 =  envRoute.value + pathFile.value + '/' + data.data.fotosComunidad[0]
  arrayImg.value.img2 =  envRoute.value + pathFile.value + '/' + data.data.fotosComunidad[1]
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

watch(inputFiles, async (newVal, oldVal) => {
   Loading.show({ spinner: QSpinnerGears, })
  if (typeof (inputFiles.value) !== 'string') {
    const id = objComunidad.value.programaId;
    const response = await apiComunidad.uploadFiles(inputFiles.value, objComunidad.value.nombre, selectedPrograma.value.programaId)

    fileImageComunidad.value = createRouteImage(response.pathFile, response.filenames);
    const fotosComunidad = response.filenames.join(',');
    objComunidad.value.fotosComunidad = !!response.filenames ? fotosComunidad : null
    console.log(response.filenames)
    arrayImg.value.img1 =  envRoute.value + pathFile.value + '/' + response.filenames[0]
    arrayImg.value.img2 =  envRoute.value + pathFile.value + '/' + response.filenames[1]
  }
  Loading.hide()
});

watch(inputLogo, async (newVal, oldVal) => {
   Loading.show({ spinner: QSpinnerGears, })
  if (typeof (inputLogo.value) !== 'string') {
    const id = objComunidad.value.programaId;
    const response = await apiComunidad.uploadFiles([inputLogo.value], objComunidad.value.nombre, selectedPrograma.value.programaId)
    console.log(response.filenames)
    fileImageComunidad.value = createRouteImage(response.pathFile, response.filenames[0]);
    objComunidad.value.logo = !!response.filenames ?  response.filenames[0] : null
    arrayImg.value.logo =  envRoute.value + pathFile.value + '/' + objComunidad.value.logo
    console.log(arrayImg.value.logo)
  }
  Loading.hide()
});

const agregarComunidad = async () => {
  Loading.show({ spinner: QSpinnerGears, })
  const response = await apiComunidad.createComunidades(objComunidad.value);
  Notify.create({ type: 'positive', message: 'Se ha actualizado correctamente', position: 'top' })
  router.push({ path: "/vistaComunidad", });
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

</script>
