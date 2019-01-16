<template>
  <q-card class="tk-container-sub collapse full-height">
    <q-card-title class="title-bar">
      <h1>Course Sign Up</h1>
    </q-card-title>
    <q-card-main class="col tk-container-sub-inner">
      <!--<div id="search-filter" class="q-px-lg">
        <q-search v-model="terms" hide-underline class="round-search inset-shadow q-py-md">
          <q-autocomplete
            separator
            @search="search"
            @selected="selected"
          />
        </q-search>
        <div class="row">
          <q-field
            label="Filter:"
            label-width="1"
            class="full-width text-bold"
          >
            <q-option-group
              inline
              type="radio"
              v-model="category"
              :options="[
                { label: 'Course Code', value: 'code' },
                { label: 'Course Title', value: 'title' },
                { label: 'Course Teacher', value: 'teacher'}
              ]"
              class="text-bold"
            />
          </q-field>
        </div>
      </div>-->
      <!-- List of courses -->
      <div class="q-pa-lg">
        <course-card
          v-for="(course, index) in courses"
          :key="course.code"
          :course="course"
          :color="index % 2 === 0 ? 'primary': 'secondary'"
          details="true"
         />
      </div>
    </q-card-main>
</q-card>
</template>

<script>
import CourseCard from './coursecard'
import { API } from 'aws-amplify'
// import { QSpinnerFacebook } from 'quasar'

const API_PATH = '/courses'
const API_NAME = 'students'

export default {
  name: 'SelectCourse',
  components: {
    CourseCard
  },
  data () {
    return {
      terms: '',
      category: 'code',
      courses: []
    }
  },
  async mounted () {
    this.courses = await API.get(API_NAME, API_PATH)
    console.log(this.courses)
  },
  methods: {
    search (terms, done) {
      console.log(terms)
      done([])
    },
    selected (select) {
      console.log(select)
    }
  }
}
</script>

<style>
.round-search {
  border-radius: 19px;
  padding-left: 19px;
}
</style>
