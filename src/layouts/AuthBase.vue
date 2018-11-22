<template>
  <q-layout view="hHh lpr fFf" class="bg-primary">

    <q-layout-header class="no-shadow auth-header q-py-xl">
      <div class="row justify-center items-center">
        <svg id="tk-icon-layer" viewBox="0 0 76.37 76.37" class="logo">
          <circle id="tk-icon-layer-head" cx="38.18" cy="38.18" r="27" />
          <polygon id="tk-icon-layer-beak" points="64.52 44.11 76.37 38.18 64.52 32.26 64.52 44.11" />
          <circle id="tk-icon-layer-eye" cx="47.73" cy="38.18" r="6.75" style="fill:#2f66e9"/>
        </svg>
        <h5 class="text-weight-bold text-yellow q-headline">
          TOK<span class="font-primary">I</span>DO
        </h5>
      </div>
    </q-layout-header>
    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

    <q-layout-footer class="no-shadow auth-footer">
      <div class="flex q-caption text-white items-end justify-center">
        <span>Privacy Policy</span>
        <span class="break">.</span>
        <span>EULA</span>
        <span class="break">.</span>
        <span>Terms & Conditions</span>
      </div>
    </q-layout-footer>
  </q-layout>
</template>

<script>
import { TimelineMax, Bounce } from 'gsap'

const tkAnim = () => {
  new TimelineMax()
    .from('#tk-icon-layer-head', 0.8, { transformOrigin: 'center', scale: 0, ease: Bounce.easeOut }, 0)
    .from('#tk-icon-layer-beak', 0.8, { x: -40, autoAlpha: 0, ease: Bounce.easeOut }, 0.4)
    .from('#tk-icon-layer-eye', 1, { x: -20, transformOrigin: 'center', scale: 0, ease: Bounce.easeOut }, 0.6)
    .to('#tk-icon-layer', 0.5, { transformOrigin: 'center', rotation: 45, ease: Bounce.easeOut }, 1.6)
}

export default {
  name: 'AuthBase',
  data () {
    return {
    }
  },
  mounted () {
    tkAnim()
  }
}
</script>

<style>
.auth-header, .auth-footer {
  height: 80px;
}
.auth-footer div span {
  padding: 0px 8px;
}
.logo {
  height: 40px;
  margin-right: 5px;
}
.logo  {
  fill: #FCBD43;
}
</style>
