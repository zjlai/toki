<template>
  <div class="col">
    <div class="row">
      <div class="col-5">
        <q-card class="tk-container-sub collapse">
          <q-card-title class="title-bar-blue bg-blue-dark text-center">
            <h4>INSTRUCTIONS</h4>
          </q-card-title>
          <q-card-main class="tk-container-sub-inner bg-primary">
            <h1 class="font-primary text-white text-bold q-py-lg">
              Listen to the word that is played and type out your answer below
            </h1>
          </q-card-main>
        </q-card>
      </div>
      <div class="col-7">
        <q-card class="tk-container-sub collapse">
          <q-card-title class="title-bar-blue text-center">
            <h4>WORD</h4>
          </q-card-title>
          <q-card-main class="tk-container-sub-inner">
            <div class="col">
              <div class="row justify-center items-center q-py-lg">
                <q-btn round size="xl" color="primary" text-color="white" icon="volume_up" @click.native="speak"/>
              </div>
            </div>
          </q-card-main>
        </q-card>
      </div>
    </div>
    <div class="col">
      <q-card class="tk-container-sub collapse">
        <q-card-title class="title-bar-blue text-center">
          <h4>YOUR ANSWER</h4>
        </q-card-title>
        <q-card-main class="tk-container-sub-inner">
          <div class="col q-my-md">
            <q-input v-model="ans" align="center" upper-case autofocus hide-underline class="biginput text-black text-bold q-display-3 q-my-xl" />
          </div>
        </q-card-main>
      </q-card>
    </div>
    <div class="row justify-center q-my-md">
      <q-btn
        color="secondary"
        rounded
        class="font-secondary button"
        @click.native="nextStep"
      >
        <span class="q-px-lg q-py-sm q-title">
          <span v-if="!end">PROCEED</span>
          <span v-if="end">Finish!</span>
          <i class="material-icons" v-if="!end">arrow_forward</i>
        </span>
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentNarration',
  props: ['word', 'end'],
  data () {
    return {
      ans: '',
      startTime: 0
    }
  },
  mounted () {
    this.utterance = new SpeechSynthesisUtterance(this.word)
    this.utterance.lang = 'en-GB'
    this.startTime = Date.now()
    this.speak()
  },
  methods: {
    speak () {
      this.$tts.speak(this.utterance)
    },
    nextStep () {
      const currTime = Date.now()
      const sectionTime = currTime - this.startTime
      this.$tts.cancel()
      this.$emit('nextstep', { section: 'narration', duration: sectionTime })
    }
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
