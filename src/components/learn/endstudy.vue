<template>
  <div class="col">
    <div class="row">
      <q-card class="tk-container-sub collapse full-width">
        <q-card-title class="title-bar-blue text-center">
          <h4>Study Completed</h4>
        </q-card-title>
        <q-card-main class="tk-container-sub-inner">
          <div class="row justify-center items-center">
            <div class="col-auto">
              <img svg-inline src="../../assets/tokido.svg" class="toki-bot logo-yellow" />
            </div>
            <div class="col toki-speech text-center">
              <h3>Well done you have completed this round of study!</h3>
              <h3>You are ready to take the next challenge!</h3>
            </div>
          </div>
        </q-card-main>
      </q-card>
    </div>
    <div class="row justify-center q-my-md">
      <q-btn
        color="primary"
        rounded
        class="font-secondary button"
        @click.native="back"
      >
        <span class="q-title">
          Go to Test!
          <i class="material-icons">arrow_forward</i>
        </span>
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EndStudy',
  data () {
    return {
    }
  },
  methods: {
    back () {
      this.$emit('back')
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'

.logo-yellow
  height: 100%;
  fill $secondary
</style>
