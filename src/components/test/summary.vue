<template>
  <q-card class="bg-white container rounded shadow-8">
    <q-card-main class="col q-pt-none">
      <q-toolbar color="white">
        <q-toolbar-title class="text-primary text-bold">
          TOKI TEST
        </q-toolbar-title>
      </q-toolbar>
      <div class="col">
        <div class="row">
          <div class="col-10 q-pr-lg">
            <q-card class="rounded-sm no-shadow">
              <q-card-title class="bg-primary text-white text-center">
                <span class="text-weight-bold q-subheading">TEST SUMMARY</span>
              </q-card-title>
              <q-card-main>
                <div class="row q-ma-md">
                  <div class="col q-my-md">
                    <div class="text-primary text-weight-bold text-center q-subheading">
                      AVG TIME PER QUESTION
                    </div>
                    <div class="text-black text-weight-bold text-center q-display-1">
                      {{test.avetime}}
                    </div>
                  </div>
                  <div class="col q-my-md">
                    <div class="text-primary text-weight-bold text-center q-subheading">
                      NO. OF WORDS TESTED
                    </div>
                    <div class="text-black text-weight-bold text-center q-display-1">
                      {{test.wordcount}}
                    </div>
                  </div>
                  <div class="col q-my-md">
                    <div class="text-primary text-weight-bold text-center q-subheading">
                      TOTAL TIME
                    </div>
                    <div class="text-black text-weight-bold text-center q-display-1">
                      {{test.totaltime}}
                    </div>
                  </div>
                </div>
                <div class="col q-my-lg">
                  <div class="text-primary text-weight-bold text-center q-subheading">
                    WORDS TESTED
                  </div>
                  <div class="q-ma-lg">
                    <q-chip v-for="words in test.results" :key="words.word"
                      color="secondary"
                      text-color="black"
                      class="mapped-chip caps text-weight-bold q-mr-sm q-px-lg"
                    >
                      {{words.word}}
                    </q-chip>
                  </div>
                </div>
              </q-card-main>
            </q-card>
          </div>
          <div class="col-2">
            <q-card class="rounded-sm no-shadow">
              <q-card-title class="bg-primary text-white text-center">
                <span class="text-weight-bold q-caption">NEXT TEST</span>
              </q-card-title>
              <q-card-main>
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
    <q-card-actions align="center">
      <q-btn
        flat
        no-caps
        class="font-secondary text-grey-5"
      >
        <span class="q-px-lg q-py-sm q-subheading text-weight-bold">
          <i class="material-icons">arrow_back</i>
          Back to Dashboard
        </span>
      </q-btn>
      <q-btn
        color="primary"
        rounded
      >
        <span class="q-px-lg q-py-sm q-title">
          LEARN
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
  data () {
    return {
      test: {
        avetime: '0:15 min',
        wordcount: 20,
        totaltime: '5:21 min',
        results: [
          { word: 'abase', bracket: 'mastered' },
          { word: 'cheapen', bracket: 'mastered' },
          { word: 'corrupt', bracket: 'progress' },
          { word: 'debase', bracket: 'progress' },
          { word: 'debauch', bracket: 'progress' },
          { word: 'crumble', bracket: 'progress' },
          { word: 'disintegratee', bracket: 'revisit' },
          { word: 'ebb', bracket: 'revisit' }
        ]
      }
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
