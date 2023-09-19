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
            <div class="text-h6 text-left q-ma-md">¡Bienvenido al módulo de registrar una nueva comunidad!</div>
            <div class="text-left q-mt-lg q-mx-lg">A continuación llena cuidadosamente la información requerida para
              añadir
              correctamente a la comunidad.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Es importante que el nombre de
              la
              comunidad cunmpla con el formato en el que solo se permiten caracteres alfabeticos</div>
            <q-input rounded outlined dense v-model="objComunidad.nombre" type="text" label="Nombre de la comunidad"
              class="q-mx-lg" />
            <div class="text-left q-mt-lg q-mx-lg">Describe lo que representa la comunidad.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">El número maximo de palabras
              son: 250 palabras</div>
            <q-input v-model="objComunidad.quienesSomos" rows="3" rounded outlined type="textarea" class="q-mx-lg"
              color="red-12" label="Descripción" />
            <div class="text-left q-mt-lg q-mx-lg">Ahora escribe un resumen sobre las actividades que realizan.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">El número maximo de palabras
              son: 250 palabras</div>
            <q-input v-model="objComunidad.queHacemos" rows="15" rounded outlined type="textarea" class="q-mx-lg"
              color="red-12" label="Actividades" />
            <div class="text-right">
              <div class="text-left q-mt-lg q-mx-lg">Seleccione la carrera a la que pertenece la comunidad

                <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Usted solo puede agregar
                  comunidades a las carreras
                  a las que su usuario tiene permiso.</div>
                <q-select rounded outlined dense option-label="nombre" :options="optSelectPrograma"
                  v-model="selectedPrograma" type="text" label="Programas" class="q-mx-lg" option-value="id" />
              </div>
              <q-btn class="q-ma-lg q-px-md q-py-sm" dense color="primary" icon="check" label="Siguiente"
                @click="validarInputInfoGral()" />
            </div>
          </q-tab-panel>
          <!-- PANEL 2: ADJUNTOS -->
          <q-tab-panel name="archivos">
            <div class="text-h6 text-left q-ma-md">¡Ya casi terminamos! Ahora agrega elementos multimedia
              de la comunidad
            </div>
            <div class="text-left q-mt-lg q-mx-lg">Agregue la imágen del logo del a comunidad. Recuerda que esta foto será
              visualizada en
              la pagina oficial de la carrera, por ello
              es importante cuidar la calidad de la misma.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">La foto puede ser en formato png
              o jpg.</div>
            <q-file dense class="q-mx-lg" outlined v-model="inputLogo" standout @change="uploadImageFunc"
              label="Da click aqui y seleccione un archivo de su computador">
              <template v-slot:append><q-icon name="attachment" color="orange" /></template>
            </q-file>

            <div class="text-left q-mt-lg q-mx-lg">Editar fotos de la comunidad. Recuerda las fotos será visualizada en
              la pagina oficial de la carrera, por ello
              es importante cuidar la calidad de las mismas. La fotos puede ser en formato png o jpg.</div>

            <q-file dense class="q-mx-lg" outlined v-model="inputFiles" standout multiple max-files="3"
              label="Da click aqui y seleccione dos archivos de su computador">
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
import { ref, watch, computed, onMounted } from 'vue'
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
const inputFiles = ref()
const inputLogo = ref()
const fileImageComunidad = ref()
const envRoute = ref("http://localhost:3010/imagenes/")
const objComunidad = ref({
  nombre: '',
  quienesSomos: '',
  queHacemos: '',
  logo: 'logo.png',
  fotosComunidad: 'fotos.png',
  programaId: '',
  status: 1,
});
watch(selectedPrograma, (newVal, oldVal) => {
  objComunidad.value.programaId = newVal.programaId;
});

watch(inputFiles, async (newVal, oldVal) => {
  if (typeof (inputFiles.value) !== 'string') {
    const id = objComunidad.value.programaId;
    const response = await apiComunidad.uploadFiles(inputFiles.value, objComunidad.value.nombre, id)

    fileImageComunidad.value = createRouteImage(response.pathFile, response.filenames);
    const fotosComunidad = response.filenames.join(',');
    objComunidad.value.fotosComunidad = !!response.filenames ? fotosComunidad : null
  }
});

watch(inputLogo, async (newVal, oldVal) => {
  if (typeof (inputLogo.value) !== 'string') {
    const id = objComunidad.value.programaId;
    console.log(inputLogo.value)
    const response = await apiComunidad.uploadFiles([inputLogo.value], objComunidad.value.nombre, id)

    fileImageComunidad.value = createRouteImage(response.pathFile, response.filenames[0]);
    objComunidad.value.logo = !!response.filenames ? response.filenames[0] : null
  }
});

const createRouteImage = (pathFile, nameFile) => {
  return envRoute.value + pathFile + "/" + nameFile;
}

// Agregar registros a la tabla
const agregarComunidad = async () => {
  Loading.show({ spinner: QSpinnerGears, })
  const response = await apiComunidad.createComunidades(objComunidad.value);
  swal({
    position: 'top-end',
    icon: response.success == true ? 'success' : 'error',
    title: response.success == true ? '¡Comunidad registrada con éxito!'
      : '¡Ha ocurrido un error! Intentelo de nuevo',
    showConfirmButton: false,
    timer: 1500
  })
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
