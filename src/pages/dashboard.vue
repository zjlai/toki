<template>
  <q-page class="q-pr-xl q-py-xl">
    <div class="col full-height">
      <q-card class="bg-white container rounded shadow-8">
        <q-card-main class="col q-pt-none">
          <q-toolbar color="white">
            <q-toolbar-title class="text-primary text-bold">
              COURSE DASHBOARD
            </q-toolbar-title>
          </q-toolbar>
          <div class="col bg-secondary rounded-sm">
            <div class="row">
              <div class="col-10 q-pa-lg">
                <toki-message />
              </div>
              <div class="col-2 q-pa-lg">
                <course-overview-small />
              </div>
            </div>
          </div>
          <div class="col q-mt-lg">
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
  }
}
</script>

<style>
.container {
  min-height: calc(100vh - 150px);
  // height: 100%;
  width: 100%;
}
.rounded {
  border-radius: 20px;
}
.rounded-sm {
  border-radius: 10px;
}
</style>
