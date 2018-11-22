<template>
  <q-page class="container">
    <div class="full-height">
      <router-view />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'CoursesBase',
  data () {
    return {
    }
  }
}
</script>

<style>
.container {
  min-height: calc(100vh - 95px) !important;
  height: calc(100vh - 95px);
  width: 100%;
}
</style>
