<template>
  <q-page class="q-pr-xl q-py-xl">
    <div class="col full-height">
      <q-card class="bg-white container rounded shadow-8">
        <q-card-main class="col q-pt-none">
          <q-toolbar color="white q-mb-md">
            <q-toolbar-title class="text-primary text-bold">
              WORD BANK
            </q-toolbar-title>
          </q-toolbar>
          <div class="q-px-lg">
            <q-search v-model="terms" hide-underline class="round-search inset-shadow q-py-md">
              <q-autocomplete
                separator
                @search="search"
                @selected="selected"
              />
            </q-search>
          </div>
          <div class="q-mt-md">
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
.container {
  min-height: calc(100vh - 150px);
  height: 100%;
  width: 100%;
}
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
