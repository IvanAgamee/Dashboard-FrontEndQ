<template>
    <q-page padding>
    <q-card class="my-card text-center">
      <q-card class="q-pa-lg">
        <q-tabs v-model="tab" class="bg-accent text-black" align="justify" narrow-indicator >
          <q-tab name="infoGeneral" label="Informacion general" />
          <q-tab name="archivos" label="Adjuntos" />
          <q-tab name="materias" label="Materias" />
        </q-tabs>
        <q-separator />
      <!-- PANEL 1: INFORMACION GENERAL -->
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="infoGeneral">
            <div class="text-h6 text-left q-ma-md">¡Bienvenido al módulo de edición de un profesor!</div>
            <div class="text-left q-mt-lg q-mx-lg">A continuación se muestran los datos del profesor. En caso de no querer editar algun dato, no borrarlo:</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Puedes editar el nombre del docente. Recuerda que el 
            formato debe ser: Juan Hernandez Sanchez</div>
            <q-input rounded outlined dense v-model="objDocente.nombre" type="text" label="Nombre completo del docente" class="q-mx-lg" />
            <div class="text-left q-mt-lg q-mx-lg">Edición de la descripción del docente.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">El número maximo de palabras son: 250 palabras</div>
            <q-input v-model="objDocente.descripcion" rows="3" rounded outlined type="textarea" class="q-mx-lg"
            color="red-12" label="Descripción"/>
            <div class="text-left q-mt-lg q-mx-lg">Edición del resumen de su informacion academica.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">El número maximo de palabras son: 250 palabras</div>
            <q-input v-model="objDocente.informacionAcademica" rows="15" rounded outlined type="textarea" class="q-mx-lg"
            color="red-12" label="Información academica"/>
            <div class="text-right">
            <q-btn class="q-ma-lg q-px-md q-py-sm" dense color="primary" icon="check" label="Siguiente" @click="validarInputInfoGral()" />
            </div>
            </q-tab-panel>
          <!-- PANEL 2: ADJUNTOS -->
          <q-tab-panel name="archivos">
            <div class="text-h6 text-left q-ma-md">¡Bien hecho! Continue editando la siguiente información:</div>
            <q-img v-if="!!fileImageDocente" :src="fileImageDocente"
            no-native-menu
            height="200px"
            style="max-width: 220px">
            <div class="absolute-bottom text-subtitle1 text-center">
              Imagen del docente
            </div>
            </q-img>
            <div class="text-left q-mt-lg q-mx-lg">Edición de la carrera a la que pertenece el docente</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Usted solo puede editar docentes de las carreras
            a las que su usuario tiene permiso.</div>
            <q-select rounded outlined dense option-label="nombre" :options="optSelectPrograma" v-model="selectedPrograma" type="text" label="Programas" class="q-mx-lg" />
            <div class="text-left q-mt-lg q-mx-lg">Edición del contacto de este docente.
            Le recordamos que este contacto será público (No es obligatorio)</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Recuerde que puede ser un número telefonico o un correo electronico.</div>
            <q-input rounded outlined dense v-model="objDocente.contacto" type="text" label="Contacto del docente" class="q-mx-lg" />
            <div class="text-left q-mt-lg q-mx-lg">Edición de foto del docente. Recuerda que esta foto será visualizada en la pagina oficial de la carrera, por ello
            es importante cuidar la calidad de la misma.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Recuerda que si editas la foto, se sobrescribira 
            la foto actual y no será posible recuperarla. La foto puede ser en formato png y jpg.</div>
            <q-file dense class="q-mx-lg" outlined v-model="inputFile" @change="uploadImageFunc" label="Da click aqui si desea editar la imagen">
            <template v-slot:append><q-icon name="attachment" color="orange" /></template>
            </q-file>
            <div class="text-right">
            <q-btn class="q-mt-lg q-mx-lg" label="Volver" @click="tab='infoGeneral'" />
            <q-btn class="q-mt-lg" color="primary" icon="check" label="Siguiente" @click="validarInputAdjuntos()" />
            </div>
          </q-tab-panel>
          <!-- PANEL 3: MATERIAS -->
          <q-tab-panel name="materias">
            <div class="text-h6 text-left q-ma-md">¡Ya casi terminamos! Ahora edite cuidadosamente las materias que imparte este docente, en caso de ser necesario</div>
            <div class="text-left q-ma-lg">Debe marcar las casillas correspondientes a cada materia.</div>
            <q-input v-model="objDocente.materias" rows="15" rounded outlined type="textarea" class="q-mx-lg"
            color="red-12" label="Información academica"/>
             <div class="text-right">
              <q-btn class="q-mt-lg q-mx-lg" label="Volver" @click="tab='archivos'" />
              <q-btn class="q-mt-lg" color="primary" icon="check" label="Finalizar" @click="validarInputMaterias()" />    
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
import apiMateria from '../ModuloMateria/apiMateria.js'
import apiDocente from '../ModuloDocente/apiDocente.js'
import apiUpload from '../Apis/apiUpload.js'
import swal from 'sweetalert';
import { Loading, Notify, QSpinnerGears } from 'quasar'
import { useRouter } from 'vue-router';

const router = useRouter();
const UserStore = authStore();
const tab = ref('infoGeneral')
const optSelectPrograma = ref(UserStore.getProgramas)
const selectedPrograma = ref(null)
const rows = ref([])
const selectedMaterias = ref([])
const fileImageDocente = ref()
const inputFile = ref()
const envRoute = ref("http://localhost:3010/imagenes/")
const props = defineProps({
    id:{
        type:String,
        required:true
    }
  })
const objDocente = ref({
  docenteId: 0,
  nombre: '',
  descripcion: '',
  informacionAcademica: '',
  materias: '',
  contacto: '',
  urlImagen: '',
  programaId: '',
  status: 1,
});

const columns = [
  { name: 'nombre', align: 'left', label: 'Nombre', field: row => row.nombre},
  { name: 'area', align: 'left', label: 'Area', field: row => row.area},
  { name: 'especialidad', align: 'left', label: 'Especialidad', field: row => row.especialidad},]

const dewataMaterias = async () => {
Loading.show({ spinner: QSpinnerGears, })
var id = {
    docenteId: props.id
}

const data = await apiDocente.getDocenteById(id);

selectedPrograma.value = optSelectPrograma.value.find(programa => programa.programaId === data.data.programaId);

objDocente.value.docenteId = data.data.docenteId
objDocente.value.programaId = data.data.programaId
objDocente.value.nombre = data.data.nombre ;
objDocente.value.descripcion = data.data.descripcion;
objDocente.value.informacionAcademica = data.data.informacionAcademica;
// objDocente.value.materias: data.data.
objDocente.value.contacto = data.data.contacto;
objDocente.value.urlImagen = data.data.urlImagen;
// objDocente.value.programaId = data.data.urlImagen;
objDocente.value.materias = data.data.materias;
inputFile.value = data.data.urlImagen; 
fileImageDocente.value = createRouteImage(data.data.pathFile,data.data.urlImagen);
  Loading.hide()
  return data;
} 
dewataMaterias()

const createRouteImage = (pathFile,nameFile) => {
  return envRoute.value + pathFile + "/" + nameFile;
}

 watch(inputFile, async(newVal, oldVal) => {
  if (typeof(inputFile.value) !== 'string') {
    
  const id = selectedPrograma.value.programaId;  
  const response = await apiDocente.uploadImageDocente(inputFile.value,objDocente.value.nombre,id)

  fileImageDocente.value = createRouteImage(response.fileData.pathFile,response.fileData.nameFile);

  objDocente.value.urlImagen = !!response.fileData.nameFile ? response.fileData.nameFile : null
  }
 });

// Agregar registros a la tabla
const agregarDocente = async () => {
  Loading.show({ spinner: QSpinnerGears, })
  objDocente.value.programaId = selectedPrograma?.value?.id;
  const response = await apiDocente.createDocente(objDocente.value);
  console.log("dfo0"+response)
  swal({
  position: 'top-end',
  icon: response.success==true ? 'success' : 'error',
  title: response.success==true ? '¡Se ha editado correctamente el docente!' 
  : '¡Ha ocurrido un error! Intentelo de nuevo',
  showConfirmButton: false,
  timer: 1500})
  router.push({path: "/vistaDocente",});
  Loading.hide()
}

const validarInputInfoGral = () => {
  if (objDocente.value.nombre == '' || objDocente.value.descripcion == '' || objDocente.value.infoAcademica == '') {
   Notify.create({ type: 'negative', message: 'Debe llenar todos los campos', position: 'top'})
  } else {
    tab.value='archivos'
  }}

const validarInputAdjuntos = () => {
  if (!!!selectedPrograma.value) {
   Notify.create({ type: 'negative', message: 'Debe seleccionar una carrera', position: 'top'})
  } else {
    tab.value='materias'
  }}

  const validarInputMaterias = () => {
  if (selectedMaterias.value==null) {
   Notify.create({ type: 'negative', message: 'Debe seleccionar al menos una materia', position: 'top'})
  } else {
    agregarDocente()
  }}
</script>