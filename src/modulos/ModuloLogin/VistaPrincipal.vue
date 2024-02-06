<template>
  <div>
    <div class="text-left text-weight-regular q-ml-md q-mt-lg text-white">
      Ingrese su correo:
    </div>
    <q-input
      dense
      class="q-mt-md q-mx-lg"
      bg-color="white"
      rounded
      outlined
      v-model="email"
      label="Ejem: Usuario1@hotmail.com"
    />
    <div class="text-left text-weight-regular q-ml-md q-mt-lg text-white">
      Ingrese su contraseña:
    </div>
    <q-input
      dense
      class="q-mt-md q-mx-lg"
      bg-color="white"
      rounded
      outlined
      v-model="password"
      label="Ejem: Contraseña"
      :type="isPwd ? 'password' : 'text'"
      :rules="[(val) => val.length >= 8]"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
      <br />
    </q-input>

    <!-- <div class="text-center text-caption text-white cursor-pointer q-mx-lg">
      <p style="text-decoration: underline" @click="showModal = true">
        ¿Olvidaste tu contraseña?
      </p>
    </div> -->

    <q-btn
      unelevated
      rounded
      color="cyan-9"
      class="q-mt-md q-mb-sm q-mx-md q-px-lg"
      label="Iniciar sesión"
      @click="submitLogin()"
    />
  </div>

  <!-- Modal cambiar contraseña -->
  <Modal v-model:show="showModal">
  <div class="col-12 text-center w-50">
    <h6 style="margin: 0px">¿Olvidaste tu contraseña?</h6>
    <div class="text-caption text-weight-light q-mb-md q-mb-sm q-mx-lg text-left">A continuación se le enviará un correo con su nueva contraseña.</div>
  </div>
  <q-separator style="margin: 15px" />
  <div class="text-left text-weight-regular q-ml-md q-mt-lg col-6">
    Ingrese su correo:
  </div>
  <div class="col-6"><!-- Divisor para ocupar la mitad del ancho -->
    <q-input
      dense
      class="q-mt-md q-mb-xl q-mx-lg w-100"
      bg-color="white"
      rounded
      outlined
      v-model="email"
    />
  </div>

  <div class="col-12 text-center">
    <q-separator style="margin: 8px" />
    <q-btn
      label="Cancelar"
      @click="showModal = false"
      class="q-ml-sm q-mr-md"
      color="negative"
    />
    <q-btn
      label="Enviar"
      type="submit"
      @click="enviarCorreo()"
      class="btn-editar"
    />
  </div>
</Modal>

</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Loading, Notify, QSpinnerGears } from "quasar";
import Modal from "../../components/MiModal.vue";
import apiLogin from "../ModuloLogin/apiLogin.js";
import authStore from "../../stores/userStore.js";

const router = useRouter();
const email = ref("Admin");
const password = ref("Admin01");
const isPwd = ref(true);
const showModal = ref(false);

const submitLogin = async () => {
  Loading.show({ spinner: QSpinnerGears });
  // const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  const isValidEmail = true;
  const isValidPassword = password.value.length >= 7;
  if (isValidEmail && isValidPassword) {
    var obj = {
      username: email.value,
      password: password.value,
    };

    const response = await apiLogin.loginAuth(obj);
    if (response.success) {
      authStore().setUserData(response.data);
      router.push({
        path: "/home",
      });
      Loading.hide();
    } else {
      Notify.create({
        type: "negative",
        message: "¡El usuario que ha ingresado es incorrecto!",
        position: "top",
      });
      Loading.hide();
    }
  } else {
    Notify.create({
      type: "negative",
      message: "¡El correo y/o la contraseña no tienen el formato correcto!",
      position: "top",
    });
    Loading.hide();
  }
};

const enviarCorreo = async () => {
  Loading.show({ spinner: QSpinnerGears });
  const response = await apiLogin.correoCambioContrasena(email.value);
  if (response.success) {
    Notify.create({
      type: "positive",
      message: "¡Se ha enviado un correo con la contraseña!",
      position: "top",
    });
    Loading.hide();
  } else {
    Notify.create({
      type: "negative",
      message: "¡El correo que ha ingresado es incorrecto!",
      position: "top",
    });
    Loading.hide();
  }
};
</script>

<style lang="scss">
@import "../../css/quasar.variables.scss";
.my-sticky-header-table {
  thead tr:first-child th {
    background-color: $table;
    font-weight: bold;
    color: white;
  }
}

.btn-editar {
  background-color: $secondary;
  color: white;
}

.btn-eliminar {
  background-color: $negative;
  color: white;
}
</style>
