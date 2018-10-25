import { Auth } from 'aws-amplify'

const AuthFilter = (to, from, next) => {
  console.log('before routing ', to, from)
  // const store = Store
  Auth.currentAuthenticatedUser()
    .then(user => {
      console.log('...has user', user)
      // store.commit('UserStore/setUser', user)
      Auth.currentCredentials()
        .then(credentials => {
          // store.commit('UserStore/setUserId', credentials.identityId)
          console.log(credentials)
        })
        .catch(err => console.log('get current credentials err', err))
      next()
    })
    .catch(err => {
      console.log('...no user', err)
      // store.commit('UserStore/setUser', null)
      if (!to.name.startsWith('user')) {
        next('/user/signin')
      } else {
        next()
      }
    })
}

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
          { name: 'user.signin', path: 'signin', component: () => import('components/user/signin.vue') },
          { name: 'user.signup', path: 'signup', component: () => import('components/user/signup.vue') },
          { name: 'user.forgotPassword', path: 'forgotpassword', component: () => import('components/user/forgotpassword.vue') }
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
        name: 'wordbank',
        path: '',
        component: () => import('pages/wordbank.vue')
      }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/StudentBase.vue'),
    children: [
      {
        name: 'dashboard',
        path: '',
        component: () => import('pages/dashboard.vue')
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
export { AuthFilter }
