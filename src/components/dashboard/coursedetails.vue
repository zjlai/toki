<template>
  <div class="col">
    <div class="row">
      <div class="col-2">
        <q-card class="tk-container-sub collapse">
          <q-card-title class="title-bar-blue">
            <h4>
              NEXT TEST
            </h4>
          </q-card-title>
          <q-card-main class="tk-container-sub-inner">
            <div class="col">
              <timer
                :min="0"
                :max="259200"
                :duration="172913"
                range="days"
              />
              <h2 class="text-center text-bold">
                48:00:00
              </h2>
            </div>
          </q-card-main>
        </q-card>
      </div>
      <div class="col-2">
        <q-card class="tk-container-sub collapse">
          <q-card-title class="title-bar-yellow">
            <h4>
              NEW WORDS
            </h4>
          </q-card-title>
          <q-card-main class="tk-container-sub-inner">
            <div class="col">
              <q-list
                no-border
              >
                <q-item v-for="(word, index) in newwords" :key="word">
                  <h5 class="font-primary text-bold">
                    {{index + 1}}.  {{word}}
                  </h5>
                </q-item>
              </q-list>
            </div>
          </q-card-main>
        </q-card>
      </div>
      <div class="col-8">
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
      </div>
    </div>
  </div>
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
      newwords: ['Antartic', 'Deteriorate', 'Onomatopoeia', 'long list', 'longer list'],
      hardestwords: ['Antartic', 'Deteriorate', 'Onomatopoeia'],
      easiestwords: ['Antartic', 'Deteriorate', 'Onomatopoeia'],
      mastery: 25
    }
  }
}
</script>

<style>
</style>
