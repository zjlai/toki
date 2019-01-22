<template>
  <div class="col">
    <div class="row">
      <div class="col-6">
        <q-card class="tk-container-sub collapse">
          <q-card-title class="title-bar-blue text-center">
            <h4>Definition</h4>
          </q-card-title>
          <q-card-main class="tk-container-sub-inner bg-primary">
            <q-carousel
              color="white"
              arrows
              infinite
              animation
              @input="getSlide"
            >
              <q-carousel-slide v-for="def in definitions" :key=def.definition>
                <div class="row justify-center items-center">
                  <div class="col text-center" :class="paddingSizeLarge">
                    <h3 class="font-primary text-bold text-secondary q-pb-md" :class="fontSizeLarge">{{word}}</h3>
                    <h1 class="font-primary text-white text-bold" :class="fontSizeTitle">
                      <span class="text-secondary">({{def.category}})</span>
                      {{def.def}}
                    </h1>
                  </div>
                </div>
              </q-carousel-slide>
            </q-carousel>
          </q-card-main>
        </q-card>
      </div>
      <div class="col-6">
        <q-card class="tk-container-sub collapse">
          <q-card-title class="title-bar-grey text-center">
            <h4>Synonyms</h4>
          </q-card-title>
          <q-card-main class="tk-container-sub-inner">
            <p class="text-bold">{{definitions[currentStep].synonyms || ''}}</p>
          </q-card-main>
        </q-card>
        <q-card class="tk-container-sub collapse">
          <q-card-title class="title-bar-grey text-center">
            <h4>Examples</h4>
          </q-card-title>
          <q-card-main class="tk-container-sub-inner row items-center">
            <!--<i class="material-icons text-grey-full flip-horizontal q-display-3 self-start">format_quote</i>-->
            <p class="font-primary text-bold" v-for="ex in definitions[currentStep].examples" :key="ex">
              {{ex}}
            </p>
          </q-card-main>
        </q-card>
      </div>
    </div>
    <div class="row justify-center q-my-md">
      <q-btn
        color="primary"
        rounded
        class="font-secondary"
        @click.native="nextStep"
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
  name: 'BasicMeaning01',
  props: ['oxdata'],
  data () {
    return {
      startTime: 0,
      word: '',
      definitions: [],
      currentStep: 0
    }
  },
  mounted () {
    this.word = this.oxdata.word
    this.oxdata.definitions.forEach(def => {
      let cat = def.category
      def.definitions.forEach(subdef => {
        console.log(typeof subdef.example)
        let example = []
        if (typeof subdef.example === 'string') {
          example.push(subdef.example)
        } else {
          example = subdef.example
        }
        this.definitions.push({
          category: cat,
          def: subdef.definition,
          synonyms: subdef.synonyms,
          examples: example
        })
      })
    })
    console.log(this.definitions)
    this.startTime = Date.now()
  },
  computed: {
    wordCount () {
      return this.mapped.length
    },
    fontSizeTitle () {
      return this.$q.screen.lt.xl ? 'h4' : 'h3'
    },
    fontSizeBody () {
      return this.$q.screen.lt.xl ? 'q-headline' : 'q-display-1'
    },
    fontSizeLarge () {
      return this.$q.screen.lt.xl ? 'q-display-1' : 'q-display-3'
    },
    paddingSize () {
      return this.$q.screen.lt.xl ? 'q-pa-sm' : 'q-pa-md'
    },
    paddingSizeLarge () {
      return this.$q.screen.lt.xl ? 'q-pa-lg' : 'q-pa-xl'
    },
    marginSize () {
      return this.$q.screen.lt.xl ? 'q-my-sm' : 'q-my-md'
    }
  },
  methods: {
    nextStep () {
      const currTime = Date.now()
      const sectionTime = currTime - this.startTime
      this.$emit('nextstep', { section: 'OxDictMeaning', duration: sectionTime })
    },
    getSlide (index) {
      console.log(index)
      this.currentStep = index
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'
</style>
