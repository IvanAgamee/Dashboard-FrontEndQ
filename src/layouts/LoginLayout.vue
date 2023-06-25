<template>

  <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">modelValue</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  <div class="row">
    <div class="col container-img">
      <div class="img-panel">

      </div>
    </div>


    <div class="col">
      <div class="login-bg">
        <div class="text-center">
          <h4 class="text-center text-weight-medium">INICIO SESI&Oacute;N</h4>
          <hr style="height:0.5em; width: 80vh; background-color: black;">
        </div>

        <div class="q-gutter-y-md q-pa-md">
          <div class="login-content">
            <q-input color="indigo-10" v-model="email" label="usuario" filled :dense="dense"  :rules="[val => !!val || 'El campo no debe de estar vacio']"
              :input-style="{ fontSize: '2em' }">
              <template v-slot:prepend>
                <q-icon name="account_circle"></q-icon>
              </template>
            </q-input>

            <br>
            <q-input color="indigo-10" v-model="password" label="contrase&ntilde;a"  :rules="[val => !!val || 'El campo no debe de estar vacio']" :input-style="{ fontSize: '1.8em' } "
              filled :type="isPwd ? 'txt' : 'password'">
              <template v-slot:prepend>
                <q-icon name="lock"></q-icon>
              </template>
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                  @click="isPwd = !isPwd"></q-icon>
              </template>
            </q-input>
            <br>
            <q-btn color="light-blue-10" label="Iniciar Sesi&oacute;n" size="lg" @click="validateFields"></q-btn>
            <br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>

import { ref } from "vue";
import apiLogin from "../modulos/ModuloLogin/apiLogin.js";
import authStore from '../stores/userStore.js';
import router from "src/router";
import { useRouter } from 'vue-router';
import { useQuasar } from "quasar";

export default {
  setup() {
    const $q = useQuasar()
    const router = useRouter();
    const email = ref(null)
    const password = ref(null)
    const validateFields = async () => {

      var obj = {
        username: email.value,
        password: password.value,
      }
      console.table(obj);
      const response = await apiLogin.loginAuth(obj);
      if (response.success) {
        authStore().setUserData(response.data)
        router.push({
          path: "/home",
        });
      }

      else{
        alert()
      }
    };

    function alert(){
      $q.dialog({
        title: 'Error: Credenciales no aceptadas!',
        message: 'Sus credenciales no son válidas si no cuenta con ellas o las ha olvidado, contacte al administrador'
      }).onOk( () => {
        console.log("ok");
      }
    )}

    return {
      email,
      password,
      validateFields,
      alert
    }
  },
}

</script>


<style lang="scss" scoped>
.img-panel {
  background-image: url("../assets/img/login/login-tecnm-panel.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}


.login-bg {
  margin-top: 10%;
  background-color: $lightPanel;
  height: 90vh;

}

.login-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 4em;
}

.input-txt-field {
  font-size: 5em;
}
</style>

