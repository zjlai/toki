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
            FORGOT PASSWORD
          </div>
          <div class="q-my-sm">
            <div class="text-black q-subheading text-bold">
              REGISTERED EMAIL
            </div>
            <q-field
              :error="emailError"
              error-label="Enter a valid email">
              <q-input v-model="email" placeholder="Enter your Email" class="font-secondary" />
            </q-field>
          </div>
          <div class="row q-my-lg">
            <div class="col justify-center font-secondary">
              <p class="full-width font-secondary">
                <i class="material-icons" style="font-size:24px;">arrow_back</i>
                Back
              </p>
            </div>
            <div class="col">
              <q-btn rounded label="RESET" color="primary" class="full-width" @click="section = 1"/>
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
            FORGOT PASSWORD
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
              <q-btn rounded label="Proceed" color="primary" class="full-width" @click="section=2" />
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
            FORGOT PASSWORD
          </div>
          <div class="q-my-sm">
            <div class="text-black q-subheading text-bold">
              NEW PASSWORD
            </div>
            <q-field>
              <q-input v-model="password" type="password" placeholder="********" class="font-secondary" />
            </q-field>
          </div>
          <div class="q-my-sm">
            <div class="text-black q-subheading text-bold">
              RE-ENTER NEW PASSWORD
            </div>
            <q-field
              :error="passwordError"
              error-label="Passwords do not match">
              <q-input v-model="passwordconfirm" type="password" placeholder="********" class="font-secondary" />
            </q-field>
          </div>
          <div class="row q-my-lg">
            <div class="col justify-center font-secondary">
              <p class="full-width font-secondary">
                <i class="material-icons" style="font-size:24px;">arrow_back</i>
                Back
              </p>
            </div>
            <div class="col">
              <q-btn rounded label="RESET" color="primary" class="full-width" />
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
  name: 'ForgotPassword',
  data () {
    return {
      email: '',
      password: '',
      passwordconfirm: '',
      verification_code: '',
      section: 0
    }
  }
}
</script>

<style>
</style>
