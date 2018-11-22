<template>
  <div class="col">
    <transition-group
      name="flip-list"
      mode="out-in"
      appear
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutRight"
      class="row"
    >
      <div class="col-4" key="mastered" v-if="Object.keys(selected).length == 0 || selectedCat == 'mastered'">
        <q-card class="tk-container-sub collapse">
          <q-card-title class="title-bar-blue text-center">
            <h4>MASTERED</h4>
          </q-card-title>
          <q-card-main class="col tk-container-sub-inner">
            <q-list
              separator
              link
              no-border
            >
              <q-item v-for="word in mastered" :key="word.word" @click.native="select(word)" >
                <q-item-main>
                  <h3 class="font-primary">{{word.word}}</h3>
                </q-item-main>
                <q-item-side right>
                  <i class="material-icons text-secondary q-display-1">
                    add
                  </i>
                </q-item-side>
              </q-item>
            </q-list>
          </q-card-main>
        </q-card>
      </div>
      <div class="col-4" key="progress" v-if="Object.keys(selected).length == 0 || selectedCat == 'progress'">
        <q-card class="tk-container-sub collapse">
          <q-card-title class="title-bar-yellow text-center">
            <h4>In Progress</h4>
          </q-card-title>
          <q-card-main class="col tk-container-sub-inner">
            <q-list
              separator
              link
              no-border
            >
              <q-item v-for="word in progress" :key="word.word"  @click.native="select(word)">
                <q-item-main>
                  <h3 class="font-primary">{{word.word}}</h3>
                </q-item-main>
                <q-item-side right>
                  <i class="material-icons text-secondary q-display-1">
                    add
                  </i>
                </q-item-side>
              </q-item>
            </q-list>
          </q-card-main>
        </q-card>
      </div>
      <div class="col-4" key="learning" v-if="Object.keys(selected).length == 0">
        <q-card class="tk-container-sub collapse">
          <q-card-title class="title-bar-grey text-center">
            <h4>To Learn</h4>
          </q-card-title>
          <q-card-main class="col tk-container-sub-inner">
            <q-list
              separator
              link
              no-border
            >
              <q-item v-for="word in learning" :key="word.word" >
                <q-item-main class="row">
                  <h3 class="font-primary text-grey-5">{{word.word}}</h3>
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
        { word: 'crumble', status: 'progress' },
        { word: 'decline', status: 'progress' },
        { word: 'degrade', status: 'progress' },
        { word: 'deteriorate', status: 'progress' },
        { word: 'disintegrate', status: 'progress' },
        { word: 'ebb', status: 'progress' },
        { word: 'fade', status: 'progress' },
        { word: 'fail', status: 'progress' },
        { word: 'fall apart', status: 'progress' }
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
