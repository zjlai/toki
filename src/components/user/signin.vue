<template>
  <q-carousel
    no-swipe
    v-model="section"
    height="100%">
    <q-carousel-slide>
      <div class="row full-height">
        <div class="col-2"></div>
        <div class="col-8">
          <div class="text-secondary q-headline text-bold q-my-lg">
            SIGN IN
          </div>
          <div class="q-my-sm">
            <div class="text-black q-subheading text-bold">
              EMAIL
            </div>
            <q-field
              :error="$v.email.$error"
              error-label="Enter a valid email">
              <q-input
                v-model.trim="email"
                placeholder="Enter your Email"
                class="font-secondary"
                type="email"
                @blur="$v.email.$touch"
              />
            </q-field>
          </div>
          <div class="q-my-md">
            <div class="text-black q-subheading text-bold">
              PASSWORD
            </div>
            <q-field>
              <q-input
                v-model.trim="password"
                placeholder="********"
                class="font-secondary"
                type="password"
              />
            </q-field>
          </div>
          <div class="q-my-lg">
            <q-checkbox v-model="rememberme" label="Remember Me" class="font-secondary q-caption" />
          </div>
          <div class="row q-my-lg">
            <div class="col">
              <q-btn
                rounded
                label="Sign In"
                color="primary"
                class="full-width"
                @click.native="signIn()"
                :disabled="$v.$anyError || !$v.$anyDirty"
              />
            </div>
            <div class="col justify-center font-secondary">
              <q-btn
                flat
                no-caps
                label="New around here?"
                size="12px"
                class="full-width font-secondary"
                to="/user/signup"
              />
            </div>
          </div>
          <div class="flex q-my-lg"></div>
          <div class="col text-center items-end content-end justify-end q-my-lg" to="/user/forgotpassword">
            <q-btn
              flat
              no-caps
              label="Forgot your password?"
              size="12px"
              class="full-width font-secondary"
              to="/user/forgotpassword"
            />
          </div>
        </div>
      </div>
    </q-carousel-slide>
    <q-carousel-slide>
      <div class="row full-height">
        <div class="col-2"></div>
        <div class="col-8">
          <div class="text-secondary q-headline text-bold q-my-lg">
            VERIFY
          </div>
          <p class="info-text">
            A verification code has been sent to your email address: <br>
            {{this.email}}
          </p>
          <div class="q-my-md">
            <div class="text-black q-subheading text-bold">
              ENTER VERFICATION CODE
            </div>
            <q-field>
              <q-input v-model.trim="verification_code" placeholder="01234567" class="font-secondary" />
            </q-field>
          </div>
          <div class="q-my-md text-primary font-secondary">
            <q-btn
              flat
              no-caps
              text-color="primary"
              class="q-pa-none"
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
                class="full-width font-secondary"
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
                class="full-width"
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
        .then(data => {
          console.log('verify result', data)

          if (data.verified) {
            this.$router.push('/')
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
