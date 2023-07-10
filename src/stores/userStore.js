import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

const useLocalStorage = defineStore({
  id: 'localStorage',
  state: () => ({
    authAccount: null,
    token: JSON.parse(localStorage.getItem('token') || 'null'),
    userData: JSON.parse(localStorage.getItem('userData') || 'null'),
  }),
  actions: {
    setUserData(userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
      this.userData = userData;
    },
    clear() {
      localStorage.clear();
      this.token = null;
      this.userData = null;
    },
    initialize() {
      const token = JSON.parse(localStorage.getItem('token') || 'null');
      if (token) {
        this.token = token;
      }
      const userData = JSON.parse(localStorage.getItem('userData') || 'null');
      if (userData) {
        this.userData = userData;
      }

    },
    hasUserRoleId(id) {
      if (this.userData?.roles && this.userData?.roles.length) {
        return this.userData.roles.filter((e) => e.id === id).length > 0;
      }
      return false;
    },
  },
  getters: {
    getUserIsLogged(state) {
      return !!state.userData && !!state.token;
    },
    getUser(state) {
      return state.userData.nombre;
    },
    getUsername(state) {
      return state.userData.username;
    },
    getUserRolesId(state) {
      return state.userData.rolId;
    },
    getUserDepartamento(state) {
      return state.userData.departamentoId;
    },
    getCarreras(state) {
      return state.userData?.departamento?.carrera;
    },
    /*
    Funcion para obtener las carreras del usuario, en caso de ser más de una
    se retorna solo el primer indice, si no se devuevle un array de ellos
    */
    getUserCarreras(state) {
      const obj = state.userData?.departamento?.carrera;
      const id = obj.map((obj) => obj);
      if (id.length === 1) {
        return id[0];
      }
      else {
        return id;
      }
    },
    /*
    Función para rellenar la información necesaria para los select de carreras presentes en
    vista Materia y docentes
    */
    fillSelectCarreras() {
      const carreras = [];
      const carrerasObj = this.getUserCarreras;
      if (carrerasObj.length > 1) {
        for (const value of carrerasObj) {
          const carrera = {
            nombre: value.nombre,
            id: value.carreraId
          }
          carreras.push(carrera);
        }
      }
      else {
        carreras.push(
          {
            nombre: carrerasObj.nombre,
            id: carrerasObj.carreraId
          }
        )
      }

      return carreras;
    }
  }
});

export default useLocalStorage;
