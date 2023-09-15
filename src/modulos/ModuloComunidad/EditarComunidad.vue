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
            <q-input rounded outlined dense v-model="objComunidad.nombre" type="text" label="Nombre completo del docente"
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
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Usted solo puede agregar
              comunidades a las carreras
              a las que su usuario tiene permiso.
              <q-select rounded outlined dense option-label="nombre" :options="optSelectPrograma" v-model="selectedPrograma"
                type="text" label="Programas" class="q-mx-lg" />
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
            <div class="text-left q-mt-lg q-mx-lg">Cambiar Imagen del logo de la comunidad. Recuerda que esta foto será
              visualizada en
              la pagina oficial de la carrera, por ello
              es importante cuidar la calidad de la misma.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Recuerda que si editas la foto,
              se sobrescribira
              la foto actual y no será posible recuperarla. La foto puede ser en formato png o jpg.</div>
            <q-file dense class="q-mx-lg" outlined v-model="model"
              label="Da click aqui y seleccione un archivo de su computador">
              <template v-slot:append><q-icon name="attachment" color="orange" /></template>
            </q-file>

            <div class="text-left q-mt-lg q-mx-lg">Editar fotos de la comunidad. Recuerda las fotos será visualizada en
              la pagina oficial de la carrera, por ello
              es importante cuidar la calidad de las mismas.</div>
            <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">Recuerda que si editas las
              fotos,
              se sobrescribiran
              las fotos actuales y no será posible recuperarlas. La fotos puede ser en formato png o jpg.</div>
            <q-file dense class="q-mx-lg" outlined v-model="model"
              label="Da click aqui y seleccione un archivo de su computador">
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

const optSelectPrograma = ref(UserStore().fillSelectProgramas)
const selectedPrograma = ref();

const router = useRouter();
const tab = ref('infoGeneral')
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
  console.log(id)
  const data = await apiComunidad.getComunidadById(id.comunidadId);
  console.log(data)
  objComunidad.value.comunidadId = id.comunidadId;
  objComunidad.value.nombre = data.data.nombre;
  objComunidad.value.quienesSomos = data.data.quienesSomos;
  objComunidad.value.queHacemos = data.data.queHacemos;
  objComunidad.value.logo = data.data.logo;
  objComunidad.value.fotoComunidad = data.data.fotoComunidad;
  objComunidad.value.programaId = data.data.programaId;
  selectedPrograma.value = optSelectPrograma.value.find(programa => programa.id === objComunidad.value.programaId);
  Loading.hide()
  return data;
}
llenarDatosComunidad()



console.log(selectedPrograma.value);
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

/*
const columns = [
  { name: 'nombre', align: 'left', label: 'Nombre', field: row => row.nombre },
  { name: 'area', align: 'left', label: 'Area', field: row => row.area },
  { name: 'especialidad', align: 'left', label: 'Especialidad', field: row => row.especialidad },]
*/


watch(selectedPrograma, (newVal, oldVal) => {
  objComunidad.value.programaId = newVal.id;
});


const agregarComunidad = async () => {
  Loading.show({ spinner: QSpinnerGears, })
  const response = await apiComunidad.createComunidades(objComunidad.value);
  console.log(response)
  swal("Good job!", "You clicked the button!", "success");
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
