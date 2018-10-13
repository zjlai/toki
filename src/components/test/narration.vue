<template>
  <div class="col">
    <div class="row q-py-md">
      <div class="col-5">
        <q-card class="rounded-sm no-shadow">
          <q-card-title class="bg-blue-9 text-center text-white q-pa-sm">
            <span class="text-bold q-body-2">INSTRUCTIONS</span>
          </q-card-title>
          <q-card-main class="bg-primary">
            <div class="q-pa-xl q-title text-white">
              Listen to the word that is played and type out your answer below
            </div>
          </q-card-main>
        </q-card>
      </div>
      <div class="col-7 q-pl-md">
        <q-card class="rounded-sm no-shadow full-height">
          <q-card-title class="bg-primary text-center text-white q-pa-sm">
            <span class="text-bold q-body-2">WORD</span>
          </q-card-title>
          <q-card-main class="q-pa-none fit-row">
            <div class="col full-height">
              <div class="fullwidth border-secondary"></div>
              <div class="col row justify-center items-center full-height">
                <q-btn round color="black" text-color="white" class="q-mr-md xl-button" icon="volume_up" />
              </div>
            </div>
          </q-card-main>
        </q-card>
      </div>
    </div>
    <div class="col">
      <q-card class="rounded-sm no-shadow">
        <q-card-title class="bg-primary text-center text-white q-pa-sm">
          <span class="text-bold q-body-2">YOUR ANSWER</span>
        </q-card-title>
        <q-card-main class="q-pa-none">
          <div class="col q-my-md">
            <q-input v-model="ans" align="center" upper-case autofocus hide-underline class="biginput text-black text-bold q-display-3 q-my-xl" />
          </div>
        </q-card-main>
      </q-card>
    </div>
    <div class="row justify-center">
      <q-btn
        color="secondary"
        rounded
      >
        <span class="q-px-lg q-py-sm q-title">
          PROCEED
          <i class="material-icons">arrow_forward</i>
        </span>
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentNarration',
  data () {
    return {}
  }
}
</script>

<style lang="stylus">
@import '~variables'

.border-secondary
  border-top 8px solid $secondary

.fit-row
  height calc(100% - 49px)

.xl-button
  font-size 32px !important

.biginput
  line-height 60px
  height 60px

.biginput input
  height 60px
</style>
