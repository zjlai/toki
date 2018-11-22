<template>
  <q-card inline class="coursecard q-ma-sm q-mt-sm">
    <q-card-title :class="titleColor">
      <h4>{{course.name}}</h4>
    </q-card-title>
    <q-card-main class="col tk-container-sub-inner">
      <div class="row">
        <div class="col border-right">
          <h6 class="sub-title-blue">COURSE CODE</h6>
          <h5 class="font-primary">
            {{course.code}}
          </h5>
        </div>
        <div class="col text-center">
          <h6 class="sub-title-blue">STATUS</h6>
          <h5 class="font-primary">
            {{course.status || 'Enrolling'}}
          </h5>
        </div>
      </div>
      <hr />
      <div class="col q-mt-md">
        <h6 class="sub-title-blue">DESCRIPTION</h6>
        <p class="text-bold q-pt-sm">
          {{course.description}}
        </p>
      </div>
    </q-card-main>
    <q-card-actions align="center" v-if="details === 'true'">
      <q-btn
        flat
        no-caps
        icon-right="arrow_forward"
        class="text-bold text-grey-full q-caption"
        :class="underlineColor"
        :to="{name: 'coursesignup', params: {course: course}}"
      >
        More Details
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'CourseCard',
  props: ['course', 'color', 'details'],
  data () {
    return {}
  },
  computed: {
    titleColor () {
      return {
        'title-bar-blue': this.color === 'primary',
        'title-bar-yellow': this.color === 'secondary'
      }
    },
    underlineColor () {
      return {
        'underline-primary': this.color === 'primary',
        'underline-secondary': this.color === 'secondary'
      }
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'
.coursecard {
  width: 30%;
  border-radius: 10px;
}
.description
  margin-top 10px
  line-height 14px
.underline-primary {
  border-bottom: 1px solid #2F66E9;
  border-radius: 0;
}
.underline-secondary {
  border-bottom: 1px solid #FCBD43;
  border-radius: 0;
}
.border-right
  border-right 1px solid $tk-grey-2
</style>
