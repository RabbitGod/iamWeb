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
  </div>
</template>

<script>
import cron from './cron'

export default {
  name: 'cronView',
  props: {
    value: {
      type: String
    }
  },
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
  watch:{
    'cronExpression'(){
      if (this.cronExpression) {
        this.$emit('input', this.cronExpression)
      }
    },
    'value' (val) {
      this.cronExpression = val;
    },
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
  width: 100%;
  z-index: 999;
}
</style>
