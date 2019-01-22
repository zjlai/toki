<template>
  <q-page padding class="row items-center">
    <transition
      mode="out-in"
      appear
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutRight"
    >
      <div class="col q-pl-xl" v-if="page===1" id="page1">
        <div class="row items-center q-pb-lg">
          <div class="col-1">
            <img svg-inline src="../assets/tokido.svg" class="toki" />
          </div>
          <div class="col-11">
            <h1 class="text-secondary font-primary">
              Hi {{name || email}}!
            </h1>
          </div>
        </div>
        <h2 class="text-white font-primary">
          My name is Toki! I am an A.I. designed to help you learn better naturally!
        </h2>
        <h2 class="text-white font-primary">
          First things first, could you answer a few questions for me? So I get to know you better!
        </h2>
        <q-field>
          <div class="row name text-white q-my-md justify-center items-center">
            <div class="col-auto">
              <h2 class="text-weight-bold q-ma-none q-mr-xl text-secondary font-primary">What's your name?</h2>
            </div>
            <div class="col text-bold text-black font-primary">
              <q-input
                v-model="name"
                class="h1"
              />
            </div>
          </div>
        </q-field>
        <div class="row items-center" v-show="name.length > 3">
          <q-btn
            rounded
            color="secondary"
            class="text-bold z-top no-shadow"
            @click.native="page=2"
          >
            <span class="q-px-lg q-py-sm q-title font-secondary text-bold text-black">Thanks! Next</span>
            <i class="material-icons q-caption text-black">lens</i>
          </q-btn>
          <img svg-inline src="../assets/tokido.svg" class="toki-btn" />
        </div>
      </div>
      <div class="col q-pl-xl" v-if="page===2" id="page2">
        <div class="row items-start">
          <div class="col">
            <img svg-inline src="../assets/tokido.svg" class="toki" style="width:60px"/>
            <div class="q-my-md q-pr-md">
              <h2 class="text-white text-bold font-primary">
                Just a couple more details <span class="text-secondary">{{name}}</span>! This information will help me to understand you better!
                Rest assured, all your information is kept top secret!
              </h2>
            </div>
            <div class="row q-mt-lg">
              <div class="col">
                <div class="row justify-start">
                  <q-btn
                    rounded
                    color="secondary"
                    class="text-bold font-secondary"
                    @click.native="page=1"
                  >
                    <i class="material-icons q-title text-black">arrow_back</i>
                    <span class="q-pl-sm q-pr-sm q-py-sm q-title text-bold text-black">Back</span>
                  </q-btn>
                </div>
              </div>
              <div class="row">
                <div class="row justify-end items-center" v-if="!$v.$invalid">
                  <q-btn
                    rounded
                    color="secondary"
                    class="text-bold z-top no-shadow"
                    @click.native="page=3"
                  >
                    <span class="q-px-lg q-py-sm q-title font-secondary text-bold text-black">Thanks! Next</span>
                    <i class="material-icons q-caption text-black">lens</i>
                  </q-btn>
                  <img svg-inline src="../assets/tokido.svg" class="toki-btn" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 q-mx-md self-end">
            <q-card class="bg-white rounded q-pa-md">
              <q-card-title class="text-primary">
                <h1>Your Profile</h1>
              </q-card-title>
              <q-card-main>
                <div class="row items-center q-my-lg">
                  <div class="col-3 q-mr-md">
                    <h3 class="label font-primary" required>Gender</h3>
                  </div>
                  <div class="col-auto">
                    <q-btn
                      flat
                      color="grey-8"
                      align="center"
                      size="lg"
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
                      size="lg"
                      class="full-width q-px-xl"
                      align="center"
                      :class="{ pushed: gender === 'female' }"
                      @click.native="gender= 'female'"
                    >
                      <q-icon name="fas fa-female" />
                    </q-btn>
                  </div>
                </div>
                <div class="row items-center q-my-lg offsetbot">
                  <div class="col-auto q-pr-md">
                    <h3 class="font-primary label" required>Date of Birth</h3>
                  </div>
                  <div class="col-auto">
                    <q-field
                      :error="$v.dob.$error"
                      error-label="Required Field"
                    >
                      <q-datetime-picker
                        v-model="dob"
                        type="date" format="DD-MM-YYYY"
                        format-model="string"
                        class="text-weight-bold"
                        @blur="$v.contact.$touch"
                      />
                    </q-field>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-auto q-pr-md">
                    <h3 class="font-primary label" required>Contact Number</h3>
                  </div>
                  <div class="col-auto">
                    <q-field
                      :error="$v.contact.$error"
                      error-label="Required Field"
                    >
                      <q-input
                        v-model="contact"
                        class="text-weight-bold h3"
                        @blur="$v.contact.$touch"
                      />
                    </q-field>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-auto q-pr-md">
                    <h3 class="font-primary label" required>Race/Ethnicity</h3>
                  </div>
                  <div class="col">
                    <q-field
                      :error="$v.race.$error"
                      error-label="Required Field"
                    >
                      <q-input
                        v-model="race"
                        color="black"
                        class="text-weight-bold h6"
                        @blur="$v.race.$touch"
                      />
                    </q-field>
                  </div>
                </div>
                <div class="row items-center label" required>
                  <div class="col-auto q-pr-md">
                    <h3 class="font-primary label" required>Nationality</h3>
                  </div>
                  <div class="col">
                    <q-field
                      :error="$v.country.$error"
                      error-label="Required Field"
                    >
                      <q-input v-model="country" class="h6 text-bold">
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
          <div class="col">
            <div class="row items-center q-my-md q-pr-md">
              <div class="col-auto q-mr-md">
                <img svg-inline src="../assets/tokido.svg" class="toki" style="max-width:60px" />
              </div>
              <div class="col-auto">
                <h1 class="text-secondary">
                  Great Job {{name}}!
                </h1>
              </div>
            </div>
            <h2 class="text-white font-primary">
              We are almost done! Let's set up your languages and we are good to go :)
            </h2>
            <div class="row justify-center q-mt-xl">
              <div class="col">
                <div class="row justify-start">
                  <q-btn
                    rounded
                    color="secondary"
                    class="text-bold font-secondary button-yellow"
                    @click.native="page=2"
                  >
                    <i class="material-icons q-title text-black text-bold">arrow_back</i>
                    <span class="q-pl-sm q-pr-sm q-py-sm q-title text-bold text-black">Back</span>
                  </q-btn>
                </div>
              </div>
              <div class="row justify-end" v-if="!$v.$invalid && languages.length > 0 && ctnum && classcode">
                <q-btn
                  rounded
                  color="secondary"
                  class="text-bold z-top no-shadow"
                  @click.native="createProfile"
                >
                  <span class="q-px-lg q-py-sm q-title font-secondary text-bold text-black">Setup Profile</span>
                  <i class="material-icons q-caption text-black">lens</i>
                </q-btn>
                <img svg-inline src="../assets/tokido.svg" class="toki-btn" />
              </div>
            </div>
          </div>
          <div class="col q-mx-md">
            <q-card class="bg-white rounded q-pa-md">
              <q-card-main>
                <h1 class="text-primary">Student Data</h1>
                <div class="row items-center q-mt-sm">
                  <div class="col">
                    <div class="items-center row">
                      <h3 class="label text-weight-bold q-mr-md" required> CT Number</h3>
                      <q-input
                        placeholder="CT12345678"
                        color="primary"
                        align="left"
                        class="text-bold q-pl-sm"
                        v-model="ctnum"
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="items-center row">
                      <h3 class="text-weight-bold q-mr-md">Class Code</h3>
                      <q-input
                        placeholder="Class123"
                        color="primary"
                        align="left"
                        class="text-bold q-pl-sm"
                        v-model="classcode"
                      />
                    </div>
                  </div>
                </div>
                <h1 class="text-primary q-my-md">Languages you know!</h1>
                <q-chips-input v-model="languages" color="primary" class="text-bold h3" placeholder="Type your language">
                  <q-autocomplete
                    class="text-bold"
                    :static-data="{field: 'value', list: languagesList}"
                    @selected="selected" />
                </q-chips-input>
                <div class="col">
                  <h1 class="text-primary q-mt-md">Proficiency Test Scores</h1>
                  <div class="row justify-start items-start q-mt-md">
                    <div class="col">
                      <q-toggle v-model="ielts" label="IELTS" color="secondary" class="text-weight-bold h3" />
                    </div>
                    <div class="col text-weight-regular h4 font-primary" v-if="ielts">
                      <div class="row items-center q-mb-sm">
                        <div class="col text-left font-primary">
                          Listening
                        </div>
                        <div class="col">
                          <q-input type="number" :decimals="1" v-model="ieltsScore.listening" suffix="/ 9.0"  class="q-py-none" />
                        </div>
                      </div>
                      <div class="row items-center q-mb-sm">
                        <div class="col text-left font-primary">
                          Reading
                        </div>
                        <div class="col">
                          <q-input type="number" :decimals="1" v-model="ieltsScore.reading" suffix="/ 9.0"  class="q-py-none" />
                        </div>
                      </div>
                      <div class="row items-center q-mb-sm">
                        <div class="col text-left font-primary">
                          Writing
                        </div>
                        <div class="col">
                          <q-input type="number" :decimals="1" v-model="ieltsScore.writing" suffix="/ 9.0"  class="q-py-none" />
                        </div>
                      </div>
                      <div class="row items-center q-mb-sm">
                        <div class="col text-left font-primary">
                          Speaking
                        </div>
                        <div class="col">
                          <q-input type="number" :decimals="1" v-model="ieltsScore.speaking" suffix="/ 9.0"  class="q-py-none" />
                        </div>
                      </div>
                      <div class="row items-center q-mb-sm">
                        <div class="col text-left font-primary">
                          Average
                        </div>
                        <div class="col">
                          <q-input type="number" :decimals="1" v-model="ieltsScore.average" suffix="/ 9.0"  class="q-py-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row justify-start items-start q-mt-md">
                    <div class="col">
                      <q-toggle v-model="toefl" label="TOEFL" color="secondary" class="text-weight-bold h3" />
                    </div>
                    <div class="col text-weight-regular h4" v-if="toefl">
                      <div class="row items-center q-mb-sm">
                        <div class="col text-left font-primary">
                          Listening
                        </div>
                        <div class="col">
                          <q-input type="number" :decimals="0" v-model="toeflScore.listening" suffix="/ 30"  class="q-py-none" />
                        </div>
                      </div>
                      <div class="row items-center q-mb-sm">
                        <div class="col text-left font-primary">
                          Reading
                        </div>
                        <div class="col">
                          <q-input type="number" :decimals="0" v-model="toeflScore.reading" suffix="/ 30"  class="q-py-none" />
                        </div>
                      </div>
                      <div class="row items-center q-mb-sm">
                        <div class="col text-left font-primary">
                          Writing
                        </div>
                        <div class="col">
                          <q-input type="number" :decimals="0" v-model="toeflScore.writing" suffix="/ 30"  class="q-py-none" />
                        </div>
                      </div>
                      <div class="row items-center q-mb-sm">
                        <div class="col text-left font-primary">
                          Speaking
                        </div>
                        <div class="col">
                          <q-input type="number" :decimals="0" v-model="toeflScore.speaking" suffix="/ 30"  class="q-py-none" />
                        </div>
                      </div>
                      <div class="row items-center q-mb-sm">
                        <div class="col text-left font-primary">
                          Average
                        </div>
                        <div class="col">
                          <q-input type="number" :decimals="0" v-model="toeflScore.total" suffix="/ 120"  class="q-py-none" />
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
import { API } from 'aws-amplify'

const API_PATH = '/students'
const API_NAME = 'students'

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
      email: '',
      page: 1,
      gender: 'male',
      genderoptions: [
        { label: 'Male', icon: 'fa-male', value: 'male' },
        { label: 'Female', value: 'female' }
      ],
      dob: '',
      race: '',
      country: '',
      contact: '',
      countries: parseCountries(),
      languagesList: parseLanguages(),
      languages: [],
      ielts: false,
      ieltsScore: { listening: 0, reading: 0, writing: 0, speaking: 0, average: 0 },
      toefl: false,
      toeflScore: { listening: 0, reading: 0, writing: 0, speaking: 0, total: 0 },
      ctnum: '',
      classcode: ''
    }
  },
  validations: {
    dob: { required },
    contact: { required },
    race: { required },
    country: { required }
  },
  mounted () {
    this.$auth.currentAuthenticatedUser()
      .then(user => {
        console.log(user)
        this.user = user
        this.email = user.attributes.email
      })
      .catch(err => console.log(err))
  },
  methods: {
    search (terms, done) {
      console.log(terms)
      done(terms)
    },
    selected (item) {
      console.log(item)
    },
    async createProfile () {
      const profile = {
        body: {
          name: this.name,
          email: this.email,
          ethnicity: this.race.toLowerCase(),
          nationality: this.country,
          gender: this.gender,
          dob: this.dob,
          contact_num: this.contact,
          ielts: JSON.stringify(this.ieltsScore),
          toefl: JSON.stringify(this.toeflScore),
          languages: JSON.stringify(this.languages),
          ctnum: this.ctnum,
          class: this.classcode
        }
      }
      console.log(profile)
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'secondary',
        message: 'Creating Profile...',
        messageColor: 'secondary'
      })
      let res = await API.post(API_NAME, API_PATH, profile)
      console.log(res)
      this.$q.loading.hide()
      this.$router.push('/courses')
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'
.rounded
  border-radius 20px
.toki
  width 100%
  max-height 60px
  fill $tk-yellow
.toki-btn
  height 46px
  left -46px
  position relative
  fill $tk-yellow
#page1 input.q-input-target
  line-height: 64px
  height: 64px
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
.offsetbot
  margin-bottom -20px
.label
  text-transform none
</style>
