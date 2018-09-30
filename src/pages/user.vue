<template>
  <q-page class="flex flex-center">
    <q-card class="auth-container shadow-8" color="primary" text-color="black">
      <q-card-main class="q-pa-none full-height">
        <div class="row full-height">
          <div class="col no-margin">
            <div class="row full-height items-center">
              <div class="col-2">
              </div>
              <div class="col-10 items-center">
                <div class="text-weight-bold text-white q-headline q-mb-lg">
                  TOK<span class="font-secondary text-weight-medium">I</span>DO
                </div>
                <div class="text-weight-bold text-secondary items-center q-display-3 tagline q-mt-lg">
                  LEARN <br> NATURALLY
                </div>
              </div>
            </div>
          </div>
          <div class="col bg-white no-margin ">
            <router-view />
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
div.tagline {
  line-height: 0.9;
}
</style>
