<template>
  <div class="row q-mt-md">
    <div class="col q-mr-sm">
      <q-card class="rounded-sm no-shadow">
        <q-card-title class="bg-primary text-white text-center q-caption">
          <span class="text-weight-bold">DEFINITION</span>
        </q-card-title>
        <q-card-main>
          <div class="col">
            <div class="row q-my-md font-secondary text-weight-bold q-title" v-for="(def, index) in definitions" :key="def">
              <div class="col-1 text-primary">
                {{index + 1}}:
              </div>
              <div class="col-11">
                {{def}}
              </div>
            </div>
          </div>
        </q-card-main>
      </q-card>
    </div>
    <div class="col q-mx-sm">
      <q-card class="rounded-sm no-shadow">
        <q-card-title class="bg-light text-center q-caption">
          <span class="text-weight-bold">EXAMPLE USAGE</span>
        </q-card-title>
        <q-card-main>
          <q-carousel>
            <q-carousel-slide
              color="primary"
              arrows
              infinite
              v-for="eg in examples"
              :key="eg"
              class="q-my-md font-secondary text-weight-bold q-title"
            >
              {{eg}}
            </q-carousel-slide>
          </q-carousel>
        </q-card-main>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WordMeaningComponent',
  props: ['definitions', 'examples'],
  data () {
    return {}
  }
}
</script>

<style>
</style>
