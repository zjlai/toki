<template>
  <div class="col">
    <div class="row q-py-md">
      <div class="col-5">
        <q-card class="rounded-sm no-shadow">
          <q-card-title class="bg-blue-9 text-center text-white q-pa-sm">
            <span class="text-bold q-body-2">INSTRUCTIONS</span>
          </q-card-title>
          <q-card-main class="bg-primary">
            <div class="q-pa-xl q-title text-white">
              Select the correct answer from the choices given below
            </div>
          </q-card-main>
        </q-card>
      </div>
      <div class="col-7 q-pl-md">
        <q-card class="rounded-sm no-shadow">
          <q-card-title class="bg-primary text-center text-white q-pa-sm">
            <span class="text-bold q-body-2">QUESTION</span>
          </q-card-title>
          <q-card-main>
            <div class="q-pa-xl q-title text-black">
              What is the meaning of the word
              <span class="text-primary">{{mcq.word}}</span>
              ?
            </div>
          </q-card-main>
        </q-card>
      </div>
    </div>
    <div class="col">
      <q-card class="rounded-sm no-shadow">
        <q-card-title class="bg-primary text-center text-white q-pa-sm">
          <span class="text-bold q-body-2">SELECT YOUR ANSWER</span>
        </q-card-title>
        <q-card-main>
          <div class="col q-my-md text-weight-bold font-secondary q-title q-ml-xl">
            <q-option-group
              color="primary"
              type="radio"
              v-model="mcq.mcqans"
              :options="mcq.options"
            />
          </div>
        </q-card-main>
      </q-card>
    </div>
    <div class="row justify-center">
      <q-btn
        color="secondary"
        rounded
        :disabled="!mcq.mcqans"
      >
        <span class="q-px-lg q-py-sm q-title">
          PROCEED
          <i class="material-icons">arrow_forward</i>
        </span>
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestMCQ',
  data () {
    return {
      mcq: {
        word: 'abased',
        options: [
          { label: 'to cause a painful loss of pride, self-respect, or dignity; mortify.', value: 'to cause a painful loss of pride, self-respect, or dignity; mortify.' },
          { label: 'to regard highly or favorably; regard with respect or admiration', value: 'to regard highly or favorably; regard with respect or admiration' },
          { label: 'lower on an escutcheon than is usual', value: 'lower on an escutcheon than is usual' },
          { label: 'having a feeling of insignificance, inferiority, subservience', value: 'having a feeling of insignificance, inferiority, subservience' }
        ]
      }
    }
  }
}
</script>

<style>
</style>
