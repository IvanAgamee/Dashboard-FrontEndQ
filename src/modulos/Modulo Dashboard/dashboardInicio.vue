<template>
  <q-page padding>
  <p class="text-h5 text-bold"> ¡ Bienvenido {{ UserStore().getUser + " !"}}</p>
     <q-card class=" q-pt-sm q-pb-sm row"> 
      <!-- Cards del dashboard -->
      <q-card class="col-2  bg-indigo-10 text-bold text-center text-white q-ma-md q-pa-md">
      Numero de docentes:
      <div class="text-h4 text-bold text-white">{{getTotalDocentes}}</div> 
     </q-card>
     <q-card class="col-2 bg-blue-10 text-white text-bold text-center q-ma-md q-pa-md">
      Numero de carreras:
      <div class="text-h4 text-bold text-white">{{getTotalCarreras}}</div> 
     </q-card>
     <q-card class="col-2 bg-indigo-12 text-white text-bold text-center q-ma-md q-pa-md">
      Numero de Materias:
      <div class="text-h4 text-bold text-white">{{getTotalMaterias}}</div> 
     </q-card>
     <q-card class="col-2 bg-cyan-5 text-white text-bold text-center q-ma-md q-pa-md">
      Numero de Comunidades:
      <div class="text-h4 text-bold text-white">{{getTotalComunidades}}</div> 
     </q-card>
     <q-card class="col-2 bg-cyan-8 text-white text-bold text-center q-ma-md q-pa-md">
      Numero de Usuarios:
      <div class="text-h4 text-bold text-white">{{getTotalUsers}}</div> 
     </q-card>
    </q-card>

    <q-card class="row q-my-lg" style="z-index: 1">
    
        <div class="col-6 text-center item-center">
            <p class="text-subtitle1 text-bold text-left q-ma-lg"> CANTIDAD DE MATERIAS POR CARRERA </p>
            <Bar v-if="arrayCantidadMateriasxCarrera.length>10" :style="myStyles" :data="chartData" :options="optionsBar" class="q-ma-md" /> 
        </div>
        <div class="col-6 q-pa-lg">
        <p class="text-subtitle1 text-bold text-left q-mb-lg"> CANTIDAD DE DOCENTES POR CARRERA </p>
             <Doughnut v-if="arrayProfesoresxCarrera.length>10" :style="myStyles" :data="chartDona" :options="optionsDona" class="q-ma-md"  /> 
        </div>
    </q-card>
</q-page>
</template>

<script setup>
import { Bar, Doughnut} from 'vue-chartjs';
import { ref, onMounted } from "vue"
import UserStore from 'src/stores/userStore';
import apiDashboard from '../Modulo Dashboard/apiDashboard.js';
import apiMateria from '../ModuloMateria/apiMateria.js'
import apiCarrera from '../ModuloCarrera/apiCarrera.js'
import { Loading, Notify, QSpinnerGears } from 'quasar'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';
const myStyles = {
  height: `40vh`,
  position: 'relative'
};
ChartJS.register(Title, Tooltip, Legend, BarElement, ArcElement, CategoryScale, LinearScale);

const getTotalUsers = ref(0)
const getTotalDocentes = ref(0)
const getTotalMaterias = ref(0)
const getTotalCarreras = ref(0)
const getTotalComunidades = ref(0)

const chartData = ref()
const chartDona = ref()
const idsMaterias = ref([])
const arrayNombreCarreras = ref([])
const arrayCantidadMateriasxCarrera = ref([])
const arrayProfesoresxCarrera = ref([])

const getInfo = async () => {
  Loading.show({ spinner: QSpinnerGears, })
  const allMaterias = await apiCarrera.getCarreras()
  var totalMateriasxCarrera = 0
  // Llenado de nombres de materias
  allMaterias.data.map(async(el) => {
    arrayNombreCarreras.value.push(el.nombre)
    idsMaterias.value.push(el.carreraId)
  })
  // Llenado de las cards
  getTotalUsers.value = await apiDashboard.getTotalUsers()
  getTotalDocentes.value = await apiDashboard.getTotalDocentes()
  getTotalMaterias.value = await apiDashboard.getTotalMaterias()
  getTotalCarreras.value = await apiDashboard.getTotalCarreras()
  getTotalComunidades.value = await apiDashboard.getTotalComunidades()
  // Llenado de cantidad de materias por carrera
  arrayCantidadMateriasxCarrera.value[0] = await apiDashboard.getTotalMateriasById(1)
  arrayCantidadMateriasxCarrera.value[1] = await apiDashboard.getTotalMateriasById(2)
  arrayCantidadMateriasxCarrera.value[2] = await apiDashboard.getTotalMateriasById(3)
  arrayCantidadMateriasxCarrera.value[3] = await apiDashboard.getTotalMateriasById(4)
  arrayCantidadMateriasxCarrera.value[4] = await apiDashboard.getTotalMateriasById(5)
  arrayCantidadMateriasxCarrera.value[5] = await apiDashboard.getTotalMateriasById(6)
  arrayCantidadMateriasxCarrera.value[6] = await apiDashboard.getTotalMateriasById(7)
  arrayCantidadMateriasxCarrera.value[7] = await apiDashboard.getTotalMateriasById(8)
  arrayCantidadMateriasxCarrera.value[8] = await apiDashboard.getTotalMateriasById(9)
  arrayCantidadMateriasxCarrera.value[9] = await apiDashboard.getTotalMateriasById(10)
  arrayCantidadMateriasxCarrera.value[10] = await apiDashboard.getTotalMateriasById(11)
  // Llenado de cantidad de profesores por carrera
  arrayProfesoresxCarrera.value[0] = await apiDashboard.getTotalDocentesById(1)
  arrayProfesoresxCarrera.value[1] = await apiDashboard.getTotalDocentesById(2)
  arrayProfesoresxCarrera.value[2] = await apiDashboard.getTotalDocentesById(3)
  arrayProfesoresxCarrera.value[3] = await apiDashboard.getTotalDocentesById(4)
  arrayProfesoresxCarrera.value[4] = await apiDashboard.getTotalDocentesById(5)
  arrayProfesoresxCarrera.value[5] = await apiDashboard.getTotalDocentesById(6)
  arrayProfesoresxCarrera.value[6] = await apiDashboard.getTotalDocentesById(7)
  arrayProfesoresxCarrera.value[7] = await apiDashboard.getTotalDocentesById(8)
  arrayProfesoresxCarrera.value[8] = await apiDashboard.getTotalDocentesById(9)
  arrayProfesoresxCarrera.value[9] = await apiDashboard.getTotalDocentesById(10)
  arrayProfesoresxCarrera.value[10] = await apiDashboard.getTotalDocentesById(11)

  Loading.hide()
  }

getInfo()


chartData.value = {
  labels:  ['I.G.E.', 'L.ADM.', 'I.Q.', 'I.BQ', 'I.MEC.','I.MCT', 'I.IND', 'I.E.R.', 'I.E.', 'I.E.','I.S.C.'],
  datasets: [{
      label: "Cantidad de materias: ",
      backgroundColor: ['#EFE694','#0D47A1','#448AFF','#64B5F6','#D4E7EA','#9CE0EB','#599AA4']  ,
      // backgroundColor: ['#FFF491','#EFE694','#E8DE7E','#F1E570','#FFEB38','#EDC36B'] ,
      data: arrayCantidadMateriasxCarrera.value
    }]
  };  




chartDona.value = {
  labels: arrayNombreCarreras.value,
  datasets: [
    {
      label: "Cantidad de materias",
      backgroundColor: ['#EFE694','#0D47A1','#448AFF','#64B5F6','#D4E7EA','#9CE0EB','#599AA4']  ,
      //  backgroundColor: ['#1A237E','#0D47A1','#536DFE','#448AFF','#64B5F6','#D4E7EA','#9CE0EB','#599AA4']  ,
      data: arrayProfesoresxCarrera.value
    }]
};

const optionsBar = {
    responsive: true,
    plugins: {
      legend: false,
      outlabels: {
        text: '%l %p',
        color: 'white',
        stretch: 50,
        font: {
          resizable: true,
          minSize: 3,
          maxSize: 5
        }
      }
    }
  };

  const optionsDona = {
    responsive: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: 'black',
          font: {
            resizable: true,
            minSize: 2,
            maxSize: 3
          }
        }
      },
      outlabels: {
        text: '%l %p',
        color: 'white',
        stretch: 50,
        font: {
          resizable: true,
          minSize: 3,
          maxSize: 5
        }
      }
    }
  }

</script>