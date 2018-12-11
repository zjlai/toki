<template>
  <q-carousel
    no-swipe
    v-model="section"
    height="100%">
    <q-carousel-slide>
      <div class="row full-height">
        <div class="col full-height q-pa-lg">
          <div class="row h80 q-pa-lg">
            <div class="col">
              <h1 class="text-secondary q-pb-lg">
                SIGN IN
              </h1>
              <div>
                <h4 class="text-black label" required>
                  EMAIL
                </h4>
                <q-field
                  :error="$v.email.$error"
                  error-label="Enter a valid email">
                  <q-input
                    v-model.trim="email"
                    placeholder="Enter your Email"
                    type="email"
                    class="text-bold"
                    @blur="$v.email.$touch"
                  />
                </q-field>
              </div>
              <div>
                <h4 class="text-black label" required>
                  PASSWORD
                </h4>
                <q-field>
                  <q-input
                    v-model.trim="password"
                    placeholder="********"
                    class="text-bold"
                    type="password"
                  />
                </q-field>
              </div>
            <!--  <div class="q-my-lg">
                <q-checkbox v-model="rememberme" label="Remember Me" class="font-secondary q-caption" />
              </div>-->
              <div class="row q-my-lg">
                <div class="col">
                  <q-btn
                    rounded
                    label="Sign In"
                    color="primary"
                    class="full-width font-secondary"
                    @click.native="signIn()"
                    :disabled="$v.$anyError || !$v.$anyDirty"
                  />
                </div>
                <div class="col justify-center">
                  <q-btn
                    flat
                    no-caps
                    label="New around here?"
                    size="12px"
                    class="full-width text-bold"
                    to="/user/signup"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row h20 items-end">
            <q-btn
              flat
              no-caps
              label="Forgot password?"
              size="12px"
              class="full-width text-bold"
              to="/user/forgotpassword"
            />
          </div>
        </div>
      </div>
    </q-carousel-slide>
    <q-carousel-slide>
      <div class="row full-height q-pa-lg">
        <div class="col full-height q-pa-lg">
          <h1 class="text-secondary q-pb-lg">
            VERIFY
          </h1>
          <p class="info-text text-bold">
            A verification code has been sent to your email address: <br>
            {{this.email}}
          </p>
          <div class="q-mb-lg">
            <h3 class="text-black">
              ENTER VERFICATION CODE
            </h3>
            <q-field>
              <q-input
                v-model.trim="verification_code"
                placeholder="01234567"
                class="text-bold"
              />
            </q-field>
          </div>
          <div class="q-mb-lg text-primary">
            <q-btn
              flat
              no-caps
              text-color="primary"
              class="q-pa-none text-bold"
              @click.native="resendCode()"
            >
              Didn't receive a code?
            </q-btn>
          </div>
          <div class="row q-my-lg">
            <div class="col justify-center font-secondary">
              <q-btn
                align="left"
                flat
                class="full-width text-bold"
                @click.native="section = 0"
              >
                <i class="material-icons" style="font-size:24px;">arrow_back</i>
                Back
              </q-btn>
            </div>
            <div class="col">
              <q-btn
                rounded
                label="Proceed"
                color="primary"
                class="full-width font-secondary text-bold"
                @click.native="verifyEmail" />
            </div>
          </div>
        </div>
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { API } from 'aws-amplify'
import { QSpinnerFacebook } from 'quasar'

const API_PATH = '/students'
const API_NAME = 'students'

export default {
  name: 'SignIn',
  data () {
    return {
      email: '',
      password: '',
      verification_code: '',
      rememberme: false,
      section: 0,
      user: null,
      errormsg: ''
    }
  },
  validations: {
    email: { required, email }
  },
  methods: {
    signIn () {
      const that = this
      this.$auth.signIn(this.email, this.password)
        .then(user => {
          console.log('sign in success', user)
          return user
        })
        .then(user => {
          that.user = user
          this.checkUser()
        })
        .catch(err => {
          console.log(err)
          if (err.code === 'UserNotConfirmedException') {
            this.section = 1
          } else {
            this.$q.notify({
              message: err.message,
              color: 'secondary',
              textColor: 'black',
              timeout: 5000,
              position: 'top',
              class: 'font-secondary'
            })
          }
        })
    },
    checkUser () {
      const user = this.user
      if (!user) { return }
      this.$auth.verifiedContact(user)
        .then(async data => {
          console.log('verify result', data)

          if (data.verified) {
            this.$q.loading.show({
              spinner: QSpinnerFacebook,
              spinnerColor: 'secondary',
              message: 'Checking Profile...',
              messageColor: 'secondary'
            })
            const firsttime = await API.get(API_NAME, API_PATH)
            this.$q.loading.hide()
            if (firsttime.length === 0) {
              this.$router.push('/firsttimeuser')
            } else {
              this.$router.push('/dashboard')
            }
          } else {
            this.$router.push('/user/signin')
          }
        })
    },
    verifyEmail () {
      this.$auth.confirmSignUp(this.email, this.verification_code)
        .then(data => {
          if (data === 'SUCCESS') {
            this.section = 0
            this.$q.notify({
              message: `Email Verified. Please sign in again.`,
              color: 'secondary',
              textColor: 'black',
              timeout: 5000,
              position: 'top'
            })
          }
        })
        .catch(err => {
          console.log(err)
          this.$q.notify({
            message: err.message,
            color: 'secondary',
            textColor: 'black',
            timeout: 5000,
            position: 'top'
          })
        })
    },
    resendCode () {
      this.$auth.resendSignUp(this.email)
        .then(() => {
          console.log('code resent')
          this.$q.notify({
            message: `Code has been sent to ${this.email}.`,
            color: 'secondary',
            textColor: 'black',
            position: 'top',
            timeout: 5000
          })
        })
        .catch(err => {
          console.log(err)
          this.$q.notify({
            message: err.message,
            color: 'secondary',
            textColor: 'black',
            timeout: 5000,
            position: 'top'
          })
        })
    }
  }
}
</script>

<style>
i.req-icons {
  font-size: 8px;
  top: 2px;
  vertical-align: top;
}
.signin-btn {
  width: 100%;
}
</style>
