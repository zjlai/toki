<template>
  <q-card class="rounded-sm no-shadow full-height">
    <q-card-title class="bg-primary text-white text-center">
      <span class="text-weight-bold q-subheading">
        WORD ASSOCIATION
      </span>
    </q-card-title>
    <q-card-main class="q-ma-none bg-grey-2">
      <div class="col">
        <div class="font-secondary text-primary text-weight-medium q-py-lg q-display-2 text-center">
          {{word}}
        </div>
        <div class="font-secondary q-pb-lg">
          <q-input
            v-model.trim="text"
            upper-case
            align="center"
            hide-underline
            autofocus
            class="bg-white text-black text-weight-medium q-display-2 map-input q-py-md q-mx-md" />
        </div>
        <div class="q-ma-lg border-bot"></div>
        <div class="text-weight-bold q-subheading font-secondary text-grey-6 q-ma-md text-center">
          WORDS ENTERED ({{wordCount}})
        </div>
        <div class="q-ma-lg">
          <q-chip v-for="assoc in mapped" :key="assoc"
            color="secondary"
            text-color="black"
            class="mapped-chip caps text-weight-bold q-mr-sm q-px-lg"
          >
            {{assoc}}
          </q-chip>
        </div>
      </div>
    </q-card-main>
  </q-card>
</template>

<script>
export default {
  name: 'WordMapperComponent',
  props: ['word'],
  data () {
    return {
      text: '',
      mapped: ['ABASE', 'Cheapen']
    }
  },
  computed: {
    wordCount () {
      return this.mapped.length
    }
  }
}
</script>

<style>
.border-bot {
  border-top: 1px solid #bdbdbd;
}
.map-input input{
  height: 54px;
}
.caps {
  text-transform: uppercase;
}
.mapped-chip {
}
</style>
