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
            <div class="text-h6 text-left q-ma-md">¡Bienvenido al módulo de creación de un profesor de posgrado!</div>
            <div class="text-left q-mt-lg q-mx-lg">A continuación llena cuidadosamente la información requerida para añadir 
            correctamente un nuevo docente.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">El nombre debe estar escrito de la 
            siguiente manera: Iván Rodriguez Hernandez</div>
            <q-input rounded outlined dense v-model="objDocente.nombre" type="text" label="Nombre completo del docente" class="q-mx-lg" />
            <div class="text-left q-mt-lg q-mx-lg">Añade una pequeña descripción del docente.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">El número maximo de palabras son: 250 palabras</div>
            <q-input v-model="objDocente.descripcion" rows="3" rounded outlined type="textarea" class="q-mx-lg"
            color="red-12" label="Descripción"/>
            <div class="text-left q-mt-lg q-mx-lg">Ahora escribe un resumen de su informacion academica.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">El número maximo de palabras son: 250 palabras</div>
            <q-input v-model="objDocente.informacionAcademica" rows="15" rounded outlined type="textarea" class="q-mx-lg"
            color="red-12" label="Información academica"/>
            <div class="text-right">
            <q-btn class="q-ma-lg q-px-md q-py-sm" dense color="primary" icon="check" label="Siguiente" @click="validarInputInfoGral()" />
            </div>
            </q-tab-panel>
          <!-- PANEL 2: ADJUNTOS -->
          <q-tab-panel name="archivos">
            <div class="text-h6 text-left q-ma-md">¡Bien hecho! Continue llenando la siguiente información:</div>
            <q-img v-if="fileImageDocente != null" :src="fileImageDocente"
            no-native-menu
            height="200px"
            style="max-width: 220px">
            <div class="absolute-bottom text-subtitle1 text-center">
              Imagen del docente
            </div>
            </q-img>
            <div class="text-left q-mt-lg q-mx-lg">Seleccione la carrera a la que pertenece el docente que se va agregar</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Usted solo puede agregar docentes a las carreras
            a las que su usuario tiene permiso.</div>
            <q-select rounded outlined dense option-label="nombre" :options="optSelectPrograma" v-model="selectedPrograma" type="text" label="Programas" class="q-mx-lg" />
            <div class="text-left q-mt-lg q-mx-lg">Adémas le pedimos que proporcione un contacto de este docente.
            Le recordamos que este contacto será público (No es obligatorio)</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Puede agregar un número telefonico o un correo electronico.</div>
            <q-input rounded outlined dense v-model="objDocente.contacto" type="text" label="Contacto del docente" class="q-mx-lg" />
            <div class="text-left q-mt-lg q-mx-lg">Añade una foto del docente. Recuerda que esta foto será visualizada en la pagina oficial de la carrera, por ello
            es importante cuidar la calidad de la misma.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">La foto puede ser en formato png y jpg.</div>
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
            <div class="text-h6 text-left q-ma-md">¡Ya casi terminamos! Ahora selecciona cuidadosamente las materias que imparte este docente</div>
            <div class="text-left q-ma-lg">Debe marcar las casillas correspondientes a cada materia.</div>
            <q-input class="q-ma-lg" v-model="search" label="Busca una materia individualmente" dense outlined clearable> <template v-slot:prepend>
            <q-icon name="search" />
            </template> </q-input>
             <q-table bordered title="Materias" :rows="filteredRows" :columns="columns" row-key="nombre"
             class="q-ma-lg"  selection="multiple" v-model:selected="selectedMaterias"/>
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
import { ref, computed, onMounted, watch } from 'vue'
import authStore from '../../stores/userStore.js';
import apiMateria from '../ModuloMateria/apiMateria.js'
import apiDocente from '../ModuloDocente/apiDocente.js'
import swal from 'sweetalert';
import { Loading, Notify, QSpinnerGears } from 'quasar'
import { useRouter } from 'vue-router';

const router = useRouter();
const UserStore = authStore();
const tab = ref('infoGeneral')
const optSelectPrograma = ref(UserStore.getProgramas)
const selectedPrograma = ref(null)
const rows = ref([])
const search = ref('');
const inputFile = ref()
const fileImageDocente = ref(null);
const envRoute = ref("http://localhost:3010/imagenes/")
const selectedMaterias = ref([])
const objDocente = ref({
  nombre: '',
  descripcion: '',
  informacionAcademica: '',
  materias: '',
  contacto: '',
  urlImagen: '',
  programaId: '',
  status: 1,
});

 watch(inputFile, async(newVal, oldVal) => {
  if (typeof(inputFile.value) !== 'string') {
    console.log(selectedPrograma.value)
    if (!!selectedPrograma.value) {
        const id = selectedPrograma.value.programaId;  
        const response = await apiDocente.uploadImageDocente(inputFile.value,objDocente.value.nombre,id)

        fileImageDocente.value = createRouteImage(response.fileData.pathFile,response.fileData.nameFile);

        objDocente.value.urlImagen = !!response.fileData.nameFile ? response.fileData.nameFile : null
    } else {
        Notify.create({ type: 'negative', message: 'Seleccione primero una carrera', position: 'top'})
        inputFile.value = null
    }

  }
 });

const createRouteImage = (pathFile,nameFile) => {
  return envRoute.value + pathFile + "/" + nameFile;
}

const columns = [
  { name: 'nombre', align: 'left', label: 'Nombre', field: row => row.nombre},
  { name: 'area', align: 'left', label: 'Area', field: row => row.area},
  { name: 'especialidad', align: 'left', label: 'Especialidad', field: row => row.especialidad},]

const filteredRows = computed(() => {
  if (search.value) {
    const searchTerm = search.value.toLowerCase();
    return rows.value.filter(row => {
      return Object.values(row).some(value =>
        String(value).toLowerCase().includes(searchTerm)
      );
    });
  }
  return rows.value;
});

onMounted(async () => {
  Loading.show({ spinner: QSpinnerGears });
  const data = await apiMateria.getMaterias();
  data.data.map((el) => {
    var materia = {
      id: el.materiaId,
      nombre: el.nombre,
      area: el.area == null ? "Sin especialidad" : el.area,
      especialidad: el.especialidad == null ? "Sin especialidad" : el.especialidad.nombre,
    };
    rows.value.push(materia);
  });

  Loading.hide();
});

// Agregar registros a la tabla
const agregarDocente = async () => {
  Loading.show({ spinner: QSpinnerGears, })

  objDocente.value.programaId = selectedPrograma.value.programaId
  objDocente.value.materias = selectedMaterias?.value.map(materia => materia.nombre).join(', ');
  const response = await apiDocente.createDocente(objDocente.value);

  swal({
  position: 'top-end',
  icon: response.success==true ? 'success' : 'error',
  title: response.success==true ? '¡Se ha agregado correctamente el docente!' 
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
    // dataMaterias()
  }}

  const validarInputMaterias = () => {
  if (selectedMaterias.value==null) {
   Notify.create({ type: 'negative', message: 'Debe seleccionar al menos una materia', position: 'top'})
  } else {
    agregarDocente()
  }}
</script>

