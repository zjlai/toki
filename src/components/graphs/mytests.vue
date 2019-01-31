<template>
  <div class="row justify-center items-top full-width">
    <div id="resultsgraph" ref="resultsgraph" class="flex-grow echarts-container">
    </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify'
const echarts = require('echarts')

const API_PATH_TOKI = '/toki'
const API_NAME_TOKI = 'toki'

const genOptions = (axis, score) => {
  return {
    title: {
      text: 'My Test History',
      subtext: 'How have I done?'
    },
    legend: {
      show: true,
      data: [ 'My Score' ]
    },
    xAxis: [{
      type: 'category',
      boundaryGap: true,
      data: axis,
      axisLabel: {
        inside: false,
        textStyle: {
          color: '#999'
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    }],
    yAxis: [{
      type: 'value',
      axisLabel: {
        textStyle: {
          color: '#999'
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      }
    }],
    tooltip: {
      show: true
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '20%',
      containLabel: true
    },
    toolbox: {
      feature: {
        magicType: {
          type: ['line', 'bar']
        },
        dataView: { show: false },
        saveAsImage: {
          pixelRatio: 2
        }
      }
    },
    series: [{ // For shadow
      type: 'bar',
      itemStyle: {
        normal: { color: 'rgba(0,0,0,0.05)' }
      },
      barGap: '-100%',
      barCategoryGap: '40%',
      data: Array(score.length).fill(100),
      animation: false
    }, {
      type: 'line',
      data: score,
      name: 'Score',
      stack: 'Test Results',
      areaStyle: {},
      label: {
        normal: {
          show: true,
          position: 'top',
          formatter: '{c}%'
        }
      },
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [
              {offset: 0, color: 'rgba(47, 102, 233, 0.2)'},
              {offset: 0.5, color: 'rgba(47, 102, 233, 0.6)'},
              {offset: 1, color: 'rgba(47, 102, 233, 1)'}
            ]
          )
        },
        emphasis: {
          color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [
              {offset: 0, color: 'rgba(47, 102, 233, 0.6)'},
              {offset: 0.7, color: 'rgba(47, 102, 233, 0.8)'},
              {offset: 1, color: 'rgba(47, 102, 233, 1)'}
            ]
          )
        }
      }
    }]
  }
}

export default {
  name: 'TestResults',
  data () {
    return {
      results: [],
      graph: {}
    }
  },
  async mounted () {
    await this.getTests()
    // console.log(this)
    this.graph = echarts.init(this.$refs.resultsgraph, null, {renderer: 'svg'})
    this.updateGraph()
  },
  methods: {
    async getTests () {
      this.results = await API.get(API_NAME_TOKI, API_PATH_TOKI + '/mytestresults', { queryStringParameters: { course: this.$route.query.course } })
      const dataAxis = this.results.map(res => { return `T${res.test_cycle}` })
      // const testWrong = this.results.map(res => { return res.results.length - res.score })
      // const testScore = this.results.map(res => { return res.score })
      const percentage = this.results.map(res => { return parseInt(res.score / res.results.length * 100) })
      // console.log(percentage, this.results)
      this.options = genOptions(dataAxis, percentage)
    },
    updateGraph () {
      // console.log(this.options)
      this.graph.setOption(this.options)
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'

.flex-grow
  flex-grow 1
.echarts-container
  min-height 400px
  min-width 400px
</style>
