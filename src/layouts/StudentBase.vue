<template>
  <q-layout view="lhh lpr fFf">

    <q-layout-header class="no-shadow">
      <q-toolbar class="bg-primary">
        <div class="row items-center self-start">
          <q-btn
            flat
            round
            dense
            icon="menu"
            @click="leftDrawer = !leftDrawer"
            v-show="!leftDrawer"
          />
          <q-toolbar-title>
            <div class="row justify-start items-center">
              <img svg-inline src="../assets/tokido.svg" class="logo" />
              <h4 class="text-white">
                TOK<span class="font-primary">I</span>DO
              </h4>
            </div>
          </q-toolbar-title>
        </div>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      side="left"
      v-model="leftDrawer"
    >
      <div class="bg-primary ht40 text-white row items-end">
        <q-btn
          flat
          round
          icon="menu"
          @click="leftDrawer = !leftDrawer"
          v-show="leftDrawer"
          class="fixed self-start"
          style="left: 10px; margin-top: 10px"
        />
        <div class="col q-pb-md">
          <div class="col justify-center row items-center">
            <q-knob
              v-model="mastery"
              :min="min"
              :max="max"
              size="120px"
              readonly
              color="secondary"
              track-color="blue-10"
              class="absolute"
            />
            <div class="avatar q-display-2 row items-center justify-center q-my-sm text-primary">{{initials}}</div>
          </div>
          <h6 class="text-center q-pt-sm">
            {{name}}
          </h6>
          <p class="q-caption text-center q-pt-sm text-bold">
            {{ctnum}}
          </p>
        </div>
      </div>
      <q-list no-border link class="q-px-md font-primary">
        <q-item @click.native="routeChange('dashboard')" class="dash_links">
          <q-item-main
            class="text-center text-grey-full"
          >
            <span class="h6 text-bold" :class="{ active: active === 'dashboard' }">DASHBOARD</span>
          </q-item-main>
        </q-item>
        <q-item @click.native="routeChange('learn')" class="dash_links">
          <q-item-main
            class="text-center text-grey-full">
            <span class="h6 text-bold" :class="{ active: active === 'learn' }">LEARN</span>
          </q-item-main>
        </q-item>
        <q-item @click.native="routeChange('test')" class="dash_links">
          <q-item-main
            class="text-center text-grey-full">
            <span class="h6 text-bold" :class="{ active: active === 'test' }">TESTS</span>
          </q-item-main>
        </q-item>
        <!--<q-item to="/wordbank" @click.native="routeChange('wordbank')" class="dash_links">
          <q-item-main
            class="text-center text-grey-full">
            <span class="h6 text-bold" :class="{ active: active === 'wordbank' }">WORDBANK</span>
          </q-item-main>
        </q-item>-->
        <q-item @click.native="routeChange('courses')" class="dash_links">
          <q-item-main
            class="text-center text-grey-full">
            <span class="h6 text-bold" :class="{ active: active.startsWith('courses') }">MY COURSES</span>
          </q-item-main>
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <span class="tk-container-fill"></span>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { API } from 'aws-amplify'

const API_PATH = '/students'
const API_NAME = 'students'

export default {
  name: 'StudentBase',
  data () {
    return {
      leftDrawer: true,
      min: 0,
      max: 100,
      mastery: 100,
      name: '',
      ctnum: '',
      active: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.active = to.path.substring(1, to.path.length)
      console.log(vm.active)
    })
  },
  async mounted () {
    console.log(this.$route)
    const res = await API.get(API_NAME, API_PATH)
    this.name = res[0].name
    this.ctnum = res[0].ctnum
    this.$q.screen.setSizes({ xl: 1400 })
  },
  computed: {
    initials () {
      return this.name.substring(0, 1)
    }
  },
  methods: {
    routeChange (route) {
      this.active = route
      console.log(this.$route.query)
      this.$router.push({ path: `/${route}`, query: this.$route.query })
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'

.ht40
  height 40%
  max-height 240px
.logo {
  height: 32px;
  margin: 10px;
  fill: white;
}
.container {
  min-height: calc(100vh - 95px) !important;
  height: 100%;
  width: 100%;
}
.avatar {
  min-height: 100px;
  min-width: 100px;
  border-radius: 50%;
  background: $tk-grey-4;
  box-shadow:0 0 0 6px rgba(33, 86, 193, 1);
  z-index: 1;
}
.mainup{
  z-index: 2999;
  margin-top: -250px;
  height: calc(100vh - 50px);
}
</style>
