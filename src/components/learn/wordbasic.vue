<template>
  <div class="col">
    <div class="col">
      <q-card class="rounded-sm no-shadow">
        <q-card-title class="bg-primary text-white q-pa-sm">
          <span class="text-bold q-body-2">
            WORD
          </span>
        </q-card-title>
        <q-card-main>
          <div class="col relative-position">
            <div class="row justify-center font-secondary q-display-4 text-weight-medium text-primary q-my-lg q-py-lg">
              {{word}}
            </div>
            <q-btn round color="black" size="md" text-color="white" class="absolute-right top50 q-mr-md" icon="volume_up" />
          </div>
        </q-card-main>
      </q-card>
    </div>
    <div class="row q-mt-md">
      <div class="col q-mr-sm">
        <q-card class="rounded-sm no-shadow">
          <q-card-title class="bg-light text-primary text-weight-medium text-center q-caption">
            VOCAB
          </q-card-title>
          <q-card-main>
            <div class="text-center font-secondary q-my-xl text-weight-bold q-subheading">
              {{category}}
            </div>
          </q-card-main>
        </q-card>
      </div>
      <div class="col q-mx-sm">
        <q-card class="rounded-sm no-shadow">
          <q-card-title class="bg-light text-primary text-weight-medium text-center q-caption">
            BREAKDOWN
          </q-card-title>
          <q-card-main>
            <div class="text-center font-secondary q-my-xl text-weight-bold q-subheading">
              {{breakdown}}
            </div>
          </q-card-main>
        </q-card>
      </div>
      <div class="col q-ml-sm">
        <q-card class="rounded-sm no-shadow">
          <q-card-title class="bg-light text-primary text-weight-medium text-center q-caption">
            PHONETICS
          </q-card-title>
          <q-card-main>
            <div class="text-center font-secondary q-my-xl text-weight-bold q-subheading">
              {{phonetics}}
            </div>
          </q-card-main>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WordBasicComponenet',
  props: ['word', 'category', 'breakdown', 'phonetics'],
  data () {
    return {}
  }
}
</script>

<style>
</style>
