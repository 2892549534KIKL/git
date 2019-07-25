Page({

  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: '出库',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
  data: {
    arrayTest:[],
    msg:"",
    customerName:"",
    name:"张三",
    value:"",
    time:"",
    Id:0,
  },
  saoMa(){
    dd.scan({
      type: 'qr',
      success: (res) => {
        this.setData({
          tempId: res.code,
        })
        var that = this;
      dd.httpRequest({
        headers: {
          "Content-Type": "application/json"
        },
        url: 'http://www.xn--qrqy46c.top/test/comeOut/getData',
        method: 'POST',
        data:JSON.stringify({
            id : this.data.Id,
            userName : this.data.name,
        }),
        dataType: 'json',
        success: function(res) {
          if (res.data.code==0){
            that.setData({
              msg: "出库成功",
            });
          }else{
            that.setData({
              msg: "出库失败",
            });
          }
          that.setData({
            customerName:res.data.data.customerName,
            name:res.data.data.name,
            value:res.data.data.value,
            time:res.data.data.time,
          })
          that.setData({
            arrayTest: that.data.arrayTest.concat({
              msg:that.data.msg,//返回结果
              name:res.data.data.name,//出库人姓名
              customerName:res.data.data.customerName,//地名
              id:that.data.tempId,//扫码获取的id
              time:res.data.data.time,//出库时间
              }),
          });

        },
      });
      },
    });
  },
  
});
