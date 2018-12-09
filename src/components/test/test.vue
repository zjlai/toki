<template>
  <q-card class="tk-container-sub collapse full-height">
    <q-card-title class="title-bar">
      <h1>TOKITEST</h1>
    </q-card-title>
    <q-card-main class="col tk-container-sub-inner">
      <div class="col">
        <div class="row q-mb-md">
          <div class="col-3 border-right">
            <timer
              :min="0"
              :max="180"
              :duration="175"
            />
          </div>
          <div class="col-6 row justify-center border-right">
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
          <div class="col-3 row justify-center items-center">
            <div class="text-center">
              <h6 class="text-primary text-bold q-pb-sm q-subheading">
                WORDS TESTED
              </h6>
              <h1 class="text-black font-primary text-bold q-display-1">
                {{current + 1}} / {{this.words.length}}
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
            <narration
              :word="words[current].word"
              :key="words[current].word"
              :end="lastWord"
              @nextstep="nextStep"
              v-if="steppers[currStep - 1].component === 'Spelling' && !end"
            />
            <mcq
              :word="words[current].word"
              :options="words[current].options"
              @nextstep="nextStep"
              v-if="steppers[currStep - 1].component === 'MCQ' && !end"
            />
            <next-qn
              @nextstep="nextWord"
              v-if="steppers[currStep - 1].component === 'Next' && !end"
            />
          </transition>
        </div>
      </div>
    </q-card-main>
  </q-card>
</template>

<script>
import Timer from '../common/timer'
import Narration from './narration'
import Mcq from './mcq'
import NextQn from './nextqn'
import { API } from 'aws-amplify'

const API_PATH_TOKI = '/toki'
const API_NAME_TOKI = 'toki'
const API_PATH_COURSES = '/courses'
const API_NAME_STUDENT = 'students'

export default {
  name: 'TestingMain',
  components: {
    Timer,
    Narration,
    Mcq,
    NextQn
  },
  async mounted () {
    if (this.$route.query.hasOwnProperty('course')) {
      this.getCourse()
    } else {
      const courses = await API.get(API_NAME_STUDENT, API_PATH_COURSES + '/mycourses', { queryStringParameters: { course: '' } })
      this.$router.replace({ query: { course: courses[0].course_id } })
      this.getCourse()
    }
  },
  data () {
    return {
      current: 0,
      steppers: [
        { step: 1, label: 'Spelling', component: 'Spelling' }
        // { step: 2, label: 'MCQ', component: 'MCQ' },
        // { step: 2, label: 'Next', component: 'Next' }
      ],
      currStep: 1,
      test: {
        count: 18
      },
      end: false,
      testRecords: [],
      testDuration: 0,
      words: []
    }
  },
  computed: {
    lastWord () {
      return this.current === this.words.length - 1
    }
  },
  methods: {
    async getCourse () {
      const init = {
        queryStringParameters: {
          course: this.$route.query.course
        }
      }
      const res = await API.get(API_NAME_STUDENT, API_PATH_COURSES + '/mycourses', init)
      this.course = res[0]
      this.words = await API.get(API_NAME_TOKI, API_PATH_TOKI + '/gettestwords', { queryStringParameters: { course_id: this.course.course_id } })
      console.log(this.words[this.current].word)
    },
    async record () {
      // const params = {
      //  body: {
      //    course: this.course.course_id,
      //    word: this.words[this.current].word,
      //    word_id: this.words[this.current].word_id,
      //    duration: this.studyDuration,
      //    wordmap: this.wordMap,
      //    records: this.studyRecords
      //  }
      // }
      //  const res = await API.post(API_NAME_TOKI, API_PATH_TOKI + '/wordbank', params)
      // return res
    },
    nextStep (log) {
      if (this.currStep < this.steppers.length) {
        this.testRecords.push(log)
        this.testDuration += log.duration
        this.currStep += 1
      } else {
        this.nextWord(log)
      }
    },
    async lockin (log) {
      this.testRecords.push(log)
      this.testDuration += log.duration
      const res = await this.record()
      console.log(res)
    },
    reset () {
      this.testRecords = []
      this.testDuration = 0
    },
    async nextWord (log) {
      this.$q.loading.show()

      if (this.current === this.words.length - 1) {
        this.$q.notify('Test Finished!')
        await this.lockin(log)
        this.end = true
        this.$q.loading.hide()
        this.$router.push({ name: 'summary', query: { course: this.course.course_id }, params: { words: this.words, duration: this.testDuration } })
        return
      }
      await this.lockin(log)
      this.reset()
      this.$q.loading.hide()
      this.current += 1
      this.currStep = 1
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'

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
