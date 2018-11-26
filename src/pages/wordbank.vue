<template>
  <q-page class="container">
    <div class="full-height">
      <q-card class="tk-container-sub collapse full-height">
        <q-card-title class="title-bar">
          <h1>WORD BANK</h1>
        </q-card-title>
        <q-card-main class="col tk-container-sub-inner">
          <div class="q-px-md">
            <q-search v-model="terms" hide-underline class="round-search inset-shadow q-py-md">
              <q-autocomplete
                separator
                @search="search"
                @selected="selected"
              />
            </q-search>
          </div>
          <div class="">
            <wordlist />
          </div>
        </q-card-main>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import Wordlist from '../components/wordbank/wordlist'

export default {
  name: 'WordBankBase',
  components: {
    Wordlist
  },
  data () {
    return {
      terms: ''
    }
  },
  methods: {
    search (terms, done) {
      console.log(terms)
      done([])
    },
    selected (select) {
      console.log(select)
    }
  }
}
</script>

<style>
.rounded {
  border-radius: 20px;
}
.rounded-sm {
  border-radius: 10px;
}
.border-left {
  border-left: 1px solid grey;
}
.border-top {
  border-top: 1px solid grey;
}
.round-search {
  border-radius: 19px;
  padding-left: 19px;
}
</style>
