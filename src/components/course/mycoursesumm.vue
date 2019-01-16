<template>
  <q-card inline class="coursecard q-ma-sm q-mt-sm">
    <q-card-title :class="titleColor" class="items-center">
      <h4>{{course.name}}</h4>
      <q-btn
        slot="right"
        flat
        color="primary"
        text-color="white"
        icon="remove_red_eye"
        size="8px"
        class="q-py-none"
        @click.native="toDash"
      />
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
          <h6 class="sub-title-blue">TEACHER IN CHARGE</h6>
          <h5 class="font-primary">
            {{course.last_name}} {{course.first_name}}
          </h5>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col border-right">
          <h6 class="sub-title-blue">Days Remaining</h6>
          <h5 class="font-primary">
            {{days}}
          </h5>
        </div>
        <div class="col text-center">
          <h6 class="sub-title-blue">MASTERY</h6>
          <h5 class="font-primary">
            {{course.mastery || '0%'}}
          </h5>
        </div>
      </div>
      <hr />
      <div class="col q-mt-md">
        <h6 class="sub-title-blue">DESCRIPTION</h6>
        <p class="text-bold q-pt-sm truncate">
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
import { date } from 'quasar'

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
    },
    days () {
      return date.getDateDiff(this.course.end_date, new Date())
    }
  },
  methods: {
    toDash () {
      this.$router.push({ path: `/dashboard?course={this.course.course_id}` })
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
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
