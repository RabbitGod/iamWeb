<template>
    <div class="maintain_content chart_cont">
        <div class="data" style="border-bottom:1px solid #ccc;padding:20px;">
            <div class="card"style="border-color:#DAE3F3">
                <div class="title" style="background:#DAE3F3">任务数</div>
                <div class="body" style="color:#DAE3F3;">
                    <div class="number"style="border-color:#DAE3F3">100</div>
                    <div class="info">是指系统调度作业任务个数</div>
                </div>
            </div>
            <div class="card"style="border-color:#DAE3F3">
                <div class="title" style="background:#DAE3F3">调度数</div>
                <div class="body" style="color:#DAE3F3;">
                    <div class="number"style="border-color:#DAE3F3">100</div>
                    <div class="info">调度数是指任务的触发数</div>
                </div>
            </div>
            <div class="card"style="border-color:#DAE3F3">
                <div class="title" style="background:#DAE3F3">执行数</div>
                <div class="body" style="color:#DAE3F3;">
                    <div class="number"style="border-color:#DAE3F3">100</div>
                    <div class="info">执行数是指任务调度执行数</div>
                </div>
            </div>
        </div>
        <div class="chart">
            <Row style="padding:20px 0 0 40px;">
                <i-col span="24">
                    <DatePicker v-model="queryDate" format="yyyy-MM-dd HH:mm:ss" type="daterange" show-week-numbers placement="bottom-end" placeholder="日期区间" style="width: 360px"></DatePicker>
                    <Button type="primary" style="margin-left:20px;" @click="queryData">刷新</Button>
                </i-col>
            </Row>
            <div id="myChartBar" class="chartBox" style="width:60%;"></div>
            <div id="myChartPie" class="chartBox" style="width:40%;"></div>
        </div>
    </div>
</template>

<script>
export default {
    
    data () {
        return {
            echratBar:{},
            echartPie:{},
            queryDate:[],
            barSource:[],
            pieData:[]
        }
    },
    created(){
        let yesterday = this.util.getDate(-3)+' 00:00:00';
        let today = this.util.getDate(0)+' 00:00:00';
        this.queryDate = [yesterday,today]

        
    },
    mounted(){
        
        this.queryData();
        const that = this;
        window.onresize = () => {
            this.echratBar.resize();
            this.echartPie.resize();
        }
    },
    methods: {
        queryData(){
            this.barSource = [
                            ['product', '成功数', '失败数', '运行数'],
                            ['2020/5/1', 43.3, 85.8, 93.7],
                            ['2020/5/2', 83.1, 73.4, 55.1],
                            ['2020/5/3', 86.4, 65.2, 82.5],
                            ['2020/5/4', 72.4, 53.9, 39.1]
                        ]
            this.pieData = [
                                {value: 90, name: '成功'},
                                {value: 10, name: '失败'},
                            ]
            this.setEchartBar(this.barSource);
            this.setEchartPie(this.pieData);
            
        },
        setEchartBar(barSource){
            // 基于准备好的dom，初始化echarts实例
            this.echratBar = this.$echarts.init(document.getElementById('myChartBar'))
            // 绘制图表
            var   option = {
                    title: {
                        text: '数据同步日报表',    
                        left: 'center'
                    },
                    color:['#62ACF9', '#208AF6', '#0765BD'],
                    dataset: {
                        source: barSource
                    },
                    tooltip : {
                        
                    },
                    legend: {
                        top:30
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category'
                    },
                    yAxis: {
                        type : 'value'
                    },
                    series: [
                        {type: 'bar'},
                        {type: 'bar'},
                        {type: 'bar'}
                    ]
                };
            this.echratBar.setOption(option);
        },
        setEchartPie(data){
            // 基于准备好的dom，初始化echarts实例
            this.echartPie = this.$echarts.init(document.getElementById('myChartPie'))
            // 绘制图表
            var   option = {
                    color:['#62ACF9', '#0765BD'],
                    title: {
                        text: '成功占比',
                        left: 'center'
                    },
                    grid: {
                        top:'10%',
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'      
                    },
                    legend: {
                        top:30
                    },
                    series: [
                        {
                            center: ['50%', '60%'],
                            name: '成功占比',
                            type: 'pie',
                            data: data,
                        }
                    ]
                };
            this.echartPie.setOption(option);
        }

    }
}
</script>
<style scoped lang="less">

.maintain_cont{
}
.chart_cont{
    
    width: 100%;
    height: calc(100% - 42px);
    padding:20px;
    .chart{
        height: calc(100% - 200px);
        .chartBox{
            height: calc(100% - 40px);
            min-height: 200px;
        }
    }
}
.chart_cont .data{
    width:100%;
    padding: 20px;
    display: flex;
    /* justify-content:space-between; */
}
.chart_cont .data .card{
    border: 1px solid #ccc;
    width: 340px;
    height: 162px;
    margin-right: 20px;
}
.chart_cont .data .card .title{
    width:60px;
    padding: 15px;
    font-size: 30px;
    float: left;
    height:160px;
    color: #5B94FB;
}
.chart_cont .data .card .body{
    width: calc( 100% - 60px ) ;
    float: left;
}
.chart_cont .data .card .body .number{
    font-size: 40px;
    text-align: center;
    line-height: 100px;
    border-bottom: 1px solid #ccc;
    font-weight: bold;
    color:#5B94FB;
}
.chart_cont .data .card .body .info{
    
    padding: 10px;
}
.chart_cont #myChartBar{
    float: left;
    padding: 10px 40px 40px 40px;
}
.chart_cont #myChartPie{
    padding: 10px 40px 40px 40px;
    float: left;
}
</style>


