<template>
  <q-card class="bg-white container rounded shadow-8">
    <q-card-main class="col q-pt-none">
      <q-toolbar color="white">
        <q-toolbar-title class="text-primary text-bold">
          COURSE SIGN UP
        </q-toolbar-title>
      </q-toolbar>
      <div class="row">
        <div class="col-5 q-pa-lg">
          <q-card class="rounded-sm">
            <q-card-title class="text-white q-pa-sm q-pl-lg bg-primary text-center">
              <span class="text-bold q-body-2">{{course.title}}</span>
            </q-card-title>
            <q-card-main>
              <div class="col">
                <div class="col q-ma-sm">
                  <div class="text-primary q-caption text-weight-bold">
                    TITLE
                  </div>
                  <div class="q-subheading font-secondary text-weight-medium q-mt-sm">
                    {{course.title}}
                  </div>
                </div>
                <div class="row q-mx-sm q-py-sm border-top">
                  <div class="col q-my-sm">
                    <div class="text-primary q-caption text-weight-bold">
                      COURSE CODE
                    </div>
                    <div class="q-subheading font-secondary text-weight-medium q-mt-sm">
                      {{course.code}}
                    </div>
                  </div>
                  <div class="col q-ma-sm text-center border-left">
                    <div class="text-primary q-caption text-weight-bold">
                      TEACHER
                    </div>
                    <div class="q-subheading font-secondary text-weight-medium q-mt-sm">
                      {{course.teacher}}
                    </div>
                  </div>
                </div>
                <div class="col q-mx-sm q-py-sm border-top">
                  <div class="text-primary q-caption text-weight-bold">
                    DESCRIPTION
                  </div>
                  <div class="q-subheading font-secondary text-weight-medium q-mt-sm">
                    {{course.description}}
                  </div>
                </div>
              </div>
            </q-card-main>
          </q-card>
        </div>
        <div class="col-5 q-pa-lg">
          <q-card class="rounded-sm">
            <q-card-title class="text-white q-pa-sm q-pl-lg bg-primary  text-center">
              <span class="text-bold q-body-2">GENERAL INFORMATION</span>
            </q-card-title>
            <q-card-main>
              <div class="col">
                <div class="row q-mx-sm q-py-sm">
                  <div class="col q-my-sm">
                    <div class="text-primary q-caption text-weight-bold">
                      START DATE
                    </div>
                    <div class="q-subheading font-secondary text-weight-medium q-mt-sm">
                      {{course.start_date}}
                    </div>
                  </div>
                  <div class="col q-ma-sm text-center border-left">
                    <div class="text-primary q-caption text-weight-bold">
                      END DATE
                    </div>
                    <div class="q-subheading font-secondary text-weight-medium q-mt-sm">
                      {{course.end_date}}
                    </div>
                  </div>
                </div>
                <div class="row q-mx-sm q-py-sm border-top">
                  <div class="col q-my-sm">
                    <div class="text-primary q-caption text-weight-bold">
                      NO. OF WORDS
                    </div>
                    <div class="q-subheading font-secondary text-weight-medium q-mt-sm">
                      {{course.words}}
                    </div>
                  </div>
                  <div class="col q-ma-sm text-center border-left">
                    <div class="text-primary q-caption text-weight-bold">
                      AVG. WORDS PER WEEK
                    </div>
                    <div class="q-subheading font-secondary text-weight-medium q-mt-sm">
                      {{course.ave_words}}
                    </div>
                  </div>
                </div>
              </div>
            </q-card-main>
          </q-card>
        </div>
        <div class="col-2 q-pa-lg">
          <q-card class="rounded-sm ">
            <q-card-title class="text-white q-pa-sm q-pl-lg bg-primary text-center">
              <span class="text-bold q-body-2">STATUS</span>
            </q-card-title>
            <q-card-main class="bg-secondary">
              <div class=" text-center text-bold font-secondary q-subheading q-pt-md">
                {{course.status}}
              </div>
            </q-card-main>
          </q-card>
          <q-card class="rounded-sm q-my-md">
            <q-card-title class="text-white q-pa-sm q-pl-lg bg-primary text-center">
              <span class="text-bold q-body-2">NO. OF STUDENTS</span>
            </q-card-title>
            <q-card-main class="">
              <div class=" text-center text-medium font-secondary q-display-2 q-pt-md">
                {{course.students}}
              </div>
            </q-card-main>
          </q-card>
        </div>
      </div>
    </q-card-main>
    <q-card-actions align="center">
      <div class="row">
        <q-btn flat no-caps icon="arrow_back" class="font-secondary q-caption">
          Back
        </q-btn>
        <q-btn color="secondary" rounded class="text-white text-bold">
          <span class="q-px-xl q-subheading text-bold">
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
export default {
  name: 'CourseSignup',
  components: {
    CourseCard
  },
  data () {
    return {
      course:
        {
          title: 'PBEP Level 1',
          code: 'PBEP01-0818',
          status: 'Enrolling',
          description: 'Professional Business English Program Level 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          teacher: 'Prof. Heather Douglas',
          start_date: '1 Oct 2018',
          end_date: '30 Nov 2018',
          words: 80,
          ave_words: 10,
          students: 43

        }
    }
  }
}
</script>

<style>
</style>
