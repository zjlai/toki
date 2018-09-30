<template>
  <q-carousel
    no-swipe
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
              :error="emailError"
              error-label="Enter a valid email">
              <q-input v-model="email" placeholder="Enter your Email" class="font-secondary" />
            </q-field>
          </div>
          <div class="q-my-md">
            <div class="text-black q-subheading text-bold">
              PASSWORD
            </div>
            <q-field>
              <q-input v-model="password" placeholder="********" class="font-secondary" />
            </q-field>
          </div>
          <div class="q-my-lg">
            <q-checkbox v-model="rememberme" label="Remember Me" class="font-secondary q-caption" />
          </div>
          <div class="row q-my-lg">
            <div class="col">
              <q-btn rounded label="Sign In" color="primary" class="full-width" />
            </div>
            <div class="col justify-center font-secondary">
              <q-btn flat rounded no-caps label="New around here?" size="12px" class="full-width font-secondary" />
            </div>
          </div>
          <div class="flex q-my-lg"></div>
          <div class="col text-center items-end content-end justify-end q-my-lg">
            Forgot your password?
          </div>
        </div>
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script>
export default {
  name: 'SignIn',
  data () {
    return {
      email: '',
      password: '',
      rememberme: false
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
