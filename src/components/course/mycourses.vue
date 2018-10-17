<template>
  <q-card class="bg-white container rounded shadow-8">
    <q-card-main class="col q-pt-none">
      <q-toolbar color="white">
        <q-toolbar-title class="text-primary text-bold">
          MY COURSES
        </q-toolbar-title>
        <q-btn
          rounded
          color="secondary"
          class="text-black q-caption text-weight-bold q-px-xl"
          to="/courses/selectcourse"
        >
          <i class="material-icons">add</i>
          JOIN COURSE
        </q-btn>
      </q-toolbar>
      <div class="q-pa-lg">
        <course-card
          v-for="(course, index) in courses"
          :key="course.code"
          :course="course"
          :color="index % 2 === 0 ? 'primary': 'secondary'"
          details="false"
          style="width: 30%"/>
      </div>
    </q-card-main>
  </q-card>
</template>

<script>
import CourseCard from './mycoursesumm'

export default {
  name: 'MyCourses',
  components: {
    CourseCard
  },
  data () {
    return {
      courses: [
        {
          title: 'PBEP Level 1',
          code: 'PBEP01-0818',
          status: 'Enrolling',
          teacher: 'Mrs Ashley Lee',
          description: 'Professional Business English Program Level 1'
        },
        {
          title: 'PBEP Level 2',
          code: 'PBEP02-0818',
          status: 'Enrolling',
          teacher: 'Mrs Ashley Lee',
          description: 'Professional Business English Program Level 2'
        },
        {
          title: 'PBEP Level 3',
          code: 'PBEP03-0818',
          status: 'Enrolling',
          teacher: 'Mrs Ashley Lee',
          description: 'Professional Business English Program Level 3'
        },
        {
          title: 'PBEP Level 4',
          code: 'PBEP04-0818',
          status: 'Closed',
          teacher: 'Mrs Ashley Lee',
          description: 'Professional Business English Program Level 4'
        },
        {
          title: 'PBEP Level 5',
          code: 'PBEP05-0818',
          status: 'Closed',
          teacher: 'Mrs Ashley Lee',
          description: 'Professional Business English Program Level 5'
        }
      ]
    }
  }
}
</script>

<style>
</style>
