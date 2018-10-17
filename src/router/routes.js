
const routes = [
  {
    path: '/user',
    component: () => import('layouts/AuthBase.vue'),
    children: [
      {
        name: 'user',
        path: '',
        component: () => import('pages/user.vue'),
        children: [
          { name: 'signin', path: 'signin', component: () => import('components/user/signin.vue') },
          { name: 'signup', path: 'signup', component: () => import('components/user/signup.vue') },
          { name: 'forgotPassword', path: 'forgotpassword', component: () => import('components/user/forgotpassword.vue') }
        ]
      }
    ]
  },
  {
    path: '/courses',
    component: () => import('layouts/StudentBase.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/courses.vue'),
        children: [
          { name: 'mycourses', path: '', component: () => import('components/course/mycourses.vue') },
          { name: 'courseselect', path: 'selectcourse', component: () => import('components/course/selectcourse.vue') },
          { name: 'coursignup', path: 'signup', component: () => import('components/course/coursesignup.vue') }
        ]
      }
    ]
  },
  {
    path: '/learn',
    component: () => import('layouts/StudentBase.vue'),
    children: [
      {
        name: 'learn',
        path: '',
        component: () => import('pages/learn.vue')
      }
    ]
  },
  {
    path: '/test',
    component: () => import('layouts/StudentBase.vue'),
    children: [
      { path: '',
        component: () => import('pages/test.vue'),
        children: [
          { name: 'instructions', path: '', component: () => import('components/test/instructions.vue') },
          { name: 'testing', path: 'testing', component: () => import('components/test/test.vue') },
          { name: 'summary', path: 'summary', component: () => import('components/test/summary.vue') }
        ]
      }
    ]
  },
  {
    path: '/wordbank',
    component: () => import('layouts/StudentBase.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/wordbank.vue')
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
