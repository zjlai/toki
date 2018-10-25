<template>
  <q-card>
    <q-card-title class="bg-primary text-center">
      <span class="text-white text-bold">
        COURSE DETAILS
      </span>
    </q-card-title>
    <q-card-main>
      <div class="col">
        <div class="row q-pa-md">
          <div class="col-2 q-px-sm">
            <q-card class="shadow-none">
              <q-card-title class="bg-primary text-center">
                <span class="text-bold q-caption text-white">
                  NEXT TEST
                </span>
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
          <div class="col-2 q-px-sm">
            <q-card class="shadow-none">
              <q-card-title class="bg-secondary text-center">
                <span class="text-bold q-caption text-grey-8">
                  NEW WORDS
                </span>
              </q-card-title>
              <q-card-main>
                <q-list
                  no-border
                  class="q-pa-sm"
                >
                  <q-item v-for="(word, index) in newwords" :key="word">
                    <span class="text-grey-8 font-secondary q-subheading text-weight-bold">
                      {{index + 1}}. {{word}}
                    </span>
                  </q-item>
                </q-list>
              </q-card-main>
            </q-card>
          </div>
          <div class="col-8 q-px-sm">
            <q-card class="shadow-none">
              <q-card-title class="bg-grey-4 text-center">
                <span class="text-bold q-caption text-grey-8">
                  YOUR CURRENT PACE
                </span>
              </q-card-title>
              <q-card-main>
                Bar graph
              </q-card-main>
            </q-card>
          </div>
        </div>
        <div class="row">
          <div class="col-2 q-px-sm">
            <q-card class="shadow-none">
              <q-card-title class="bg-grey-4 text-center">
                <span class="text-bold q-caption text-grey-8">
                  MASTERY LEVEL
                </span>
              </q-card-title>
              <q-card-main>
                <mastery-knob mastery="25" />
              </q-card-main>
            </q-card>
          </div>
          <div class="col-2 q-px-sm">
            <q-card class="shadow-none">
              <q-card-title class="bg-grey-4 text-center">
                <span class="text-bold q-caption text-grey-8">
                  MILESTONES
                </span>
              </q-card-title>
              <q-card-main>
                <div class="col">
                  <div class="col text-black text-center font-secondary">
                    <div class="q-display-1 text-weight-bolder">5</div>
                    <div class="text-primary text-weight-medium q-subheading">REACHED</div>
                  </div>
                  <div class="col text-black text-center font-secondary">
                    <div class="q-display-1 text-weight-bolder">120</div>
                    <div class="text-primary text-weight-medium q-subheading">TO NEXT</div>
                  </div>
                </div>
              </q-card-main>
            </q-card>
          </div>
          <div class="col-8 q-px-sm">
            <q-card class="shadow-none">
              <q-card-title class="bg-grey-4 text-center">
                <span class="text-bold q-caption text-grey-8">
                  TOP COHORT PERFORMERS (PLACEHOLDER)
                </span>
              </q-card-title>
              <q-card-main>
                Bar graph
              </q-card-main>
            </q-card>
          </div>
        </div>
        <div class="row">
          <div class="col-2 q-px-sm">
            <q-card class="shadow-none">
              <q-card-title class="bg-grey-4 text-center">
                <span class="text-bold q-caption text-grey-8">
                  3 HARDEST WORDS
                </span>
              </q-card-title>
              <q-card-main>
                <q-list
                  no-border
                  class="q-pa-sm"
                >
                  <q-item v-for="(word, index) in hardestwords" :key="word">
                    <span class="text-grey-8 font-secondary q-subheading text-weight-bold">
                      {{index + 1}}. <span class="text-secondary capitalize">{{word}}</span>
                    </span>
                  </q-item>
                </q-list>
              </q-card-main>
            </q-card>
          </div>
          <div class="col-2 q-px-sm">
            <q-card class="shadow-none">
              <q-card-title class="bg-grey-4 text-center">
                <span class="text-bold q-caption text-grey-8">
                  3 EASIEST WORDS
                </span>
              </q-card-title>
              <q-card-main>
                <q-list
                  no-border
                  class="q-pa-sm"
                >
                  <q-item v-for="(word, index) in easiestwords" :key="word">
                    <span class="text-grey-8 font-secondary q-subheading text-weight-bold">
                      {{index + 1}}. <span class="text-primary capitalize">{{word}}</span>
                    </span>
                  </q-item>
                </q-list>
              </q-card-main>
            </q-card>
          </div>
        </div>
      </div>
    </q-card-main>
  </q-card>
</template>

<script>
import Timer from '../common/timer'
import MasteryKnob from '../common/masteryknob'

export default {
  name: 'CourseDetailsDashboard',
  components: {
    Timer,
    MasteryKnob
  },
  data () {
    return {
      newwords: ['Antartic', 'Deteriorate', 'Onomatopoeia'],
      hardestwords: ['Antartic', 'Deteriorate', 'Onomatopoeia'],
      easiestwords: ['Antartic', 'Deteriorate', 'Onomatopoeia']
    }
  }
}
</script>

<style>
</style>
