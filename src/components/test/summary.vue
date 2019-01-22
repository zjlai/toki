<template>
  <q-card class="tk-container-sub collapse full-height">
    <q-card-title class="title-bar">
      <h1>TOKITEST</h1>
    </q-card-title>
    <q-card-main class="col tk-container-sub-inner">
      <div class="col">
        <div class="row">
          <div class="col">
            <q-card class="tk-container-sub collapse">
              <q-card-title class="title-bar-blue text-center">
                <h4>TEST SUMMARY</h4>
              </q-card-title>
              <q-card-main class="tk-container-sub-inner">
                <div class="row items-center q-py-md">
                  <div class="col text-center border-right">
                    <h6 class="sub-title-blue text-bold" :class="fontSizeTitle">
                      NO. OF WORDS TESTED
                    </h6>
                    <p class="primary-font text-bold q-mb-none" :class="fontSizeBody">
                      {{words.length}}
                    </p>
                  </div>
                  <div class="col text-center border-right">
                    <h6 class="sub-title-blue text-bold" :class="fontSizeTitle">
                      RESULTS
                    </h6>
                    <p class="primary-font text-bold q-mb-none"  :class="fontSizeBody">
                      {{results}} / {{words.length}}
                    </p>
                  </div>
                  <div class="col text-center">
                    <h6 class="sub-title-blue text-bold" :class="fontSizeTitle">
                      TEST DURATION
                    </h6>
                    <p class="primary-font text-bold q-mb-none"  :class="fontSizeBody">
                      {{(duration / 1000).toFixed(0)}} Secs
                    </p>
                  </div>
                </div>
                <div class="col q-py-md">
                  <h6 class="sub-title-blue q-subheading text-bold text-center">
                    WORDS TESTED
                  </h6>
                  <div class="row q-pa-md items-center justify-center">
                    <div v-for="word in sortedWords" :key="word.word" class="col-6 q-mb-sm">
                      <div class="row">
                        <q-chip
                          :color="chipColor(word)"
                          text-color="black"
                          class="mapped-chip caps text-bold q-px-lg q-mr-md"
                        >
                          {{word.answer}}
                        </q-chip>
                        <q-icon name="done" color="primary" size="1.5rem" v-if="word.result"/>
                        <q-icon name="clear" color="warning" size="1.5rem" v-if="!word.result"/>
                        <div class="text-black text-bold caps q-ml-md row items-center" v-if="!word.result">{{word.word}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-main>
            </q-card>
          </div>
          <!--<div class="col-2">
            <q-card class="tk-container-sub collapse">
              <q-card-title class="title-bar-blue text-center">
                <h4>NEXT TEST</h4>
              </q-card-title>
              <q-card-main class="tk-container-sub-inner">
                <timer
                  :min="0"
                  :max="259200"
                  :duration="172913"
                  range="days"
                />
              </q-card-main>
            </q-card>
          </div>-->
        </div>
      </div>
    </q-card-main>
    <q-card-actions align="center" class="q-pb-lg">
    <!--  <q-btn
        flat
        no-caps
        class="text-grey-5"
      >
        <span class="q-px-lg q-py-sm q-subheading text-weight-bold">
          <i class="material-icons">arrow_back</i>
          Back to Dashboard
        </span>
      </q-btn> -->
      <q-btn
        color="primary"
        rounded
        class="font-secondary button"
        @click.native="backToDash"
        v-if="!testReady"
      >
        <span class="q-px-lg q-py-sm q-title">
          Back to Dashboard
          <i class="material-icons">arrow_forward</i>
        </span>
      </q-btn>
      <q-btn
        color="primary"
        rounded
        class="font-secondary button"
        @click.native="nextTest"
        v-if="testReady"
      >
        <span class="q-px-lg q-py-sm q-title">
          Next Test
          <i class="material-icons">arrow_forward</i>
        </span>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import Timer from '../common/timer'
import { API } from 'aws-amplify'

const API_PATH_TOKI = '/toki'
const API_NAME_TOKI = 'toki'

export default {
  name: 'TestSummary',
  components: {
    Timer
  },
  async mounted () {
    console.log(this.$route)
    this.words = this.$route.params.words || []
    this.duration = this.$route.params.duration
    if (this.words.length > 0) {
      this.words.forEach(word => {
        if (word.result) {
          this.results += 1
        }
      })
      this.sortedWords = this.words.sort((a, b) => { return a.result - b.result })
    }
    this.testReady = await API.get(API_NAME_TOKI, API_PATH_TOKI + '/gettestready', { queryStringParameters: { course: this.$route.query.course } })
    console.log(this.testReady)
  },
  computed: {
    fontSizeTitle () {
      return this.$q.screen.lt.xl ? 'h4' : 'h3'
    },
    fontSizeBody () {
      return this.$q.screen.lt.xl ? 'q-headline' : 'q-display-1'
    }
  },
  data () {
    return {
      words: [],
      duration: 0,
      results: 0,
      sortedWords: [],
      testWords: [],
      testReady: false
    }
  },
  methods: {
    backToDash () {
      this.$router.push({ path: '/dashboard', query: { course: this.$route.query.course } })
    },
    nextTest () {
      this.$router.push({ path: '/test', query: { course: this.$route.query.course } })
    },
    chipColor (res) {
      return res.result ? 'secondary' : 'primary'
    }
  }
}
</script>

<style>
.caps {
  text-transform: uppercase;
}
.mapped-chip {
}
</style>
