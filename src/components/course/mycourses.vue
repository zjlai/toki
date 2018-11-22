<template>
  <q-card class="tk-container-sub collapse full-height">
    <q-card-title class="title-bar items-center">
      <h1>MY COURSES</h1>
      <q-btn
        rounded
        color="secondary"
        class="button button-yellow q-caption"
        slot="right"
        to="/courses/selectcourse"
      >
        <i class="material-icons">add</i>
        JOIN COURSE
      </q-btn>
    </q-card-title>
    <q-card-main class="tk-container-sub-inner">
      <div class="q-pa-lg">
        <course-card
          v-for="(course, index) in courses"
          :key="course.code"
          :course="course"
          :color="index % 2 === 0 ? 'primary': 'secondary'"
        />
      </div>
    </q-card-main>
  </q-card>
</template>

<script>
import CourseCard from './mycoursesumm'
import { API } from 'aws-amplify'

const API_PATH = '/courses'
const API_NAME = 'students'

export default {
  name: 'MyCourses',
  components: {
    CourseCard
  },
  data () {
    return {
      courses: []
    }
  },
  async mounted () {
    const res = await API.get(API_NAME, API_PATH + '/mycourses')
    console.log(res)
    this.courses = res
  }
}
</script>

<style>
</style>
