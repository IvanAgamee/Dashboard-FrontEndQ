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
    getUserFullName(state) {
      return state.userData?.fullName ? state.userData?.fullName : '';
    },
    getUserRolesId(state) {
    return state.userData.rolId;
    }},
});

export default useLocalStorage;
