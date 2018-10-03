<template>
  <q-card inline class="coursecard">
    <q-card-title class="text-white q-pa-sm q-pl-lg" :class="titleColor">
      <span class="text-bold">{{course.title}}</span>
    </q-card-title>
    <q-card-main>
      <div class="col">
        <div class="row">
          <div class="col q-ma-sm q-caption text-bold">
            <div class="text-primary">
              COURSE CODE
            </div>
            <div class="font-secondary">
              {{course.code}}
            </div>
          </div>
          <div class="col q-ma-sm q-caption text-bold border-left text-center">
            <div class="text-primary">
              STATUS
            </div>
            <div class="font-secondary">
              {{course.status}}
            </div>
          </div>
        </div>
        <div class="col q-mx-sm q-py-sm q-caption text-bold border-top">
          <div class="text-primary">
            DESCRIPTION
          </div>
          <div class="font-secondary">
            {{course.description}}
          </div>
        </div>
      </div>
    </q-card-main>
    <q-card-actions align="center">
      <q-btn flat no-caps icon-right="arrow_forward" class="font-secondary q-caption" :class="underlineColor">
        More Details
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'CourseCard',
  props: ['course', 'color'],
  data () {
    return {}
  },
  computed: {
    titleColor () {
      return {
        'bg-primary': this.color === 'primary',
        'bg-secondary': this.color === 'secondary'
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

<style>

.coursecard {
  width: 300px;
  border-radius: 10px;
  margin-right: 24px;
  margin-bottom: 24px;
}
.border-left {
  border-left: 1px solid grey;
}
.border-top {
  border-top: 1px solid grey;
}
.underline-primary {
  border-bottom: 1px solid #2F66E9;
  border-radius: 0;
}
.underline-secondary {
  border-bottom: 1px solid #FCBD43;
  border-radius: 0;
}

</style>
