<template>
  <q-table
    title="Your Stats"
    :data="tableData"
    :columns="columns"
    row-key="id"
  />
</template>

<script>
import { API } from 'aws-amplify'

const API_PATH_TOKI = '/toki'
const API_NAME_TOKI = 'toki'
const API_PATH_COURSES = '/courses'
const API_NAME_STUDENT = 'students'

export default {
  name: 'StudentStats',
  data () {
    return {}
  },
  mounted () {

  }
}
</script>

<style>
</style>
