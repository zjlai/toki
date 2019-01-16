<template>
  <div class="col">
    <div class="row">
      <q-card class="tk-container-sub collapse full-width">
        <q-card-title class="title-bar-blue text-center">
          <h4>No Test Available</h4>
        </q-card-title>
        <q-card-main class="tk-container-sub-inner">
          <div class="row justify-center items-center">
            <div class="col-auto">
              <img svg-inline src="../../assets/tokido.svg" class="toki-bot logo-yellow" />
            </div>
            <div class="col toki-speech text-center">
              <h3>You are not due for the next test yet!</h3>
              <h3>See if there are more words for you to learn. If not take a break!</h3>
              <h1> Next Test is on: {{timeToNextTest}}</h1>
            </div>
          </div>
        </q-card-main>
      </q-card>
    </div>
    <div class="row justify-center q-my-md">
      <q-btn
        color="primary"
        rounded
        class="font-secondary button"
        @click.native="back"
      >
        <span class="q-title">
          Back to Dashboard
          <i class="material-icons">arrow_forward</i>
        </span>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify'
import { date } from 'quasar'
const API_PATH_TOKI = '/toki'
const API_NAME_TOKI = 'toki'

export default {
  name: 'NoTest',
  data () {
    return {
      timeToNextTest: ''
    }
  },
  async mounted () {
    this.timeToNextTest = await API.get(API_NAME_TOKI, API_PATH_TOKI + '/nextcycle', { queryStringParameters: { course: this.$route.query.course } })
    this.timeToNextTest = date.formatDate(this.timeToNextTest, 'DD-MM-YYYY HH:mm A')
  },
  methods: {
    back () {
      this.$router.push({ path: '/dashboard', query: { course: this.$route.query.course } })
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'

.logo-yellow
  height: 100%;
  fill $secondary
</style>
