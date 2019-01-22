<template>
  <div class="col">
    <div class="row">
      <div class="col-5">
        <q-card class="tk-container-sub collapse">
          <q-card-title class="title-bar-blue bg-blue-dark text-center">
            <h4>INSTRUCTIONS</h4>
          </q-card-title>
          <q-card-main class="tk-container-sub-inner bg-primary">
            <div class="font-primary text-white no-transform" :class="paddingSize">
              Listen to the word that is played and type out your answer below
            </div>
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
              <div class="row justify-center items-center" :class="paddingSize">
                <q-btn round :size="speakerSize" color="primary" text-color="white" icon="volume_up" @click.native="speak"/>
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
            <q-input @keyup.enter="nextStep" ref="input" v-model="ans" align="center" upper-case autofocus hide-underline class="text-black text-bold" :class="inputSize" />
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
    this.utterance.rate = 0.9
    this.startTime = Date.now()
    this.speak()
    this.$emit('mounted')
  },
  computed: {
    paddingSize () {
      return this.$q.screen.lt.xl ? 'q-py-sm h3' : 'q-py-lg h1'
    },
    speakerSize () {
      return this.$q.screen.lt.xl ? 'lg' : 'xl'
    },
    inputSize () {
      return this.$q.screen.lt.xl ? 'q-display-1 mdinput q-my-sm' : 'q-display-2 biginput q-my-lg'
    }
  },
  methods: {
    speak () {
      this.$tts.speak(this.utterance)
      this.$refs.input.focus()
    },
    nextStep () {
      const currTime = Date.now()
      const sectionTime = currTime - this.startTime
      this.$tts.cancel()
      const result = this.ans.toLowerCase() === this.word.toLowerCase()
      this.$emit('ans', { answer: this.ans, result: result, duration: sectionTime, word: this.word, section: 'narration' })
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

.mdinput
  line-height 48px
  height 48px

.mdinput input
  height 48px
</style>
