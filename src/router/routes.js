import { Auth, API } from 'aws-amplify'
const API_PATH = '/students'
const API_NAME = 'students'

const checkFirstTime = async () => {
  const firsttime = await API.get(API_NAME, API_PATH)
  return firsttime
}
const AuthFilter = async (to, from, next) => {
  console.log('before routing ', to, from)
  // const store = Store
  Auth.currentAuthenticatedUser()
    .then(user => {
      console.log('...has user', user)
      // store.commit('UserStore/setUser', user)
      Auth.currentCredentials()
        .then(credentials => {
          // store.commit('UserStore/setUserId', credentials.identityId)
          // console.log(credentials)
        })
        .catch(err => console.log('get current credentials err', err))

      checkFirstTime()
        .then(firsttime => {
          if (firsttime.length === 0 && !to.name.startsWith('walkthrough')) {
            next('/firsttimeuser')
          } else {
            next()
          }
        })
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
          { name: 'coursesignup', path: 'signup', component: () => import('components/course/coursesignup.vue') }
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
      {
        name: 'test',
        path: '',
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
        path: '/dashboard/:courseId',
        component: () => import('pages/dashboard.vue')
      }
    ]
  },
  {
    name: 'firsttimeuser',
    path: '/firsttimeuser',
    component: () => import('layouts/blue.vue'),
    children: [
      { name: 'walkthrough', path: '', component: () => import('pages/walkthrough') }
    ]
  },
  {
    path: '/',
    redirect: {name: 'user.signin'}
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
