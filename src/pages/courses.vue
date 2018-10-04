<template>
  <q-page class="q-pr-xl q-py-xl">
    <div class="col full-height">
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
  min-height: calc(100vh - 150px);
  height: 100%;
  width: 100%;
}
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
