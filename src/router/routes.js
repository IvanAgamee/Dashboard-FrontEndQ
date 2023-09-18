const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('../modulos/Modulo Dashboard/dashboardInicio.vue') },
      { path: '/home', component: () => import('../modulos/Modulo Dashboard/dashboardInicio.vue') },
      { path: '/vistaDocente', component: () => import('../modulos/ModuloDocente/VistaPrincipalDocente.vue') },
      { path: '/agregarMateria', component: () => import('../modulos/ModuloMateria/AgregarMateria.vue') },
      { path: '/vistaMateria', component: () => import('../modulos/ModuloMateria/VistaPrincipalMateria.vue') },
      { path: '/vistaPrograma', component: () => import('../modulos/ModuloMateria/VistaPrincipalMateria.vue') },
      { path: '/vistaCarrera', component: () => import('../modulos/ModuloCarrera/VistaPrincipalCarrera.vue') },
      { path: '/vistaComunidad', component: () => import('../modulos/ModuloComunidad/VistaPrincipalComunidad.vue') },
      { path: '/agregarComunidad', component: () => import('../modulos/ModuloComunidad/AgregarComunidad.vue') },
      { name: 'editComunidad', path: '/editarComunidad/:id', component: () => import('../modulos/ModuloComunidad/EditarComunidad.vue'), props: true, },
      { path: '/vistaUsuario', component: () => import('../modulos/ModuloUsuario/VistaPrincipalUsuario.vue') },
      { path: '/dashboardInicio', component: () => import('../modulos/Modulo Dashboard/dashboardInicio.vue') },
      { path: '/agregarDocente', component: () => import('../modulos/ModuloDocente/AgregarDocente.vue') },
      { name: 'editDocente', path: '/editarDocente/:id', component: () => import('../modulos/ModuloDocente/EditarDocente.vue'), props: true, },
      { name: 'editMateria', path: '/editarMateria/:id', component: () => import('../modulos/ModuloMateria/EditarMateria.vue'), props: true, },
      { path: '/archivoEjemplo', component: () => import('../modulos/ModuloAlumno/Archivoejemplo.vue') },
      { path: '/miPerfil', component: () => import('../modulos/ModuloMiPerfil/miPerfil.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('../layouts/LoginLayout.vue'),
    children: [
      {
        path: 'index',
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
