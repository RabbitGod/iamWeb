
<template> 
    <div class="auditDashboard" >
        <div class="data">
            <div class="card">
                <div class="number"><span>100</span></div>
                <div class="bottom">组织</div>
            </div>
            <div class="card">
                <div class="number"><span>100</span></div>
                <div class="bottom">账号</div>
            </div>
            <div class="card">
                <div class="number"><span>100</span></div>
                <div class="bottom">内部</div>
            </div>
            <div class="card">
                <div class="number"><span>100</span></div>
                <div class="bottom">外部</div>
            </div>
            <div class="card">
                <div class="number"><span>100</span></div>
                <div class="bottom">停用</div>
            </div>
            <div class="chart1 cahrtBox" id="chart1"></div>
            <div class="chart2 cahrtBox" id="chart2"></div>
            <div class="chart3 cahrtBox" id="chart3"></div>
            <div class="chart4 cahrtBox" id="chart4"></div>
            <div class="chart5 cahrtBox" id="chart5"></div>
        </div>
    </div>
</template>

<script>

import Cookies from 'js-cookie';

export default {
    data () {
        return {
            pageName:this.$route.params.name?this.$route.params.name:'maintainCatalog',
            isCollapsed:false,
            leftStyle:{},
            rightStyle:{},
            chart1:{},
            chart2:{},
            chart3:{},
            chart4:{},
            chart5:{}

        }
    },
    created(){
        
    },
    watch:{
       
    },
    computed:{
        
    },
    methods: {
        chartResize(){
            
            let that = this;
            that.chart1.resize();
            that.chart2.resize();
            that.chart3.resize();
            that.chart4.resize();
            that.chart5.resize();
        },
        queryData(){
            this.series1 =  [120, 200, 150]
            this.setEchart1(this.series1);
            
            this.series2 = [120, 200, 150, 30]
            this.setEchart2(this.series2);
            
            this.series3 = [
					{
						name: '总数',
						type: 'line',
                        color:'#B2D7FD',
						stack: '总量',
						data: [0, 132, 101, 134, 90, 230, 210]
					},
					{
						name: '成功',
						type: 'line',
                        color:'#62ACF9',
						stack: '总量',
						data: [0, 182, 191, 234, 290, 330, 310]
					},
					{
						name: '失败',
						type: 'line',
                        color:'#208AF6',
						stack: '总量',
						data: [0, 182, 191, 234, 290, 330, 310]
					},
					{
						name: '恶意',
                        type: 'line',
                        color:'#0765BD',
						stack: '总量',
						data: [0, 182, 191, 234, 290, 330, 310]
					}
				]
            this.setEchart3(this.series3);
            
            this.series4 = [
                            ['product', '总数', '正常', '恶意'],
                            ['2020/5/1', 43.3, 85.8, 93.7],
                            ['2020/5/2', 83.1, 73.4, 55.1],
                            ['2020/5/3', 86.4, 65.2, 82.5],
                            ['2020/5/4', 72.4, 53.9, 39.1]
                        ]
            this.setEchart4(this.series4);
            
            this.series5 = [
                            ['product', '总数', '内部账号', '外部账号'],
                            ['2020/5/1', 43.3, 85.8, 93.7],
                            ['2020/5/2', 83.1, 73.4, 55.1],
                            ['2020/5/3', 86.4, 65.2, 82.5],
                            ['2020/5/4', 72.4, 53.9, 39.1]
                        ]
            this.setEchart5(this.series5);
            
        },
        setEchart1(series){
            // 基于准备好的dom，初始化echarts实例
            this.chart1 = this.$echarts.init(document.getElementById('chart1'))
            // 绘制图表
            var   option =  {
				title: {
					text: ''
				},
				
				tooltip: {
					trigger: 'axis'
				},
				grid: {
					top:'15px',
					left: '40px',
					right: '40px',
					bottom: '10px',
					containLabel: true
				},
				// toolbox: {
				// 	feature: {
				// 		saveAsImage: {}
				// 	}
				// },
				xAxis: {
                    type: 'category',
                    data: ['总数', '新增', '修改']
                },
                yAxis: {
                    type : 'value'
                },
                series: series,
                
                series: [{
                    data: series,
                    type: 'bar',
                    itemStyle: {
                        normal: {
            　　　　　　　　//这里是重点
                            color: function(params) {
                                //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                                var colorList = ['#62ACF9', '#208AF6', '#0765BD'];
                                return colorList[params.dataIndex]
                            }
                        }
                    }
                }]
                
			};
            this.chart1.setOption(option);
        },
        setEchart2(series){
            // 基于准备好的dom，初始化echarts实例
            this.chart2 = this.$echarts.init(document.getElementById('chart2'))
            // 绘制图表
            var   option =  {
				title: {
					text: ''
				},
				
				tooltip: {
					trigger: 'axis'
				},
				grid: {
					top:'15px',
					left: '40px',
					right: '40px',
					bottom: '10px',
					containLabel: true
				},
				xAxis: {
                    type: 'category',
                    data: ['总数', '新增', '修改', '停用']
                },
                yAxis: {
                    type : 'value'
                },
                series: series,
                
                series: [{
                    data: series,
                    type: 'bar',
                    itemStyle: {
                        normal: {
            　　　　　　　　//这里是重点
                            color: function(params) {
                                //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                              //  var colorList = ['#1890FF','#10CA76', '#EEB500', '#C55A11'];

                                var colorList = ['#B2D7FD','#62ACF9','#208AF6','#0765BD'];
                                return colorList[params.dataIndex]
                            }
                        }
                    }
                }]
			};
            this.chart2.setOption(option);
        },
        setEchart3(series){
            // 基于准备好的dom，初始化echarts实例
            this.chart3 = this.$echarts.init(document.getElementById('chart3'))
            // 绘制图表
            var   option =  {
				title: {
					text: ''
				},
				
				dataZoom: [{
					type: 'inside'
				}, {
					type: 'slider'
				}],
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: ['总数', '成功', '失败', '恶意']
				},
				grid: {
					top:'35px',
					left: '40px',
					right: '40px',
					bottom: '40px',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: ['2020/6/8', '2020/6/9', '2020/6/10', '2020/6/11', '2020/6/12']
				},
				yAxis: {
					type: 'value'
				},
				series:series
			};
            this.chart3.setOption(option);
        },
        setEchart4(series){
            // 基于准备好的dom，初始化echarts实例
            this.chart4 = this.$echarts.init(document.getElementById('chart4'))
            // 绘制图表
            var   option =  {
				title: {
					text: ''
				},
				color:['#62ACF9','#208AF6','#0765BD'],
				dataZoom: [{
					type: 'inside'
				}, {
					type: 'slider'
				}],
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					
				},
				grid: {
					top:'35px',
					left: '40px',
					right: '40px',
					bottom: '40px',
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
                ],
                dataset: {
                    source: series
                },
			};
            this.chart4.setOption(option);
        },
        setEchart5(series){
            // 基于准备好的dom，初始化echarts实例
            this.chart5 = this.$echarts.init(document.getElementById('chart5'))
            // 绘制图表
            var   option =  {
				title: {
					text: ''
				},
				//color:['#1890FF','#10CA76','#EEB500'],
                color:['#62ACF9', '#208AF6', '#0765BD'],
				dataZoom: [{
					type: 'inside'
				}, {
					type: 'slider'
				}],
				tooltip: {
					trigger: 'axis'
				},
				legend: {
				},
				grid: {
					top:'35px',
					left: '40px',
					right: '40px',
					bottom: '40px',
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
                ],
                dataset: {
                    source: series
                },
			};
            this.chart5.setOption(option);
        },
       
    },
    components:{
        
    },
    mounted(){
        this.queryData();
        const that = this;
        window.onresize = () => {
            
            that.chart1.resize();
            that.chart2.resize();
            that.chart3.resize();
            that.chart4.resize();
            that.chart5.resize();
		};
    }
};
</script>

<style lang="less" scoped>
    .auditDashboard{
        width: 100%;
        height: 100%;
        .data{
                width: calc(100% - 20px);
            display: flex;
            flex-direction: row;
            flex-wrap:wrap;
            justify-content:space-between;
            padding: 20px;
            .card{
                width: calc(20% - 10px);
                height: 90px;
                border-width: 8px 1px 1px 1px;
                border-color: #DEEBF7;
                border-style: solid;
                text-align: center;
                border-radius: 3px;
                .number{
                    height: 62px;
                    line-height: 62px;
                    span{
                        font-size: 24px;
                        font-weight: bold;
                    }
                }
                .bottom{
                    width: 100%;
                    height: 20px;
                    line-height: 20px;
                    background: #DEEBF7;
                }
            }
            .cahrtBox{
                border:1px solid #D6DCE5;
                border-radius: 5px;
                height: 30%;
                margin-top: 10px;
                min-height: 200px;
            }
            .chart1{
                width: calc(50% - 5px);
            }
            .chart2{
                width: calc(50% - 5px);
            }
            .chart3{
                width: 100%;
            }
            .chart4{
                width: calc(50% - 5px);
            }
            .chart5{
                width: calc(50% - 5px);
            }
        }
    }
    


</style>
<style>

    
    
</style>