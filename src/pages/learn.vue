<template>
  <q-page class="container">
    <div class="full-height">
      <q-card class="tk-container-sub collapse full-height">
        <q-card-title class="title-bar">
          <div class="col">
            <h1>TOKILEARN</h1>
          </div>
        </q-card-title>
        <q-progress
          :percentage="progress"
          color="secondary"
          height="6px"
        />
        <q-card-main class="col tk-container-sub-inner">
          <div class="col">
            <div class="row q-mb-md">
              <div class="col-4">
              </div>
              <div class="col-4 row justify-center">
                <div class="row items-center self-center full-height q-pb-md">
                  <div class="row" v-for="(step, index) in steppers" :key="step.step" :class="{last: index === steppers.length -1, 'active-step': currStep >= step.step, current: currStep === step.step }">
                    <div class="col text-center relative-position">
                      <q-btn
                        round
                        align="center"
                        class="stepper-button"
                        @click="currStep = index + 1"
                      >
                       {{step.step}}
                      </q-btn>
                      <h6 class="font-primary q-mt-sm text-center step-label absolute-center"
                          :class="{'active-step': currStep >= step.step }">
                        {{step.label}}
                      </h6>
                    </div>
                    <div class="step-connector q-mb-md self-center"
                      :class="{'active-step': currStep > step.step }">
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-4 row justify-end items-center">
                <div class="text-right q-pr-lg">
                  <h6 class="font-primary text-bold q-pb-sm">
                    WORDS TO LEARN
                  </h6>
                  <h1 class="text-secondary font-primary text-bold q-display-1">
                    {{current + 1}} / {{words.length}}
                  </h1>
                </div>
              </div>
            </div>
            <div class="col">
              <transition
                mode="out-in"
                enter-active-class="animated fadeInLeft"
                leave-active-class="animated fadeOutRight"
              >
                <learn-one
                  :word="words[current].word"
                  :phonetics="words[current].phonetics"
                  :breakdown="words[current].breakdown"
                  :category="words[current].category"
                  @nextstep="nextStep"
                  v-if="steppers[currStep - 1].component === 'LearnOne' && !end"
                />
                <meaning-one
                  :word="words[current].word"
                  :definition="words[current].definition"
                  :images="words[current].images"
                  :examples="words[current].examples"
                  @nextstep="nextStep"
                  v-if="steppers[currStep - 1].component === 'MeaningOne' && !end"
                />
                <word-association
                  :word="words[current].word"
                  v-if="steppers[currStep - 1].component === 'WordAssociation' && !end"
                  @nextword="nextWord"
                  @wordmap="wordMap"
                />
                <end-study
                  @back="back"
                  v-if="end"
                />
              </transition>
            </div>
          </div>
        </q-card-main>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import WordAssociation from '../components/learn/wordassociation'
import LearnOne from '../components/learn/learnBasicOne'
import MeaningOne from '../components/learn/meaningBasicOne'
import EndStudy from '../components/learn/endstudy'
import { API } from 'aws-amplify'

const API_PATH = '/toki'
const API_NAME = 'toki'
export default {
  name: 'LearnBase',
  components: {
    WordAssociation,
    LearnOne,
    MeaningOne,
    EndStudy
  },
  data () {
    return {
      current: 0,
      steppers: [
        { step: 1, label: 'Word', component: 'LearnOne' },
        { step: 2, label: 'Meaning', component: 'MeaningOne' },
        { step: 3, label: 'Association', component: 'WordAssociation' }
      ],
      currStep: 1,
      words: [],
      images: [],
      studyDuration: 0,
      studyRecords: [],
      wordMap: [],
      end: false
    }
  },
  async mounted () {
    this.words = await API.get(API_NAME, API_PATH + '/getnewwords', {queryStringParameters: { course_id: 'b077af3f-8904-56d5-1ba8-865f81084c44' }})
    console.log(this.words)
  },
  computed: {
    progress () {
      return (this.current + 1) / this.words.length * 100
    }
  },
  methods: {
    async record () {
      const params = {
        body: {
          course: 'b077af3f-8904-56d5-1ba8-865f81084c44',
          word: this.words[this.current].word,
          word_id: this.words[this.current].word_id,
          duration: this.studyDuration,
          wordmap: this.wordMap,
          records: this.studyRecords
        }
      }
      const res = await API.post(API_NAME, API_PATH + '/wordbank', params)
      return res
    },
    nextStep (log) {
      this.studyRecords.push(log)
      this.studyDuration += log.duration
      if (this.currStep < this.steppers.length) {
        this.currStep += 1
      }
    },
    async lockin (log) {
      this.wordMap = log.associations
      delete log.associations
      this.studyRecords.push(log)
      this.studyDuration += log.duration
      const res = await this.record()
      console.log(res)
    },
    reset () {
      this.studyRecords = []
      this.studyDuration = 0
    },
    async nextWord (log) {
      this.$q.loading.show()

      if (this.current === this.words.length - 1) {
        this.$q.notify('All words Learnt!')
        await this.lockin(log)
        this.end = true
        this.$q.loading.hide()
        // this.$router.push('/dashboard')
        return
      }
      await this.lockin(log)
      this.reset()
      this.$q.loading.hide()
      this.current += 1
      this.currStep = 1
    },
    back () {
      console.log('go back to dash')
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'

.rounded-sm
  border-radius 10px

.stepper-button
  background-color $grey-4
  color $grey-7
  font-weight bold
  font-size 16px

div.active-step .stepper-button
  background-color $tk-yellow
  color $white
  border 4px solid $tk-yellow
  opacity 1 !important

div.active-step.current .stepper-button
  background-color $tk-yellow
  color white
  border none
  opacity 1 !important

.stepper-button .q-btn-inner
  font-size 24px

.step-connector
  background-color $grey-4
  height 8px
  width 140px
  margin-left -10px
  margin-right -10px
  margin-top 12px

.step-label
  color $grey-4
  top 100%
  margin-top 12px

.active-step.step-label
  color $tk-grey-full

.active-step.step-connector
  background-color $secondary
  opacity 1 !important

div.last .step-connector
  display none

</style>
