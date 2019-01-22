<template>
  <div class="row inline items-end full-width">
    <div class="col-auto q-pr-xl">
      <img svg-inline src="../../assets/tokido.svg" class="toki-bot logo-blue" />
    </div>
    <div class="col inline toki-speech">
      <div class="row justify-between">
        <h6>
          {{longdate}}, {{day}}
        </h6>
        <h6>
          {{time}}
        </h6>
      </div>
      <br>
      <div class="col">
        <h5 class="text-bold text-primary">
          GOOD DAY,
        </h5>
        <p class="h4 text-bold font-primary">
          {{message}}
        </p>
      </div>
      <!--<div class="q-my-md">
        <q-btn
          flat
          color="white"
          text-color="primary"
          class="q-caption q-px-none font-secondary text-weight-bold"
        >
          TAKE ME TO MY LESSON
          <i class="material-icons">arrow_forward</i>
        </q-btn>
      </div>-->
    </div>
  </div>
</template>

<script>
// import { date } from 'quasar'
import { API } from 'aws-amplify'

const API_PATH_TOKI = '/toki'
const API_NAME_TOKI = 'toki'

export default {
  name: 'TokiMessage',
  props: ['course'],
  data () {
    const d = new Date()
    const longdate = d.toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' })
    const day = d.toLocaleDateString('en-SG', { weekday: 'short' })
    const time = d.toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit' })
    return {
      name: '',
      message: '',
      longdate,
      day,
      time,
      words: []
    }
  },
  async mounted () {
    this.words = await API.get(API_NAME_TOKI, API_PATH_TOKI + '/getnewwords', { queryStringParameters: { course_id: this.$route.query.course } })
    console.log(this.words)
    if (this.words.length > 0) {
      this.message = `You have ${this.words.length} new words to learn! Go to the learning tab to begin!`
    } else {
      this.message = `You have no words to learn. Go to the Tests tabs to see if you have a test ready for you.`
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'

.logo-blue
  height 100%
  width 60px
  fill $primary

.caps {
  text-transform: uppercase;
}
img.small {
  width: 64px;
}
div.triangle {
  width: 0;
  height: 0;
  border-left: 24px solid transparent;
  border-right: 24px solid transparent;
  border-bottom: 24px solid white;
  position: absolute;
  left: 130px;

}
</style>
