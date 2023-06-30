<template>
  <q-page padding>
  <p class="text-h5 text-bold"> Bienvenido </p>
     <q-card class=" q-pt-sm q-pb-sm row"> 
      <!-- Cards del dashboard -->
      <q-card class="col-2  bg-indigo-10 text-bold text-center text-white q-ma-md q-pa-md">
      Numero de usuarios:
      <div class="text-h4 text-bold text-white">345</div> 
     </q-card>
     <q-card class="col-2 bg-blue-10 text-white text-bold text-center q-ma-md q-pa-md">
      Numero de usuarios:
      <div class="text-h4 text-bold text-white">345</div> 
     </q-card>
     <q-card class="col-2 bg-indigo-12 text-white text-bold text-center q-ma-md q-pa-md">
      Numero de usuarios:
      <div class="text-h4 text-bold text-white">345</div> 
     </q-card>
     <q-card class="col-2 bg-blue-12 text-white text-bold text-center q-ma-md q-pa-md">
      Numero de usuarios:
      <div class="text-h4 text-bold text-white">345</div> 
     </q-card>
    </q-card>

    <q-card class="row q-my-lg" style="z-index: 1">
    
        <div class="col-6">
            <Bar :style="myStyles" :data="chartData" class="q-ma-md" /> 
        </div>
        <div class="col-6">
             <!-- <Doughnut :style="myStyles" :data="chartDona" />  -->
        </div>
    </q-card>
</q-page>
</template>

<script setup>
import { Bar, Doughnut} from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';
const myStyles = {
  height: `30vh`,
  position: 'relative'
};
ChartJS.register(Title, Tooltip, Legend, BarElement, ArcElement, CategoryScale, LinearScale);




const chartData = {
  labels: ['Sistemas', 'Bioquimica', 'Industrial',
  'Gestión empresarial', 'Renovables', 'Electrica'],
  datasets: [
    {
      label: 'Profesores por carrera',
      backgroundColor: ['#b88a0b','#c69613','#F2C037', '#fbc01d','#ebc763'],
      data: [12, 20, 12,35,45,22]
    }
  ]
};
const chartDona = {
  labels: ['Sistemas', 'Bioquimica', 'Industrial',
  'Gestión empresarial', 'Renovables', 'Electrica'],
  datasets: [
    {
      label: 'Profesores por carrera',
      backgroundColor: ['#b88a0b','#c69613','#F2C037', '#fbc01d','#ebc763'],
      data: [12, 20, 12,35,45,22]
    }
  ]
};
</script>