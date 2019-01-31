<template>
  <div class="col">
    <div class="row">
      <div class="column col-auto">
        <q-card class="tk-container-sub collapse">
          <q-card-title class="title-bar-blue text-center">
            <h4>
              Info
            </h4>
          </q-card-title>
          <q-card-main class="tk-container-sub-inner bg-blue">
            <cycle-info class="text-white" />
          </q-card-main>
        </q-card>
      </div>
      <div class="column flex-grow">
        <q-card class="tk-container-sub collapse">
          <q-card-title class="title-bar-blue text-center">
            <h4>
              Summary Stats
            </h4>
          </q-card-title>
          <q-card-main class="tk-container-sub-inner bg-blue">
            <stats-summ class="text-white" />
          </q-card-main>
        </q-card>
      </div>
      <div class="column full-width">
        <q-card class="tk-container-sub collapse">
          <q-card-title class="title-bar-yellow">
            <h4>
              WORD MASTERY
            </h4>
          </q-card-title>
          <q-card-main class="tk-container-sub-inner">
            <words-graph class="full-width" />
          </q-card-main>
        </q-card>
      </div>
      <div class="column full-width">
        <q-card class="tk-container-sub collapse">
          <q-card-title class="title-bar-blue">
            <h4>
              Test Results
            </h4>
          </q-card-title>
          <q-card-main class="tk-container-sub-inner">
            <results-graph class="full-width" />
          </q-card-main>
        </q-card>
      </div>
      <!--<div class="col-8">
        <q-card class="tk-container-sub collapse">
          <q-card-title class="title-bar-grey">
            <h4 class="text-grey-full text-center">
              YOUR CURRENT PACE
            </h4>
          </q-card-title>
          <q-card-main class="tk-container-sub-inner">
            Bar graph
          </q-card-main>
        </q-card>
      </div>
    </div>
    <div class="row">
      <div class="col-2">
        <q-card class="tk-container-sub collapse">
          <q-card-title class="title-bar-grey">
            <h4 class="text-grey-full text-center">
              MASTERY LEVEL
            </h4>
          </q-card-title>
          <q-card-main class="tk-container-sub-inner">
            <mastery-knob :mastery="mastery" />
          </q-card-main>
        </q-card>
      </div>
      <div class="col-2">
        <q-card class="tk-container-sub collapse">
          <q-card-title class="title-bar-grey">
            <h4 class="text-grey-full text-center">
              MILESTONES
            </h4>
          </q-card-title>
          <q-card-main class="tk-container-sub-inner">
            <div class="col">
              <div class="col text-center font-primary text-black">
                <h1 class="q-display-1 text-bold">5</h1>
                <p class="text-bold text-primary q-subheading">REACHED</p>
              </div>
              <div class="col text-center font-primary text-black">
                <h1 class="q-display-1 text-bold">120</h1>
                <p class="text-bold text-primary q-subheading">To next level</p>
              </div>
            </div>
          </q-card-main>
        </q-card>
      </div>
      <div class="col-8">
        <q-card class="tk-container-sub collapse">
          <q-card-title class="title-bar-grey">
            <h4 class="text-grey-full text-center">
              TOP COHORT PERFORMERS (PLACEHOLDER)
            </h4>
          </q-card-title>
          <q-card-main class="tk-container-sub-inner">
            Bar graph
          </q-card-main>
        </q-card>
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <q-card class="tk-container-sub collapse">
          <q-card-title class="title-bar-grey">
            <h4 class="text-grey-full text-center">
              3 HARDEST WORDS
            </h4>
          </q-card-title>
          <q-card-main class="tk-container-sub-inner">
            <q-list
              no-border
            >
              <q-item v-for="(word, index) in hardestwords" :key="word">
                <h5 class="font-primary text-bold">
                  {{index + 1}}. <span class="text-secondary capitalize">{{word}}</span>
                </h5>
              </q-item>
            </q-list>
          </q-card-main>
        </q-card>
      </div>
      <div class="col-3">
        <q-card class="tk-container-sub collapse">
          <q-card-title class="title-bar-grey">
            <h4 class="text-grey-full text-center">
              3 EASIEST WORDS
            </h4>
          </q-card-title>
          <q-card-main class="tk-container-sub-inner">
            <q-list
              no-border
            >
              <q-item v-for="(word, index) in easiestwords" :key="word">
                <h5 class="font-primary text-bold">
                  {{index + 1}}. <span class="text-primary capitalize">{{word}}</span>
                </h5>
              </q-item>
            </q-list>
          </q-card-main>
        </q-card>
      </div>-->
    </div>
  </div>
</template>

<script>
import Timer from '../common/timer'
import MasteryKnob from '../common/masteryknob'
import WordsGraph from '../graphs/mywords'
import ResultsGraph from '../graphs/mytests'
import CycleInfo from './cycleinfo'
import StatsSumm from './summarystats'
import { API } from 'aws-amplify'
import { date } from 'quasar'

const API_PATH_TOKI = '/toki'
const API_NAME_TOKI = 'toki'

export default {
  name: 'CourseDetailsDashboard',
  components: {
    Timer,
    MasteryKnob,
    WordsGraph,
    ResultsGraph,
    CycleInfo,
    StatsSumm
  },
  props: ['course'],
  data () {
    return {
      newwords: ['Antartic', 'Deteriorate', 'Onomatopoeia', 'long list', 'longer list'],
      hardestwords: ['Antartic', 'Deteriorate', 'Onomatopoeia'],
      easiestwords: ['Antartic', 'Deteriorate', 'Onomatopoeia'],
      mastery: 25
    }
  },
  async mounted () {
    console.log(this.course)
    this.getNextTest()
  },
  methods: {
    async getNextTest () {
      const nextTest = await API.get(API_NAME_TOKI, API_PATH_TOKI + '/nextcycle', { queryStringParameters: { course: this.$route.query.course } })
      console.log(nextTest)
      this.nextTestString = date.formatDate(nextTest, 'ddd, D MMM HH:MM')
      const currentTs = new Date()
      const timeToTest = date.getDateDiff(currentTs, nextTest, 'hours')
      console.log(timeToTest)
      console.log(this.nextTestString)
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'

.flex-grow
  flex-grow 1
</style>
