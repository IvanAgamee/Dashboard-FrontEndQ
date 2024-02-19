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
            <div class="text-h6 text-left q-ma-md">¡Bienvenido al módulo de edición de una materia!</div>
            <div class="text-left q-mt-lg q-mx-lg">A continuación llena cuidadosamente la información requerida para editar 
            correctamente una materia.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">El nombre debe estar escrito en el
            siguiente formato: Fundamentos de programación </div>
            <q-input rounded outlined dense v-model="objMateria.nombre" type="text" label="Nombre de la materia" class="q-mx-lg" />
            
            <div class="text-left q-ma-md q-mt-lg">Seleccione la carrera a la que pertenece la materia.</div>
            <q-select v-model="selectedCarrera" :options="optSelectCarrera" label="Semestre de la materia" option-label="nombre" rounded outlined dense class="q-mx-lg" />

            <div class="text-left q-ma-md q-mt-lg">Seleccione el area al que pertenece la materia.</div>
              <q-select rounded outlined dense option-label="area" :options="optSelectArea" v-model="selectedArea"
                type="text" label="Áreas" class="q-mx-lg" />

            <div class="text-left q-ma-md q-mt-lg">Seleccione la especialidad a la que pertenece la materia.</div>
            <q-select rounded outlined dense option-label="nombre" :options="optSelectEspecialidad" v-model="selectedEspecialidad"
              type="text" label="Especialidades" class="q-mx-lg" />

            <div class="text-left q-mt-lg q-mx-lg">Seleccione el area al que pertenece la materia.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">El área es opcional</div>
            <q-input rounded outlined dense v-model="objMateria.area" type="text" label="Area de la materia" class="q-mx-lg" />
            <div class="text-left q-ma-md q-mt-lg">Escribe el número de semestre al que pertenece la materia..</div>
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
            <div class="text-left q-mt-lg q-mx-lg">Ingresa el link del programa</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Si tienes algunda duda de como obtener este url consulte el manual de usuario.</div>
            <q-input rounded outlined dense v-model="objMateria.urlPrograma" type="text" label="Url del programa" class="q-mx-lg" />
            <div class="text-left q-mt-lg q-mx-lg">Ingrese el link del video de la materia</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Si tienes algunda duda de como obtener este url consulte el manual de usuario. Si
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
import { ref, watch } from 'vue'
import UserStore from 'src/stores/userStore';
import authStore from '../../stores/userStore.js';
import apiMateria from '../ModuloMateria/apiMateria.js'
import apiDocente from '../ModuloDocente/apiDocente.js'
import swal from 'sweetalert';
import { Loading, Notify, QSpinnerGears } from 'quasar'
import { useRouter } from 'vue-router';
const props = defineProps({
    id:{
        type:String,
        required:true
    }
  })

const router = useRouter();
const tab = ref('infoGeneral')

const optSelectCarrera = ref(UserStore().getProgramas)
const selectedCarrera = ref(null)

const optSelectArea = ref([])
const selectedArea = ref(null)

const optSelectEspecialidad = ref([])
const selectedEspecialidad = ref(null)

const objMateria = ref({
        "materiaId": null,
        "nombre": "",
        "area": null,
        "semestre": null,
        "competencia": "",
        "especialidad": null,
        "urlVideo": null,
        "urlPrograma": "",
        "programaId": null,
        "status": 1
    });

// Actualizar el programa del profesor
watch(selectedCarrera, async(newVal) => {
  objMateria.value.programaId = newVal.programaId;
  await getAreasById(newVal.programaId);
  await getEspecialidadesById(newVal.programaId);
});

// Aqui construye la asignacion de valores a edit materia
const loadDataMateriaById = async () => {
Loading.show({ spinner: QSpinnerGears, })

 const data = await apiMateria.getMateriaById(props.id);

 await getAreasById(data.programaId);
 await getEspecialidadesById(data.programaId);

 objMateria.value.materiaId= data.materiaId
 objMateria.value.nombre= data.nombre
 objMateria.value.area= data.area
 objMateria.value.semestre= data.semestre
 objMateria.value.competencia= data.competencia
 objMateria.value.especialidad= data.especialidad
 objMateria.value.urlVideo= data.urlVideo
 objMateria.value.urlPrograma= data.urlPrograma
 selectedCarrera.value = optSelectCarrera.value.find(programa => programa.programaId === data.programaId);
 selectedArea.value = optSelectArea.value.find(area => area.area === data.area);
 selectedEspecialidad.value = optSelectEspecialidad.value.find(especialidad => especialidad.especialidadId === data.especialidadId);
 
 Loading.hide()
 return data;
} 
loadDataMateriaById()    

//Agregar registro
const agregarMateria = async () => {
  if (objMateria.value.nombre == "" || objMateria.value.area == "" || objMateria.value.semestre == "" ||
  objMateria.value.competencia == "" || objMateria.value.urlVideo == "" || objMateria.value.urlPrograma == ""
  || !!!selectedCarrera.value) {
  Notify.create({ type: 'negative', message: 'Debe llenar todos los campos', position: 'top'}) }

  else {
    objMateria.value.especialidadId = selectedEspecialidad.value.especialidadId;
    objMateria.value.area = selectedArea.value.area;
    objMateria.value.programaId = selectedCarrera.value.programaId
    try {
      Loading.show({ spinner: QSpinnerGears, })
      await apiMateria.createMaterias(objMateria.value);
      Notify.create('Se ha realizado correctamente')
      router.push({path: "/vistaMateria",});
    } catch (e) {
      console.log(e)
    }
  }
}

const getAreasById = async (id) => {
  const data = await apiMateria.getAreasById(id);
  optSelectArea.value = data;
}

const getEspecialidadesById = async (id) => {
  const data = await apiMateria.getEspecialidadesById(id);
  let especialidad = {
    "especialidadId": null,
    "nombre": "Sin especialidad",
  }
  optSelectEspecialidad.value = data;
  optSelectEspecialidad.value.unshift(especialidad);
}

const validarInputInfoGral = () => {
  if (objMateria.value.nombre == '' || objMateria.value.area == '' || 
  objMateria.value.semestre == '' || objMateria.value.competencia == '' || !!!selectedCarrera.value
  || !!!selectedArea.value || !!!selectedEspecialidad.value) {
   Notify.create({ type: 'negative', message: 'Debe llenar todos los campos', position: 'top'})
  } else {
    tab.value='archivos'
  }}

const validarInputAdjuntos = () => {
  if (objMateria.value.urlVideo == '' || objMateria.value.urlPrograma == '') {
   Notify.create({ type: 'negative', message: 'Debe llenar todos los campos', position: 'top'})
  } else {
    agregarMateria()
  }}

</script>