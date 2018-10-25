<template>
  <div class="row items-end">
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg" class="small q-mr-xl">
    <div class="triangle">
    </div>
    <div class="bg-white col q-pa-md rounded-sm">
      <div class="row justify-between text-grey-8 q-caption text-weight-bold">
        <div>
          {{longdate}}, {{day}}
        </div>
        <div>
          {{time}}
        </div>
      </div>
      <div class="col font-secondary">
        <p class="text-primary caps q-my-md q-subheading text-weight-bold">
          GOOD DAY {{name}},
        </p>
        <p class="text-grey-9 q-title text-weight-bold">
          {{message}}
        </p>
      </div>
      <div class="q-my-md">
        <q-btn
          flat
          color="white"
          text-color="primary"
          class="q-caption q-px-none font-secondary text-weight-bold"
        >
          TAKE ME TO MY LESSON
          <i class="material-icons">arrow_forward</i>
        </q-btn>
      </div>
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

<style>
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
