const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/home', component: () => import('../modulos/EjemploVista.vue') },
      { path: '/vistaDocente', component: () => import('../modulos/ModuloDocente/VistaPrincipalDocente.vue') },
      { path: '/agregarMateria', component: () => import('../modulos/ModuloMateria/AgregarMateria.vue') },
      { path: '/vistaMateria', component: () => import('../modulos/ModuloMateria/VistaPrincipalMateria.vue') },
      { path: '/vistaCarrera', component: () => import('../modulos/ModuloCarrera/VistaPrincipalCarrera.vue') },
      { path: '/vistaUsuario', component: () => import('../modulos/ModuloUsuario/VistaPrincipalUsuario.vue') },
      { path: '/dashboardInicio', component: () => import('../modulos/Modulo Dashboard/dashboardInicio.vue') },
      { path: '/agregarDocente', component: () => import('../modulos/ModuloDocente/AgregarDocente.vue') },
      { name: 'editDocente', path: '/editarDocente/:id', component: () => import('../modulos/ModuloDocente/EditarDocente.vue'), props:true,},
      { path: '/archivoEjemplo', component: () => import('../modulos/ModuloAlumno/Archivoejemplo.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('../layouts/LoginLayout.vue'),
    children: [
      {
        path: 'loginPrincipal',
        component: () => import('../modulos/ModuloLogin/VistaPrincipal.vue')
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
