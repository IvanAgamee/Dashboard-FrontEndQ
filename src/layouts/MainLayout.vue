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
         <q-item clickable v-ripple to="/home" active-class="my-menu-link">
              <q-item-section avatar> <q-icon name="home" /> </q-item-section>
              <q-item-section> Inicio </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/vistaDocente" active-class="my-menu-link" exact>
              <q-item-section avatar> <q-icon name="fa-solid fa-chalkboard-user" size="20px" /> </q-item-section>
              <q-item-section> Docentes </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/vistaMateria" active-class="my-menu-link">
              <q-item-section avatar> <q-icon name="fa-solid fa-book" size="20px" /> </q-item-section>
              <q-item-section> Materias </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/vistaCarrera" active-class="my-menu-link">
              <q-item-section avatar> <q-icon name="fa-solid fa-graduation-cap" size="20px" /> </q-item-section>
              <q-item-section> Carreras </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/vistaUsuario" active-class="my-menu-link">
              <q-item-section avatar> <q-icon name="fa-solid fa-user" size="20px" /> </q-item-section>
              <q-item-section> Usuarios </q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>
    <!-- Información del usuario -->
        <q-img class="absolute-top" src="../assets/img/portada-perfil5.png" style="height: 150px">
         <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="../assets/img/foto-perfil.jpg">
            </q-avatar>
            <div class="text-weight-bold">Yeli Jimenez</div>
            <div>@yelijimenez</div>
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
//import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue';

const leftDrawerOpen = ref(false)
const drawer = ref(false)

const toggleLeftDrawer = () => leftDrawerOpen.value = !leftDrawerOpen.value;
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
