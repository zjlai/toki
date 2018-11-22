<template>
  <q-page class="flex flex-center">
    <q-card class="auth-container shadow-8">
      <q-card-main class="q-pa-none full-height">
        <div class="row full-height">
          <div class="col" style="overflow: hidden;">
            <div class="row full-height relative-position">
              <img svg-inline src="../assets/tokido.svg" class="logo-background" />
              <div class="col font-secondary q-pa-xl z-top">
                <div class="col h20">
                  <div class="row full-height text-white items-center">
                    <img class="logo logo-white" svg-inline src="../assets/tokido.svg" />
                    <h5 class="text-weight-bold q-headline">
                      TOK<span class="font-primary">I</span>DO
                    </h5>
                  </div>
                </div>
                <div class="col text-secondary h80">
                  <div class="row full-height items-end">
                    <h1 class="q-display-2 text-bold tagline">LEARN <br> NATURALLY</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col bg-white no-margin ">
            <transition
              appear
              mode="out-in"
              enter-active-class="animated fadeInLeft"
              leave-active-class="animated fadeOutRight"
            >
              <router-view />
            </transition>
          </div>
        </div>
      </q-card-main>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
    }
  }
}
</script>

<style>
.auth-container{
  height: 520px;
  width: 980PX;
}
.logo.logo-white  {
  fill: #FFFFFF;
  height: 32px;
}
.tagline {
  line-height: 0.95;
  font-size: 50px;
}
.h80 {
  height: 80%;
}
.h20 {
  height: 20%;
}
.logo-background {
  fill: rgba(60, 201, 148, 0.3);
  width: 110%;
  position: absolute;
  left: -15%;
  top: -35%;
  z-index: 1;
}
</style>
