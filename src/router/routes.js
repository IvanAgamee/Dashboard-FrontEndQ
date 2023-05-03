
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/home', component: () => import('../modulos/EjemploVista.vue') },
      { path: '/rickandmorty', component: () => import('../modulos/ModuloEjemplo/VistaPrincipalRickAndMorty.vue') },
      { path: '/vistaDocente', component: () => import('../modulos/ModuloDocente/VistaPrincipalDocente.vue') },
      { path: '/vistaMateria', component: () => import('../modulos/ModuloMateria/VistaPrincipalMateria.vue') },
      { path: '/vistaCarrera', component: () => import('../modulos/ModuloCarrera/VistaPrincipalCarrera.vue') }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
