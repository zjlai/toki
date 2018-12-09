<template>
  <div class="col">
    <q-card class="tk-container-sub collapse">
      <q-card-title class="title-bar-blue text-center">
        <h4>
          Next Question
        </h4>
      </q-card-title>
      <q-card-main class="q-mt-xl">
        <div class="row justify-center q-my-md" v-if="nextqn">
          <q-btn
            color="secondary"
            rounded
            class="font-secondary button"
            @click.native="nextStep"
          >
            <span class="q-px-lg q-py-sm q-title">
              NEXT
              <i class="material-icons">arrow_forward</i>
            </span>
          </q-btn>
        </div>
        <div class="row justify-center q-my-md" v-if="!nextqn">
          <q-btn
            color="secondary"
            rounded
            class="font-secondary button"
            @click.native="nextStep"
          >
            <span class="q-px-lg q-py-sm q-title">
              SUBMIT
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
