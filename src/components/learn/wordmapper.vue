<template>
  <q-card class="tk-container-sub collapse">
    <q-card-title class="title-bar-blue text-center">
      <h4>WORD ASSOCIATION</h4>
    </q-card-title>
    <q-card-main class="tk-container-sub-inner">
      <div class="col">
        <h1 class="font-primary text-primary text-bold text-center q-py-md" :class="fontSizeLarge">
          {{word}}
        </h1>
        <div class="font-primary" :class="paddingSize">
          <q-input
            v-model.trim="text"
            upper-case
            align="center"
            hide-underline
            :disable="disabled"
            autofocus
            ref="input"
            @keyup.enter="addWord"
            class="text-bold q-py-md q-mx-md"
            :class="assocInputStyle()"
          />
        </div>
        <hr :class="margin-size" />
        <h5 class="text-grey text-center">
          WORDS ENTERED ({{wordCount}})
        </h5>
        <div class="q-ma-lg">
          <q-chip v-for="assoc in mapped" :key="assoc.association"
            color="secondary"
            text-color="black"
            closable
            @hide="deleteWord(assoc)"
            class="mapped-chip caps text-bold q-mr-sm q-px-lg q-mb-md"
          >
            {{assoc.association}}
          </q-chip>
        </div>
      </div>
    </q-card-main>
  </q-card>
</template>

<script>
// import { date } from 'quasar'

function chkRepeat (element, index, array) {
  return element.association === this.text
}
export default {
  name: 'WordMapperComponent',
  props: ['word', 'disabled'],
  data () {
    return {
      text: '',
      mapped: [],
      time: 0
    }
  },
  mounted () {
    this.time = Date.now()
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
    marginSize () {
      return this.$q.screen.lt.xl ? 'q-my-sm' : 'q-my-md'
    }
  },
  methods: {
    addWord () {
      const isRepeated = this.mapped.findIndex(chkRepeat, { text: this.text })
      if (isRepeated >= 0) {
        this.$q.notify('Word already entered')
        this.text = ''
        return
      }
      const currTime = Date.now()
      let duration = currTime - this.time
      this.time = currTime
      this.mapped.push({ association: this.text, duration: duration })
      this.$emit('counter', this.mapped.length)
      this.text = ''
    },
    deleteWord (word) {
      const idx = this.mapped.indexOf(word)
      this.mapped.splice(idx, 1)
      this.$emit('counter', this.mapped.length)
      console.log(this.$refs)
      this.$refs.input.focus()
    },
    getWords () {
      return this.mapped
    },
    assocInputStyle () {
      let disabledClass = ''
      if (this.disbled) {
        disabledClass = 'disabled-map'
      }
      return this.$q.screen.lt.xl ? `map-input-sm ${disabledClass}` : `${disabledClass} map-input`
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'

.map-input input{
  height: 54px;
  font-size: 46px;
}
.map-input-sm input{
  height: 40px;
  font-size: 32px
}
.caps {
  text-transform: uppercase;
}
.disabled-map
  background $tk-grey-1

.mapped-chip {
}
</style>
