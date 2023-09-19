import { route } from 'quasar/wrappers'
import UserStore from "../stores/userStore";
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })


// GUARDIAN DE RUTAS
Router.beforeEach((to, from, next) => {
  // Cuando el usuario no esté logueado y no esté en la ruta de inicio de sesión
  if (!UserStore().getUserIsLogged && to.path !== '/login/index') {
    next({ path: '/login/index' });
  } else {
    next();
  }
});
 return Router;
});


