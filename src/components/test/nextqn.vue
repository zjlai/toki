<template>
  <div class="col">
    <q-card class="rounded-sm no-shadow">
      <q-card-title class="bg-primary text-white q-pa-sm">
        <span class="text-bold q-body-2">
          WORD
        </span>
      </q-card-title>
      <q-card-main class="q-mt-xl">
        <div class="row justify-center q-pt-xl" v-if="nextqn">
          <q-btn
            color="secondary"
            rounded
          >
            <span class="q-px-lg q-py-sm q-title">
              NEXT
              <i class="material-icons">arrow_forward</i>
            </span>
          </q-btn>
        </div>
        <div class="row justify-center q-pt-xl" v-if="!nextqn">
          <q-btn
            color="secondary"
            rounded
          >
            <span class="q-px-lg q-py-sm q-title">
              Submit
              <i class="material-icons">arrow_forward</i>
            </span>
          </q-btn>
        </div>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'NextQn',
  data () {
    return {
      nextqn: null
    }
  }
}
</script>

<style>
</style>
