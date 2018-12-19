<template>
  <div>
    <div class="course-select row items-center">
      <label>{{selectedCourse}}</label>
      <i class="q-icon q-if-control material-icons select-icon">arrow_drop_down</i>
      <q-popover anchor="bottom right" self="top right" no-focus ref="pop">
        <q-list separator link dense>
          <q-item v-for="cs in options" :key="cs.value" class="course-select" @click.native="changeCourse(cs)">
            {{cs.label}}
          </q-item>
        </q-list>
      </q-popover>
    </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify'

const API_PATH = '/courses'
const API_NAME = 'students'
export default {
  name: 'SelectCourse',
  props: ['course'],
  data () {
    return {
      options: [],
      selectedCourse: ''
    }
  },
  async mounted () {
    const res = await API.get(API_NAME, API_PATH + '/mycourses')
    res.forEach((course) => {
      this.options.push({
        label: course.name,
        value: course.course_id
      })
    })
    if (this.course) {
      this.selectedCourse = this.course.name
    } else {
      this.selectedCourse = this.options[0].name
      this.$emit('changecourse', { course: this.options[0].value })
    }
  },
  methods: {
    changeCourse (course) {
      console.log(course)
      this.$refs.pop.hide()
      this.selectedCourse = course.label
      this.$emit('changecourse', { course: course.value })
    }
  }
}
</script>

<style>
.course-select {
  min-width: 100%;
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;
  color: black;
}
</style>
