<template>
  <q-card class="bg-white container rounded shadow-8">
    <q-card-main class="col q-pt-none">
      <q-toolbar color="white">
        <q-toolbar-title class="text-primary text-bold">
          COURSE SIGN UP
        </q-toolbar-title>
      </q-toolbar>
      <div id="search-filter" class="q-px-lg">
        <q-search v-model="terms" hide-underline class="round-search inset-shadow q-py-md">
          <q-autocomplete
            separator
            @search="search"
            @selected="selected"
          />
        </q-search>
        <div class="font-secondary row">
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
              class="text-weight-regular"
            />
          </q-field>
        </div>
      </div>
      <!-- List of courses -->
      <div class="q-pa-lg">
        <course-card
          v-for="(course, index) in courses"
          :key="course.code"
          :course="course"
          :color="index % 2 === 0 ? 'primary': 'secondary'"
          details="true" />
      </div>
    </q-card-main>
  </q-card>
</template>

<script>
import CourseCard from './coursecard'
export default {
  name: 'SelectCourse',
  components: {
    CourseCard
  },
  data () {
    return {
      terms: '',
      category: 'code',
      courses: [
        {
          title: 'PBEP Level 1',
          code: 'PBEP01-0818',
          status: 'Enrolling',
          description: 'Professional Business English Program Level 1'
        },
        {
          title: 'PBEP Level 2',
          code: 'PBEP02-0818',
          status: 'Enrolling',
          description: 'Professional Business English Program Level 2'
        },
        {
          title: 'PBEP Level 3',
          code: 'PBEP03-0818',
          status: 'Enrolling',
          description: 'Professional Business English Program Level 3'
        },
        {
          title: 'PBEP Level 4',
          code: 'PBEP04-0818',
          status: 'Closed',
          description: 'Professional Business English Program Level 4'
        },
        {
          title: 'PBEP Level 5',
          code: 'PBEP05-0818',
          status: 'Closed',
          description: 'Professional Business English Program Level 5'
        }
      ]
    }
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
