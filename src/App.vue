<template>
    <div class="layout">
        <div v-if="fullScreen" style="width:100%;height:100%;" :style="backgroundImage"><router-view /></div>
        <Layout v-else >
            <Header :style="{padding: 0}" :class="style+' layout-header-bar'">
                <div class="logo">泽佳统一认证平台<span style="font-size:12px;padding-left:20px;">V1.0.0</span></div>
                <div class="menu">
                    <Menu mode="horizontal" :active-name="activeName">
                         <MenuItem name="home" to="/home">
                            <Icon type="md-home" />
                            首页
                        </MenuItem>
                        <MenuItem name="catalog" to="/catalog" v-if="$store.state.userName == 'admin'">
                            <Icon type="md-git-network" />
                            目录
                        </MenuItem>
                        <MenuItem name="apps" to="apps" v-if="$store.state.userName == 'admin'">
                            <Icon type="ios-people" />
                            应用
                        </MenuItem>
                        <MenuItem name="power" to="power" v-if="$store.state.userName == 'admin'">
                            <Icon type="ios-people" />
                            权限管理
                        </MenuItem>
                        <MenuItem name="audit" to="audit" v-if="$store.state.userName == 'admin'">
                            <Icon type="md-stats" />
                            审计
                        </MenuItem>
                        <MenuItem name="control" to="control" v-if="$store.state.userName == 'admin'">
                            <Icon type="md-locate" />
                            监控
                        </MenuItem>
                        
                    </Menu>
                </div>
                
                <div class="info">
                    <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown" style="float:right;">
                        <a href="javascript:void(0)">
                            <span class="main-user-name userNameBox" style="padding-right:10px;">{{$store.state.userName}}</span>
                            <!-- <Icon type="md-arrow-dropdown" style="padding:0 10px;" /> -->
                            <Avatar style="background-color:#B2D7FD" icon="ios-person" />
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name="loginout" divided>退出</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                     <Dropdown  @on-click="styleChange" >
                        <a href="javascript:void(0)">
                            主题
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem v-for="item in styles" :name="item.name" :selected="item.selected">{{item.title}}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </Header>
            <Content class="content" :style="{ minHeight: '260px'}">
                
                <router-view />
            </Content>
          
        </Layout>
        
    </div>
</template>
<script>
import img1 from '@/assets/bg/01.jpg';
import img2 from '@/assets/bg/02.jpg';
import img3 from '@/assets/bg/03.jpg';
import img4 from '@/assets/bg/04.jpg';
import img5 from '@/assets/bg/05.jpg';
import img6 from '@/assets/bg/06.jpg';


import Cookies from 'js-cookie';
import menuMenu from '@/components/menu-menu'
import menuDropdown from '@/components/menu-dropdown'
    export default {
        data () {
            return {
				isCollapsed: false,
                style:'default',
                userPhoto:'',
                allBackgroundImages :[img1,img2,img3,img4,img5,img6],
            }
        },
        created(){
            
            this.userPhoto = sessionStorage.getItem("userPhoto");
            
            this.style = localStorage.getItem("style") || 'default';
        },
        computed: {
            backgroundImage() {
                // 根据背景图数组的长度随机选择索引
                const randIndex = Math.floor(Math.random() * this.allBackgroundImages.length)
                return {
                    // 获取对应的图片资源并将其设置到`background-image`属性上
                    background: `url(${this.allBackgroundImages[randIndex]}) no-repeat`,
                    backgroundSize:'cover'

                }
            },
            activeName(){
                if (this.$route.name) {
                    return this.$route.name
                }else{
                    return 'home'
                }
            },
            styles(val){
                return [
                    {
                        name:'default',
                        title:'default',
                        selected:this.style == 'default'
                    },{
                        name:'primary',
                        title:'primary',
                        selected:this.style == 'primary'
                    },{
                        name:'light',
                        title:'light',
                        selected:this.style == 'light'
                    },{
                        name:'dark',
                        title:'dark',
                        selected:this.style == 'dark'
                    }
                ]
            },
            menu(){
                return this.$store.state.menu||{}
            },
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            },
            routerName(){
                return this.$route.name
            },
            fullScreen(){
                return this.$route.name == 'login'
            }
        },
        methods: {
             styleChange(name){
                this.style = name;

                localStorage.setItem("style",name)
            },
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            },
            tooltipSelect(routerObj){
                this.$router.push({
                    name: routerObj.routerName
                })
            },
            handleClickUserDropdown (name) {
                Cookies.remove('token');
                Cookies.remove('userName');

                this.$router.push({
                    name: 'login'
                });
            }
        },
        components:{
            menuMenu,
            menuDropdown
        },
    }
</script>
<style>
    body{
	    font-family: 'Microsoft YaHei','SF Pro Display',Roboto,Noto,Arial,'PingFang SC',sans-serif;
    }
    .ivu-layout{
      height: 100%;
      border: 0px !important;
      border-radius: 0px !important;
    }
    .iam_loading{
        background: rgba(0,0,0,0.3);
        position: fixed;
        top:0;
        left:0;
        z-index: 99999999999999;
        display: flex;
        flex-direction: column ;  /* 子元素横向排列 */
        justify-content: center; /* 相对父元素水平居中 */
        align-items: center; /*  子元素相对父元素垂直居中 */
    }
    .iam_loading .loading{
        width: 120px;
        height: 140px;
    }
    .iam_loading .text{
        text-align: center;
        color: #fff;
    }
    div::-webkit-scrollbar,ul::-webkit-scrollbar {/*滚动条整体样式*/
    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
}
div::-webkit-scrollbar-thumb,ul::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
}
div::-webkit-scrollbar-track,ul::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
}
</style>
<style scoped lang="less">
    .ivu-layout{
        background: #f5f7f9;
    }
    .layout{
        min-width: 1300px;
        background: #f5f7f9;
    }
    
    .ivu-layout-header{
        box-shadow: 2px 2px 8px #ccc;
    }
    .layout .default {
        background-image: linear-gradient(to right, #fff , #2d8cf0, #2d8cf0);
        .layout-header-bar{
            background: rgba(0,0,0,0);
        }
        .ivu-menu-item-selected{
        border-bottom: 2px solid #fff;
        
        }
        .ivu-menu-item{
            display: block;
            box-sizing: border-box;
            line-height: 58px;
        }
        .ivu-menu-item:hover{

            border-bottom: 2px solid #fff;
        }
        .ivu-menu{
            background: rgba(0,0,0,0);
        }
        .ivu-menu a{
            color:#ffffff !important;
        }
        .ivu-menu-item{
            color:#ffffff !important;
        }
    }
    .layout .primary{
        background: #2d8cf0;
        .layout-header-bar{
            background: #2d8cf0;
        }
        .ivu-menu-item-selected{
        border-bottom: 2px solid #fff;
        
        }
        .ivu-menu-item{
            display: block;
            box-sizing: border-box;
            line-height: 58px;
        }
        .ivu-menu-item:hover{

            border-bottom: 2px solid #fff;
        }
        .ivu-menu{
            background: #2d8cf0;
        }
        .ivu-menu a{
            color:#ffffff !important;
        }
        .ivu-menu-item{
            color:#ffffff !important;
        }
        .logo{
            color:#fff !important;
        }
    }
    .ivu-menu-horizontal.ivu-menu-light:after{
        height:0;
    }
    .layout .light{
        position: relative;
        background: #fff;   
        .ivu-menu-item-selected{
        border-bottom: 2px solid #515a6e;
        
        }
        .ivu-menu-item{
            display: block;
            box-sizing: border-box;
            line-height: 58px;
        }
        .ivu-menu-item:hover{

            border-bottom: 2px solid #515a6e;
        }
        .logo,.info a{
            color:#515a6e;
        }
        
    }
    .layout .light:after{
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: #dcdee2;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 999;
    }
    .layout .dark{
        background: #515a6e;   
        .ivu-menu-item-selected{
        border-bottom: 2px solid #fff;
        
        }
        .ivu-menu-item{
            display: block;
            box-sizing: border-box;
            line-height: 58px;
        }
        .ivu-menu-item:hover{
            border-bottom: 2px solid #fff;
        }
        .ivu-menu{
            background: #515a6e;
        }
        .ivu-menu a{
            color:#ffffff !important;
        }
        .ivu-menu-item{
            color:#ffffff !important;
        }
        .logo{
            color:#fff !important;
        }
    }
   
    
    .logo{
        width: 400px;
        height: 60px;
        float: left;
        color: #2d8cf0;
        padding-left: 20px;
        font-size: 16px;
    }
    .menu{
        width: calc(100% - 600px);
        float: left;
        min-width: 680px;
    }
    .info{
        width: 200px;
        float: left;
        color: #fff;
        padding-right: 20px;
    }
    .info a{
        color: #fff;
    }
    .layout{
        font-family: 'Microsoft YaHei','SF Pro Display',Roboto,Noto,Arial,'PingFang SC',sans-serif;
        position: relative;
        overflow: hidden;
        height: 100%;
    }
    .layout-header-bar{
        z-index: 2;
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
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
   .content{
     /* height:200%; */
     overflow: auto;
   }
    .layout >.ivu-layout{
      height: 100%;
    }
    .ivu-layout-header{
      height:60px;
    }
       .tooltipMenu{
    }
    .tooltipMenu{
        width: 100%;
    }
    .tooltipMenu a{
        width: 100%;
        padding: 14px;
        display: block;
        color:#515a6e;
    }
    .tooltipMenu a:hover{
        color:#2d8cf0;
    }
    .collapsedBtn{
        width: 100%;
        position: absolute;
        bottom: 0;
        text-align: center;
        padding: 5px;
    }
</style>
