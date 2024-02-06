import { Loading } from 'quasar'; import { Loading } from 'quasar';
<template>
  <q-page padding>
    <q-card class="q-pt-lg q-pb-lg">
      <div class="row">
        <h6 class="col q-ma-sm q-ml-lg">Registro de administrativos</h6>
        <q-select
          filled
          color="blue-10"
          v-model="selectedPrograma"
          :options="optionsProgramas"
          label="Programa"
          option-label="nombre"
          option-value="id"
          class="q-ma-sm q-mr-lg"
        />
      </div>
      <q-separator style="margin: 15px" />

      <q-input
        class="q-ma-lg"
        v-model="search"
        label="Buscar un administrativo"
        dense
        outlined
        clearable
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <!-- TABLA -->
      <q-table
        class="my-sticky-header-table q-ma-lg"
        :rows="filteredRows"
        :columns="columns"
        header
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td
              v-for="column in props.cols"
              :key="column.name"
              :props="props"
            >
              <template v-if="column.name !== 'acciones'">{{
                props.row[column.name]
              }}</template>
              <template v-else>
                <q-btn-group>
                  <q-btn
                    v-for="accion in props.row.acciones"
                    :key="accion.nombre"
                    @click="accion.funcion()"
                    :class="{
                      'btn-editar': accion.nombre === 'Editar',
                      'btn-eliminar': accion.nombre === 'Eliminar',
                    }"
                    :icon="
                      accion.nombre === 'Editar'
                        ? 'fa-solid fa-pencil'
                        : 'fa-solid fa-trash'
                    "
                    size="11px"
                  />
                </q-btn-group>
              </template>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>

    <!----------------MODAL EDITAR DIRECTIVO---------------------->
    <Modal v-model:show="showModalModificar">
      <div class="col-12 text-center">
        <h6 style="margin: 0px">Editar administrativo</h6>
      </div>
      <q-separator style="margin: 15px" />
      <div class="row col-12">
        <div class="col-12 col-12-full">
          <div class="text-center justify-center">
            <q-img
              v-if="fileImageDirectivo != null"
              :src="fileImageDirectivo"
              no-native-menu
              rounded
              height="200px"
              style="max-width: 220px"
            >
              <div class="absolute-bottom text-subtitle1 text-center">
                Imagen del administrativo
              </div>
            </q-img>
            <br />
            <input
              ref="inputFile"
              type="file"
              @change="inputFile = $event.target.files[0]"
              style="display: none"
              accept="image/*"
            />
            <q-btn
              label="Editar imagen"
              dense
              size="sm"
              @click="$refs.inputFile.click()"
              class="q-ma-sm q-pa-sm justify-center"
              color="secondary"
              icon="fa-solid fa-camera"
            />
          </div>

          <q-input
            v-model="administrativo.nombrePuesto"
            label="Nombre del puesto"
            disable
            lazy-rules
            dense
            style="padding: 0px 10px 20px 10px"
          />
          <q-input
            v-model="administrativo.nombre"
            label="Nombre de administrativo"
            lazy-rules
            dense
            style="padding: 0px 10px 20px 10px"
          />
          <q-input
            v-model="administrativo.descripcion"
            label="Descripción de administrativo"
            lazy-rules
            dense
            style="padding: 0px 10px 20px 10px"
          />
        </div>

        <div class="col-12 text-center">
          <q-separator style="margin: 8px" />
          <q-btn
            label="Cancelar"
            @click="showModalModificar = false"
            class="q-ml-sm q-mr-md"
            color="negative"
          />
          <q-btn
            label="Editar"
            type="submit"
            @click="editarDirectivo()"
            class="btn-editar"
          />
        </div>
      </div>
    </Modal>
  </q-page>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { QBtn, QTable, QCard } from "quasar";
import { useQuasar } from "quasar";
import Modal from "../../components/MiModal.vue";
import apiLineasInv from "../ModuloLineasInv/apiLineasInv.js";
import apiDirectivos from "../ModuloDirectivos/apiDirectivos.js";
import apiUsuario from "../ModuloUsuario/apiUsuario.js";
import apiDocente from "../ModuloDocente/apiDocente.js";
import { Loading, Notify, QSpinnerGears } from "quasar";
import UserStore from "src/stores/userStore";
import swal from "sweetalert";

const $q = useQuasar();

const row = ref([]);
const optsDptos = ref([]);
const optsRoles = ref([]);
const search = ref();

const optionsProgramas = UserStore().getProgramas;
const selectedPrograma = ref(UserStore().getProgramas[0]);

const inputFile = ref();
const fileImageDirectivo = ref(null);
const envRoute = ref("http://localhost:3010/imagenes/");

const showModal = ref(false);
const showModalConfirmarAgregar = ref(false);
const showModalModificar = ref(false);

const administrativo = ref({
  puestoId: 1,
  administrativoId: 2,
  nombre: "",
  descripcion: "",
  nombrePuesto: "",
  imagen: "",
  status: 1,
  programaId: 1,
});

// Observar cambios en el select
watch(selectedPrograma, () => {
  returnData();
});

// Observa cuando se sube una foto de un administrativo
watch(inputFile, async () => {
  if (typeof inputFile.value !== "string") {
    if (!!selectedPrograma.value) {
      const id = selectedPrograma.value.programaId;
      const response = await apiDocente.uploadImageDocente(
        inputFile.value,
        administrativo.value.nombre,
        id
      );

      fileImageDirectivo.value = createRouteImage(
        response.fileData.pathFile,
        response.fileData.nameFile
      );

      administrativo.value.imagen = !!response.fileData.nameFile
        ? response.fileData.nameFile
        : null;
    } else {
      Notify.create({
        type: "negative",
        message: "Seleccione primero una carrera",
        position: "top",
      });
      inputFile.value = null;
    }
  }
});

const filteredRows = computed(() => {
  if (search.value) {
    const searchTerm = search.value.toLowerCase();
    return row.value.filter((row) => {
      return Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm)
      );
    });
  }
  return row.value;
});

const createRouteImage = (pathFile, nameFile) => {
  return envRoute.value + pathFile + "/" + nameFile;
};

// Columnas de la tabla
const columns = [
  {
    name: "nombre",
    required: true,
    align: "center",
    label: "Nombre",
    field: "nombre",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "nombrePuesto",
    required: true,
    align: "center",
    label: "Nombre del puesto",
    field: "nombrePuesto",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "descripcion",
    required: true,
    align: "center",
    label: "Descripción",
    field: "descripcion",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "acciones",
    align: "center",
    label: "Acciones",
    align: "center",
    field: "acciones",
    sortable: true,
  },
];

// Llenado de la tabla con información del backend
const returnData = async () => {
  row.value = [];
  const data = await apiDirectivos.getDirectivos(
    selectedPrograma.value.programaId
  );
  data.data.map((el) => {
    var obj = {
      nombre: el.nombre,
      nombrePuesto: el.nombrePuesto,
      descripcion:
        el.descripcion?.length > 60
          ? el.descripcion.substring(0, 60) + "..."
          : el.descripcion,
      acciones: [
        {
          nombre: "Editar",
          funcion: () => {
            openModalModificar(el), getDirectivo(el.programaId, el.puestoId);
          },
        },
      ],
    };
    row.value.push(obj);
  });
};
returnData();

//Limpiar campos
const clearInput = () => {
  administrativo.value = {
    administrativoId: 0,
    nombre: "",
    descripcion: "",
    nombrePuesto: "",
    imagen: "",
    status: 1,
    programaId: selectedPrograma.value.id,
  };
};

//Editar registros de la tabla
const openModalModificar = async (_administrativo) => {
  Loading.show({ spinner: QSpinnerGears });
  const resp = await apiDirectivos.getDirectivo(
    _administrativo.programaId,
    _administrativo.puestoId
  );
  showModalModificar.value = !showModalModificar.value;
  administrativo.value = resp.data;
  fileImageDirectivo.value = createRouteImage(
    resp.data.pathFile,
    resp.data.imagen
  );
  Loading.hide();
};

//Modificar administrativo
const editarDirectivo = async () => {
  if (
    administrativo.value.nombre != "" &&
    administrativo.value.descripcion != "" &&
    administrativo.value.imagen != ""
  ) {
    try {
      Loading.show({ spinner: QSpinnerGears });
      await apiDirectivos.crudDirectivo(administrativo.value);
      showModalModificar.value = false;
      Loading.hide();
      returnData();
    } catch (e) {
      console.log(e);
    }
  } else {
    Notify.create({
      type: "negative",
      message: "Todos los campos son obligatorios",
      position: "top",
    });
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
