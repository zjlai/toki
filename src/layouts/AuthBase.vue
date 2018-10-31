<template>
  <q-layout view="hHh lpr fFf" class="bg-primary">

    <q-layout-header class="no-shadow auth-header">
      <div class="flex text-weight-bold text-secondary items-end justify-center">
        TOK<span class="font-secondary text-weight-medium">I</span>DO
      </div>
    </q-layout-header>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

    <q-layout-footer class="no-shadow auth-footer">
      <div class="flex q-caption text-white items-end justify-center">
        <span>Privacy Policy</span>
        <span class="break">.</span>
        <span>EULA</span>
        <span class="break">.</span>
        <span>Terms & Conditions</span>
      </div>
    </q-layout-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'AuthBase',
  data () {
    return {
    }
  }
}
</script>

<style>
.auth-header, .auth-footer {
  height: 80px;
}
.auth-header div {
  font-size: 24px;
  height: 100%;
}
.auth-footer div span {
  padding: 0px 8px;
}
</style>
