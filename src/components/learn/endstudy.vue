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
            <div class="col toki-speech">
              <h3>Well done you have completed this round of study!</h3>
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
          Back to Dashboard
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
