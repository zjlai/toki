<template>
  <q-card class="tk-container-sub collapse full-height">
    <q-card-title class="title-bar">
      <h1>TOKITEST</h1>
    </q-card-title>
    <q-card-main class="col tk-container-sub-inner">
      <div class="col">
        <div class="row">
          <div class="col-3 border-right">
            <timer
              :min="0"
              :max="30"
              :duration="30"
              ref="timer"
              @timesup="forceSubmit"
              @progress="progress"
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
              <div class="text-primary text-bold q-pb-sm" :class="fontSizeTitle">
                WORDS TESTED
              </div>
              <h1 class="text-black font-primary text-bold" :class="fontSizeBody">
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
              @ans="recordAns"
              @nextstep="nextStep"
              @mounted="startTimer"
              ref="narration"
              v-if="steppers[currStep - 1].component === 'Spelling' && !end"
            />
            <mcq
              :word="words[current].word"
              :options="words[current].options"
              @nextstep="nextStep"
              ref="mcq"
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
      const courses = await API.get(API_NAME_STUDENT, API_PATH_COURSES + '/mycourses')
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
    },
    fontSizeTitle () {
      return this.$q.screen.lt.xl ? 'h4' : 'h3'
    },
    fontSizeBody () {
      return this.$q.screen.lt.xl ? 'q-headline' : 'q-display-1'
    }
  },
  methods: {
    async getCourse () {
      const init = {
        queryStringParameters: {
          course: this.$route.query.course
        }
      }
      const res = await API.get(API_NAME_STUDENT, API_PATH_COURSES + '/mycourse', init)
      this.course = res[0]
      this.words = await API.get(API_NAME_TOKI, API_PATH_TOKI + '/gettestwords', { queryStringParameters: { course_id: this.course.course_id } })
      if (this.words.length > 0) {
        await this.recordStart()
      }
    },
    async recordStart () {
      const init = {
        queryStringParameters: {
          course: this.$route.query.course
        }
      }
      await API.get(API_NAME_TOKI, API_PATH_TOKI + '/recordstarttest', init)
    },
    async recordAns (data) {
      this.words[this.current].answer = data.answer.toLowerCase()
      this.words[this.current].result = data.result
      const params = {
        body: {
          course: this.course.course_id,
          word: this.words[this.current].word,
          word_id: this.words[this.current].word_id,
          answer: data.answer.toLowerCase(),
          result: data.result,
          duration: data.duration,
          section: data.section
        }
      }
      const res = await API.post(API_NAME_TOKI, API_PATH_TOKI + '/testrecords', params)
      return res
    },
    async record () {

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
      // this.testDuration = 0
      console.log(this.testDuration)
      this.$refs.timer.resetTimer()
    },
    async recordEndTest () {
      const params = {
        body: {
          course: this.course.course_id,
          records: this.testRecords,
          duration: this.testDuration,
          words: this.words,
          result: this.words.filter(v => v.result).length
        }
      }
      await API.post(API_NAME_TOKI, API_PATH_TOKI + '/recordendtest', params)
    },
    async submitTest () {
      const params = {
        body: {
          course: this.course.course_id
        }
      }
      await API.post(API_NAME_TOKI, API_PATH_TOKI + '/processtest', params)
    },
    async endTest () {
      this.recordEndTest()
      this.submitTest()
      this.$router.push({ name: 'summary', query: { course: this.course.course_id }, params: { words: this.words, duration: this.testDuration } })
    },
    async nextWord (log) {
      this.$q.loading.show()

      if (this.current === this.words.length - 1) {
        this.$q.notify('Test Finished!')
        await this.lockin(log)
        this.end = true
        this.$q.loading.hide()
        this.endTest()
        return
      }
      await this.lockin(log)
      this.reset()
      this.$q.loading.hide()
      this.current += 1
      this.currStep = 1
    },
    forceSubmit () {
      this.$refs.narration.nextStep()
    },
    progress (progress) {
    },
    startTimer () {
      this.$refs.timer.startTimer()
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
