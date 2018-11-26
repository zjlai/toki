<template>
  <q-card class="tk-container-sub collapse full-height">
    <q-card-title class="title-bar">
      <h1>TOKITEST</h1>
    </q-card-title>
    <q-card-main class="col tk-container-sub-inner">
      <div class="col">
        <div class="row">
          <div class="col-3">
            <timer
              :min="0"
              :max="180"
              :duration="175"
            />
          </div>
          <div class="col-6 row justify-center">
            <div class="row items-center self-center full-height">
              <div class="row" v-for="(step, index) in steppers" :key="step.count" :class="{last: index === steppers.length -1, active: currentStep >= step.count, current: currentStep === step.count }">
                <q-btn
                  round
                  align="center"
                  class="stepper-button"
                  @click="currentStep = index + 1"
                >
                 {{step.count}}
                </q-btn>
                <div class="step-connector relative-position vertical-middle self-center" :class="{active: currentStep > step.count }">
                </div>
              </div>
            </div>
          </div>
          <div class="col-3 row justify-center items-center">
            <div class="text-center">
              <div class="text-primary q-title text-weight-bold">
                WORDS TESTED
              </div>
              <div class="text-black font-secondary text-weight-bold q-display-2">
                {{current}} / {{test.count}}
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <transition
            mode="out-in"
            enter-active-class="animated fadeInLeft"
            leave-active-class="animated fadeOutRight"
          >
            <narration v-if="currentStep===1" />
            <mcq v-if="currentStep===2" />
            <next-qn v-if="currentStep===3" />
          </transition>
        </div>
      </div>
    </q-card-main>
  </q-card>
</template>

<script>
import Timer from '../common/timer'
import Narration from './narration'
import Mcq from './mcq'
import NextQn from './nextqn'

export default {
  name: 'TestingMain',
  components: {
    Timer,
    Narration,
    Mcq,
    NextQn
  },
  data () {
    return {
      test: {
        count: 18
      },
      current: 4,
      steppers: [
        { count: 1 },
        { count: 2 },
        { count: 3 }
      ],
      currentStep: 1
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'

.rounded-sm
  border-radius 10px

.stepper-button
  background-color $grey-4
  color $grey-7
  font-weight bold
  font-size 16px

div.active .stepper-button
  background-color white
  color $secondary
  border 4px solid $secondary
  opacity 1 !important

div.active.current .stepper-button
  background-color $secondary
  color white
  border none
  opacity 1 !important

.stepper-button .q-btn-inner
  font-size 24px

.step-connector
  background-color $grey-4
  height 8px
  width 120px

.active.step-connector
  background-color $secondary
  opacity 1 !important

div.last .step-connector
  display none
</style>
