<template>
  <div class="col">
    <div class="row">
      <div class="col-6">
        <q-card class="tk-container-sub collapse">
          <q-card-title class="title-bar-blue text-center">
            <h4>Word</h4>
          </q-card-title>
          <q-card-main class="tk-container-sub-inner bg-primary">
            <div class="row justify-center items-center">
              <div class="col text-center q-py-xl">
              <h1 class="font-primary q-display-3 text-white text-bold">{{word}}</h1>
              <h3 class="font-primary text-bold text-secondary">({{category}})</h3>
              </div>
            </div>
          </q-card-main>
        </q-card>
      </div>
      <div class="col-6">
        <q-card class="tk-container-sub collapse">
          <q-card-title class="title-bar-grey text-center">
            <h4>Hear the Word</h4>
          </q-card-title>
          <q-card-main class="tk-container-sub-inner">
            <div class="col">
              <div class="row justify-center items-center">
                <q-btn round size="xl" color="primary" text-color="white" icon="volume_up" @click.native="speak"/>
              </div>
            </div>
          </q-card-main>
        </q-card>
        <q-card class="tk-container-sub collapse">
          <q-card-title class="title-bar-grey text-center">
            <h4>Speak it</h4>
          </q-card-title>
          <q-card-main class="tk-container-sub-inner">
            <div class="row items-center">
              <div class="col text-center border-right">
                <h6 class="sub-title-blue">Breakdown</h6>
                <h5 class="font-primary">
                  {{breakdown}}
                </h5>
              </div>
              <div class="col text-center">
                <h6 class="sub-title-blue">Pronunciation</h6>
                <h5 class="font-primary">
                  {{phonetics}}
                </h5>
              </div>
            </div>
          </q-card-main>
        </q-card>
      </div>
    </div>
    <div class="row justify-center q-my-md">
      <q-btn
        color="primary"
        rounded
        class="font-secondary"
        @click.native="nextStep"
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
  name: 'BasicLearn01',
  props: ['word', 'category', 'breakdown', 'phonetics'],
  data () {
    return {
      startTime: 0
    }
  },
  mounted () {
    this.utterance = new SpeechSynthesisUtterance(this.word)
    this.utterance.lang = 'en-GB'
    this.startTime = Date.now()
  },
  methods: {
    speak () {
      this.$tts.speak(this.utterance)
    },
    nextStep () {
      const currTime = Date.now()
      const sectionTime = currTime - this.startTime
      this.$tts.cancel()
      this.$emit('nextstep', { section: 'learnBasicOne', duration: sectionTime })
    }
  }
}
</script>

<style>
</style>
