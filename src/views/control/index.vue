
<template> 
    <div class="control control" >
        <div class="head">
            <div class="title">服务器监控</div>
            <div class="time">当前服务器时间：2020-06-12 12:00:00</div>
        </div>
        <div class="content">
            <div class="cont_left " >
                <div><Input search enter-button="搜索" placeholder="搜索应用名称" /></div>
                <div class="menucont">
                    <div :class="(selNode.id == item.id)?'card active':'card'" v-for="(item,index) in servers"   @click="handleSel(item,$event)" >
                        <div :class="item.status == 2?'suspend icon':'icon'"><span v-if="item.status == 1">运行中</span><span v-if="item.status == 2">停运中</span><Icon size="16" type="ios-disc" /></div>
                        <div class="img"><Icon type="ios-desktop-outline" size="46" /></div>
                        <div class="content">
                            <div class="name">{{item.name}}</div>
                            <div class="ip">{{item.ip}}</div>
                        </div>
                        <div class="info">
						<Tooltip transfer content="cpu使用率" placement="top">
                            <span >{{item.cpu}}</span>
                        </Tooltip>
						<Tooltip transfer content="内存使用率" placement="top">
                            <span >{{item.memory}}</span>
                        </Tooltip>
						<Tooltip transfer content="硬盘使用率" placement="top">
                            <span >{{item.disk}}</span>
                        </Tooltip>
						<Tooltip transfer content="JVM使用率" placement="top">
                            <span >{{item.jvm}}</span>
                        </Tooltip>
                        </div>
                    </div>
                </div>
                <div class="page">
                    <div class="previous">上一页</div>
                    <div class="next">下一页</div>
                </div>
            </div>
            <div class="cont_right"  >
                <div class="cardBox" v-if="selNode.name">
                    <div class="tool">
                        <Icon type="md-menu" v-if="type == 'chart'" title="切换表格" @click="toTable" />
                        <Icon type="md-pulse" v-if="type == 'table'" title="切换图表" @click="toChart" />
                    </div>
                    <div class="card">
                        <div class="text1">CPU使用率</div>
                        <div class="text2">{{selNode.cpu}}</div>
                    </div>
                    <div class="card">
                        <div class="text1">内存使用率</div>
                        <div class="text2">{{selNode.memory}}</div>
                    </div>
                    <div class="card">
                        <div class="text1">硬盘使用率</div>
                        <div class="text2">{{selNode.disk}}</div>
                    </div>
                    <div class="card">
                        <div class="text1">JVM使用率</div>
                        <div class="text2">{{selNode.jvm}}</div>
                    </div>
                    <div style="width:100%;padding:0 20px; margin-bottom:10px;">
                        <Slider v-model="time" range show-stops :step="10" :marks="marks" ></Slider>
                    </div>
                    <div class="chartBox" id="chart1" v-show="type == 'chart'"></div>
                    <div class="chartBox" id="chart2" v-show="type == 'chart'"></div>
                    <div class="chartBox" id="chart3" v-show="type == 'chart'"></div>
                    <div class="chartBox" id="chart4" v-show="type == 'chart'"></div>
                    <div class="tableBox" v-show="type == 'table'">
                        <Table size="small" border stripe :columns="columns" :data="tableData"></Table>
                        <br>
                        <Page :current="currentPage" :total="total" show-elevator show-total show-sizer @on-change="pageChange" @on-page-size-change='pageSizeChange' />
                        <div class="donwLoad">
                            <Icon type="md-download" title="下载" />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Icon type="md-mail" title="邮件" />
                        </div>
                    </div>
                </div>
                <div class="detail" v-else>
                    <div class="tips">
                        <Icon type="ios-bulb-outline" size="45" style="vertical-align: middle;" />
                        没有进行监控服务器部署，请联系系统管理员</div>
                </div>
            </div>
        </div>

    

    </div>
</template>

<script>

import Cookies from 'js-cookie';

export default {
    data () {
        return {
            currentPage:1,
            pageSize:10,
            total:0,
            tableData:[],
            type:'chart',
            chart1:{},
            chart2:{},
            chart3:{},
            chart4:{},
            chart5:{},
            time: [0, 0],
            
            marks:{
                0: '5.31',
                10: '6.1',
                20: '6.2',
                30: '6.3',
                40: '6.4',
                50: '6.5',
                60: '6.6',
                70: '6.7',
                80: '6.8',
                90: '6.9',
                100: '6.10',
            },
            servers:[
                {
                    name:'服务器1',
                    id:'1',
                    ip:'192.168.1.15',
                    cpu:'50%',
                    memory:'45%',
                    disk:'35%',
                    jvm:'20%',
                    status:1,
                },
                {
                    name:'服务器2',
                    id:'2',
                    ip:'192.168.1.15',
                    cpu:'50%',
                    memory:'45%',
                    disk:'35%',
                    jvm:'20%',
                    status:2,
                },
                {
                    name:'服务器3',
                    id:'3',
                    ip:'192.168.1.15',
                    cpu:'50%',
                    memory:'45%',
                    disk:'35%',
                    jvm:'20%',
                    status:1,
                }
            ],
            selNode:{},
            columns:[
                    {
                        title: '序号',
                        width: 60,
                        type: 'index'
                    },
                    {
                        title: '服务器名称',
                        minWidth: 180,
                        tooltip:true,
                        key: 'name'
                    },
                    {
                        title: 'ip',
                        key: 'ip',
                        minWidth: 110,
                    },
                    {
                        title: '时间',
                        key: 'time',
                        minWidth: 150,
                        
                    },
                    {
                        title: 'CPU使用率',
                        key: 'cpu',
                        minWidth: 100,
                        
                    },
                    {
                        title: '内存使用率',
                        key: 'memory',
                        minWidth: 100,
                    },
                    {
                        title: '硬盘使用率',
                        key: 'disk',
                        minWidth: 100,
                    },
                    {
                        title: 'JVM使用率',
                        key: 'jvm',
                        minWidth: 100,
                        
                    }
            ],

        }
    },
    created(){
        
    },
    watch:{
       type(val){
           if(val == 'chart'){
            this.queryData();
           }else{
               this.queryTableData();
           }
       }
    },
    computed:{
        cardStyle(){
            return {
                opacity: 0.5
            }
        }
    },
    methods: {
        pageSizeChange(val){
            this.pageSize = val;
            this.queryData();
        },
        pageChange(val){
            this.currentPage = val;
            this.queryData();
        },
        queryTableData(){
            this.tableData = [
                {
                    name:'服务器1',
                    ip:'192.168.1.11',
                    time:'2020-06-06 12:00',
                    cpu:'50%',
                    memory:'45%',
                    disk:'35%',
                    jvm:'20%',
                },
                {
                    name:'服务器2',
                    ip:'192.168.1.12',
                    time:'2020-06-06 12:00',
                    cpu:'50%',
                    memory:'45%',
                    disk:'35%',
                    jvm:'20%',
                },
                {
                    name:'服务器3',
                    ip:'192.168.1.13',
                    time:'2020-06-06 12:00',
                    cpu:'50%',
                    memory:'45%',
                    disk:'35%',
                    jvm:'20%',
                },
                {
                    name:'服务器4',
                    ip:'192.168.1.14',
                    time:'2020-06-06 12:00',
                    cpu:'50%',
                    memory:'45%',
                    disk:'35%',
                    jvm:'20%',
                },
                {
                    name:'服务器5',
                    ip:'192.168.1.15',
                    time:'2020-06-06 12:00',
                    cpu:'50%',
                    memory:'45%',
                    disk:'35%',
                    jvm:'20%',
                },
                {
                    name:'服务器6',
                    ip:'192.168.1.16',
                    time:'2020-06-06 12:00',
                    cpu:'50%',
                    memory:'45%',
                    disk:'35%',
                    jvm:'20%',
                },
                {
                    name:'服务器7',
                    ip:'192.168.1.17',
                    time:'2020-06-06 12:00',
                    cpu:'50%',
                    memory:'45%',
                    disk:'35%',
                    jvm:'20%',
                },
                {
                    name:'服务器8',
                    ip:'192.168.1.18',
                    time:'2020-06-06 12:00',
                    cpu:'50%',
                    memory:'45%',
                    disk:'35%',
                    jvm:'20%',
                },
                {
                    name:'服务器9',
                    ip:'192.168.1.9',
                    time:'2020-06-06 12:00',
                    cpu:'50%',
                    memory:'45%',
                    disk:'35%',
                    jvm:'20%',
                },
                {
                    name:'服务器10',
                    ip:'192.168.1.110',
                    time:'2020-06-06 12:00',
                    cpu:'50%',
                    memory:'45%',
                    disk:'35%',
                    jvm:'20%',
                },
            ];
            this.total = 50;
        },
        toTable(){
            this.type = 'table'
        },
        toChart(){
            this.type = 'chart'
        },
        queryData(){
            this.data1 =  {
                x:['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55'],
                y:[120, 132, 101, 134, 90, 130, 210,120, 132, 101, 134, 90]
            }
            this.setEchart1(this.data1);
            
            this.data2 =  {
                x:['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55'],
                y:[220, 132, 101, 134, 90, 230, 120,120, 132, 101, 194, 90]
            }
            this.setEchart2(this.data2);

            this.data3 =  {
                x:['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55'],
                y:[120, 182, 141, 134, 90, 210, 210,120, 132, 101, 134, 90]
            }
            this.setEchart3(this.data3);

            this.data4 =  {
                x:['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55'],
                y:[220, 132, 101, 134, 90, 130, 110,120, 132, 201, 134, 90]
            }
            this.setEchart4(this.data4);
            
            
        },
        setEchart1(chartData){
            // 基于准备好的dom，初始化echarts实例
            this.chart1 = this.$echarts.init(document.getElementById('chart1'))
            // 绘制图表
            var option =  this.option(chartData.x,chartData.y,'CPU使用率');
            this.chart1.setOption(option);
        },
        setEchart2(chartData){
            // 基于准备好的dom，初始化echarts实例
            this.chart2 = this.$echarts.init(document.getElementById('chart2'))
            // 绘制图表
            var option =  this.option(chartData.x,chartData.y,'内存使用率');
            this.chart2.setOption(option);
        },
        setEchart3(chartData){
            // 基于准备好的dom，初始化echarts实例
            this.chart3 = this.$echarts.init(document.getElementById('chart3'))
            // 绘制图表
            var option =  this.option(chartData.x,chartData.y,'硬盘使用率');
            this.chart3.setOption(option);
        },
        setEchart4(chartData){
            // 基于准备好的dom，初始化echarts实例
            this.chart4 = this.$echarts.init(document.getElementById('chart4'))
            // 绘制图表
            var option =  this.option(chartData.x,chartData.y,'JVM');
            this.chart4.setOption(option);
        },
        option(x,y,title){
            return  {
                title: {
                    text: title,
                    x:'center',
                    textAlign:'center',
                    y:'0px',
                    textStyle: {
                        color:'#2d8cf0',
                        fontSize: 14,
                    },
                },
                color:['#c3d8ff'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                grid: {
                    left: '60px',
                    right: '60px',
                    bottom: '3px',
                    top: '30px',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: x
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'CPU使用率',
                        type: 'line',
                        areaStyle: {},
                        data: y
                    },
                ]
            };
        },
        handleSel(node,e){
            this.selNode = node;
            if(this.type == 'chart'){
                setTimeout(() => {
                    this.queryData();
                }, 200);
            }else{
                this.queryTableData()
            }
            
        },
    },
    components:{
        
    },
    mounted(){
        const _this = this;
        window.onresize = () => {
            if(_this.chart1.resize){
                _this.chart1.resize();
                _this.chart2.resize();
                _this.chart3.resize();
                _this.chart4.resize();
            }
            
		};
    }
};
</script>

<style lang="less" scoped>
    .control{
        width: 100%;
        height: 100%;
        padding: 20px 20px 20px 20px;
    }
    .control .head{
        color: #8FAADC;
        height:40px;
        line-height:40px;
        border-bottom: 1px solid #D6DCE5;
        margin-bottom: 9px;
        .title{
            font-weight: bold;
            font-size: 16px;
            float: left;
        }
        .time{
            font-size: 14px;
            float: right;
        }
    }
    .control .content{
        height:calc(100% - 50px);
    }
    .control .cont_left{
        width: 320px;
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
        float: left;
        background: #fff;
        border-radius: 5px;
        position: relative;
        transition: width  .3s;
        overflow: hidden;
    }
    .control .cont_left .menucont{
        width: 300px;
        height: calc( 100% - 60px;);
        padding: 0px;
        overflow: auto;
        box-sizing: border-box;
        float: left;
        background: #fff;
        border-radius: 5px;
        position: relative;
        padding: 10px 0;
        
    }
    .control .cont_left .menucont .card{
        width: 100%;
        height: 100px;
        border-radius: 3px;
        border:1px solid #B4C7E7;
        display: flex;
        padding:25px 10px 15px;
        position: relative;
        margin-bottom: 15px;
        .img{
            width: 60px;
            height: 60px;
            color:#2d8cf0;
            image{
                width: 100%;
                height:100%;
            }
        }
        .content{
            .name{
                padding: 0 10px 0px;
                font-weight: bold;
                overflow: hidden;
            }
            .ip{
                padding: 0 10px;
                overflow: hidden;
            }
        }
        .icon{
            position: absolute;
            top:5px;
            right:5px;
            font-size: 20px;
            color: #19be6b;
            font-size: 12px;
            
        }
        .info{
            width:100%;
            position: absolute;
            bottom: 2px;
            right:0;
            text-align: right;
            span{
                background: #FBFDFF;
                border: 1px solid #E7F4FF;
                display: inline-block;
                margin-right: 2px;
                padding:2px 10px;
            }
        }
        .suspend{
            color: #c5c8ce !important;
        }
        .stop{
            position: absolute;
            top:-5px;
            right:25px;
            font-size: 20px;
            color: #B4C7E7;
            cursor: pointer;
        }
        .start{
            position: absolute;
            top:-5px;
            right:25px;
            font-size: 20px;
            color: #B4C7E7;
            cursor: pointer;
        }
    }
    .control .cont_left .menucont .card:hover{
        box-shadow: 2px 2px 10px #446aa9;
        border-color: #446aa9;
    }
    .control .cont_left .menucont .active{
        box-shadow: 2px 2px 10px #446aa9;
        border-color: #446aa9;
    }
    .control .cont_left{
        .page{
            width: 100%;
            display: flex;
            .previous{
                width: 50%;
                text-align: center;
                cursor: pointer;
                height: 30px;
                line-height: 30px;
                border: 1px solid #B4C7E7;
            }
            .next{
                width: 50%;
                text-align: center;
                cursor: pointer;
                height: 30px;
                line-height: 30px;
                border: 1px solid #B4C7E7;
                border-left: 0px;
            }
        }
        .add{
            width: 100%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: #2d8cf0;
            color:#fff;
            cursor: pointer;
        }
    }
    .control .cont_right{
        width: calc(100% - 340px);
        min-width: 900px;
        height: 100%;
        overflow-y: auto;
        float: left;
        margin-left:20px ;
        border-radius: 5px;
        transition: width  .3s;
        .detail{
            width: 100%;
            height: 100%;
            padding: 10px;
            background: #fff;
            .tips{
                padding-top:20%;
                height: 80px;
                line-height: 80px;
                text-align: center;
                font-size: 16px;
                color: #b0bcd2;
            }
        }
        .info{
            width: 100%;
            height: 350px;
            padding: 10px;
            background: #fff;
            .title{
                font-weight: bold;
                height: 30px;
                line-height: 30px;
                border-bottom: 1px solid #D6DCE5;
            }
        }
        .empower{
            width: 100%;
            min-height: calc(100% - 370px);
            margin-top:20px;
            padding: 10px;
            background: #fff;
            .title{
                font-weight: bold;
                height: 30px;
                line-height: 30px;
                border-bottom: 1px solid #D6DCE5;
            }
        }
    }
    .control .cont_right .screen{
        padding: 0 10px 10px 10px;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
    }
    .control .cont_right .cardBox{
        width: 100%;
        height: 100%;
        overflow: auto;
        padding-bottom: 10px;
        background: #fff;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        .tool{
            width: 100%;
            height: 24px;
            padding:0px 10px;
            text-align: right;
            font-size: 24px;
            color:#2d8cf0;
            cursor: pointer;
        }
        .card{
            width: calc(25% - 20px);
            min-width: 200px;
            height: 80px;
            border-radius: 3px;
            margin: 10px ;
            background:#F3FAFF;
            border:1px solid #EBF0F9; 
            box-sizing: border-box;
            text-align: center;
            .text1{
                width:70%;
                text-align: center;
                font-size: 20px;
                float: left;
                line-height: 80px;
            }
            .text2{
                width:30%;
                font-size: 20px;
                float: left;
                line-height: 80px;
                font-weight: bold;
                text-align: left;
                color: #2d8cf0;;
            }
            .check{
                width:40px;
                height:60px;
                line-height: 60px;
                text-align: center;
                font-size: 30px;
            }
        }
        .chartBox{
            width: 100%;
            height: calc(25% - 55px);
            min-height: 120px;
            padding: 0;
            background: #f1f1f1;
            margin: 10px 10px 0px 10px;
        }
        .tableBox{
            padding: 20px 10px 10px 10px;
            width: 100%;
            .donwLoad{
                width: 100%;
                height: 30px;
                padding: 0 10px;
                margin-top: -30px;
                font-size: 24px;
                color: #2d8cf0;
                text-align: right;
                i{
                    cursor: pointer;
                }
            }
        }
        .checked{
            border:1px solid #1890FF;
            .icon{
                color: #1890FF;
            }
            .name{
                
            }
            .check{
                color: #1890FF;
            }
        }
        .disChecked{
            border:1px solid #ADB9CA;
            .icon{
                color:#DAE3F3;
            }
            .name{
                
            }
            .check{
                display: none;
            }
        }
    }
    .detailTable{
        padding-top:5px;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
    }
    .detailTable .tableRow{
        width: 33.33%;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        .tit{
            height:32px;
            line-height: 22px;
            font-weight: bold;
            width: 100px;
            padding: 5px 10px;
            text-align: right;
        }
        .contBox{
            width: calc(100% - 100px);
            height:32px;
            line-height: 22px;
            border:1px solid #dcdee2;
            box-sizing: border-box;
            padding: 5px 10px;
            overflow: hidden;
        }
    }
    
    .detailTable .tableRow{
        padding: 5px;
    }

    .bigRow{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        .tit{
            width: 100px;
            text-align: right;
            height:60px;
            line-height: 40px;
            padding: 10px;
            font-weight: bold;
        }
        .cont1{
            width: calc( 33.33% - 100px );
            padding: 5px;
            display: flex;
            .ud{
                padding: 0 0 20px 20px;
            }
            .img{
                width: 120px;
                height:120px;
                border: 1px solid #ccc;
                overflow: hidden;
                border-radius: 5px;
                img{
                    width: 100%;
                }
            }
        }
        .cont2{
            width: calc( 66.66% - 100px );
            width:66.66%;
            padding: 5px;
            .row2{
                width: 100%;
                padding-bottom: 20px;
                display: flex;
                flex-wrap: wrap;
                align-content: flex-start;
                .tit{
                    height:32px;
                    line-height: 22px;
                    font-weight: bold;
                    width: 100px;
                    padding: 5px 10px;
                    text-align: right;
                }
                .contBox{
                    width: calc(100% - 100px);
                    height:32px;
                    line-height: 22px;
                    border:1px solid #dcdee2;
                    box-sizing: border-box;
                    padding: 5px 10px;
                    overflow: hidden;
                }
            }
        }
    }
    .iconCont{
        width: 100%;
        padding: 10px;
        display: flex;
        .ud{
            padding: 0 0 20px 20px;
        }
        .img{
            width: 120px;
            height:120px;
            border: 1px solid #ccc;
            overflow: hidden;
            border-radius: 5px;
            img{
                width: 100%;
            }
        }
    }
    .formBox{
        padding: 20px;
        height: calc(100% - 40px);
        overflow-y: auto;
    }
</style>
<style>
.controlDrawer .ivu-drawer-body{
        padding: 0;
    }
.app-drawer-footer{
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
        background: #fff;
    }
.control .ivu-slider-wrap{
    margin: 5px 0;
}
.control .ivu-slider-marks-item{
    margin-top: 8px;
}
</style>