<template>
  <div class="col">
    <div class="row" v-if="!review">
      <div class="col-4">
        <q-card class="tk-container-sub collapse">
          <q-card-title class="title-bar-blue bg-blue-dark text-center">
            <h4>INSTRUCTIONS</h4>
          </q-card-title>
          <q-card-main class="tk-container-sub-inner bg-primary">
            <div class="row justify-center items-center">
              <div class="col q-py-xl">
                <p class="font-primary text-bold text-white q-title">
                  Based on the word presented to you,
                  associate as many words with that word within
                  <span class="text-secondary">3 minutes</span>.
                  Be Creative!
                </p>
              </div>
            </div>
          </q-card-main>
        </q-card>
        <q-card class="tk-container-sub collapse" v-show="begin">
          <q-card-title class="title-bar-grey text-center">
            <h4>TIMER</h4>
          </q-card-title>
          <q-card-main class="tk-container-sub-inner">
            <timer
              :min="0"
              :max="duration"
              ref="timer"
              @timesup="endAssoc"
              @progress="progress"
            />
          </q-card-main>
        </q-card>
      </div>
      <div class="col-8 q-px-sm">
        <q-card class="tk-container-sub collapse full" v-if="!begin && !review">
          <q-card-title class="title-bar-blue text-center">
            <h4>WORD ASSOCIATION</h4>
          </q-card-title>
          <q-card-main class="tk-container-sub-inner">
            <div class="row justify-center items-center q-py-xl">
              <q-btn
                color="secondary"
                rounded
                class="font-secondary"
                @click="beginMapping"
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
          :disabled="disabled"
          ref="mapper"
          @counter="updateAssoc"
          v-if="begin"
        />
        <div class="row justify-center q-my-xl" v-if="endEnable">
          <q-btn
            color="primary"
            rounded
            class="font-secondary button"
            @click="endMap"
          >
            <span class="q-title">
              I'm Done
              <i class="material-icons">arrow_forward</i>
            </span>
          </q-btn>
        </div>
      </div>
    </div>
    <div class="col" v-if="review">
      <q-card class="tk-container-sub collapse">
        <q-card-title class="title-bar-blue text-center">
          <h4>Word Association Review</h4>
        </q-card-title>
        <q-card-main class="tk-container-sub-inner">
          <div class="col">
            <div class="row">
              <div class="col q-pa-md border-right">
                <h6 class="sub-title-blue q-mb-md">WORD</h6>
                <h4 class="primary-font text-bold q-display-2">{{word}}</h4>
              </div>
              <div class="col q-pa-md border-right">
                <h6 class="sub-title-blue q-mb-md">Associations</h6>
                <h4 class="primary-font text-bold q-display-2">{{associations}}</h4>
              </div>
              <div class="col q-pa-md border-right">
                <h6 class="sub-title-blue q-mb-md">Avg Time per association</h6>
                <h4 class="primary-font text-bold q-display-2">{{assocTime.toFixed(2)}}<span class="lowercase">s</span></h4>
              </div>
            </div>
            <div class="row q-py-md">
              <div class="col-1">
              </div>
              <div class="col-10 q-pa-md">
                <q-chip v-for="assoc in associatedWords" :key="assoc.association"
                  color="secondary"
                  text-color="black"
                  class="mapped-chip mapped-large caps text-bold q-mr-sm q-mb-md q-title font-secondary"
                >
                  {{assoc.association}}
                </q-chip>
              </div>
              <div class="col-1">
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
                  Next Word
                  <i class="material-icons">arrow_forward</i>
                </span>
              </q-btn>
            </div>
          </div>
        </q-card-main>
      </q-card>
    </div>
  </div>
</template>

<script>
import Timer from '../common/timer'
import Mapper from '../learn/wordmapper'

const timerDuration = 180

export default {
  name: 'WordAssociationComponent',
  components: {
    Timer,
    Mapper
  },
  props: ['word'],
  data () {
    return {
      begin: false,
      disabled: false,
      endEnable: false,
      review: false,
      duration: timerDuration,
      totalDuration: timerDuration,
      timeElapsed: 0,
      associations: 0,
      assocTime: 0,
      associatedWords: [],
      startTime: 0,
      endEarly: false
    }
  },
  mounted () {
    this.startTime = Date.now()
  },
  methods: {
    beginMapping () {
      this.begin = true
      this.$refs.timer.startTimer()
    },
    disableMap () {
      this.disabled = true
    },
    updateAssoc (count) {
      this.associations = count
    },
    endAssoc () {
      this.disableMap()
      this.endMap()
      this.$q.notify('Time is up!')
    },
    calcAveTime () {
      this.assocTime = this.timeElapsed / this.associations
    },
    progress (duration) {
      if (duration === this.duration / 2) {
        this.endEnable = true
      }
      this.timeElapsed = this.duration - duration
    },
    endMap () {
      if (this.timeElapsed !== this.duration) {
        this.endEarly = true
      }
      this.$refs.timer.stopTimer()
      this.getWords()
      this.calcAveTime()
      this.disableMap()
      this.begin = false
      this.endEnable = false
      this.review = true
    },
    getWords () {
      this.associatedWords = this.$refs.mapper.getWords()
      console.log(this.associatedWords)
    },
    nextStep () {
      const currTime = Date.now()
      const sectionTime = currTime - this.startTime
      this.associatedWords.forEach((element, index) => {
        element.order = index + 1
      })
      this.$emit('nextword', { section: 'wordAssociationOne', duration: sectionTime, endEarly: this.endEarly, associations: this.associatedWords })
    }
  }
}
</script>

<style>
.caps {
  text-transform: uppercase;
}
.mapped-large {
  padding: 10px 40px;
}
</style>
