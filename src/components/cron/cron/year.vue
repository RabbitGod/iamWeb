<template lang="html">
  <div :val="value_">
    <RadioGroup  v-model="type">
      <div>
        <Radio label="1" size="small" border>每年</Radio>
      </div>
      <div>
        <Radio label="5" size="small" border>不指定</Radio>
      </div>
      <div>
        <Radio label="2" size="small" border>周期</Radio>
        <span style="margin-left: 10px; margin-right: 5px;">从</span>
        <InputNumber @on-change="type = '2'" v-model="cycle.start" :min="2000" size="small" style="width: 100px;"></InputNumber>
        <span style="margin-left: 5px; margin-right: 5px;">至</span>
        <InputNumber @on-change="type = '2'" v-model="cycle.end" :min="2000"  size="small" style="width: 100px;"></InputNumber>
        年
      </div>
    </RadioGroup>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '*'
    }
  },
  data () {
    let year = new Date().getFullYear()
    return {
      type: '1', // 类型
      cycle: { // 周期
        start: year,
        end: year
      },
      loop: { // 循环
        start: 0,
        end: 0
      },
      week: { // 指定周
        start: 0,
        end: 0
      },
      work: 0,
      last: 0,
      appoint: [] // 指定
    }
  },
  computed: {
    value_ () {
      let result = []
      switch (this.type) {
        case '1': // 每秒
          result.push('*')
          break
        case '2': // 年期
          result.push(`${this.cycle.start}-${this.cycle.end}`)
          break
        case '3': // 循环
          result.push(`${this.loop.start}/${this.loop.end}`)
          break
        case '4': // 指定
          result.push(this.appoint.join(','))
          break
        case '6': // 最后
          result.push(`${this.last === 0 ? '' : this.last}L`)
          break
        default: // 不指定
          result.push('?')
          break
      };
      this.$emit('input', result.join(''))
      return result.join('')
    }
  },
  watch: {
    'value' (a, b) {
      this.updateVal()
    }
  },
  methods: {
    updateVal () {
      if (!this.value) {
        return
      }
      if (this.value === '?') {
        this.type = '5'
      } else if (this.value.indexOf('-') !== -1) { // 2周期
        if (this.value.split('-').length === 2) {
          this.type = '2'
          this.cycle.start = parseInt(this.value.split('-')[0])
          this.cycle.end = parseInt(this.value.split('-')[1])
        }
      } else if (this.value.indexOf('/') !== -1) { // 3循环
        if (this.value.split('/').length === 2) {
          this.type = '3'
          this.loop.start = parseInt(this.value.split('/')[0])
          this.loop.end = parseInt(this.value.split('/')[1])
        }
      } else if (this.value.indexOf('*') !== -1) { // 1每
        this.type = '1'
      } else if (this.value.indexOf('L') !== -1) { // 6最后
        this.type = '6'
        this.last = this.value.replace('L', '')
      } else if (this.value.indexOf('#') !== -1) { // 7指定周
        if (this.value.split('#').length === 2) {
          this.type = '7'
          this.week.start = parseInt(this.value.split('#')[0])
          this.week.end = parseInt(this.value.split('#')[1])
        }
      } else if (this.value.indexOf('W') !== -1) { // 8工作日
        this.type = '8'
        this.work = this.value.replace('W', '')
      } else { // *
        this.type = '4'
        this.appoint = this.value.split(',')
      }
    }
  },
  created () {
    this.updateVal()
  }
}
</script>

<style lang="css">
.el-checkbox+.el-checkbox {
    margin-left: 10px;
}
</style>
