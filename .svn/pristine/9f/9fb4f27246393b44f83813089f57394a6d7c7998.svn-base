<template>
    <div>
        <Menu ref="menu"
        theme="dark"
        accordion width="auto" 
        @on-select="selectMenu" 
        :open-names="openedNames" 
        :active-name="activeName">
            <div v-for="(item1,index1) in menuList" :key="index1">
                <Submenu v-if="item1.children" :name="item1.id">
                    <template slot="title">
                        <Icon v-if="item1.icon" :type="item1.icon" />
                        <span>{{item1.name}}</span>
                    </template>
                    <menu-menu :menu-list="item1.children" ></menu-menu>
                </Submenu>
                <MenuItem v-else :name="item1.id">
                    <div @click="clickMenu(item1)">
                        <Icon v-if="item1.icon" :type="item1.icon" style="margin-right:8px;" />
                        <span>{{item1.name}}</span>
                    </div>
                </MenuItem>
            </div>
        </Menu>
    </div>
</template>

<script>

import Cookies from 'js-cookie';
export default {
    name: 'menu-menu',
    data () {
        return {
        }
    },
    props:['menuList','pid'],
    watch:{
        activeName(val){
            this.$nextTick(() => {
                this.$refs.menu.updateActiveName()
            })
        },
        openedNames () {
            this.$nextTick(() => {
                this.$refs.menu.updateOpened()
            })
        }
    },
    computed:{
        openedNames(){
            return this.$store.state.openedNames;
        },
        activeName(){
            return this.$store.state.activeName;
        }
    },
    methods: {
        clickMenu(routerObj,pid){
            let _this = this;
            this.$router.push({
                name: routerObj.routerName
            });
        },
        selectMenu(name){
            // let results = [];
            // let filterList = function(arr){
            //     for(let i=0;i<arr.length;i++){
            //         if(arr[i].children){
            //             filterList(arr[i].children)
            //         }else{
            //             results.push(arr[i])
            //         }
            //     }
            // }
            // filterList(this.menuList);

            // let result = results.filter(item => item.id === name);
            // let routerObj = result[0];
            // if(routerObj.target && routerObj.target === '_blank'){
            //     window.open(routerObj.path)
            //     return
            // }
            // this.$router.push({
            //     name: routerObj.routerName
            // })
            // this.$store.commit('setTagsList', {
            //     routerObj: routerObj
            // })
            
            // this.$store.commit('setCurrentPageName', {
            //     currentPageName: routerObj.id
            // })
            // this.$store.commit('setActiveName', {
            //     activeName: routerObj.id
            // })
        }  
    },
    components:{
        
    },
    mounted () {
        let _this = this;
        this.$nextTick(() => {  
            setTimeout(function(){
                if(_this.$refs.menu){
                    _this.$refs.menu.updateOpened()
                }
                
            },500)
            
        })
    }
}
</script>

<style>
    .menu_main .ivu-menu-item-group-title{
        display:none !important;
    }
    .menu_main .ivu-menu-submenu-title{
        text-align: left;
    }
    .menu_main .ivu-menu-item{
        text-align: left;
    }
    .menu_main .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title{
        padding: 14px
    }
    .menuItemClick{
        width:100%;
        height:100%;
        padding: 14px 0;
    }
    .menuItemClick i{
        padding-right: 8px;
    }
    .menuItemList{
        padding-top:0 !important;
        padding-bottom:0 !important;
    }
</style>

<style scoped>
    .layout{
      height:100%;
        background: #fff;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item{
      height:100%;
      overflow-x:auto;
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: calc(100% - 50px);
        width: -moz-calc(100% - 50px);
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    .rightMenu a{
        color:#fff;
    }
</style>
