<template>
    <Dropdown @on-click="handleClick" transer placement="right-start" class="drop-menu-div">
    <a class="drop-menu-a" type="text" :class="textAlign" >
        <Icon v-if="hideTitle" :size="iconSize20" :type="menuList.icon"/>
        <Icon v-if="!hideTitle" :size="iconSize10" :type="menuList.icon"/>
        <span class="menu-title" v-if="!hideTitle">{{menuList .name}}</span>
        <Icon size="10" v-if="!hideTitle" type="md-arrow-dropright" style="float: right;margin-top: 4px;"/>
    </a>
    <DropdownMenu slot="list">
      <div v-for="item in menuList.children" :key="item.id">
        <menu-dropdown v-if="item.children && item.children.length > 0" :root='true' :pid="pid ?pid+','+item.id:item.id" :hide-title="hideTitleFalse"  :menu-list="item" ></menu-dropdown>
        
        <DropdownItem v-else :key="`drop-${item.name}`" :name="JSON.stringify(Object.assign(item,{pid:pid}))">
            <Icon :size="iconSize10" :type="item.icon"/>
            <span class="menu-title">{{item.name}}</span >
        </DropdownItem>
      </div>
    </DropdownMenu>
  </Dropdown>
</template>
</template>


<script>

export default {
  name: 'menu-dropdown',
  data () {
    return {
      iconSize10:15,
      iconSize20:20,
      hideTitleFalse:false
    }
  },
  props:['menuList','hideTitle','pid','root'],
  computed: {
      textAlign(){
          if(this.hideTitle){
              return 'textAlignCenter'
          }else{
              return 'textAlignLeft'
          }
      },
      colorClass(val){
          return ''
      }
  },
  methods: {
   handleClick(name){
        let routerObj = data;
        this.$router.push({
            name: routerObj.routerName
        })
   }
  },    
  components:{
    
  },
  mounted () {

  }
}
</script>

<style>
    .drop-menu-div{
        width:100%;
    }
    .drop-menu-a{
        width:100%;
        display: block;
        padding:14px;
        color:#515a6e;
    }
    .drop-menu-div .ivu-select-dropdown{
        width:auto;
        text-align: left;
        z-index: 9999;
    }
    .menu-title{
        padding-left: 10px;
    }
    .textAlignCenter{
        text-align:center;
        color: #fff
    }
    .textAlignLeft{
        text-align:left;
    }
</style>

