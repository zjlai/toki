<template>
  <div class="col">
    <transition-group
      name="flip-list"
      mode="out-in"
      appear
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutRight"
      class="row q-ma-lg"
    >
      <div class="col-4 q-px-sm" key="mastered" v-if="Object.keys(selected).length == 0 || selectedCat == 'mastered'">
        <q-card>
          <q-card-title class="bg-primary text-white text-center">
            <span class="text-weight-bold q-caption">
              MASTERED
            </span>
          </q-card-title>
          <q-card-main>
            <q-list
              separator
              link
              no-border
              class="font-secondary"
            >
              <q-item v-for="word in mastered" :key="word.word" @click.native="select(word)" >
                <q-item-main class="q-title text-weight-medium caps">
                  {{word.word}}
                </q-item-main>
                <q-item-side right>
                  <i class="material-icons text-secondary text-weight-bold q-display-1">
                    add
                  </i>
                </q-item-side>
              </q-item>
            </q-list>
          </q-card-main>
        </q-card>
      </div>
      <div class="col-4 q-px-sm" key="progress" v-if="Object.keys(selected).length == 0">
        <q-card>
          <q-card-title class="bg-secondary text-black text-center">
            <span class="text-weight-bold q-caption">
              IN PROGRESS
            </span>
          </q-card-title>
          <q-card-main>
            <q-list
              separator
              no-border
              class="font-secondary"
            >
              <q-item v-for="word in progress" :key="word.word" >
                <q-item-main class="q-title text-weight-medium caps">
                  {{word.word}}
                </q-item-main>
                <q-item-side right>
                  <i class="material-icons text-secondary text-weight-bold q-display-1">
                    add
                  </i>
                </q-item-side>
              </q-item>
            </q-list>
          </q-card-main>
        </q-card>
      </div>
      <div class="col-4 q-px-sm" key="learning" v-if="Object.keys(selected).length == 0">
        <q-card>
          <q-card-title class="bg-grey-4 text-grey-9 text-center">
            <span class="text-weight-bold q-caption">
              TO LEARN
            </span>
          </q-card-title>
          <q-card-main>
            <q-list
              separator
              no-border
              class="font-secondary"
            >
              <q-item v-for="word in learning" :key="word.word" >
                <q-item-main class="q-title text-grey-5 text-weight-medium caps">
                  {{word.word}}
                  <i class="material-icons text-grey-5 text-weight-bold q-title">
                    arrow_forward
                  </i>
                </q-item-main>
              </q-item>
            </q-list>
          </q-card-main>
        </q-card>
      </div>
      <div class="col-8 q-px-sm" key="details" v-if="Object.keys(selected).length != 0">
        <word-profile />
      </div>
    </transition-group>
  </div>
</template>

<script>
import WordProfile from './wordprofile'

export default {
  name: 'WordbankList',
  components: {
    WordProfile
  },
  data () {
    return {
      mastered: [
        {
          word: 'vexed',
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
          antonyms: 'elevate, ennoble, uplift',
          status: 'mastered'
        },
        {
          word: 'affronted',
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
          antonyms: 'elevate, ennoble, uplift',
          status: 'mastered'
        },
        {
          word: 'convulsed',
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
          antonyms: 'elevate, ennoble, uplift',
          status: 'mastered'
        },
        {
          word: 'infuriated',
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
          antonyms: 'elevate, ennoble, uplift',
          status: 'mastered'
        }
      ],
      progress: [
        { word: 'crumble' },
        { word: 'decline' },
        { word: 'degrade' },
        { word: 'deteriorate' },
        { word: 'disintegrate' },
        { word: 'ebb' },
        { word: 'fade' },
        { word: 'fail' },
        { word: 'fall apart' }
      ],
      learning: [
        { word: 'siesta' },
        { word: 'lethargy' },
        { word: 'hibernation' }
      ],
      selected: {},
      selectedCat: ''
    }
  },
  methods: {
    select (word) {
      this.selected = word
      this.selectedCat = word.status
    }
  }
}
</script>

<style>
.caps {
  text-transform: uppercase
}
.flip-list-move {
  transition: transform 1s;
}
</style>
