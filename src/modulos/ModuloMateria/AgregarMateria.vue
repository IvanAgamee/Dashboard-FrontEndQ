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
            <q-input rounded outlined dense v-model="objDocente.nombre" type="text" label="Nombre de la materia" class="q-mx-lg" />
            <div class="text-left q-mt-lg q-mx-lg">Seleccione el area al que pertenece la materia.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Esta area puede ser null</div>
            <q-input rounded outlined dense v-model="objDocente.nombre" type="text" label="Area de la materia" class="q-mx-lg" />
            <div class="text-right">
            <q-btn class="q-ma-lg q-px-md q-py-sm" dense color="primary" icon="check" label="Siguiente" @click="validarInputInfoGral()" />
            </div>
            </q-tab-panel>
          <!-- PANEL 2: ADJUNTOS -->
          <q-tab-panel name="archivos">
            <div class="text-h6 text-left q-ma-md">¡Bien hecho! Continue llenando la siguiente información:</div>
            <div class="text-left q-mt-lg q-mx-lg">Adémas le pedimos que proporcione un contacto de este docente.
            Le recordamos que este contacto será público (No es obligatorio)</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Puede agregar un número telefonico o un correo electronico.</div>
            <q-input rounded outlined dense v-model="objDocente.contacto" type="text" label="Contacto del docente" class="q-mx-lg" />
            <div class="text-left q-mt-lg q-mx-lg">Adémas le pedimos que proporcione un contacto de este docente.
            Le recordamos que este contacto será público (No es obligatorio)</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Puede agregar un número telefonico o un correo electronico.</div>
            <q-input rounded outlined dense v-model="objDocente.contacto" type="text" label="Contacto del docente" class="q-mx-lg" />
            <div style="height: 20px;">
              
            </div>
            <q-video
            loading="lazy"
            class="q-ma-lg"
            :ratio="16/9"
            style="height: 150px;weight:150px"
            
            :src="objDocente.contacto"
            frameborder="0"
            allowfullscreen
            />
            <div class="text-right">
            <q-btn class="q-mt-lg q-mx-lg" label="Volver" @click="tab='infoGeneral'" />
            <q-btn class="q-mt-lg" color="primary" icon="check" label="Siguiente" @click="validarInputAdjuntos()" />
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
import apiMateria from '../ModuloMateria/apiMateria.js'
import apiDocente from '../ModuloDocente/apiDocente.js'
import swal from 'sweetalert';
import { Loading, Notify, QSpinnerGears } from 'quasar'
import { useRouter } from 'vue-router';

const router = useRouter();
const tab = ref('archivos')
const optSelectCarrera = ref(UserStore().fillSelectCarreras)
const selectedCarrera = ref(null)
const rows = ref([])
const selectedMaterias = ref([])
const objDocente = ref({
  nombre: '',
  descripcion: '',
  informacionAcademica: '',
  materias: '',
  contacto: 'https://www.youtube.com/embed/xjYwd-XI56g',
  urlImagen: '',
  carreraId: '',
  status: 1,
});

const columns = [
  { name: 'nombre', align: 'left', label: 'Nombre', field: row => row.nombre},
  { name: 'area', align: 'left', label: 'Area', field: row => row.area},
  { name: 'especialidad', align: 'left', label: 'Especialidad', field: row => row.especialidad},]

const dataMaterias = async () => {
Loading.show({ spinner: QSpinnerGears, })
const idCarrera = {"carreraId": selectedCarrera.value.id}
const data = await apiMateria.getMateriasByCarreraId(idCarrera);
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
  objDocente.value.carreraId = selectedCarrera?.value?.id, 
  response = await apiDocente.createDocente(objDocente.value);
  console.log(response)
  swal("Good job!", "You clicked the button!", "success");
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
  if (!!!selectedCarrera.value) {
   Notify.create({ type: 'negative', message: 'Debe seleccionar una carrera', position: 'top'})
  } else {
    dataMaterias()
    tab.value='materias'
  }}

  const validarInputMaterias = () => {
  if (selectedMaterias.value==null) {
   Notify.create({ type: 'negative', message: 'Debe seleccionar al menos una materia', position: 'top'})
  } else {
    agregarDocente()
  }}
</script>