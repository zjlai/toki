<template>
  <div class="row q-mt-md">
    <div class="col q-mr-sm">
      <q-card class="rounded-sm no-shadow">
        <q-card-title class="bg-primary text-white text-center">
          <span class="text-weight-bold q-caption">SYNONYMS</span>
        </q-card-title>
        <q-card-main>
          <div class="col">
            <div class="row q-my-lg font-secondary text-weight-mediumr q-title">
              {{synonyms}}
            </div>
          </div>
        </q-card-main>
      </q-card>
    </div>
    <div class="col q-mx-sm">
      <q-card class="rounded-sm no-shadow">
        <q-card-title class="bg-secondary text-white text-center">
          <span class="text-weight-bold q-caption">ANTONYMS</span>
        </q-card-title>
        <q-card-main>
          <div class="row q-my-lg font-secondary text-weight-medium q-title">
            {{antonyms}}
          </div>
        </q-card-main>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WordReferenceComponent',
  props: ['synonyms', 'antonyms'],
  data () {
    return {}
  }
}
</script>

<style>
</style>
