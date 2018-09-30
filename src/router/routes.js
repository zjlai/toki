
const routes = [
  {
    path: '/user',
    component: () => import('layouts/AuthBase.vue'),
    children: [
      {
        name: 'auth',
        path: '',
        component: () => import('pages/user.vue'),
        children: [
          { name: 'signin', path: 'signin', component: () => import('components/user/signin.vue') }
        ]
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
