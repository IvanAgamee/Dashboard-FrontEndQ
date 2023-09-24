<template>
  <q-page padding>
    <q-card class="my-card text-center">
      <q-card class="q-pa-lg">
        <q-tabs v-model="tab" class="bg-accent text-black" align="justify" narrow-indicator>
          <q-tab name="infoGeneral" label="Informacion general"/>
          <q-tab name="contenido" label="contenido"/>
        </q-tabs>
        <q-separator/>
        <!-- PANEL 1: INFORMACION GENERAL -->
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="infoGeneral">
            <div class="text-h6 text-center q-ma-md">¡Bienvenido al módulo de edición de Seccion!</div>
            <div class="text-left q-mt-lg q-mx-lg">A continuación se muestran los datos de la seccion. En caso de no
              querer editar algun dato, no borrarlo:
            </div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Puedes editar el nombre de la
              seccion. Recuerda que una vez
              guardado será visible en el sitio web
            </div>
            <q-input rounded outlined dense v-model="objSeccion.titulo" type="text" label="Nombre completo del docente"
                     class="q-mx-lg"/>
            <div class="text-left q-mt-lg q-mx-lg">Edición de la descripción del docente.</div>
              <q-input rounded outline dense v-model="objSeccion.descripcion" type="text"
              label="Descripción de la seccion"></q-input>
            <div class="text-right">
              <q-btn class="q-ma-lg q-px-md q-py-sm" dense color="primary" icon="check" label="Siguiente"
                     @click="validarInputInfoGral()"/>
            </div>
          </q-tab-panel>
          <!-- PANEL 2: contenido -->
          <q-tab-panel name="contenido">
            <div class="text-h6 text-left q-ma-md">Bien hecho! Continue editando la siguiente información: edición del conteido de la seccion {{objSeccion.titulo}}
            </div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">
              Recuerde, que solo puede editar el contenido de las secciones que tenga acceso solamente
            </div>
            <div class="h6-text text-center">
              {{objSeccion.titulo}}
            </div>
            <div style="
            display: grid;
             grid-template-columns: repeat(3, auto);
             gap: 15px;
            align-content: space-between;
            align-items: stretch;">
              <div v-for="(objeto, index) in objSeccion.objeto" :key="index">
                <q-card style="margin-bottom: 15px;">
                  <q-card-section class="bg-primary text-white">
                    <div>{{ objeto.descripcion }}</div>
                  </q-card-section>
                  <q-separator></q-separator>
                  <q-card-actions align="right">
                    <q-btn flat>
                      <q-icon class="fa-solid fa-file-pen" style="color: #eb9705;"></q-icon>
                    </q-btn>
                    <q-btn flat>
                      <q-icon class="fa-sharp fa-solid fa-trash" style="color: #cc0000;"></q-icon>
                    </q-btn>
                  </q-card-actions>
                </q-card>
              </div>
            </div>

            <div class="text-right">
              <q-btn class="q-mt-lg q-mx-lg" label="Volver" @click="tab='infoGeneral'"/>
              <q-btn class="q-mt-lg" color="primary" icon="check" label="Siguiente" @click="validarInputcontenido()"/>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-card>
  </q-page>
</template>

<script setup>
import {ref, watch} from 'vue'
import authStore from '../../stores/userStore.js';
import apiDocente from '../ModuloDocente/apiDocente.js'
import apiSeccion from '../ModuloSecciones/apiSecciones';
import swal from 'sweetalert';
import {Loading, Notify, QSpinnerGears} from 'quasar'
import {useRouter} from 'vue-router';

const router = useRouter();
const UserStore = authStore();
const tab = ref('infoGeneral')
const optSelectPrograma = ref(UserStore.getProgramas)
const selectedPrograma = ref(null)
const rows = ref([])
const selectedMaterias = ref([])
const objSeccion = ref({
  seccionId: 0,
  moduloId: 0,
  programaId: 0,
  titulo: '',
  descripcion: '',
  status: 1,
  objeto: []
});

const columns = [
  {name: 'nombre', align: 'left', label: 'Nombre', field: row => row.nombre},
  {name: 'area', align: 'left', label: 'Area', field: row => row.area},
  {name: 'especialidad', align: 'left', label: 'Especialidad', field: row => row.especialidad},]

const dewataMaterias = async () => {
  Loading.show({spinner: QSpinnerGears,});
  var id = {
    seccionId: props.id
  }
  console.log(props.id);

  const data = await apiSeccion.getSeccionById(id.seccionId);

  selectedPrograma.value = optSelectPrograma.value.find(programa => programa.programaId === data.data.programaId);
  objSeccion.value.seccionId = data.data.seccionId;
  objSeccion.value.moduloId = data.data.moduloId;
  objSeccion.value.programaId = data.data.programaId;
  objSeccion.value.titulo = data.data.titulo;
  objSeccion.value.descripcion = data.data.descripcion;
  objSeccion.value.objeto = data.data.objeto;
  Loading.hide()
  return data;
}
dewataMaterias()
const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})
// Agregar registros a la tabla
const agregarDocente = async () => {
  Loading.show({spinner: QSpinnerGears,})
  objSeccion.value.programaId = selectedPrograma?.value?.id;
  const response = await apiDocente.createDocente(objSeccion.value);
  console.log("dfo0" + response)
  swal({
    position: 'top-end',
    icon: response.success == true ? 'success' : 'error',
    title: response.success == true ? '¡Se ha editado correctamente el docente!'
      : '¡Ha ocurrido un error! Intentelo de nuevo',
    showConfirmButton: false,
    timer: 1500
  })
  router.push({path: "/vistaDocente",});
  Loading.hide()
}

const validarInputInfoGral = () => {
  if (objSeccion.value.nombre == '' || objSeccion.value.descripcion == '' || objSeccion.value.infoAcademica == '') {
    Notify.create({type: 'negative', message: 'Debe llenar todos los campos', position: 'top'})
  } else {
    tab.value = 'contenido'
  }
}

const validarInputcontenido = () => {
  if (!!!selectedPrograma.value) {
    Notify.create({type: 'negative', message: 'Debe seleccionar una carrera', position: 'top'})
  } else {
    tab.value = 'materias'
  }
}

const validarInputMaterias = () => {
  if (selectedMaterias.value == null) {
    Notify.create({type: 'negative', message: 'Debe seleccionar al menos una materia', position: 'top'})
  } else {
    agregarDocente()
  }
}
</script>
