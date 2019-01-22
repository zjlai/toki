<template>
  <q-card class="tk-container-sub collapse full-height">
    <q-card-title class="title-bar">
      <div class="row justify-between">
        <h1>TOKI TEST</h1>
        <course-select @changecourse="changeCourse" :course="course" :key="course.course_id" />
      </div>
    </q-card-title>
    <q-card-main class="col tk-container-sub-inner">
      <no-test v-if="notest" />
      <div class="col" v-if="!notest">
        <div class="row">
          <!--<div class="col-2">
            <q-card class="tk-container-sub collapse">
              <q-card-title class="title-bar-grey text-center">
                <h4>NEXT TEST</h4>
              </q-card-title>
              <q-card-main class="tk-container-sub-inner">
                <timer
                  :min="0"
                  :max="259200"
                  :duration="172913"
                  range="days"
                  disabled
                />
              </q-card-main>
            </q-card>
          </div> -->
          <div class="col">
            <q-card class="tk-container-sub collapse">
              <q-card-title class="title-bar-yellow text-center">
                <h4>TEST INSTRUCTIONS</h4>
              </q-card-title>
              <q-card-main class="tk-container-sub-inner">
                <div class="col text-black q-title">
                  <div class="row q-my-lg items-center">
                    <div class="col-auto">
                      <q-btn
                        color="primary"
                        text-color="white"
                        round
                        size="sm"
                        class="q-mr-md"
                      >
                        <span class="q-title">1</span>
                      </q-btn>
                    </div>
                    <div class="col inline">
                      You will be given
                      <span class="text-primary">30 seconds</span>
                      per question.
                    </div>
                  </div>
                  <div class="row q-my-lg items-center">
                    <div class="col-auto">
                      <q-btn
                        color="primary"
                        text-color="white"
                        round
                        size="sm"
                        class="q-mr-md"
                      >
                        <span class="q-title">2</span>
                      </q-btn>
                    </div>
                    <div class="col inline">
                      This is a standard
                      <span class="text-primary">spelling test</span>
                      <!--and followed by an <span class="text-primary">MCQ</span>-->
                    </div>
                  </div>
                  <div class="row q-my-lg items-center">
                    <div class="col-auto">
                      <q-btn
                        color="primary"
                        text-color="white"
                        round
                        size="sm"
                        class="q-mr-md"
                      >
                        <span class="q-title">3</span>
                      </q-btn>
                    </div>
                    <div class="col inline">
                      You will <span class="text-primary">not be allowed</span>
                      to go back to the previous question
                    </div>
                  </div>
                  <div class="row q-my-lg items-center">
                    <div class="col-auto">
                      <q-btn
                        color="primary"
                        text-color="white"
                        round
                        size="sm"
                        class="q-mr-md"
                      >
                        <span class="q-title">4</span>
                      </q-btn>
                    </div>
                    <div class="col inline">
                      If you have answered before the time limit, you can move on the the next question.
                    </div>
                  </div>
                </div>
              </q-card-main>
            </q-card>
          </div>
        </div>
        <div class="row justify-center q-my-md">
          <q-btn
            color="primary"
            rounded
            class="font-secondary button"
            @click.native="beginTest"
          >
            <span class="q-px-lg q-py-sm q-title">
              BEGIN TEST
              <i class="material-icons">arrow_forward</i>
            </span>
          </q-btn>
        </div>
      </div>
    </q-card-main>
  </q-card>
</template>

<script>
import Timer from '../common/timer'
import CourseSelect from '../common/selectcourse'
import NoTest from './noneavailable'
import { API } from 'aws-amplify'

const API_PATH_TOKI = '/toki'
const API_NAME_TOKI = 'toki'
const API_PATH_COURSES = '/courses'
const API_NAME_STUDENT = 'students'

export default {
  name: 'TestInstructionComponent',
  components: {
    Timer,
    CourseSelect,
    NoTest
  },
  data () {
    return {
      course: {},
      notest: false
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
  },
  methods: {
    async getCourse () {
      const init = {
        queryStringParameters: {
          course: this.$route.query.course
        }
      }
      const res = await API.get(API_NAME_STUDENT, API_PATH_COURSES + '/mycourse', init)
      this.course = res[0]
      this.words = await API.get(API_NAME_TOKI, API_PATH_TOKI + '/gettestwords', { queryStringParameters: { course_id: this.course.course_id } })
      if (this.words.length === 0) {
        this.notest = true
      }
    },
    beginTest () {
      this.$router.push({ path: 'test/testing', query: { course: this.course.course_id } })
    },
    changeCourse (course) {
      console.log('Change Course', course)
      this.$router.push({ path: '/learn', query: { course: course.course } }, () => {
        this.$route.go()
      })
    }
  }
}
</script>

<style>
.bullet {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
</style>
