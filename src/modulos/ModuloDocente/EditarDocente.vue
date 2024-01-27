<template>
    <q-page padding>
    <q-card class="my-card text-center">
      <q-card class="q-pa-lg">
        <q-tabs v-model="tab" class="bg-accent text-black" align="justify" narrow-indicator >
          <q-tab name="infoGeneral" label="Informacion general" />
          <q-tab name="archivos" label="Adjuntos" />
          <q-tab v-if="isPostgred" name="infoPostgrados" label="Datos posgrado" />
          <q-tab name="materias" label="Materias" />
        </q-tabs>
        <q-separator />

      <!-- PANEL 1: INFORMACION GENERAL -->
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="infoGeneral">
            <div class="text-h6 text-left q-ma-md">¡Bienvenido al módulo de edición de un docente!</div>
            <div class="text-left q-mt-lg q-mx-lg">A continuación llene cuidadosamente la información requerida para editar 
            correctamente al docente.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">El nombre debe estar escrito en el siguiente 
            fomato: Rafael Rivera Lopez</div>
            <q-input rounded outlined dense v-model="objDocente.nombre" type="text" label="Nombre completo del docente" class="q-mx-lg" />
            <div class="text-left q-mt-lg q-mx-lg">Edite la descripción del docente.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">El número máximo son 150 caracteres. Puede añadir alguna
            frase motivacional o lo mas destacado de esa persona</div>
            <q-input v-model="objDocente.descripcion" rows="3" rounded outlined type="textarea" class="q-mx-lg"
            color="red-12" label="Descripción"  maxlength="150"/>
            <div class="text-left q-mt-lg q-mx-lg">Ahora edite un resumen de su información academica.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">El número máximo son 250 caracteres</div>
            <q-input v-model="objDocente.informacionAcademica" rows="15" rounded outlined type="textarea" class="q-mx-lg"
            color="red-12" label="Información academica" maxlength="250"/>
            <div class="text-right">
            <q-btn class="q-ma-lg q-px-md q-py-sm" dense color="primary" icon="check" label="Siguiente" @click="validarInputInfoGral()" />
            </div>
            </q-tab-panel>

          <q-tab-panel v-if="isPostgred" name="infoPostgrados">
            <div class="text-h6 text-left q-ma-md">Estas editando un docente de posgrado.Es importante la siguiente información</div>

            <div class="text-left q-mt-lg q-mx-lg">A continuación edite el perfil deseable del docente.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Describe el perfil de este docente</div>
            <q-input rounded outlined dense v-model="objDocente.perfilDeseable" type="text" label="Perfil deseable" class="q-mx-lg" />

            <div class="text-left q-mt-lg q-mx-lg">Nivel del SNI</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Edite el nivel del Sistema Nacional de Investigadores según la 
            clasificación de CONACYT</div>
            <q-input rounded outlined dense v-model="objDocente.sni" type="text" label="Nivel  SNI" class="q-mx-lg" />

            <div class="text-left q-mt-lg q-mx-lg">ORCID.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Sistema de identificación y perfil de autores científicos</div>
            <q-input rounded outlined dense v-model="objDocente.orcid" type="text" label="ORCID" class="q-mx-lg" />

            <div class="text-left q-mt-lg q-mx-lg">Áreas de interés.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Describe las áreas de mayor desempeño</div>
            <q-input v-model="objDocente.areasInteres" rows="5" rounded outlined type="textarea" class="q-mx-lg"
            color="red-12" label="Áreas de interés" maxlength="150"/>

            <div class="text-left q-mt-lg q-mx-lg">Resumen CONACYT.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Edite un resumen deL Consejo Nacional de Ciencia y Tecnología</div>
            <q-input v-model="objDocente.resumenCONAHCYT" rows="5" rounded outlined type="textarea" class="q-mx-lg"
            color="red-12" label="Resumen" maxlength="150"/>

            <div class="text-left q-mt-lg q-mx-lg">Google academico.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Edite algún url de referencia</div>
            <q-input rounded outlined dense v-model="objDocente.googleAcademico" type="text" label="Google academico" class="q-mx-lg" />

            <div class="text-left q-mt-lg q-mx-lg">Research gate.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Edite algún url de referencia</div>
            <q-input rounded outlined dense v-model="objDocente.researchGate" type="text" label="Research gate" class="q-mx-lg" />

            <div class="text-left q-mt-lg q-mx-lg">SCOPUS.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Edite algún url de referencia</div>
            <q-input rounded outlined dense v-model="objDocente.SCOPUS" type="text" label="Scopus" class="q-mx-lg" />
            
            <div class="text-right">
            <q-btn class="q-ma-lg q-px-md q-py-sm" dense color="primary" icon="check" label="Siguiente" @click="validarInputInfoPosgrado()" />
            </div>
            </q-tab-panel>


          <!-- PANEL 2: ADJUNTOS -->
          <q-tab-panel name="archivos">
            <div class="text-h6 text-left q-ma-md">¡Bien hecho! Continue adjuntando los siguientes archivos:</div>
            <q-img v-if="fileImageDocente != null" :src="fileImageDocente"
            no-native-menu
            height="200px"
            style="max-width: 220px">
            <div class="absolute-bottom text-subtitle1 text-center">
              Imagen del docente
            </div>
            </q-img>
            <div class="text-left q-mt-lg q-mx-lg">El docente actualmente pertenece a la siguiente carrera: </div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Usted solo puede gestionar docentes de las carreras
            a las que su usuario tiene permiso.</div>
            <q-select disable rounded outlined dense option-label="nombre" :options="optSelectPrograma" v-model="selectedPrograma" type="text" label="Programa" class="q-mx-lg" />
            <div class="text-left q-mt-lg q-mx-lg">Adémas le pedimos que proporcione un contacto de este docente.
            Le recordamos que este contacto será público (No es obligatorio)</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Puede agregar un número telefonico o un correo electronico.</div>
            <q-input rounded outlined dense v-model="objDocente.contacto" type="text" label="Contacto del docente" class="q-mx-lg" />
            <div class="text-left q-mt-lg q-mx-lg">Añade una foto del docente. Recuerda que esta foto será visualizada en la pagina oficial de la carrera, por ello
            es importante cuidar la calidad de la misma.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">La imagen puede ser en formato png o jpg.</div>
            <q-file  accept=".jpg, image/*" use-chips dense class="q-mx-lg" outlined v-model="inputFile" label="Seleccione un archivo de su computador">
            <template v-slot:append><q-icon name="attachment" color="orange" /></template>
            </q-file>
            <div class="text-right">
            <q-btn class="q-mt-lg q-mx-lg" label="Volver" @click="tab='infoGeneral'" />
            <q-btn class="q-mt-lg" color="primary" icon="check" label="Siguiente" @click="validarInputAdjuntos()" />
            </div>
          </q-tab-panel>
          
          <!-- PANEL 3: MATERIAS -->
          <q-tab-panel name="materias">
            <div class="text-h6 text-left q-ma-md">¡Ya casi terminamos! Ahora edite cuidadosamente las materias que imparte este docente en caso de ser necesario</div>
            <div class="text-left q-ma-lg">Debe escribir las materias que imparte actualmente.</div>
            <q-input v-model="objDocente.materias" rows="15" rounded outlined type="textarea" class="q-mx-lg"
            color="red-12" label="Materias"/>
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
import { useRouter } from 'vue-router';
import { Loading, Notify, QSpinnerGears } from 'quasar'
import authStore from '../../stores/userStore.js';
import apiDocente from '../ModuloDocente/apiDocente.js'
import swal from 'sweetalert';

const router = useRouter();
const UserStore = authStore();
const tab = ref('infoGeneral')
const isPostgred = ref(true)
const optSelectPrograma = ref(UserStore.getProgramas)
const selectedPrograma = ref(null)
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
  perfilDeseable: '',
  sni: '',
  orcid: '',
  areasInteres: '',
  resumenCONAHCYT: '',
  googleAcademico: '',
  researchGate: '',
  SCOPUS: '',
});

// Obtiene los datos del docente que va editar
const getDatosDocenteById = async () => {
  Loading.show({ spinner: QSpinnerGears, })
  var id = {
      docenteId: props.id
  }

  const data = await apiDocente.getDocenteById(id);
  selectedPrograma.value = optSelectPrograma.value.find(programa => programa.programaId === data.data.programaId);
  objDocente.value = data.data
  inputFile.value = data.data.urlImagen; 
  fileImageDocente.value = createRouteImage(data.data.pathFile,data.data.urlImagen);
  Loading.hide()
  return data;
} 
getDatosDocenteById()

// Crea la ruta de la imagen que consumira el componente img
const createRouteImage = (pathFile,nameFile) => {
  return envRoute.value + pathFile + "/" + nameFile;
}

// Observa cuando se sube una foto de docente
 watch(inputFile, async() => {
  if (typeof(inputFile.value) !== 'string') {
    
  const id = selectedPrograma.value.programaId;  
  const response = await apiDocente.uploadImageDocente(inputFile.value,objDocente.value.nombre,id)

  fileImageDocente.value = createRouteImage(response.fileData.pathFile,response.fileData.nameFile);

  objDocente.value.urlImagen = !!response.fileData.nameFile ? response.fileData.nameFile : null
  }
 });

 // Determina si mostrar la tab extra solo para programas de posgrado
 watch(selectedPrograma, async(newVal) => {
 isPostgred.value = newVal.isPosgrado == 1 ? true : false 
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

// VALIDACIONES
  const validarInputInfoGral = () => {
  if (objDocente.value.nombre == '' || objDocente.value.descripcion == '' || objDocente.value.infoAcademica == '') {
   Notify.create({ type: 'negative', message: 'Debe llenar todos los campos', position: 'top'})
  } else {
    tab.value= 'archivos'
  }}

  const validarInputInfoPosgrado = () => {
  if (objDocente.value.perfilDeseable == '' || objDocente.value.sni == '' || objDocente.value.orcid == '' || objDocente.value.areasInteres == ''
  || objDocente.value.resumenCONAHCYT == '' || objDocente.value.googleAcademico == '' || objDocente.value.researchGate == '' || objDocente.value.SCOPUS == '' ) {
   Notify.create({ type: 'negative', message: 'Todos los campos son obligatorios', position: 'top'})
  } else {
    tab.value='materias'
    // dataMaterias()
  }}

  const validarInputAdjuntos = () => {
  if (!!!selectedPrograma.value) {
   Notify.create({ type: 'negative', message: 'Debe seleccionar una carrera', position: 'top'})
  } else {
    tab.value= isPostgred.value ? 'infoPostgrados' : 'materias'
    // dataMaterias()
  }}

  const validarInputMaterias = () => {
  if (selectedMaterias.value==null) {
   Notify.create({ type: 'negative', message: 'Debe seleccionar al menos una materia', position: 'top'})
  } else {
    agregarDocente()
  }}
</script>