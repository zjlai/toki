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
              :error="emailError"
              error-label="Enter a valid email">
              <q-input v-model="email" placeholder="Enter your Email" class="font-secondary" />
            </q-field>
          </div>
          <div class="q-my-md">
            <div class="text-black q-subheading text-bold">
              PASSWORD
              <i class="material-icons req-icon text-primary">lens</i>
            </div>
            <q-field>
              <q-input v-model="password" placeholder="********" class="font-secondary" />
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
              <q-btn rounded label="Sign Up" color="primary" class="full-width" @click="section = 1"/>
            </div>
            <div class="col justify-center font-secondary">
              <q-btn flat rounded no-caps label="Already Signed Up?" size="11px" class="full-width font-secondary" />
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
            z*******k@gmail.com
          </p>
          <div class="q-my-md">
            <div class="text-black q-subheading text-bold">
              ENTER VERFICATION CODE
            </div>
            <q-field>
              <q-input v-model="verification_code" placeholder="01234567" class="font-secondary" />
            </q-field>
          </div>
          <div class="q-my-md text-primary font-secondary">
            Didn't receive a code?
          </div>
          <div class="row q-my-lg">
            <div class="col justify-center font-secondary">
              <p class="full-width font-secondary">
                <i class="material-icons" style="font-size:24px;">arrow_back</i>
                Back
              </p>
            </div>
            <div class="col">
              <q-btn rounded label="Proceed" color="primary" class="full-width" />
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
