<template>
  <div class="col">
    <div class="row">
      <div class="col-6">
        <q-card class="tk-container-sub collapse">
          <q-card-title class="title-bar-blue text-center">
            <h4>Definition</h4>
          </q-card-title>
          <q-card-main class="tk-container-sub-inner bg-primary">
            <div class="row justify-center items-center">
              <div class="col text-center q-py-xl">
                <h1 class="font-primary q-display-1 text-white text-bold">{{definition.default}}</h1>
                <h3 class="font-primary text-bold text-secondary">{{word}}</h3>
              </div>
            </div>
          </q-card-main>
        </q-card>
      </div>
      <div class="col-6">
        <q-card class="tk-container-sub collapse">
          <q-card-title class="title-bar-grey text-center">
            <h4>Images</h4>
          </q-card-title>
          <q-card-main class="tk-container-sub-inner">
            <q-carousel
              color="primary"
              arrows
              infinite
              animation
            >
              <q-carousel-slide v-for="img in imgList" :key="img" class="row justify-center">
                <img :src="img" class="definition-image" />
              </q-carousel-slide>
            </q-carousel>
          </q-card-main>
        </q-card>
        <q-card class="tk-container-sub collapse">
          <q-card-title class="title-bar-grey text-center">
            <h4>Examples</h4>
          </q-card-title>
          <q-card-main class="tk-container-sub-inner row items-center">
            <i class="material-icons text-grey-full flip-horizontal q-display-4 self-start">format_quote</i>
            <h5 class="font-primary">
              {{examples.sentence}}
            </h5>
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
import { Storage } from 'aws-amplify'

export default {
  name: 'BasicMeaning01',
  props: ['word', 'definition', 'images', 'examples'],
  data () {
    console.log(this.images, this.examples)
    return {
      imgList: [],
      startTime: 0
    }
  },
  mounted () {
    this.startTime = Date.now()
    let image = ''
    for (image of this.images.images) {
      Storage.get(image, { level: 'public' })
        .then(result => {
          this.imgList.push(result)
        })
    }
  },
  methods: {
    nextStep () {
      const currTime = Date.now()
      const sectionTime = currTime - this.startTime
      this.$emit('nextstep', { section: 'meaningBasicOne', duration: sectionTime })
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'

.definition-image
  max-height 200px
</style>
