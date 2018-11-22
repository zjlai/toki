<template>
  <q-carousel
    no-swipe
    v-model="section"
    height="100%">
    <q-carousel-slide>
      <div class="row full-height q-pa-lg">
        <div class="col full-height q-pa-lg">
          <h1 class="text-secondary q-pb-lg">
            FORGOT PASSWORD
          </h1>
          <div>
            <h3 class="text-black">
              REGISTERED EMAIL
            </h3>
            <q-field
              :error="$v.email.$error"
              error-label="Enter a valid email">
              <q-input
                v-model.trim="email"
                placeholder="Enter your Email"
                class="text-bold"
                type="email"
                @blur="$v.email.$touch"
              />
            </q-field>
          </div>
          <div class="row q-my-lg">
            <div class="col justify-center font-secondary">
              <q-btn
                flat
                no-caps
                align="left"
                class="full-width text-bold"
                to="/user/signin"
              >
                <i class="material-icons" style="font-size:24px;">arrow_back</i>
                Back
              </q-btn>
            </div>
            <div class="col">
              <q-btn
                rounded
                label="RESET"
                color="primary"
                class="full-width text-bold font-secondary"
                @click="resetPassword()"
                :disabled="$v.email.$error || !$v.email.$dirty"
              />
            </div>
          </div>
        </div>
      </div>
    </q-carousel-slide>
    <q-carousel-slide>
      <div class="row full-height q-pa-lg">
        <div class="col full-height q-pa-lg">
          <h1 class="text-secondary q-pb-lg">
            FORGOT PASSWORD
          </h1>
          <p class="info-text text-bold">
            A verification code has been sent to your email address: <br>
            {{this.email}}
          </p>
          <div>
            <h3 class="text-black">
              NEW PASSWORD
            </h3>
            <q-field
              :error="$v.password.$error"
              error-label="Enter a password of min 8 characters"
            >
              <q-input
                v-model.trim="password"
                placeholder="********"
                class="text-bold"
                type="password"
                @blur="$v.password.$touch"/>
            </q-field>
          </div>
          <div class="q-my-sm">
            <h3 class="text-black">
              RE-ENTER NEW PASSWORD
            </h3>
            <q-field
              :error="$v.repeatPassword.$error"
              error-label="Password is not the same"
            >
              <q-input
                v-model.trim="repeatPassword"
                placeholder="********"
                class="text-bold"
                type="password"
                @blur="$v.repeatPassword.$touch"/>
            </q-field>
          </div>
          <div class="q-mb-none">
            <h3 class="text-black">
              ENTER VERIFICATION CODE
            </h3>
            <q-field
              :error="$v.verificationCode.$error"
              error-label="Enter verification code"
            >
              <q-input
                v-model.trim="verification_code"
                placeholder="01234567"
                class="text-bold"
              />
            </q-field>
          </div>
          <div class="q-mt-none text-primary">
            <q-btn
              flat
              no-caps
              text-color="primary"
              class="q-pa-none text-bold font-secondary"
              @click.native="resetPassword()"
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
                label="Reset"
                color="primary"
                class="full-width text-bold font-secondary"
                @click.native="submitNewPassword()"
                :disabled="$v.password.$Error || $v.repeatPassword.$error || $v.verificationCode.$error"
              />
            </div>
          </div>
        </div>
      </div>
    </q-carousel-slide>
    <q-btn
      slot="quick-nav"
      slot-scope="props"
      color="secondary"
      flat
      dense
      :class="{inactive: !props.current}"
    >
      <i class="material-icons nav-icon text-secondary">lens</i>
    </q-btn>
  </q-carousel>
</template>

<script>
import { required, sameAs, email, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'ForgotPassword',
  data () {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      verification_code: '',
      section: 0
    }
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) },
    repeatPassword: {
      required,
      sameAsPassword: sameAs('password')
    },
    verificationCode: { required }
  },
  methods: {
    resetPassword () {
      this.$auth.forgotPassword(this.email)
        .then(data => {
          this.$q.notify({
            message: `Code has been sent to ${this.email}.`,
            color: 'secondary',
            textColor: 'black',
            timeout: 5000,
            position: 'top'
          })
          this.section = 1
        })
        .catch(err => {
          this.$q.notify({
            message: err.message,
            color: 'secondary',
            textColor: 'black',
            timeout: 5000,
            position: 'top'
          })
        })
    },
    submitNewPassword () {
      this.$auth.forgotPasswordSubmit(this.email, this.verification_code, this.password)
        .then(data => {
          console.log(data)
          this.$q.notify({
            message: 'Password Updated',
            color: 'secondary',
            textColor: 'black',
            timeout: 5000,
            position: 'top'
          })
          this.$router.push('/')
        })
        .catch(err => {
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
</style>
