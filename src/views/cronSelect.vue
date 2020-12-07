<template>
  <div>
    <div v-clickoutside="close" class="cronDropDown">
      <div @click="open">
        <Input v-model="cronExpression" :icon="inpIcon"/>
      </div>
      <div v-show="showCronBox" class="cronDropdownMenu">
        <cron v-model="cronExpression" @str = "cornString"></cron>
      </div>

    </div>
    asdasdasd
    
  </div>
</template>

<script>
import cron from '@/components/cron/cron'

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
    }
  }
}
</script>

<style>
.cronDropDown {
  width:100%;
  position: relative;
}
.cronDropdownMenu {
  position:absolute;
  top:30px;
  left:0px;
}
</style>
