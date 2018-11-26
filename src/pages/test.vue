<template>
  <q-page class="container">
    <div class="full-height">
      <router-view />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'TestBase',
  components: {
  },
  data () {
    return {
    }
  }
}
</script>

<style>
.rounded {
  border-radius: 20px;
}
.rounded-sm {
  border-radius: 10px;
}
.border-left {
  border-left: 1px solid grey;
}
.border-top {
  border-top: 1px solid grey;
}
</style>
