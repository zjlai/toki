
const routes = [
  {
    path: '/',
    component: () => import('layouts/AuthBase.vue'),
    children: [
      { path: '', component: () => import('pages/signin.vue') }
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
