<template>
  <div>
    <div class="text-left text-weight-regular q-ml-md q-mt-lg text-white"> Ingrese su usuario: </div>
    <q-input dense class="q-mt-md q-mx-lg" bg-color="white" rounded outlined v-model="email" label="Ejem: Usuario1@hotmail.com" />
    <div class="text-left text-weight-regular q-ml-md q-mt-lg text-white"> Ingrese su contraseña: </div>
    <q-input dense class="q-mt-md q-mx-lg" bg-color="white" rounded outlined v-model="password" label="Ejem: Contraseña"
    :type="isPwd ? 'password' : 'text'" :rules="[val => val.length >= 8]"> 
    <template v-slot:append>
      <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
    </template> <br>
    </q-input>
    <q-btn unelevated rounded color="cyan-9" class="q-mt-md q-mb-sm q-mx-md q-px-lg" label="Iniciar sesión"
      @click="submitLogin()" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Loading, Notify, QSpinnerGears } from 'quasar'
import apiLogin from '../ModuloLogin/apiLogin.js'
import authStore from '../../stores/userStore.js';

const router = useRouter();
const email = ref('Admin')
const password = ref('Admin01')
const isPwd = ref(true)

const submitLogin = async () => {
  Loading.show({ spinner: QSpinnerGears });
  // const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  const isValidEmail = true;
  const isValidPassword = password.value.length >= 7;
    if (isValidEmail && isValidPassword ) {
        
        var obj = {
                username: email.value,
                password: password.value,
              };

      const response = await apiLogin.loginAuth(obj);
      if (response.success) {
        authStore().setUserData(response.data)
        router.push({
        path:'/home',
          })
        Loading.hide(); 
      }
      else{
        Notify.create({ type: 'negative', message: '¡El usuario que ha ingresado es incorrecto!', position: 'top' })
        Loading.hide(); 
      }
 } else {
  Notify.create({ type: 'negative', message: '¡El correo y/o la contraseña no tienen el formato correcto!', position: 'top' })
    Loading.hide(); 
 }
}
</script>

<style lang="scss" scoped>

</style>