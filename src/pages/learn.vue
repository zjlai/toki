<template>
  <q-page class="q-pr-xl q-py-xl">
    <div class="col full-height">
      <q-card class="bg-white container rounded shadow-8">
        <q-card-main class="col q-pt-none">
          <q-toolbar color="white">
            <q-toolbar-title class="text-primary text-bold">
              TOKILEARN
            </q-toolbar-title>
          </q-toolbar>
          <div>
            <q-stepper
              v-model="currentStep"
              alternative-labels
              ref="stepper"
              color="secondary"
              class="no-shadow"
            >
              <q-step default name="word" title="WORD">
                <word-basic
                  :word="word.word"
                  :category="word.category"
                  :breakdown="word.breakdown"
                  :phonetics="word.phonetics"
                />
                <q-stepper-navigation class="justify-center">
                  <q-btn
                    color="primary"
                    rounded
                    @click="$refs.stepper.next()"
                  >
                    <span class="q-px-lg q-py-sm q-title">
                      PROCEED
                      <i class="material-icons">arrow_forward</i>
                    </span>
                  </q-btn>
                </q-stepper-navigation>
              </q-step>
              <q-step name="meaning" title="MEANING">
                <word-meaning
                  :definitions="word.definitions"
                  :examples="word.examples"
                />
                <q-stepper-navigation class="justify-center">
                  <q-btn
                    color="primary"
                    rounded
                    @click="$refs.stepper.next()"
                  >
                    <span class="q-px-lg q-py-sm q-title">
                      PROCEED
                      <i class="material-icons">arrow_forward</i>
                    </span>
                  </q-btn>
                </q-stepper-navigation>
              </q-step>
              <q-step name="association" title="ASSOCIATION">
                <word-association
                  :word="word.word"
                />
                <q-stepper-navigation class="justify-center">
                  <q-btn
                    color="primary"
                    rounded
                    @click="$refs.stepper.next()"
                  >
                    <span class="q-px-lg q-py-sm q-title">
                      REVIEW
                      <i class="material-icons">arrow_forward</i>
                    </span>
                  </q-btn>
                </q-stepper-navigation>
              </q-step>
              <q-step name="reference" title="REFERENCE">
                <word-reference
                  :synonyms="word.synonyms"
                  :antonyms="word.antonyms"
                />
                <q-stepper-navigation class="justify-center">
                  <q-btn
                    color="secondary"
                    rounded
                  >
                    <span class="q-px-lg q-py-sm q-title">
                      NEXT WORD
                      <i class="material-icons">arrow_forward</i>
                    </span>
                  </q-btn>
                </q-stepper-navigation>
              </q-step>
            </q-stepper>
          </div>
        </q-card-main>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import WordBasic from '../components/learn/wordbasic'
import WordMeaning from '../components/learn/wordmeaning'
import WordAssociation from '../components/learn/wordassociation'
import WordReference from '../components/learn/wordreference'

export default {
  name: 'LearnBase',
  components: {
    WordBasic,
    WordMeaning,
    WordAssociation,
    WordReference
  },
  data () {
    return {
      currentStep: 'word',
      word: {
        word: 'deteriorate',
        category: 'Verb',
        breakdown: 'de.te.ri.o.rate',
        phonetics: '[dih-teer-ee-uh-reyt]',
        definitions: [
          'to make or become worse or inferior in character, quality, value, etc',
          'to disintegrate or wear away'
        ],
        examples: [
          'The evidence continues to mount that the US economy is deteriorating at a very rapid pace',
          'Eyesight deteriorates with age, making it difficult to focus on small print.',
          'The situation for Japanese film-makers in the mid-1940s had deteriorated to unbearable levels.'
        ],
        synonyms: 'abase, cheapen, corrupt, debase, debauch, degrade, demean, demoralize, deprave, lessen, pervert, poison, profane, subvert, vitiate, warp',
        antonyms: 'elevate, ennoble, uplift'
      },
      timer: 128,
      words: ['ABASE', 'Cheapen']
    }
  },
  computed: {
  },
  methods: {
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
.top50 {
  top: 50%;
}
.q-stepper-header {
  box-shadow: 0 0px 0px white !important;
  padding-left: 20%;
  padding-right: 20%;
}
.center-button {
  height: calc(100% - 65px)
}
</style>
