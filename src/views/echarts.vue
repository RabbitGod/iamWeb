<template>
  <div class="hello">
    <div id="myChart" style="width:1000px;height:500px;"></div>
  </div>
</template>

<script>
export default {
  name: 'echarts',
  mounted(){
    this.SetEchart();
  },
  data () {
    return {
      msg: 'Welcome to 凌云木 Vue.js App'
    }
  },
  methods: {
    SetEchart(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        var   option = {
            title: {
                text: '郑州月最低生活费组成（单位:元）',    
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function (params) {
                    var tar = params[1];
                    return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type : 'category',
                splitLine: {show:false},
                data : ['总费用','房租','水电费','交通费','伙食费','日用品数']
            },
            yAxis: {
                type : 'value'
            },
            series: [
                {
                    name: '辅助',
                    type: 'bar',
                    stack:  '总量',
                    itemStyle: {
                        normal: {
                            barBorderColor: 'rgba(0,0,0,0)',
                            color: 'rgba(0,0,0,0)'
                        },
                        emphasis: {
                            barBorderColor: 'rgba(0,0,0,0)',
                            color: 'rgba(0,0,0,0)'
                        }
                    },
                    data: [0, 1700, 1400, 1200, 300, 0]
                },
                {
                    name: '生活费',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    data:[3900, 2200, 300, 200, 900, 300]
                }
            ]
        };
        myChart.setOption(option);
    }
  }
}
</script>



