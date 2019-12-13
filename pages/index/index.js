import F2 from '../../lib/my-f2.min.js';
const app = getApp();

let chart = null;//饼状图
let chart_bar = null;//条形图
function drawChart(data,canvas, width, height) {
  var data = data;
  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
  chart.source(data, {
    percent: {
      formatter(val) {
        return val * 100 + '%';
      }
    }
  });
  chart.legend({
    position: 'right',
    itemFormatter(val) {
      var name='';
      for(var i=0;i<data.length;i++){
        if(val==data[i].name) name=data[i].percent*100
      }
      return val + '  ' +name+'%';
    }
  });
  chart.tooltip(false);
  chart.coord('polar', {
    transposed: true,
    radius: 0.85
  });
  chart.axis(false);
  chart.interval()
    .position('a*percent')
    .color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'])
    .adjust('stack')
    .style({
      lineWidth: 1,
      stroke: '#fff',
      lineJoin: 'round',
      lineCap: 'round'
    })
    .animate({
      appear: {
        duration: 1200,
        easing: 'bounceOut'
      }
    });

  chart.render();
  return chart;
}
function drawChart_bar(data,canvas, width, height) {
  var data = data;
  var chart_bar = new F2.Chart({
    el: canvas,
    width,
    height
  });

  chart_bar.source(data, {
    '数量': {
      tickCount: 5
    }
  });
  chart_bar.coord({
    transposed: true
  });
  chart_bar.axis('State', {
    line: F2.Global._defaultAxis.line,
    grid: null
  });
  chart_bar.axis('数量', {
    line: null,
    grid: F2.Global._defaultAxis.grid,
    label: function (text, index, total) {
      var textCfg = {
        text: text + ' 人'
      };
      if (index === 0) {
        textCfg.textAlign = 'left';
      } else if (index === total - 1) {
        textCfg.textAlign = 'right';
      }
      return textCfg;
    }
  });
  chart_bar.tooltip({
    custom: true, // 自定义 tooltip 内容框
    onChange: function (obj) {
      var legend = chart_bar.get('legendController').legends.top[0];
      var tooltipItems = obj.items;
      var legendItems = legend.items;
      var map = {};
      legendItems.map(function (item) {
        map[item.name] = Object.assign({}, item);
      });
      tooltipItems.map(function (item) {
        var name = item.name;
        var value = item.value;
        if (map[name]) {
          map[name].value = (value);
        }
      });
      legend.setItems(Object.values(map));
    },
    onHide: function () {
      var legend = chart_bar.get('legendController').legends.top[0];
      legend.setItems(chart_bar.getLegendItems().country);
    }
  });
  chart_bar.interval().position('State*数量').color('状态').adjust('stack');

  chart_bar.render();
  return chart_bar;
}

Page({
  data: {
    num1:1,//已到岗
    num2:2,//未到岗
    count:null,
    list:null,
    width:null,
    height:null,
    Data:[
    { State: '福建', 状态: '归属范围内签到', 数量: 0 },
    { State: '福建', 状态: '超出归属地签到', 数量: 0 },
    { State: '福建', 状态: '超出省范围签到', 数量: 0 },
    { State: '江西', 状态: '归属范围内签到', 数量: 0 },
    { State: '江西', 状态: '超出归属地签到', 数量: 0 },
    { State: '江西', 状态: '超出省范围签到', 数量: 0 },
    { State: '浙江', 状态: '归属范围内签到', 数量: 0 },
    { State: '浙江', 状态: '超出归属地签到', 数量: 0 },
    { State: '浙江', 状态: '超出省范围签到', 数量: 0 },
    ],
    DataTwo:[
    { name: '归属范围内签到', percent: 0.4},
    { name: '超出归属地签到', percent: 0.4},
    { name: '超出省范围签到', percent: 0.1},
    { name: '未到岗', percent: 0.1},
    ],  
    topThreeImage: ['../images/no1.png', '../images/no2.png', '../images/no3.png'],//前三签到图标
    topThreeSign: [],//前三签到数据
    signData: null,
    workNumber:'50%',//已到岗的图形占比
    noWorkNumber:'50%',//已到岗的图形占比
  },
  onLoad() {
    var that = this;
    dd.getStorage({
      key: 'user',
      success: function(res) {
        if (res.data.user.department != null && res.data.user.department != "") {
          that.setData({list : res.data.user.department.split(",")})
          that.searchTwo();
          that.rank();
          that.Count();
          setInterval(function(){
            that.getNewSignList(res.data.user.iD);
        },5000);
        }
      }
    });
  },
  getNewSignList(id){
    var that=this;
    dd.httpRequest({
      url: 'http://222.216.30.107:8080/sign/signin/getNewSignInListTwo',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      data:JSON.stringify({
        id:id
      }),
      dataType: 'json',
      success: function(res) {
        var temp=0;
        if(res.data.data!=null){
          for(var i=0;i<res.data.data.length;i++){
            if(that.data.list.indexOf(res.data.data[i].groups)>-1){
              temp++;
              that.setData({
                signData: that.data.signData.reverse().concat(res.data.data[i]).reverse(),
              })
            }
          }
        }
        if(temp>0){
          that.rank();
          that.Count();
          that.chart();
        }
      }
    });
  },
  chart() {
    var that=this;
    //饼状图
    my.createSelectorQuery()
      .select('#pie')
      .boundingClientRect()
      .exec((res) => {
        // 获取分辨率
        const pixelRatio = my.getSystemInfoSync().pixelRatio;
        // 获取画布实际宽高
        const canvasWidth = res[0].width;
        const canvasHeight = res[0].height;
        this.setData({
          width: canvasWidth * pixelRatio,
          height: canvasHeight * pixelRatio
        });
        const myCtx = my.createCanvasContext('pie');
        myCtx.scale(pixelRatio, pixelRatio); // 必要！按照设置的分辨率进行放大
        const canvas = new F2.Renderer(myCtx);
        this.canvas = canvas;
        console.log(res[0].width);
        console.log(res[0].height);
        that.setData({
          width:res[0].width,
          height:res[0].height,
        })
        console.log(that.data.width);
        console.log(that.data.height);
        drawChart(that.data.DataTwo,canvas, res[0].width, res[0].height);
      });
    //条形图
    my.createSelectorQuery()
      .select('#stackBar')
      .boundingClientRect()
      .exec((res) => {
        // 获取分辨率
        const pixelRatio = my.getSystemInfoSync().pixelRatio;
        // 获取画布实际宽高
        const canvasWidth = res[0].width;
        const canvasHeight = res[0].height;
        this.setData({
          width: canvasWidth * pixelRatio,
          height: canvasHeight * pixelRatio
        });
        const myCtx = my.createCanvasContext('stackBar');
        myCtx.scale(pixelRatio, pixelRatio); // 必要！按照设置的分辨率进行放大
        const canvas = new F2.Renderer(myCtx);
        this.canvas = canvas;
        drawChart_bar(that.data.Data,canvas, res[0].width, res[0].height);
      });
  },
  search(){
    var that=this;
    dd.httpRequest({
      url: 'http://222.216.30.107:8080/sign/signin/findByCondition',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        date:that.today(),
        projectParameter: '去重',
        sort:'倒序',
        list:that.data.list
      }),
      dataType: 'json',
      success: function(res) {
        var x=0;
        var y=0;
        var z=0;
        for(var i = 0;i<res.data.length;i++){
          if(res.data[i].signAdders!=null){
                if(res.data[i].signAdders.substr(0,2)=="江西"){
                    if(res.data[i].type=="归属范围内签到"){
                        that.data.Data[3].数量++;
                    }else if(res.data[i].type=="超出归属地签到"){
                        that.data.Data[4].数量++;
                    }else if(res.data[i].type=="超出省范围签到"){
                        that.data.Data[5].数量++;
                    }
                }
                else if(res.data[i].signAdders.substr(0,2)=="福建"){
                    if(res.data[i].type=="归属范围内签到"){
                        that.data.Data[0].数量++;
                    }else if(res.data[i].type=="超出归属地签到"){
                        that.data.Data[1].数量++;
                    }else if(res.data[i].type=="超出省范围签到"){
                        that.data.Data[2].数量++;
                    }
                }
                else if(res.data[i].signAdders.substr(0,2)=="浙江"){
                    if(res.data[i].type=="归属范围内签到"){
                        that.data.Data[6].数量++;
                    }else if(res.data[i].type=="超出归属地签到"){
                        that.data.Data[7].数量++;
                    }else if(res.data[i].type=="超出省范围签到"){
                        that.data.Data[8].数量++;
                    }
                }
            }

            if(res.data[i].type=="归属范围内签到"){
                x++;
            }else if(res.data[i].type=="超出归属地签到"){
                y++;
            }else if(res.data[i].type=="超出省范围签到"){
                z++;
            }
        }

        that.data.DataTwo[0].percent=Math.floor(x/that.data.count * 10000) / 10000;
        that.data.DataTwo[1].percent=Math.floor(y/that.data.count * 10000) / 10000;
        that.data.DataTwo[2].percent=Math.floor(z/that.data.count * 10000) / 10000;
        that.data.DataTwo[3].percent=Math.floor((that.data.count-x-y-z)/that.data.count * 10000) / 10000;

        that.setData({
          num1:x+y+z,
          num2:(that.data.count-x-y-z),
          Data: that.data.Data,
          DataTwo:that.data.DataTwo
        })
        let workNumber= that.data.num1/(that.data.num1+that.data.num2)*100
        let noWorkNumber= that.data.num2/(that.data.num1+that.data.num2)*100
        that.setData({
          workNumber:workNumber+"%",
          noWorkNumber:noWorkNumber+"%",
        })
        that.chart();
      }
    });
  },
  searchTwo(){
    var that=this;
    dd.httpRequest({
      url: 'http://222.216.30.107:8080/sign/signin/findByCondition',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        date:that.today(),
        sort:'倒序',
        list:that.data.list
      }),
      dataType: 'json',
      success: function(res) {
        that.setData({
          signData:res.data
        })
      }
    });
  },
  Count(){
    var that=this;
    dd.httpRequest({
      url: 'http://222.216.30.107:8080/sign/staff/getCount',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        list:that.data.list
      }),
      dataType: 'json',
      success: function(res) {
        that.setData({
          count: res.data
        })
        that.search();
      }
    });
  },
  rank(){
    var that = this;
    dd.httpRequest({
      url: 'http://222.216.30.107:8080/sign/signin/findByConditionTwo',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        page: 1,
        rowsCount: 3,
        date:that.today(),
        list:that.data.list
      }),
      dataType: 'json',
      success: function(res) {
        that.setData({
          topThreeSign: res.data.data,
        })
 
      }
    });
  },
  //获取今天
  today(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    var nowDate = year + '-'+ month + '-' + day; 
    return nowDate;
  },
  touchStart(e) {
    if (this.canvas) {
      this.canvas.emitEvent('touchstart', [e]);
    }
  },
  touchMove(e) {
    if (this.canvas) {
      this.canvas.emitEvent('touchmove', [e]);
    }
  },
  touchEnd(e) {
    if (this.canvas) {
      this.canvas.emitEvent('touchend', [e]);
    }
  }
});

