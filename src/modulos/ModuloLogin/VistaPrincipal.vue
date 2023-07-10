<template>
  <div>
    <div class="text-left text-weight-regular q-ml-md q-mt-lg text-white"> Ingrese su usuario: </div>
    <q-input dense class="q-mt-md q-mx-lg" bg-color="white" rounded outlined v-model="text" label="Ejem: Usuario1@hotmail.com" />
    <div class="text-left text-weight-regular q-ml-md q-mt-lg text-white"> Ingrese su contraseña: </div>
    <q-input dense class="q-mt-md q-mx-lg" bg-color="white" rounded outlined v-model="text" label="Ejem: Contraseña"/>
    <q-btn unelevated rounded color="cyan-9" class="q-mt-lg q-mb-sm q-mx-md q-px-lg" label="Iniciar sesión"
      @click="forgotPassword" />
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>