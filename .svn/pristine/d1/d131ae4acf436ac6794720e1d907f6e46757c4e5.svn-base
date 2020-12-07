<template lang="html">
  <div class="cron" :val="value_">
    <div v-if="msg" style="padding-bottom:10px;color:red;">日期与星期不可以同时为“不指定”</div>
    <div style="border-bottom:1px solid #ccc">{{str}}</div>
    <Tabs v-model="activeName" :animated="false">
      <TabPane  label="秒" name="s">
        <second-and-minute v-model="sVal" lable="秒"></second-and-minute >
      </TabPane >
      <TabPane  label="分" name="m">
        <second-and-minute v-model="mVal" lable="分"></second-and-minute >
      </TabPane >
      <TabPane  label="时" name="h">
        <hour v-model="hVal" lable="时"></hour>
      </TabPane >
      <TabPane  label="日" name="d">
        <day v-model="dVal" lable="日"></day>
      </TabPane >
      <TabPane  label="月" name="month">
        <month v-model="monthVal" lable="月"></month>
      </TabPane >
      <TabPane  label="周" name="week">
        <week v-model="weekVal" lable="周"></week>
      </TabPane >
      <TabPane  label="年" name="year">
        <year v-model="yearVal" lable="年"></year>
      </TabPane >
    </Tabs>
    <!-- table -->
    <Table :columns="columns" border :data="tableData" size="small"></Table>
  
  </div>
</template>

<script>
import SecondAndMinute from './cron/secondAndMinute'
import hour from './cron/hour'
import day from './cron/day'
import month from './cron/month'
import week from './cron/week'
import year from './cron/year'
export default {
  props: {
    value: {
      type: String
    }
  },
  data () {
    return {
      //
      activeName: 's',
      sVal: '',
      mVal: '',
      hVal: '',
      dVal: '',
      monthVal: '',
      weekVal: '',
      yearVal: '',
      
      sValStr: '',
      mValStr: '',
      hValStr: '',
      dValStr: '',
      monthValStr: '',
      weekValStr: '',
      yearValStr: '',

      str:'',
      msg:false
    }
  },
  watch: {
    'value' () {
      this.updateVal();
      this.str= `${this.yearValStr} ${this.monthValStr}${this.weekValStr}${this.dValStr}${this.hValStr} ${this.mValStr} ${this.sValStr} 执行`;
      // this.$emit('str', v)
    },
    'sVal'(val){
      if(val == '*'){
        this.sValStr = '每秒 '
      }else if(val.indexOf('-') != -1){
        this.sValStr = val.replace('-','秒至')+'秒';
      }else if(val.indexOf('/') != -1){
        this.sValStr = val.replace('/','秒开始，每')+'秒';
      }else{
        this.sValStr = this.sVal + '秒 '
      }
    },
    'mVal'(val){
      if(val == '*'){
        this.mValStr = '每分 '
      }else if(val == '?'){
        this.mValStr = ''
      }else if(val.indexOf('-') != -1){
        this.mValStr = val.replace('-','分至')+'分';
      }else if(val.indexOf('/') != -1){
        this.mValStr = val.replace('/','分开始，每')+'分';
      }else{
        this.mValStr = this.mVal + '分 '
      }
    },
    'hVal'(val){
      if(val == '*'){
        this.hValStr = '每小时 '
      }else if(val == '?'){
        this.hValStr = ''
      }else if(val.indexOf('-') != -1){
        this.hValStr = val.replace('-','时至')+'时';
      }else if(val.indexOf('/') != -1){
        this.hValStr = val.replace('/','时开始，每')+'时';
      }else{
        this.hValStr = this.hVal + '时 '
      }
    },
    'dVal'(val){
      if(val == '*'){
        this.dValStr = '每日 '
      }else if(val == '?'){
        this.dValStr = ''
      }else if(val.indexOf('-') != -1){
        this.dValStr = val.replace('-','日至')+'日';
      }else if(val.indexOf('/') != -1){
        this.dValStr = val.replace('/','天开始，每')+'日';
      }else if(val.indexOf('L') != -1){
        this.weekValStr = val.replace('L','最后一天');
      }else if(val.indexOf('W') != -1){
        this.weekValStr = '工作日'+val.replace('W','号');
      }else{
        this.dValStr = this.dVal + '日 '
      }
    },
    'monthVal'(val){
      if(val == '*'){
        this.monthValStr = '每月 '
      }else if(val == '?'){
        this.monthValStr = ''
      }else if(val.indexOf('-') != -1){
        this.monthValStr = val.replace('-','月至')+'月';
      }else if(val.indexOf('/') != -1){
        this.monthValStr = val.replace('/','月开始，每')+'月';
      }else{
        this.monthValStr = this.monthVal + '月 '
      }
    },
    'weekVal'(val){
      
      if(val == '*'){
        this.weekValStr = '每周 '
      }else if(val == '?'){
        this.weekValStr = ''
      }else if(val.indexOf('-') != -1){
        this.weekValStr = val.replace('-','周至')+'周';
      }else if(val.indexOf('/') != -1){
        this.weekValStr = val.replace('/','周开始，每')+'周';
      }else if(val.indexOf('#') != -1){
        this.weekValStr = '第'+val.replace('#','周，星期')+',';
      }else if(val.indexOf('L') != -1){
        
        val =val.replace('1','星期天');
        val =val.replace('2','星期一');
        val =val.replace('3','星期二');
        val =val.replace('4','星期三');
        val =val.replace('5','星期四');
        val =val.replace('6','星期五');
        val =val.replace('7','星期六');
        this.weekValStr = '最后一个'+val.replace('L','')+',';
      }else{
        val =val.replace('1','星期天');
        val =val.replace('2','星期一');
        val =val.replace('3','星期二');
        val =val.replace('4','星期三');
        val =val.replace('5','星期四');
        val =val.replace('6','星期五');
        val =val.replace('7','星期六');
        this.weekValStr =  val+ ' '
      }
    },
    'yearVal'(val){
      if(val == '*'){
        this.yearValStr = '每年 '
      }else if(val == '?'){
        this.yearValStr = ''
      }else if(val.indexOf('-') != -1){
        this.yearValStr = val.replace('-','年至')+'年';
      }else{
        this.yearValStr = this.dVal + '年 '
      }
    }
  },
  computed: {
    tableData () {
      return [{
        sVal: this.sVal,
        mVal: this.mVal,
        hVal: this.hVal,
        dVal: this.dVal,
        monthVal: this.monthVal,
        weekVal: this.weekVal,
        yearVal: this.yearVal
      }]
    },
    value_ () {
      if (!this.dVal && !this.weekVal) {
        return ''
      }
      if (this.dVal === '?' && this.weekVal === '?') {
        // this.$message.error('日期与星期不可以同时为“不指定”')
        this.msg = true
      }else if (this.dVal !== '?' && this.weekVal !== '?') {
        // this.$message.error('日期与星期必须有一个为“不指定”')
        this.msg = true
      }else{
        this.msg = false
      }
      let v = `${this.sVal} ${this.mVal} ${this.hVal} ${this.dVal} ${this.monthVal} ${this.weekVal} ${this.yearVal}`;
      if (v !== this.value) {
        this.$emit('input', v)
      }
      this.str= `${this.yearValStr} ${this.monthValStr}${this.weekValStr}${this.dValStr}${this.hValStr} ${this.mValStr} ${this.sValStr} 执行`;
      return v
    },
    columns(){
      return  [
                {
                    title: '秒',
                    key: 'sVal',
                    tooltip:true,
                    minWidth:80
                },
                {
                    title: '分',
                    key: 'mVal',
                    tooltip:true,
                    minWidth:80
                },
                {
                    title: '时',
                    key: 'hVal',
                    tooltip:true,
                    minWidth:80
                },
                {
                    title: '日',
                    key: 'dVal',
                    tooltip:true,
                    minWidth:80
                },
                {
                    title: '月',
                    key: 'monthVal',
                    tooltip:true,
                    minWidth:80
                },
                {
                    title: '周',
                    key: 'weekVal',
                    tooltip:true,
                    minWidth:80
                },
                {
                    title: '年',
                    key: 'yearVal',
                    tooltip:true,
                    minWidth:120
                }
              ]
    }
  },
  methods: {
    updateVal () {
      if (!this.value) {
        return
      }
      let arrays = this.value.split(' ')
      this.sVal = arrays[0]
      this.mVal = arrays[1]
      this.hVal = arrays[2]
      this.dVal = arrays[3]
      this.monthVal = arrays[4]
      this.weekVal = arrays[5]
      this.yearVal = arrays[6]
    }
  },
  created () {
    this.updateVal()
  },
  components: {
    SecondAndMinute, hour, day, month, week, year
  }
}
</script>

<style lang="css">
.cron {
  text-align: left;
  padding: 10px;
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
}
</style>
