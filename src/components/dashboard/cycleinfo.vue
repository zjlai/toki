<template>
  <div class="column" id="infobox">
    <div class="row items-center justify-center full-width transition">
      <div class="column q-pb-md">
        <svg id="tk-icon-layer" viewBox="0 0 76.37 76.37" :class="logoClass">
          <circle id="tk-icon-layer-head" cx="38.18" cy="38.18" r="27" />
          <polygon id="tk-icon-layer-beak" points="64.52 44.11 76.37 38.18 64.52 32.26 64.52 44.11" />
          <circle id="tk-icon-layer-eye" cx="47.73" cy="38.18" r="6.75" style="fill:#2f66e9"/>
        </svg>
      </div>
    </div>
    <div v-if="testReady">
      <p class="font-primary h3 text-center">
        It's time for your revision test.
        You have {{this.words.length}} words to revise.
      </p>
    </div>
    <div v-if="!testReady">
      <p class="font-primary h3 text-center" v-if="words.length === 0">
        You have no words to learn and your next revision
        is scheduled for {{testDate}}.
      </p>
      <p class="font-primary h3 text-center" v-if="words.length > 0">
        You have {{this.words.length}} words to learn.
      </p>
    </div>
    <div class="row items-center justify-center">
      <q-btn
        color="secondary"
        rounded
        class="font-secondary button"
        @click.native="toTest"
        v-if="testReady"
      >
        <span>
          Go to test
          <i class="material-icons">arrow_forward</i>
        </span>
      </q-btn>
      <q-btn
        color="secondary"
        rounded
        class="font-secondary button"
        @click.native="toLearn"
        v-if="!testReady && words.length > 0"
      >
        <span>
          Learn now
          <i class="material-icons">arrow_forward</i>
        </span>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify'
import { TimelineMax, Bounce } from 'gsap'

const API_PATH_TOKI = '/toki'
const API_NAME_TOKI = 'toki'

export default {
  name: 'Cycle',
  data () {
    return {
      testReady: null,
      words: [],
      testDate: ''
    }
  },
  async mounted () {
    this.testReady = await API.get(API_NAME_TOKI, API_PATH_TOKI + '/gettestready', { queryStringParameters: { course: this.$route.query.course } })
    if (!this.testReady) {
      this.words = await API.get(API_NAME_TOKI, API_PATH_TOKI + '/getnewwords', { queryStringParameters: { course_id: this.$route.query.course } })
      this.testDate = await API.get(API_NAME_TOKI, API_PATH_TOKI + '/nextcycle', { queryStringParameters: { course: this.$route.query.course } })
    } else {
      this.words = await API.get(API_NAME_TOKI, API_PATH_TOKI + '/gettestwords', { queryStringParameters: { course_id: this.$route.query.course } })
    }

    const tkAnim = new TimelineMax({ onComplete: this.complete })
    tkAnim
      .from('#tk-icon-layer-head', 0.8, { transformOrigin: 'center', scale: 0, ease: Bounce.easeOut }, 0)
      .from('#tk-icon-layer-beak', 0.8, { x: -40, autoAlpha: 0, ease: Bounce.easeOut }, 0.4)
      .from('#tk-icon-layer-eye', 1, { x: -20, transformOrigin: 'center', scale: 0, ease: Bounce.easeOut }, 0.6)
      .to('#tk-icon-layer', 1, { transformOrigin: 'center', rotation: 45, ease: Bounce.easeOut }, 1.6)
  },
  computed: {
    logoClass () {
      return this.animComplete ? 'logo-info small' : 'logo-info'
    }
  },
  methods: {
    toTest () {
      this.$router.push({ path: '/test', query: { course: this.$route.query.course } })
    },
    toLearn () {
      this.$router.push({ path: '/learn', query: { course: this.$route.query.course } })
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'

#infobox
  max-width 200px
.logo-info
  fill $secondary
  height 60px
.logo-info.small
  height 30px
</style>
