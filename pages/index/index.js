import F2 from '../../lib/my-f2.min.js';
const app = getApp();

let chart = null;//饼状图
let chart_bar = null;//条形图
function drawChart(canvas, width, height) {
  const map = {
    '芳华': '40%',
    '妖猫传': '20%',
    '机器之血': '18%',
    '心理罪': '15%',
    '寻梦环游记': '5%',
    '其他': '2%',
  };
  const data = [
    { name: '芳华', percent: 0.4, a: '1' },
    { name: '妖猫传', percent: 0.2, a: '1' },
    { name: '机器之血', percent: 0.18, a: '1' },
    { name: '心理罪', percent: 0.15, a: '1' },
    { name: '寻梦环游记', percent: 0.05, a: '1' },
    { name: '其他', percent: 0.02, a: '1' }
  ];
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
      return val + '  ' + map[val];
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
function drawChart_bar(canvas, width, height) {
  var data = [
    { State: 'WY', 年龄段: '小于5岁', 人口数量: 25635 },
    { State: 'WY', 年龄段: '5至13岁', 人口数量: 1890 },
    { State: 'WY', 年龄段: '14至17岁', 人口数量: 9314 },
    { State: 'DC', 年龄段: '小于5岁', 人口数量: 30352 },
    { State: 'DC', 年龄段: '5至13岁', 人口数量: 20439 },
    { State: 'DC', 年龄段: '14至17岁', 人口数量: 10225 },
    { State: 'VT', 年龄段: '小于5岁', 人口数量: 38253 },
    { State: 'VT', 年龄段: '5至13岁', 人口数量: 42538 },
    { State: 'VT', 年龄段: '14至17岁', 人口数量: 15757 },
    { State: 'ND', 年龄段: '小于5岁', 人口数量: 51896 },
    { State: 'ND', 年龄段: '5至13岁', 人口数量: 67358 },
    { State: 'ND', 年龄段: '14至17岁', 人口数量: 18794 },
    { State: 'AK', 年龄段: '小于5岁', 人口数量: 72083 },
    { State: 'AK', 年龄段: '5至13岁', 人口数量: 85640 },
    { State: 'AK', 年龄段: '14至17岁', 人口数量: 22153 }
  ];
  var chart_bar = new F2.Chart({
    el: canvas,
    width,
    height
  });

  chart_bar.source(data, {
    '人口数量': {
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
  chart_bar.axis('人口数量', {
    line: null,
    grid: F2.Global._defaultAxis.grid,
    label: function (text, index, total) {
      var textCfg = {
        text: text / 1000 + ' k'
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
  chart_bar.interval().position('State*人口数量').color('年龄段').adjust('stack');

  chart_bar.render();
  return chart_bar;
}

Page({
  data: {
    checkedIn: 30,//已签到人数
    NoCheckedIn: 120,//未签到人数
    exceptions: 5,//异常人数
    topThreeImage: ['../images/no1.png', '../images/no2.png', '../images/no3.png'],//前三签到图标
    topThreeSign: [//前三签到数据
      { name: '张三', time: '08:35' },
      { name: '李四', time: '08:36' },
      { name: '王五', time: '08:37' },
    ],
    signData: [
      { name: '张三', time: '08:35', number: 2, site: '福建省福州市鼓楼区安泰街道福州鼓楼新高达教育培训中心(南门校区)新兴大厦(斗西路)' },
      { name: '李四', time: '08:36', number: 1, site: '江西省赣州市章贡区黄金岭街道迎宾大道辅路赣州富翔斯巴鲁汽车销售服务有限公司' },
      { name: '王五', time: '08:37', number: 3, site: '福建省福州市鼓楼区湖东路140号' },
    ],
  },
  onReady() {
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
        drawChart(canvas, res[0].width, res[0].height);
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
        drawChart_bar(canvas, res[0].width, res[0].height);
      });
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

