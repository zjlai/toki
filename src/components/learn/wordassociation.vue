<template>
  <div class="col">
    <div class="row q-mt-md">
      <div class="col-4 q-pr-sm">
        <q-card class="rounded-sm no-shadow">
          <q-card-title class="bg-indigo-7 text-white text-center">
            <span class="text-weight-bold q-subheading">INSTRUCTIONS</span>
          </q-card-title>
          <q-card-main class="bg-primary">
            <div class="text-white font-secondary q-title text-weight-medium q-pa-lg">
              Based on the word presented to you,
              associate as many words with that word within
              <span class="text-secondary">3 minutes</span>
            </div>
          </q-card-main>
        </q-card>
        <q-card class="rounded-sm no-shadow q-pt-md" v-if="begin">
          <q-card-title class="bg-grey-4 text-primary text-center">
            <span class="text-weight-bold q-subheading">TIMER</span>
          </q-card-title>
          <q-card-main>
            <timer
              :min="0"
              :max="180"
              :duration="180"
            />
          </q-card-main>
        </q-card>
      </div>
      <div class="col-8 q-px-sm">
        <q-card class="rounded-sm no-shadow full-height" v-if="begin == false">
          <q-card-title class="bg-primary text-white text-center">
            <span class="text-weight-bold q-subheading">WORD ASSOCIATION</span>
          </q-card-title>
          <q-card-main class="center-button q-pa-none">
            <div class="row justify-center items-center full-height">
              <q-btn
                color="secondary"
                rounded
                @click="begin=true"
              >
                <span class="q-px-lg q-py-sm q-title">
                  BEGIN
                  <i class="material-icons">arrow_forward</i>
                </span>
              </q-btn>
            </div>
          </q-card-main>
        </q-card>
        <Mapper
          :word="word"
          v-if="begin"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Timer from '../common/timer'
import Mapper from '../learn/wordmapper'
export default {
  name: 'WordAssociationComponent',
  components: {
    Timer,
    Mapper
  },
  props: ['word'],
  data () {
    return {
      begin: false
    }
  }
}
</script>

<style>
</style>
