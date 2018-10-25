<template>
  <div class="row justify-center q-pa-lg">
    <q-knob
      v-model="mastery"
      :min="0"
      :max="100"
      track-color="text-grey"
      color="primary"
      readonly
      line-width="6px"
      size="150px"
      class="mastery-knob"
      :disabled="disabled"
    >
      <div class="text-black text-center font-secondary">
        <div class="q-display-1 text-weight-bolder">{{mastery}}</div>
        <div class="text-primary text-weight-medium q-subheading">ACHIEVED</div>
      </div>
    </q-knob>
  </div>
</template>

<script>
export default {
  name: 'MasteryKnob',
  props: {
    mastery: Number,
    disabled: Boolean
  },
  data () {
    return {
    }
  }
}
</script>

<style>
.mastery-knob {
  font-size: 24px;
  font-weight: bold;
}
div.q-knob[disabled] path {
  color: #BDBDBD !important;
}
</style>
