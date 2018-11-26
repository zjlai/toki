<template>
  <q-page class="container">
    <div class="full-height">
      <q-card class="tk-container-sub collapse full-height">
        <q-card-title class="title-bar">
          <h1>COURSE DASHBOARD</h1>
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
                      <h5 class="font-primary">College Vocab</h5>
                    </div>
                    <hr>
                    <div class="col">
                      <h6 class="sub-title-blue">COURSE CODE</h6>
                      <h5 class="font-primary">TKDEMO1235</h5>
                    </div>
                    <hr>
                    <div class="col">
                      <h6 class="sub-title-blue">TEACHER IN CHARGE</h6>
                      <h5 class="font-primary">MS ASHLEY LEE</h5>
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

export default {
  name: 'CourseDashboard',
  components: {
    TokiMessage,
    CourseOverviewSmall,
    CourseDetails
  },
  data () {
    return {}
  },
  mounted () {
    console.log(this.$route)
  }
}
</script>

<style>
</style>
