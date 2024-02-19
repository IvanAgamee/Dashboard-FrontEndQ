<template>
  <q-page padding>
    <q-card class="my-card text-center">
      <q-card class="q-pa-lg">
        <q-tabs v-model="tab" class="bg-accent text-black" align="justify" narrow-indicator>
          <q-tab name="infoGeneral" label="Información general" />
          <q-tab name="archivos" label="Adjuntos" />
        </q-tabs>
        <q-separator />

        <!-- PANEL 1: INFORMACION GENERAL -->
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="infoGeneral">
            <div class="text-h6 text-left q-ma-md">¡Bienvenido al módulo de creación de una materia!</div>
            <div class="text-left q-mt-lg q-mx-lg">A continuación llene cuidadosamente la información requerida para
              añadir correctamente una nueva materia.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">El nombre debe estar escrito en el
            siguiente formato: Fundamentos de programación</div>
            <q-input rounded outlined dense v-model="objMateria.nombre" type="text" label="Nombre de la materia"
            class="q-mx-lg" />

            <div class="text-left q-ma-md q-mt-lg">Seleccione el programa de estudio al que pertenece la materia.</div>
            <q-select rounded outlined dense option-label="nombre" :options="optSelectPrograma" v-model="selectedPrograma"
              type="text" label="Programas" class="q-mx-lg" />
            
              <div class="text-left q-ma-md q-mt-lg">Seleccione el area al que pertenece la materia.</div>
              <q-select rounded outlined dense option-label="area" :options="optSelectArea" v-model="selectedArea"
                type="text" label="Áreas" class="q-mx-lg" />

            <div class="text-left q-ma-md q-mt-lg">Seleccione la especialidad a la que pertenece la materia.</div>
            <q-select rounded outlined dense option-label="nombre" :options="optSelectEspecialidad" v-model="selectedEspecialidad"
              type="text" label="Especialidades" class="q-mx-lg" />
            
            <div class="text-left q-ma-md q-mt-lg">Escribe el número de semestre al que pertenece la materia.</div>
            <q-input rounded outlined dense v-model="objMateria.semestre" type="number" min="1" max="12"
              label="Semestre de la materia" class="q-mx-lg" />
            <div class="text-left q-mt-lg q-mx-lg">A continuación describe la competencia de la materia.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">El número maximo de palabras
            son: 250 palabras</div>
            <q-input v-model="objMateria.competencia" rows="8" rounded outlined type="textarea" class="q-mx-lg"
            color="red-12" label="Competencias de la materia" maxlength="250"/>

            <div class="text-right">
              <q-btn class="q-ma-lg q-px-md q-py-sm" dense color="primary" icon="check" label="Siguiente"
                @click="validarInputInfoGral()" />
            </div>
          </q-tab-panel>

          <!-- PANEL 2: ADJUNTOS -->
          <q-tab-panel name="archivos">
            <div class="text-h6 text-left q-ma-md">¡Ya casi terminamos! En esta sección se adjuntaran los archivos
              relacionados a la materia: </div>
            <div class="text-left q-mt-lg q-mx-lg">Ingrese el link del programa</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Si tienes algunda duda de como
              obtener esta url consulte el manual de usuario.</div>
            <q-input rounded outlined dense v-model="objMateria.urlPrograma" type="text" label="Url del programa"
              class="q-mx-lg" />
            <div class="text-left q-mt-lg q-mx-lg">Ingrese el link del video de la materia</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Si tienes algunda duda de como
              obtener este url consulte el manual de usuario. Si
              el video se ha ingresado correctamente, aparecera inmediatamente debajo de este formulario</div>
            <q-input rounded outlined dense v-model="objMateria.urlVideo" type="text" label="Url del video de la materia"
              class="q-mx-lg" />
            <div v-if="!!objMateria.urlVideo" style="flex max-width: 650px; justify-content: center;"
              class="q-pa-lg q-ma-lg">
              <q-video loading="lazy" class="q-ma-lg" :ratio="16 / 9" style="" :src="objMateria.urlVideo" frameborder="0"
                allowfullscreen />
            </div>

            <div class="text-right">
              <q-btn class="q-mt-lg q-mx-lg" label="Volver" @click="tab = 'infoGeneral'" />
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
import { Loading, Notify } from 'quasar'
import { useRouter } from 'vue-router';
import UserStore from 'src/stores/userStore';
import apiMateria from '../ModuloMateria/apiMateria.js'
import swal from 'sweetalert';

const router = useRouter();
const tab = ref('infoGeneral')

const optSelectPrograma = ref(UserStore().getProgramas)
const selectedPrograma = ref(null)

const optSelectArea = ref([])
const selectedArea = ref(null)

const optSelectEspecialidad = ref([])
const selectedEspecialidad = ref(null)

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

// Actualizar el programa del profesor
watch(selectedPrograma, async(newVal) => {
  objMateria.value.programaId = newVal.programaId;
  await getAreasById(newVal.programaId);
  await getEspecialidadesById(newVal.programaId);
});

// Agregar Materia
const agregarMateria = async () => {
  objMateria.value.especialidadId = selectedEspecialidad.value.especialidadId;
  objMateria.value.area = selectedArea.value.area;
  const response = await apiMateria.createMaterias(objMateria.value);
  swal({
    position: 'top-end',
    icon: response.success == true ? 'success' : 'error',
    title: response.success == true ? 'Materia registrada con éxito!'
      : '¡Ha ocurrido un error! Intentelo de nuevo',
    showConfirmButton: false,
    timer: 1500
  })
  router.push({ path: "/vistaMateria", });
  Loading.hide()
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

// VALIDACIONES
const validarInputInfoGral = () => {
  if (objMateria.value.nombre == "" || objMateria.value.area == "" || objMateria.value.semestre == "" ||
    objMateria.value.competencia == "" || !!!selectedPrograma.value || !!!selectedArea.value || !!!selectedEspecialidad.value) {
    Notify.create({ type: 'negative', message: 'Debe llenar todos los campos', position: 'top' })
  } else {
    tab.value = 'archivos'
  }
}

const validarInputAdjuntos = () => {
  validarInputInfoGral()
  if (!!!selectedPrograma.value) {
    Notify.create({ type: 'negative', message: 'Debe seleccionar una carrera', position: 'top' })
  } else {
    agregarMateria();
  }
};

</script>