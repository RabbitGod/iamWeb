<template>
  <div style="background:#fff;height:100%; padding:20px;">
    <button @click="setVal">输入</button>
    <div v-clickoutside="close" style="width:600px;">
      <cron v-model="cronExpression" ></cron>

    </div>
    
  </div>
</template>

<script>
import cron from '@/components/cron/cronSelect'

export default {
  name: 'cronView',
  components: {
    cron
  },
  data () {
    return {
      showCronBox: false,
      cronExpression: '',
      cornString:'',
      inpIcon:'md-arrow-dropdown'
    }
  },
  methods:{
    cornStr(val){
      this.cornString = val
    },
    open(){
      this.showCronBox = true;
    },
    close(){
      this.showCronBox = false
    },
    setVal(){
      this.cronExpression = "01,02 0/5 0/3 ? 1-3 * 2020-2021"
    }
  }
}
</script>

<style>

</style>
