import { store } from 'quasar/wrappers'
import { createPinia } from 'pinia'
import { defineStore } from "pinia";

export const useUserStore  = defineStore({
  id:'user',
  state:()=> ({
    userData:JSON.parse(localStorage.getItem('user')) || {},
  }),
  actions: {
    setUser(user) {
      this.userData = { ...user };
      localStorage.setItem('user',JSON.stringify(user));
    },
    logout() {
      this.reset()
      localStorage.removeItem('user');
    },
    reset() {
      this.userData = {};
    }
  },
  getters: {
    
  }
})

export default store((/* { ssrContext } */) => {
  const pinia = createPinia()

  // You can add Pinia plugins here
  // pinia.use(SomePiniaPlugin)

  return pinia
})
