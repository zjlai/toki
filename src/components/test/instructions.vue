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
          <div class="col-2">
            <q-card class="rounded-sm no-shadow">
              <q-card-title class="bg-grey-4 text-grey-8 text-center">
                <span class="text-weight-bold q-caption">NEXT TEST</span>
              </q-card-title>
              <q-card-main>
                <timer
                  :min="0"
                  :max="259200"
                  :duration="172913"
                  range="days"
                  disabled
                />
              </q-card-main>
            </q-card>
          </div>
          <div class="col-10">
            <q-card class="rounded-sm no-shadow q-ml-md">
              <q-card-title class="bg-secondary text-black text-center">
                <span class="text-weight-bold q-caption">TEST INSTRUCTIONS</span>
              </q-card-title>
              <q-card-main>
                <div class="col font-secondary text-black text-weight-medium q-title">
                  <div class="row q-my-lg items-center q-pt-md">
                    <div class="col-auto">
                      <q-btn
                        color="primary"
                        text-color="white"
                        round
                        size="sm"
                        class="q-mr-md"
                      >
                        <span class="q-title">1</span>
                      </q-btn>
                    </div>
                    <div class="col-auto">
                      You will be given
                      <span class="text-primary">3 Minutes</span>
                      per question.
                    </div>
                  </div>
                  <div class="row q-my-lg items-center">
                    <div class="col-auto">
                      <q-btn
                        color="primary"
                        text-color="white"
                        round
                        size="sm"
                        class="q-mr-md"
                      >
                        <span class="q-title">2</span>
                      </q-btn>
                    </div>
                    <div class="col-auto">
                      Each question will begin with a
                      <span class="text-primary">narration test</span>
                      and followed by an <span class="text-primary">MCQ</span>
                    </div>
                  </div>
                  <div class="row q-my-lg items-center">
                    <div class="col-auto">
                      <q-btn
                        color="primary"
                        text-color="white"
                        round
                        size="sm"
                        class="q-mr-md"
                      >
                        <span class="q-title">3</span>
                      </q-btn>
                    </div>
                    <div class="col-auto">
                      You will <span class="text-primary">not be allowed</span>
                      to go back to the previous question
                    </div>
                  </div>
                  <div class="row q-my-lg items-center">
                    <div class="col-auto">
                      <q-btn
                        color="primary"
                        text-color="white"
                        round
                        size="sm"
                        class="q-mr-md"
                      >
                        <span class="q-title">4</span>
                      </q-btn>
                    </div>
                    <div class="col-auto">
                      If you have answered before the time limit, you can move on the the next question.
                    </div>
                  </div>
                </div>
              </q-card-main>
            </q-card>
          </div>
        </div>
        <div class="row justify-center q-mt-xl">
          <q-btn
            color="primary"
            rounded
          >
            <span class="q-px-lg q-py-sm q-title">
              BEGIN TEST
              <i class="material-icons">arrow_forward</i>
            </span>
          </q-btn>
        </div>
      </div>
    </q-card-main>
  </q-card>
</template>

<script>
import Timer from '../common/timer'

export default {
  name: 'TestInstructionComponent',
  components: {
    Timer
  },
  data () {
    return {}
  }
}
</script>

<style>
.bullet {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
</style>
