<template>
  <q-page padding>
    <transition
      mode="out-in"
      appear
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutRight"
    >
      <div class="col" v-if="page===1" id="page1">
        <img src="~assets/quasar-logo-full.svg" class="toki" />
        <h2 class="text-secondary text-weight-medium">
          Hi {{name || email}}!
        </h2>
        <p class="text-white font-secondary q-display-1">
          My name is Toki! I am A.I. designed to help you learn better naturally!
        </p>
        <p class="text-white font-secondary q-display-1">
          First things first, could you answer a few questions for me? So I get to know you better!
        </p>
        <q-field>
          <div class="row name text-white font-primary q-my-xl justify-start">
            <p class="q-display-3 text-weight-bold q-ma-none q-mr-xl text-secondary">What's your name?</p>
            <q-input
              v-model="name"
              class="q-display-3 font-primary text-weight-bold"
            />
          </div>
        </q-field>
        <div class="row" v-show="name.length > 3">
          <q-btn
            rounded
            color="secondary"
            class="text-weight-bold z-top"
            @click.native="page=2"
          >
            <span class="q-pl-lg q-pr-sm q-py-sm q-title text-black">Thanks! Next</span>
            <i class="material-icons q-title text-black text-weight-bold">arrow_forward</i>
            <i class="material-icons q-caption text-black q-pb-md q-pl-lg">lens</i>
          </q-btn>
          <div class="beak rotate-30 self-end z-top"></div>
          <div class="rotate-30 self-end shadow"></div>
        </div>
      </div>
      <div class="col" v-if="page===2" id="page2">
        <div class="row items-start justify-between">
          <div class="col q-mx-md">
            <img src="~assets/quasar-logo-full.svg" class="toki" />
            <div class="q-pr-md q-mt-xl">
              <h4 class="text-white text-weight-bold q-ma-none">
                Just a couple more details <span class="text-secondary">{{name}}</span>! This information will help me to understand you better!
                Rest assured, all your information is kept top secret!
              </h4>
            </div>
            <div class="row q-mt-xl">
              <div class="col">
                <div class="row justify-start">
                  <q-btn
                    rounded
                    color="secondary"
                    class="text-weight-bold z-top"
                    @click.native="page=1"
                  >
                    <i class="material-icons q-title text-black text-weight-bold">arrow_back</i>
                    <span class="q-pl-sm q-pr-sm q-py-sm q-title text-black">Back</span>
                  </q-btn>
                </div>
              </div>
              <div class="col">
                <div class="row justify-end" v-if="!$v.$invalid">
                  <q-btn
                    rounded
                    color="secondary"
                    class="text-weight-bold z-top"
                    @click.native="page=3"
                  >
                    <span class="q-pl-lg q-pr-sm q-py-sm q-title text-black">Thanks! Next</span>
                    <i class="material-icons q-title text-black text-weight-bold">arrow_forward</i>
                    <i class="material-icons q-caption text-black q-pb-md q-pl-lg">lens</i>
                  </q-btn>
                  <div class="beak rotate-30 self-end z-top"></div>
                  <div class="rotate-30 self-end shadow"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 q-mx-md self-end">
            <q-card class="bg-white rounded q-pa-md">
              <q-card-title class="text-primary">
                <span class="text-weight-bold q-headline">Your Profile</span>
              </q-card-title>
              <q-card-main>
                <div class="row items-center q-my-lg">
                  <div class="col-3 q-mr-md">
                    <span class="text-weight-bold q-title">Gender</span>
                  </div>
                  <div class="col-auto">
                    <q-btn
                      flat
                      color="grey-8"
                      align="center"
                      size="xl"
                      :class="{ pushed: gender === 'male' }"
                      class="full-width q-px-xl"
                      @click.native="gender= 'male'"
                      >
                      <q-icon name="fas fa-male" />
                    </q-btn>
                  </div>
                  <div class="col-auto">
                    <q-btn
                      flat
                      color="grey-8"
                      size="xl"
                      class="full-width q-px-xl"
                      align="center"
                      :class="{ pushed: gender === 'female' }"
                      @click.native="gender= 'female'"
                    >
                      <q-icon name="fas fa-female" />
                    </q-btn>
                  </div>
                </div>
                <div class="row items-center q-my-lg">
                  <div class="col-3 q-mr-md">
                    <span class="text-weight-bold q-title">Date of Birth</span>
                  </div>
                  <div class="col-auto">
                    <q-datetime-picker v-model="dob" type="date" format="DD-MM-YYYY" format-model="date" class="text-weight-bold"/>
                  </div>
                </div>
                <div class="row items-center q-my-lg">
                  <div class="col-3 q-mr-md">
                    <span class="text-weight-bold q-title">Race/Ethnicity</span>
                  </div>
                  <div class="col">
                    <q-field
                      :error="$v.race.$error"
                      error-label="Required Field"
                    >
                      <q-input
                        v-model="race"
                        upper-case
                        color="black"
                        class="text-weight-bold q-title"
                        @blur="$v.race.$touch"
                      />
                    </q-field>
                  </div>
                </div>
                <div class="row items-center q-my-lg">
                  <div class="col-3 q-mr-md">
                    <span class="text-weight-bold q-title">Nationality</span>
                  </div>
                  <div class="col">
                    <q-field
                      :error="$v.country.$error"
                      error-label="Required Field"
                    >
                      <q-input v-model="country" class="text-weight-bold q-title">
                        <q-autocomplete
                          :static-data="{field: 'value', list: countries}"
                          @selected="selected" @blur="$v.country.$touch"
                        />
                      </q-input>
                    </q-field>
                  </div>
                </div>
              </q-card-main>
            </q-card>
          </div>
        </div>
      </div>
      <div class="col" v-if="page===3" id="page3">
        <div class="row items-start justify-between">
          <div class="col q-mx-md">
            <img src="~assets/quasar-logo-full.svg" class="toki" />
            <h2 class="text-secondary text-weight-medium">
              Great Job {{name}}!
            </h2>
            <p class="text-white font-secondary q-display-1">
              We are almost done! Let's set up our languages and we are good to go :)
            </p>
            <div class="row justify-center q-mt-xl" v-if="languages.length > 0">
              <q-btn
                rounded
                color="secondary"
                class="text-weight-bold z-top"
                @click.native="createProfile()"
              >
                <span class="q-pl-lg q-pr-sm q-py-sm q-title text-black">Setup Profile!</span>
                <i class="material-icons q-caption text-black q-pb-md q-pl-lg">lens</i>
              </q-btn>
              <div class="beak rotate-30 self-end z-top"></div>
              <div class="rotate-30 self-end shadow"></div>
            </div>
          </div>
          <div class="col q-mx-md">
            <q-card class="bg-white rounded q-pa-md">
              <q-card-title class="text-primary">
                <span class="text-weight-bold q-headline">Your Languages!</span>
              </q-card-title>
              <q-card-main>
                <q-chips-input v-model="languages" color="primary" class="font-secondary" placeholder="Type your language">
                  <q-autocomplete
                    :static-data="{field: 'value', list: languagesList}"
                    @selected="selected" />
                </q-chips-input>
                <div class="col">
                  <div class="text-weight-bold q-headline text-primary q-mt-lg">Proficiency Test Scores</div>
                  <div class="row justify-start items-start q-mt-lg">
                    <div class="col font-secondary">
                      <q-toggle v-model="ielts" label="IELTS" color="secondary" class="text-weight-bold q-title" />
                    </div>
                    <div class="col font-secondary text-weight-regular q-title" v-if="ielts">
                      <div class="row items-center q-mb-sm">
                        <div class="col text-center">
                          Listening
                        </div>
                        <div class="col-auto">
                          <q-input type="number" decimals="1" v-model="ieltsScore.listening" suffix="/ 9.0"  class="q-py-none" />
                        </div>
                      </div>
                      <div class="row items-center q-mb-sm">
                        <div class="col text-center">
                          Reading
                        </div>
                        <div class="col-auto">
                          <q-input type="number" decimals="1" v-model="ieltsScore.reading" suffix="/ 9.0"  class="q-py-none" />
                        </div>
                      </div>
                      <div class="row items-center q-mb-sm">
                        <div class="col text-center">
                          Writing
                        </div>
                        <div class="col-auto">
                          <q-input type="number" decimals="1" v-model="ieltsScore.writing" suffix="/ 9.0"  class="q-py-none" />
                        </div>
                      </div>
                      <div class="row items-center q-mb-sm">
                        <div class="col text-center">
                          Speaking
                        </div>
                        <div class="col-auto">
                          <q-input type="number" decimals="1" v-model="ieltsScore.speaking" suffix="/ 9.0"  class="q-py-none" />
                        </div>
                      </div>
                      <div class="row items-center q-mb-sm">
                        <div class="col text-center">
                          Average
                        </div>
                        <div class="col-auto">
                          <q-input type="number" decimals="1" v-model="ieltsScore.average" suffix="/ 9.0"  class="q-py-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row justify-start items-start q-mt-lg">
                    <div class="col font-secondary">
                      <q-toggle v-model="toefl" label="TOEFL" color="secondary" class="text-weight-bold q-title" />
                    </div>
                    <div class="col font-secondary text-weight-regular q-title" v-if="toefl">
                      <div class="row items-center q-mb-sm">
                        <div class="col text-center">
                          Listening
                        </div>
                        <div class="col-auto">
                          <q-input type="number" decimals="0" v-model="toeflScore.listening" suffix="/ 30"  class="q-py-none" />
                        </div>
                      </div>
                      <div class="row items-center q-mb-sm">
                        <div class="col text-center">
                          Reading
                        </div>
                        <div class="col-auto">
                          <q-input type="number" decimals="0" v-model="toeflScore.reading" suffix="/ 30"  class="q-py-none" />
                        </div>
                      </div>
                      <div class="row items-center q-mb-sm">
                        <div class="col text-center">
                          Writing
                        </div>
                        <div class="col-auto">
                          <q-input type="number" decimals="0" v-model="toeflScore.writing" suffix="/ 30"  class="q-py-none" />
                        </div>
                      </div>
                      <div class="row items-center q-mb-sm">
                        <div class="col text-center">
                          Speaking
                        </div>
                        <div class="col-auto">
                          <q-input type="number" decimals="0" v-model="toeflScore.speaking" suffix="/ 30"  class="q-py-none" />
                        </div>
                      </div>
                      <div class="row items-center q-mb-sm">
                        <div class="col text-center">
                          Average
                        </div>
                        <div class="col-auto">
                          <q-input type="number" decimals="0" v-model="toeflScore.total" suffix="/ 120"  class="q-py-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-main>
            </q-card>
          </div>
        </div>
      </div>
    </transition>
  </q-page>
</template>

<script>
import countries from '../assets/countries.json'
import languages from '../assets/languages.json'
import { required } from 'vuelidate/lib/validators'
import { QSpinnerFacebook } from 'quasar'

function parseCountries () {
  return countries.map(country => {
    return {
      label: country.name.common,
      value: country.name.common
    }
  })
}
function parseLanguages () {
  return languages.map(language => {
    return {
      label: language.English,
      value: language.English
    }
  })
}

export default {
  name: 'Walkthrough',
  data () {
    return {
      name: '',
      email: 'test@gmail.com',
      page: 1,
      gender: 'male',
      genderoptions: [
        { label: 'Male', icon: 'fa-male', value: 'male' },
        { label: 'Female', value: 'female' }
      ],
      dob: '',
      race: '',
      nationality: '',
      country: '',
      countries: parseCountries(),
      languagesList: parseLanguages(),
      languages: [],
      ielts: false,
      ieltsScore: { listening: 0, reading: 0, writing: 0, speaking: 0, average: 0 },
      toefl: false,
      toeflScore: { listening: 0, reading: 0, writing: 0, speaking: 0, total: 0 }
    }
  },
  validations: {
    race: { required },
    country: { required }
  },
  methods: {
    search (terms, done) {
      console.log(terms)
      done(terms)
    },
    selected (item) {
      console.log(item)
    },
    createProfile () {
      console.log('creating')
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'secondary',
        message: 'Creating Profile...',
        messageColor: 'secondary'
      })
      setTimeout(() => {
        this.$q.loading.hide()
      }, 3000)
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'
.rounded
  border-radius 20px
.toki
  width 100px
#page1 input.q-input-target
  line-height: 52px
  height: 52px
  color: $secondary
.beak
  width 0
  height 0
  margin-left -10px
  margin-bottom -2px
  border-top 10px solid transparent
  border-bottom: 10px solid transparent
  border-left 20px solid $secondary
  z-index 99
.shadow
  width 0
  height 0
  margin-left -20px
  margin-bottom -4px
  border-top 11px solid transparent
  border-bottom: 11px solid transparent
  border-left 22px solid rgba(0,0,0,0.24)
  z-index 1
.rotate-30
  -webkit-transform rotate(30deg)
  transform rotate(30deg)
.pushed
  background $secondary
  color $primary !important
</style>
