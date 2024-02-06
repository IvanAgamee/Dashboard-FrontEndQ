<template>
  <q-page padding>
    <q-card class="q-pt-lg q-pb-lg">
    <div class="row">
        <p class="text-h5 text-bold q-ma-lg"> Mi perfil: </p> 
        <q-space />
        <q-btn v-if="disable" color="primary" icon="settings" class="q-ma-lg" label="Editar" @click="habilitarEdicion" />
        <q-btn v-if="!disable" color="primary" icon="cancel" class="q-ma-lg" label="Cancelar" @click="loadData" />
        </div>
        <div class="text-center">
            <q-img
             class="rounded-image q-ma-sm q-mb-lg"
             src="../../assets/img/grupo.png"
             no-native-menu
             height="270px"
             style="max-width: 280px"
            >
            </q-img>
        <div class="row">
          <div class="col-6">
            <p class="text-subtitle2 text-left q-ml-lg"> Nombre completo: </p>
            <q-input class="q-mx-lg" dense rounded outlined v-model="dataMiPerfil.nombre" type="text" :disable="disable" />
            <!-- <p class="text-subtitle2 text-left q-ml-lg q-mt-lg" v-if="!disable"> Contraseña: </p>
            <q-input class="q-mx-lg" dense rounded outlined v-model="dataMiPerfil.password" v-if="!disable" type="password" :disable="disable" />        -->
          </div>
          <div class="col-6">
            <p class="text-subtitle2 text-left q-ml-lg"> Correo: </p>
            <q-input class="q-mx-lg" dense rounded outlined v-model="dataMiPerfil.username" type="text" :disable="disable" />
            <!-- <p class="text-subtitle2 text-left q-ml-lg q-mt-lg" v-if="!disable"> Repita su contraseña: </p>
            <q-input class="q-mx-lg" dense rounded outlined v-model="password2" type="password" v-if="!disable" :disable="disable" />   -->
            <div v-if="!disable" class="text-right q-ma-lg">
                <q-btn color="primary" icon="save" label="Guardar edición" @click="saveEdition()" />
            </div>     
          </div>
        </div>
        
    </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue"
import { Loading, Notify, QSpinnerGears } from 'quasar'
import apiMiPerfil from '../ModuloMiPerfil/apiMiPerfil.js'
import authStore from '../../stores/userStore.js';

const UserStore = authStore();
const disable = ref(true);
const password2 = ref();
const dataMiPerfil = ref({
    nombre: null,
    username: null,
    password: null
});

const loadData = async () => {
  disable.value = true
  const id = UserStore.getUserId;
  dataMiPerfil.value = await apiMiPerfil.getUserInfoById(id); 
  password2.value = dataMiPerfil.value.password
}
loadData()

const habilitarEdicion = async () => {
  disable.value = !disable.value
}

const saveEdition = async () => {
  if (password2.value == dataMiPerfil.value.password) {
  const data = {
  usuarioId: dataMiPerfil.value.usuarioId,
  nombre: dataMiPerfil.value.nombre,
  username: dataMiPerfil.value.username,
  password: dataMiPerfil.value.password
 }
 await apiMiPerfil.createUsuarios(data); 
 loadData()
 Notify.create({ type: 'positive', message: 'Se ha actualizado con exito el usuario', position: 'top' })  
  } else {
  Notify.create({ type: 'negative', message: 'Las contraseñas no coinciden', position: 'top' })  
  }
 
}
</script>

<style lang="scss" scoped>
.rounded-image {
  border-radius: 20%;
  overflow: hidden;
}
</style>