<template>
  <q-page class="container">
    <div class="full-height">
      <q-card class="tk-container-sub collapse full-height">
        <q-card-title class="title-bar">
          <div class="row justify-between">
            <h1>COURSE DASHBOARD</h1>
            <course-select @changecourse="changeCourse" :course="course" :key="course.course_id" />
          </div>
        </q-card-title>
        <q-card-main class="col tk-container-sub-inner bg-yellow">
          <div class="col">
            <div class="row items-start">
              <div class="col-10">
                <toki-message />
              </div>
              <div class="col-2">
                <q-card class="tk-container-sub collapse" style="margin-top:0;">
                  <q-card-title class="title-bar-blue">
                    <h4>
                      COURSE OVERVIEW
                    </h4>
                  </q-card-title>
                  <q-card-main class="tk-container-sub-inner">
                    <div class="col">
                      <h6 class="sub-title-blue">TITLE</h6>
                      <h5 class="font-primary">{{course.name}}</h5>
                    </div>
                    <hr>
                    <div class="col">
                      <h6 class="sub-title-blue">COURSE CODE</h6>
                      <h5 class="font-primary">{{course.classcode}}</h5>
                    </div>
                    <hr>
                    <div class="col">
                      <h6 class="sub-title-blue">TEACHER IN CHARGE</h6>
                      <h5 class="font-primary">{{course.first_name}} {{course.last_name}}</h5>
                    </div>
                  </q-card-main>
                </q-card>
              </div>
            </div>
          </div>
        </q-card-main>
      </q-card>
      <q-card class="tk-container-sub collapse full-height">
        <q-card-title class="title-bar-blue">
          <h1>COURSE DETAILS</h1>
        </q-card-title>
        <q-card-main class="col tk-container-sub-inner">
          <div class="col">
            <course-details />
          </div>
        </q-card-main>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import TokiMessage from '../components/toki/message'
import CourseOverviewSmall from '../components/course/courseoverviewsmall'
import CourseDetails from '../components/dashboard/coursedetails'
import CourseSelect from '../components/common/selectcourse'
import { API } from 'aws-amplify'

const API_PATH_TOKI = '/toki'
const API_NAME_TOKI = 'toki'
const API_PATH_COURSES = '/courses'
const API_NAME_STUDENT = 'students'

export default {
  name: 'CourseDashboard',
  components: {
    TokiMessage,
    CourseOverviewSmall,
    CourseDetails,
    CourseSelect
  },
  data () {
    return {
      course: ''
    }
  },
  async mounted () {
    if (this.$route.query.hasOwnProperty('course')) {
      this.getCourse()
    } else {
      const courses = await API.get(API_NAME_STUDENT, API_PATH_COURSES + '/mycourses', { queryStringParameters: { course: '' } })
      this.$router.replace({ query: { course: courses[0].course_id } })
      this.getCourse()
    }
    console.log(this.$auth)
  },
  methods: {
    changeCourse (course) {
      console.log(course)
    },
    async getCourse () {
      const init = {
        queryStringParameters: {
          course: this.$route.query.course
        }
      }
      const res = await API.get(API_NAME_STUDENT, API_PATH_COURSES + '/mycourses', init)
      this.course = res[0]
      this.words = await API.get(API_NAME_TOKI, API_PATH_TOKI + '/gettestwords', { queryStringParameters: { course_id: this.course.course_id } })
    }
  }
}
</script>

<style>
</style>
