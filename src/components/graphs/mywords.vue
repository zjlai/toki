<template>
  <div class="row justify-center items-top full-width">
    <div class="column col-auto q-pr-md">
      <dt class="text-bold font-primary text-blue h3">Total Words: {{words.total}}</dt>
      <dt class="text-bold font-primary text-blue h3">Mastered Words: {{mastered}}</dt>
      <dt class="text-bold font-primary text-blue h3">Remaining Words Unlearnt: {{unlearntWords}}</dt>
    </div>
    <div id="wordgraph" ref="wordgraph" class="flex-grow column echarts-container">
    </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify'
const echarts = require('echarts')

const API_PATH_TOKI = '/toki'
const API_NAME_TOKI = 'toki'

// const barHeight = 50
const genOptions = (data, levels) => {
  return {
    title: {
      text: 'Words Mastery Chart',
      subtext: 'How am I learning?'
    },
    legend: {
      show: true,
      data: [ 'Mastery', 'Average Range' ]
    },
    angleAxis: {
      type: 'category',
      data: levels,
      show: false
    },
    grid: {
      top: 100
    },
    tooltip: {
      show: true
    },
    radiusAxis: {
    },
    polar: {
    },
    toolbox: {
      // y: 'bottom',
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
    visualMap: {
      type: 'piecewise',
      dimension: 0,
      text: ['Mastered', 'Not Learnt'],
      calculable: true,
      pieces: [
        { min: 0, max: 1 },
        { min: 1, max: 25 },
        { min: 25, max: 50 },
        { min: 50, max: 75 },
        { min: 75, max: 100 }
      ],
      color: ['rgba(47, 102, 233, 1)', 'rgba(47, 102, 233, 0.75)', 'rgba(47, 102, 233, 0.5)', 'rgba(47, 102, 233, 0.25)', 'rgba(47, 102, 233, 0.1)']
      // min: 0,
      // max: 100,
      // inRange: {
      //   color: ['rgba(0, 0, 0, 0.2)', 'blue'],
      //   opacity: [0.2, 1]
      // },
      // outOfRange: {
      //   color: 'rgba(0, 0, 0, 0.2)'
      // }
    },
    series: [{
      type: 'bar',
      data: data,
      coordinateSystem: 'polar',
      name: 'Plot range',
      stack: 'Word Mastery',
      barWidth: '75%'
    },
    {
      type: 'bar',
      itemStyle: {
        normal: {
          color: 'rgba(0, 0, 0, 0.2)'
        }
      },
      data: data.map(d => { return { value: 100 - d, visualMap: false } }),
      coordinateSystem: 'polar',
      name: 'Plot range',
      stack: 'Word Mastery'
    }]
  }
}

export default {
  name: 'WordGraph',
  data () {
    return {
      title: 'My Words',
      words: [],
      processedWords: [],
      categories: [],
      graph: {},
      mastered: 0
    }
  },
  async mounted () {
    await this.getMyWords()
    this.graph = echarts.init(this.$refs.wordgraph, null, {renderer: 'svg'})
    this.updateGraph()
  },
  methods: {
    async getMyWords () {
      this.words = await API.get(API_NAME_TOKI, API_PATH_TOKI + '/mywords', { queryStringParameters: { course: this.$route.query.course } })
      console.log(this.words.words)
      this.processedWords = this.words.words.map(word => { return parseInt(word.mastery) })
      this.unlearntWords = this.words.total - this.processedWords.length
      this.processedWords = this.processedWords.concat(Array(this.unlearntWords).fill(0))
      this.words.words.forEach(word => {
        if (parseInt(word.mastery) === 100) {
          this.mastered += 1
        }
      })
      this.categories = this.processedWords.map(word => { return word.word || 'Not Learnt Yet' })
      this.options = genOptions(this.processedWords, this.categories)
    },
    updateGraph () {
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
