import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

declare let echarts:any;
/*
  Generated class for the MyChartPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-chart-page',
  templateUrl: 'my-chart-page.html'
})
export class MyChartPagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  myLineChart:any;
  myringChart:any;
  mycolumnChart:any;
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyChartPagePage');
    this.selectAllData();
  }

  selectAllData() {
    //折线图
    if (this.myLineChart) {
      return;
    }
    console.log("echarts:  " + document.getElementById('linechart'));

    this.myLineChart = echarts.init(document.getElementById('linechart'));
    var symbolSize = 8;
    var data1 = [[1, 20], [2, 40], [3, 20], [4, 30], [6, 40]];
    var data2 = [[0, 10], [1, 40], [2, 20], [3, 30], [4, 40]];
    var data3 = [[0, 20], [1, 20], [3, 60], [4, 70], [8, 40]];
    var data4 = [[1, 20], [2, 60], [3, 30], [5, 50], [6, 40]];
    var data5 = [[0, 40], [2, 30], [3, 40], [4, 30], [6, 60]];
    var data6 = [[0, 30], [4, 30], [5, 40], [2, 50], [7, 60]];

    let baseOption = {
      // title: {
      //   text: '1.行业营业收入分析'
      // },
      tooltip: {
        triggerOn: 'click',
        formatter: function (params) {
          return params.data[1].toFixed(0) + '万';
        }
      },
      legend: {
        data: ['餐饮', '住宿','游玩', '交通', '购物'],
        selectedMode: 'single'
      },
      grid: {},
      xAxis: {
        min: 0,
        max: 9,
        type: 'value',
        axisLine: {onZero: false},   //坐标轴轴线相关设置
        splitLine: {show: false}, // 是否显示坐标轴在 grid 区域中的分隔线。
        axisTick:{show:false}     //是否显示坐标轴刻度
      },
      yAxis: {
        min: 0,
        max: 80,
        type: 'value',
        axisLine: {onZero: false},
        axisTick:{show:false}     //是否显示坐标轴刻度
      },
      series: [

        {
          name: '餐饮',
          type: 'line',
          smooth: true,
          symbolSize: symbolSize,
          data: data1
        },
        {
          name: '住宿',
          type: 'line',
          smooth: true,
          symbolSize: symbolSize,
          data: data2
        },
        {
          name: '游玩',
          type: 'line',
          smooth: true,
          symbolSize: symbolSize,
          data: data4
        },
        {
          name: '交通',
          type: 'line',
          smooth: true,
          symbolSize: symbolSize,
          data: data5
        },
        {
          name: '购物',
          type: 'line',
          smooth: true,
          symbolSize: symbolSize,
          data: data6
        },

      ]
    };
    let option = {
      baseOption: baseOption,
      media: [
        {
          option: {
            width: "100%",
            height: "100%"
          }
        }
      ]
    }
    this.myLineChart.setOption(baseOption, true);
    this.myLineChart.resize({width: window.innerWidth - 32});

    //环形图
    if (this.myringChart) {
      return;
    }

    this.myringChart = echarts.init(document.getElementById('ringchart'));
    let ringoption = {
      // title: {
      //   text: '2.行业消费热点分析'
      // },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'right',
        y:'center',
        data: ['餐饮', '住宿', '游玩', '交通', '购物']
      },
      series: [
        {
          name: '数据',
          type: 'pie',
          center:['40%','50%'],
          radius: ['30%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '10',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {value: 335, name: '餐饮'},
            {value: 310, name: '住宿'},
            {value: 234, name: '交通'},
            {value: 135, name: '游玩'},
            {value: 1548, name: '购物'}
          ]
        }
      ]
    };
    this.myringChart.setOption(ringoption);
    this.myringChart.resize({width: window.innerWidth - 32});

    //柱状图
    if (this.mycolumnChart) {
      return;
    }

    this.mycolumnChart = echarts.init(document.getElementById('columnchart'));
    let columnoption = {
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data:['餐饮','住宿','交通','游玩','购物']
      },

      xAxis : [
        {
          type : 'category',
          axisTick:{show:false},    //是否显示坐标轴刻度
          data : ['20岁以下','20-49岁','50岁以上']
        }
      ],
      yAxis : [
        {
          type : 'value',
          axisTick:{show:false}     //是否显示坐标轴刻度
        }
      ],
      series : [
        {
          name:'餐饮',
          type:'bar',
          data:[320, 332, 301]
        },
        {
          name:'住宿',
          type:'bar',
          // stack: '酒店',  //stack 属性:设置成一样后可把不同类型合并在同一条柱形上
          data:[120, 132, 101]
        },
        {
          name:'交通',
          type:'bar',
          // stack: '酒店',
          data:[220, 182, 191]
        },
        {
          name:'游玩',
          type:'bar',
          // stack: '酒店',
          data:[150, 232, 201]
        },

        {
          name:'购物',
          type:'bar',
          data:[62, 82, 91]
        }
      ]
    };
    this.mycolumnChart.setOption(columnoption);
    this.mycolumnChart.resize({width: window.innerWidth - 32});


  }

}
