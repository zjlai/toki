<template>
  <div class="row items-end">
    <div class="col-1">
      <img svg-inline src="../../assets/tokido.svg" class="toki-bot logo-blue" />
    </div>
    <div class="col toki-speech">
      <div class="row justify-between">
        <h6>
          {{longdate}}, {{day}}
        </h6>
        <h6>
          {{time}}
        </h6>
      </div>
      <br>
      <div class="col">
        <h5>
          GOOD DAY {{name}},
        </h5>
        <h1>
          {{message}}
        </h1>
      </div>
      <!--<div class="q-my-md">
        <q-btn
          flat
          color="white"
          text-color="primary"
          class="q-caption q-px-none font-secondary text-weight-bold"
        >
          TAKE ME TO MY LESSON
          <i class="material-icons">arrow_forward</i>
        </q-btn>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'TokiMessage',
  data () {
    const d = new Date()
    const longdate = d.toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' })
    const day = d.toLocaleDateString('en-SG', { weekday: 'short' })
    const time = d.toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit' })
    return {
      name: 'Zack',
      message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      longdate,
      day,
      time
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'

.logo-blue
  height: 100%;
  fill $primary

.caps {
  text-transform: uppercase;
}
img.small {
  width: 64px;
}
div.triangle {
  width: 0;
  height: 0;
  border-left: 24px solid transparent;
  border-right: 24px solid transparent;
  border-bottom: 24px solid white;
  position: absolute;
  left: 130px;

}
</style>
