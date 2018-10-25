<template>
  <q-carousel
    no-swipe
    quick-nav
    v-model="section"
    height="100%">
    <q-carousel-slide>
      <div class="row full-height">
        <div class="col-2"></div>
        <div class="col-8">
          <div class="text-secondary q-headline text-bold q-my-lg">
            SIGN UP
          </div>
          <div class="q-my-sm">
            <div class="text-black q-subheading text-bold">
              EMAIL
              <i class="material-icons req-icon text-primary">lens</i>
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
              <i class="material-icons req-icon text-primary">lens</i>
            </div>
            <q-field
              :error="$v.password.$error"
              error-label="Enter a password of min 8 characters"
            >
              <q-input
                v-model.trim="password"
                placeholder="********"
                class="font-secondary"
                type="password"
                @blur="$v.password.$touch"/>
            </q-field>
          </div>
          <div class="q-my-lg">
            <q-checkbox v-model="agreetc"  class="font-secondary q-caption" />
            <span class="font-secondary q-caption">
              I Agree with the <span class="text-bold">Terms & Conditions</span>
            </span>
          </div>
          <div class="row q-my-lg">
            <div class="col">
              <q-btn
                rounded
                label="Sign Up"
                color="primary"
                class="full-width"
                @click.native="signUp()"
                :disabled="!agreetc || $v.$anyError"
              />
            </div>
            <div class="col justify-center font-secondary">
              <q-btn
                flat
                no-caps
                label="Already Signed Up?"
                size="11px"
                class="full-width font-secondary"
                to="/user/signin" />
            </div>
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
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'SignUp',
  data () {
    return {
      email: '',
      password: '',
      agreetc: true,
      verification_code: '',
      section: 0
    }
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) }
  },
  methods: {
    signUp () {
      this.$auth.signUp({
        username: this.email,
        password: this.password
      })
        .then(data => {
          console.log(data)
          this.section = 1
        })
        .catch(err => {
          console.log(err)
          this.$q.notify({
            message: err.message,
            color: 'secondary',
            textColor: 'black',
            timeout: 5000,
            position: 'top',
            class: 'font-secondary'
          })
        })
    },
    verifyEmail () {
      this.$auth.confirmSignUp(this.email, this.verification_code)
        .then(data => {
          if (data === 'SUCCESS') {
            this.$router.push('/user/signin')
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
i.req-icon {
  font-size: 6px;
  top: 2px;
  vertical-align: top;
}

.q-carousel-quick-nav {
  background: transparent;
}

button i.nav-icon {
  font-size: 14px;
}

button.inactive i.nav-icon {
  font-size: 12px;
  color: grey !important;
}
.signin-btn {
  width: 100%;
}
</style>
