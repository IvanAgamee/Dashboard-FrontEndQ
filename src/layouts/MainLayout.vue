<template>
  <q-layout view="lHh Lpr lff">
    <!-- Cabecera -->
    <q-header elevated class="cabecera primary">
      <q-toolbar>
        <q-toolbar-title padding>Inicio</q-toolbar-title>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="400">
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding>

          <!-- Elementos del Menú -->
          <q-item clickable v-ripple @click="navegar('/dashboardInicio')"
            :class="{ 'my-menu-link': selectedOption === '/dashboardInicio' }">
            <q-item-section avatar> <q-icon name="home" /> </q-item-section>
            <q-item-section> Inicio </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="navegar('/vistaDocente')"
            :class="{ 'my-menu-link': selectedOption === '/vistaDocente' }">
            <q-item-section avatar> <q-icon name="fa-solid fa-chalkboard-user" size="20px" /> </q-item-section>
            <q-item-section> Docentes </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="navegar('/vistaMateria')"
            :class="{ 'my-menu-link': selectedOption === '/vistaMateria' }">
            <q-item-section avatar> <q-icon name="fa-solid fa-book" size="20px" /> </q-item-section>
            <q-item-section> Materias </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="navegar('/vistaCarrera')"
            :class="{ 'my-menu-link': selectedOption === '/vistaCarrera' }">
            <q-item-section avatar> <q-icon name="fa-solid fa-university" size="20px" /> </q-item-section>
            <q-item-section> Carreras </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="navegar('/vistaComunidad')"
            :class="{ 'my-menu-link': selectedOption === '/vistaComunidad' }">
            <q-item-section avatar> <q-icon name="fa-solid fa-people-group" size="20px" /> </q-item-section>
            <q-item-section> Comunidades </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="navegar('/vistaUsuario')"
            :class="{ 'my-menu-link': selectedOption === '/vistaUsuario' }">
            <q-item-section avatar> <q-icon name="fa-solid fa-user" size="20px" /> </q-item-section>
            <q-item-section> Usuarios </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="showLogout" active-class="my-menu-link">
            <q-item-section avatar> <q-icon name="fa-solid fa-right-from-bracket" size=" 20px" /> </q-item-section>
            <q-item-section>Cerrar Sesion</q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>
      <!-- Información del usuario -->
      <q-img class="absolute-top" src="../assets/img/portada-perfil5.png" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="../assets/img/ericmontalvo.png" @click="navegar('/miPerfil')">
          </q-avatar>
          <div class="text-weight-bold" @click="navegar('/miPerfil')">{{ UserStore().getUser }}</div>
          <div @click="navegar('/miPerfil')">@{{ UserStore().getUsername }} 
          <q-btn class="q-ml-lg" color="primary" size="8px" icon="settings" @click="navegar('/miPerfil')"/></div>
          
        </div>
      </q-img>
    </q-drawer>

    <!-- Rutas de navegación -->
    <q-page-container style="background:#EEEEEE">
      <router-view></router-view>
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UserStore from 'src/stores/userStore';
import EssentialLinkProps from 'components/EssentialLink.vue';
import { useQuasar } from 'quasar';
import { useCounterStore } from 'src/stores/example-store';
import { useUserStore } from 'src/stores';
import { useRouter } from 'vue-router';
const $q = useQuasar();
const leftDrawerOpen = ref(false)
const router = useRouter();
const drawer = ref(false);
const selectedOption = ref()
const toggleLeftDrawer = () => leftDrawerOpen.value = !leftDrawerOpen.value;

const carrerasOptions = UserStore().fillSelectCarreras;
const showLogout = () => {
  $q.dialog(
    {
      title: 'Cierre de Sesion',
      message: '¿Estas seguro de cerrar sesion?',
      cancel: true,
      color: 'red'
    }).onOk(() => {
      UserStore().clear();
      router.push({
        path: '/login/index',
      });
    })
}

const navegar = (ruta) => {
  selectedOption.value = ruta
  router.push({ path: ruta, });
}
</script>

<style lang="scss">
.my-menu-link {
  color: black;
  background: $accent,
}

.cabecera {
  z-index: 1000;
}
</style>
