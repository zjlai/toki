<template>
  <q-card class="tk-container-sub collapse full-height">
    <q-card-title class="title-bar">
      <h1>Course Sign Up</h1>
    </q-card-title>
    <q-card-main class="col tk-container-sub-inner">
      <div class="row">
        <div class="col-5">
          <q-card class="tk-container-sub collapse">
            <q-card-title class="title-bar-blue text-center">
              <h4>Course Overview</h4>
            </q-card-title>
            <q-card-main class="tk-container-sub-inner">
              <div class="col">
                <div class="col">
                  <h6 class="sub-title-blue">TITLE</h6>
                  <h5 class="font-primary">
                    {{course.name}}
                  </h5>
                </div>
                <hr />
                <div class="row q-mt-md">
                  <div class="col border-right">
                    <h6 class="sub-title-blue">COURSE CODE</h6>
                    <h5 class="font-primary">{{course.code}}</h5>
                  </div>
                  <div class="col text-center">
                    <h6 class="sub-title-blue">TEACHER</h6>
                    <h5 class="font-primary">{{course.last_name}} {{course.first_name}}</h5>
                  </div>
                </div>
                <hr />
                <div class="col">
                  <h6 class="sub-title-blue">DESCRIPTION</h6>
                  <p class="text-bold q-pt-sm">{{course.description}}</p>
                </div>
              </div>
            </q-card-main>
          </q-card>
        </div>
        <div class="col-5">
          <q-card class="tk-container-sub collapse">
            <q-card-title class="title-bar-blue text-center">
              <h4>General Information</h4>
            </q-card-title>
            <q-card-main class="tk-container-sub-inner">
              <div class="col">
                <div class="row">
                  <div class="col border-right">
                    <h6 class="sub-title-blue">START DATE</h6>
                    <h5 class="font-primary">{{course.start_date}}</h5>
                  </div>
                  <div class="col text-center">
                    <h6 class="sub-title-blue">END DATE</h6>
                    <h5 class="font-primary">{{course.end_date}}</h5>
                  </div>
                </div>
                <hr />
                <div class="row q-mt-md">
                  <div class="col border-right">
                    <h6 class="sub-title-blue">NO. OF WORDS</h6>
                    <h5 class="font-primary">{{course.wordcount}}</h5>
                  </div>
                  <div class="col text-center">
                    <h6 class="sub-title-blue">AVG. WORDS PER WEEK</h6>
                    <h5 class="font-primary">{{aveWords}}</h5>
                  </div>
                </div>
              </div>
            </q-card-main>
          </q-card>
        </div>
        <div class="col-2">
          <q-card class="tk-container-sub collapse">
            <q-card-title class="title-bar-blue text-center">
              <h4>STATUS</h4>
            </q-card-title>
            <q-card-main class="tk-container-sub-inner bg-secondary">
              <div class="text-center">
                <h4 class="font-primary text-bold">{{course.status}}</h4>
              </div>
            </q-card-main>
          </q-card>
          <q-card class="tk-container-sub collapse">
            <q-card-title class="title-bar-blue text-center">
              <h4>NO. OF STUDENTS</h4>
            </q-card-title>
            <q-card-main class="tk-container-sub collapse">
              <div class="text-center">
                <h1 class="font-primary text-bold q-display-2">{{course.studentsCount || 0}}</h1>
              </div>
            </q-card-main>
          </q-card>
        </div>
      </div>
    </q-card-main>
    <q-card-actions align="center">
      <div class="row">
        <q-btn flat no-caps icon="arrow_back" class="q-caption" to="/courses/selectcourse">
          Back
        </q-btn>
        <q-btn color="secondary" rounded class="text-white text-bold" @click.native="join">
          <span class="q-px-xl q-subheading text-bold font-secondary">
            JOIN
            <i class="material-icons">arrow_forward</i>
          </span>
        </q-btn>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import CourseCard from './coursecard'
import { date } from 'quasar'
import { API } from 'aws-amplify'

const API_PATH = '/courses'
const API_NAME = 'students'

export default {
  name: 'CourseSignup',
  components: {
    CourseCard
  },
  data () {
    return {
      course: {},
      aveWords: 0
    }
  },
  mounted () {
    console.log(this.$route.params)
    this.course = this.$route.params.course
    this.aveWords = this.averageWords()
    this.course.start_date = date.formatDate(this.course.start_date, 'DD MMM YYYY')
    this.course.end_date = date.formatDate(this.course.end_date, 'DD MMM YYYY')
  },
  methods: {
    async join () {
      const res = await API.post(API_NAME, API_PATH + '/join', {body: { course_id: this.course.course_id }})
      console.log(res)
      this.$q.notify('Enrolled!')
      this.$router.push('/courses')
    },
    averageWords () {
      const weeks = Math.round(this.course.duration) / 7 - 2
      if (weeks > 0) {
        return Math.round(this.course.wordcount / weeks)
      } else {
        return this.course.wordcount
      }
    }
  }
}
</script>

<style lang="stylus">
.border-right
  border-right 1px solid $tk-grey-2
</style>
