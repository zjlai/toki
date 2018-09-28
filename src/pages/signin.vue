<template>
  <q-page class="flex flex-center">
    <q-card class="auth-container shadow-8" color="primary" text-color="black">
      <q-card-main class="q-pa-none full-height">
        <div class="row full-height">
          <div class="col no-margin">
            <div class="row full-height items-center">
              <div class="col-2">
              </div>
              <div class="col-10 items-center">
                <div class="text-weight-bold text-white q-headline q-mb-lg">
                  TOK<span class="font-secondary text-weight-medium">I</span>DO
                </div>
                <div class="text-weight-bold text-secondary items-center q-display-3 tagline q-mt-lg">
                  LEARN <br> NATURALLY
                </div>
              </div>
            </div>
          </div>
          <div class="col bg-white no-margin ">
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
              <q-carousel-slide>
                Slide 2
              </q-carousel-slide>
            </q-carousel>
          </div>
        </div>
      </q-card-main>
    </q-card>
  </q-page>
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
.auth-container{
  height: 520px;
  width: 980PX;
}
div.tagline {
  line-height: 0.9;
}
i.req-icons {
  font-size: 8px;
  top: 2px;
  vertical-align: top;
}
.signin-btn {
  width: 100%;
}
</style>
