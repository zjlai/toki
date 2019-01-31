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
              <div class="col" :class="paddingSize">
                <p class="font-primary text-bold text-white" :class="fontSizeTitle">
                  Based on the word presented to you,
                  associate as many words with that word within
                  <span class="text-secondary">1 minute</span>.
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
                <div class="sub-title-blue q-mb-md text-bold" :class="fontSizeTitle">WORD</div>
                <div class="primary-font text-bold uppercase" :class="fontSizeBody">{{word}}</div>
              </div>
              <div class="col q-pa-md border-right">
                <div class="sub-title-blue q-mb-md text-bold" :class="fontSizeTitle">Associations</div>
                <div class="primary-font text-bold" :class="fontSizeBody">{{associations}}</div>
              </div>
              <!--<div class="col q-pa-md border-right">
                <div class="sub-title-blue q-mb-md text-bold" :class="fontSizeTitle">Avg Time per association</div>
                <div class="primary-font text-bold" :class="fontSizeBody">{{assocTime.toFixed(2)}}<span class="lowercase">s</span></div>
              </div>-->
            </div>
            <div class="row q-py-md">
              <div class="col-1">
              </div>
              <div class="col-10 q-pa-md">
                <q-chip v-for="assoc in associatedWords" :key="assoc.association"
                  color="secondary"
                  text-color="black"
                  class="mapped-chip caps text-bold q-mr-sm q-mb-md font-secondary"
                  :class="chipSize"
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

const timerDuration = 60

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
  computed: {
    fontSizeTitle () {
      return this.$q.screen.lt.xl ? 'h4' : 'h3'
    },
    fontSizeBody () {
      return this.$q.screen.lt.xl ? 'q-headline' : 'q-display-1'
    },
    paddingSize () {
      return this.$q.screen.lt.xl ? 'q-pa-sm' : 'q-pa-md'
    },
    chipSize () {
      return this.$q.screen.lt.xl ? 'q-subheading mapped-sm' : 'q-title mapped-lg'
    }
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
      if (duration === this.duration / 4 * 3) {
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
.mapped-lg {
  padding: 10px 40px;
}
.mapped-sm {
  padding: 5px 30px;
}
</style>
