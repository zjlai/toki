<template>
  <div class="row justify-center q-pa-lg">
    <q-knob
      v-model="timer"
      :min="min"
      :max="max"
      track-color="secondary"
      color="primary"
      readonly
      line-width="6px"
      size="150px"
      class="countdown"
      :disabled="disabled"
    >
      <span v-if="range==='mins'" class="text-black">{{rangeMins(duration)}}</span>
      <div v-else-if="range==='days'" class="text-black text-center">
        <div class="q-display-1 text-weight-bolder">{{rangeDays(duration)}}</div>
        <div class="text-primary text-weight-medium q-subheading">{{units}}</div>
      </div>
    </q-knob>
  </div>
</template>

<script>
export default {
  name: 'CountdownTimer',
  props: {
    min: Number,
    max: Number,
    range: {
      type: String,
      default: 'mins'
    },
    disabled: Boolean
  },
  data () {
    return {
      units: '',
      cdtimer: '',
      duration: 0
    }
  },
  mounted () {
    this.duration = this.max
  },
  computed: {
    timer () {
      return this.max - this.duration
    }
  },
  methods: {
    startTimer () {
      this.cdtimer = setInterval(() => {
        this.duration -= 1
        this.$emit('progress', this.duration)
        if (this.duration === 0) {
          clearInterval(this.cdtimer)
          this.$emit('timesup')
        }
      }, 1000)
    },
    stopTimer () {
      clearInterval(this.cdtimer)
      this.$emit('progress', this.duration)
    },
    resetTimer () {
      clearInterval(this.cdtimer)
      this.duration = this.max
      this.$emit('progress', this.duration)
    },
    rangeMins (duration) {
      let mins = Math.floor(duration / 60)
      let strmins = mins.toString().padStart(2, '0')
      let secs = duration % 60
      let strsecs = secs.toString().padStart(2, '0')
      return `${strmins}:${strsecs}`
    },
    rangeDays (duration) {
      let days = Math.floor(duration / 86400)
      if (days) {
        if (days === 1) this.units = 'Day'
        else this.units = 'Days'
        return days
      }
      let timeleft = new Date(null)
      timeleft.setSeconds(duration)
      let timestring = ''
      if (duration <= 60) {
        timestring = timeleft.toISOString().substr(14, 5)
        this.units = 'SECS'
      } else if (duration > 60 && duration < 3600) {
        timestring = timeleft.toISOString().substr(14, 5)
        this.units = 'MINS'
      } else {
        timestring = timeleft.toISOString().substr(11, 5)
        this.units = 'HOURS'
      }
      return timestring
    }
  }
}
</script>

<style>
.countdown {
  font-size: 24px;
  font-weight: bold;
}
div.q-knob[disabled] path {
  color: #BDBDBD !important;
}
</style>
