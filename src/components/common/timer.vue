<template>
  <div class="row justify-center q-pa-lg">
    <q-knob
      v-model="timer"
      :min="min"
      :max="max"
      track-color="secondary"
      color="primary"
      readonly
      line-width="6px"
      size="150px"
      class="countdown"
    >
     <span class="text-black font-secondary">{{converttotime(duration)}}</span>
    </q-knob>
  </div>
</template>

<script>
export default {
  name: 'CountdownTimer',
  props: ['min', 'max', 'duration'],
  data () {
    return {
    }
  },
  methods: {
    startTimer () {
    },
    stopTimer () {
    },
    resetTimer () {
    },
    converttotime (timer) {
      let mins = Math.floor(timer / 60)
      let strmins = mins.toString().padStart(2, '0')
      let secs = timer % 60
      let strsecs = secs.toString().padStart(2, '0')
      return `${strmins}:${strsecs}`
    }
  }
}
</script>

<style>
.countdown {
  font-size: 24px;
  font-weight: bold;
}
</style>
