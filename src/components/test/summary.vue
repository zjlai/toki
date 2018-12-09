<template>
  <q-card class="tk-container-sub collapse full-height">
    <q-card-title class="title-bar">
      <h1>TOKITEST</h1>
    </q-card-title>
    <q-card-main class="col tk-container-sub-inner">
      <div class="col">
        <div class="row">
          <div class="col-10">
            <q-card class="tk-container-sub collapse">
              <q-card-title class="title-bar-blue text-center">
                <h4>TEST SUMMARY</h4>
              </q-card-title>
              <q-card-main class="tk-container-sub-inner">
                <div class="row items-center q-py-md">
                  <div class="col text-center border-right">
                    <h6 class="sub-title-blue q-subheading text-bold">
                      AVG TIME PER QUESTION
                    </h6>
                    <h5 class="primary-font q-display-1 text-bold">
                      {{duration / words.length / 1000}} Secs
                    </h5>
                  </div>
                  <div class="col text-center border-right">
                    <h6 class="sub-title-blue q-subheading text-bold">
                      NO. OF WORDS TESTED
                    </h6>
                    <h5 class="primary-font q-display-1 text-bold">
                      {{words.length}}
                    </h5>
                  </div>
                  <div class="col text-center">
                    <h6 class="sub-title-blue q-subheading text-bold">
                      TOTAL TIME
                    </h6>
                    <h5 class="primary-font q-display-1 text-bold">
                      {{duration / 1000}} Secs
                    </h5>
                  </div>
                </div>
                <div class="col q-py-md">
                  <h6 class="sub-title-blue q-subheading text-bold text-center">
                    WORDS TESTED
                  </h6>
                  <div class="q-ma-lg">
                    <q-chip v-for="word in words" :key="word.word"
                      color="secondary"
                      text-color="black"
                      class="mapped-chip caps text-bold q-mr-sm q-px-lg q-mb-md"
                    >
                      {{word.word}}
                    </q-chip>
                  </div>
                </div>
              </q-card-main>
            </q-card>
          </div>
          <div class="col-2">
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
          </div>
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
      >
        <span class="q-px-lg q-py-sm q-title">
          Back to Dashboard
          <i class="material-icons">arrow_forward</i>
        </span>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import Timer from '../common/timer'

export default {
  name: 'TestSummary',
  components: {
    Timer
  },
  mounted () {
    console.log(this.$route)
    this.words = this.$route.params.words
    this.duration = this.$route.params.duration
  },
  data () {
    return {
      words: [],
      duration: 0
    }
  },
  methods: {
    backToDash () {
      this.$router.push({ path: 'dashboard', query: { course: this.course_id } })
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
