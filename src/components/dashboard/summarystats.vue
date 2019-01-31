<template>
  <div class="column">
    <div class="row items-center justify-center">
      <div class="col-auto q-pr-md">
        <h3 class="text-white text-regular">
          Mastery
        </h3>
      </div>
      <div class="row flex-grow items-center">
        <div class="column flex-grow">
          <q-progress :percentage="progress" color="secondary" height="1.5vh" class="radius-full" />
        </div>
        <h3 class="text-white col-auto q-pl-md">{{progress}}%</h3>
      </div>
    </div>
    <div class="row items-center justify-start">
      <div class="col-auto q-pr-md">
        <h3 class="text-white text-regular">
          Test Cycles Completed
        </h3>
      </div>
      <h3 class="text-white flex-grow text-right q-pr-md">{{stats.test_cycle - 1}}</h3>
    </div>
    <div class="row items-start justify-start">
      <div class="col-auto q-pr-sm">
        <h3 class="text-white text-regular">
          Time Spent Learning
        </h3>
      </div>
      <div class="row items-center justify-end flex-grow">
        <div class="column text-center q-px-sm">
          <h3 class="text-white">
            {{hoursLearnt}}
          </h3>
          <h6 class="text-white text-regular font-primary">
            HOURS
          </h6>
        </div>
        <div class="column text-center q-px-sm">
          <h3 class="text-white">
            {{minsLearnt}}
          </h3>
          <h6 class="text-white text-regular font-primary">
            MINS
          </h6>
        </div>
        <div class="column text-center q-px-sm">
          <h3 class="text-white">
            {{secsLearnt}}
          </h3>
          <h6 class="text-white text-regular font-primary">
            SECS
          </h6>
        </div>
      </div>
    </div>
    <div class="row items-center justify-start">
      <div class="col-auto q-pr-md">
        <h3 class="text-white text-regular">
          Last Activity
        </h3>
      </div>
      <h3 class="flex-grow text-white q-pr-sm text-right">{{lastDate}}</h3>
    </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify'
import { date } from 'quasar'

const API_PATH_TOKI = '/toki'
const API_NAME_TOKI = 'toki'

export default {
  name: 'SummaryStats',
  data () {
    return {
      stats: []
    }
  },
  async mounted () {
    const stats = await API.get(API_NAME_TOKI, API_PATH_TOKI + '/mystats', { queryStringParameters: { course: this.$route.query.course } })
    this.stats = stats[0]
    console.log(this.stats)
  },
  computed: {
    maxMastery () {
      return this.stats.words_total * 100
    },
    progress () {
      return parseInt(this.stats.mastery) / this.maxMastery * 100
    },
    duration () {
      return parseInt(this.stats.total_duration) / 1000
    },
    hoursLearnt () {
      return Math.floor(this.duration % (3600 * 24) / 3600)
    },
    minsLearnt () {
      return Math.floor(this.duration % 3600 / 60)
    },
    secsLearnt () {
      return Math.floor(this.duration % 60)
    },
    lastDate () {
      const updatedDate = new Date(this.stats.updated)
      console.log(updatedDate)
      let formattedString = date.formatDate(updatedDate, 'DD MMM YYYY hh:mm:ss A')
      console.log(formattedString)
      return formattedString
    }
  }
}
</script>

<style>
</style>
