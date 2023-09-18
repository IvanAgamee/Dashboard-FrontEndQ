<template>
    <q-page padding>
    <q-card class="my-card text-center">
      <q-card class="q-pa-lg">
        <q-tabs v-model="tab" class="bg-accent text-black" align="justify" narrow-indicator >
          <q-tab name="infoGeneral" label="Informacion general" />
          <q-tab name="archivos" label="Adjuntos" />
        </q-tabs>
        <q-separator />
      <!-- PANEL 1: INFORMACION GENERAL -->
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="infoGeneral">
            <div class="text-h6 text-left q-ma-md">¡Bienvenido al módulo de creación de una materia!</div>
            <div class="text-left q-mt-lg q-mx-lg">A continuación llena cuidadosamente la información requerida para añadir 
            correctamente una nueva materia.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">El nombre debe estar escrito de la 
            siguiente manera: Fundamentos de programación</div>
            <q-input rounded outlined dense v-model="objMateria.nombre" type="text" label="Nombre de la materia" class="q-mx-lg" />
            
            <div class="text-left q-ma-md q-mt-lg">Seleccione el semestre al que pertenece la materia.</div>
            <q-select v-model="selectedPrograma" :options="optSelectCarrera" label="Semestre de la materia" option-label="nombre" rounded outlined dense class="q-mx-lg" />

            <div class="text-left q-mt-lg q-mx-lg">Seleccione el area al que pertenece la materia.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Esta area puede ser null</div>
            <q-input rounded outlined dense v-model="objMateria.area" type="text" label="Area de la materia" class="q-mx-lg" />
            <div class="text-left q-ma-md q-mt-lg">Seleccione el semestre al que pertenece la materia.</div>
            <q-input rounded outlined dense v-model="objMateria.semestre" type="number" min="1" max="12" label="Semestre de la materia" class="q-mx-lg" />
            <div class="text-left q-mt-lg q-mx-lg">A continuación escribe la competencia de la materia.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">El número maximo de palabras son: 250 palabras</div>
            <q-input v-model="objMateria.competencia" rows="10" rounded outlined type="textarea" class="q-mx-lg"
            color="red-12" label="Competencias de la materia"/>
            
            <div class="text-right">
            <q-btn class="q-ma-lg q-px-md q-py-sm" dense color="primary" icon="check" label="Siguiente" @click="validarInputInfoGral()" />
            </div>
            </q-tab-panel>
          <!-- PANEL 2: ADJUNTOS -->
          <q-tab-panel name="archivos">
            <div class="text-h6 text-left q-ma-md">¡Ya casi terminamos! En esta sección se adjuntaran los archivos relacionados a la materia :</div>
            <div class="text-left q-mt-lg q-mx-lg">Ingresa el link del Url del programa</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Si tienes algunda duda de como obtener este Url da click aqui.</div>
            <q-input rounded outlined dense v-model="objMateria.urlPrograma" type="text" label="Url del programa" class="q-mx-lg" />
            <div class="text-left q-mt-lg q-mx-lg">Ingrese el link del Url del video de la materia</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Si tienes algunda duda de como obtener este Url da click aqui. Si
            el video se ha ingresado correctamente, aparecera inmediatamente debajo de este formulario</div>
            <q-input rounded outlined dense v-model="objMateria.urlVideo" type="text" label="Url del video de la materia" class="q-mx-lg" />
            <div v-if="!!objMateria.urlVideo" style="flex max-width: 650px; justify-content: center;" class="q-pa-lg q-ma-lg">
            <q-video
              loading="lazy"
              class="q-ma-lg"
              :ratio="16/9"
              style=""
              :src="objMateria.urlVideo"
              frameborder="0"
              allowfullscreen/>
            </div>
            <div class="text-right">
            <q-btn class="q-mt-lg q-mx-lg" label="Volver" @click="tab='infoGeneral'" />
            <q-btn class="q-mt-lg" color="primary" icon="check" label="Guardar" @click="validarInputAdjuntos()" />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
  </q-card>
</q-page>
</template>

<script setup>
import { ref } from 'vue'
import UserStore from 'src/stores/userStore';
import authStore from '../../stores/userStore.js';
import apiMateria from '../ModuloMateria/apiMateria.js'
import apiDocente from '../ModuloDocente/apiDocente.js'
import swal from 'sweetalert';
import { Loading, Notify, QSpinnerGears } from 'quasar'
import { useRouter } from 'vue-router';

const router = useRouter();
const tab = ref('infoGeneral')
const optSelectPrograma = ref(UserStore().fillSelectProgramas)
const optSemestres = ref({})

const selectedPrograma = ref(null)
const rows = ref([])
const selectedMaterias = ref([])
const objMateria = ref({
        "nombre": "",
        "area": null,
        "semestre": null,
        "competencia": "",
        "especialidadId": null,
        "urlVideo": null,
        "urlPrograma": "",
        "programaId": null,
        "status": 1
    });

//Agregar registro
const agregarMateria = async () => {
  if (objMateria.value.nombre == "" || objMateria.value.area == "" || objMateria.value.semestre == "" ||
  objMateria.value.competencia == "" || objMateria.value.urlVideo == "" || objMateria.value.urlPrograma == ""
  || !!!selectedPrograma.value) {
  Notify.create({ type: 'negative', message: 'Debe llenar todos los campos', position: 'top'}) }

const dataMaterias = async () => {
Loading.show({ spinner: QSpinnerGears, })
const idPrograma = {"programaId": selectedPrograma.value.id}
const data = await apiMateria.getMateriasByProgramaId(idPrograma);
  data.data.map((el) => {
    var materia = {
      id: el.materiaId,
      nombre: el.nombre,
      area: el.area == null ? "Sin especialidad" : el.area,
      especialidad: el.especialidad == null ? "Sin especialidad" : el.especialidad.nombre,
    };
    rows.value.push(materia);
  });
  Loading.hide()
  return data;
} 

// Agregar registros a la tabla
const agregarDocente = async () => {
  Loading.show({ spinner: QSpinnerGears, })
  objDocente.value.materias = selectedMaterias?.value.map(materia => materia.id),
  objDocente.value.programaId = selectedPrograma?.value?.id, 
  response = await apiDocente.createDocente(objDocente.value);
  console.log(response)
  swal("Good job!", "You clicked the button!", "success");
  router.push({path: "/vistaDocente",});
  Loading.hide()
}

const validarInputInfoGral = () => {
  if (objMateria.value.nombre == '' || objMateria.value.area == '' || 
  objMateria.value.semestre == '' || objMateria.value.competencia == '' || !!!selectedPrograma.value) {
   Notify.create({ type: 'negative', message: 'Debe llenar todos los campos', position: 'top'})
  } else {
    tab.value='archivos'
  }}

const validarInputAdjuntos = () => {
  if (!!!selectedPrograma.value) {
   Notify.create({ type: 'negative', message: 'Debe seleccionar una carrera', position: 'top'})
  } else {
    agregarMateria();
  }}
  
</script>