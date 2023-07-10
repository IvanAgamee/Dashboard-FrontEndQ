<template>
  <q-layout view="lHh Lpr lff">
    <div class="background1">
      <div class="background">
        <div class="login-container">
        <div class="text-h4 text-weight-bolder q-py-md text-white">¡Bienvenido!</div>
          <!-- <q-img src="" class="q-mt-sm" style="height: 30px; max-width: 150px" /> <br> <br> -->
          <q-separator color="white q-my-sm" />
          <q-img src="../assets/img/login/logoDash1.svg" style="height: 100px; max-width: 300px" />
          <q-separator color="white q-ma-md" />
          <q-page-container>
            <router-view></router-view>
          </q-page-container>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
// @import 'src/ui/css/quasar.variables'

.my-menu-link {
  color: black;
  background: $accent;
}

.cabecera {
  z-index: 1000;
}

.background1 {
  background-color: black;
  z-index: -1;
}

.background {
  height: 100vh;
  overflow-y: auto;
}

.background::before {
  content: '';
  background-image: url('../assets/img/login/recorrido.jpg');
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.5;
}

.login-container {
  position: relative;
  z-index: 2;
  margin: 0 auto;
  max-width: 400px;
  padding: 20px;
  margin-top: 50px;
  margin-bottom: 50px;
  background-color: rgba(12, 44, 96, 0.9);
  border-radius: 0px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  text-align: center;
}
</style>
