Page({

  onLoad(query) {
    // 页面加载
    let that = this;
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    dd.getStorage({
      key: 'storeHouse',
      success: function(res) {
        that.setData({
          storeHouseName: res.data.object[res.data.index].name,
          storeHouseObject: res.data.object,
          storeHouseIndex: res.data.index,
          storeHouseID: res.data.object[res.data.index].id,
        });
      },
      fail: function(res) {
        dd.alert({ content: res.errorMessage });
      },
    });
    dd.getStorage({
      key: 'user',
      success: function(res) {
        that.data.userID = res.data.user.iD;
        that.data.userName = res.data.user.name;
      },
      fail: function(res) {
        console.log({ content: res.errorMessage });
      },
    });
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
      title: '入库',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
  data: {
    arrayTest: [],
    msg: "",
    storeHouseName: "",//仓库
    storeHouseObject: {},//仓库对象
    storeHouseIndex: 0,
    name: "",//产品名称
    time: "",//时间
    Id: 0,//条形码，产品ID
    userName: "Null",//入库人姓名
    userID: -1,
    number: "",//数量
    unit: "",//单位
  },
  saoMa() {
    dd.scan({
      type: 'qr',
      success: (res) => {
        this.setData({
          Id: res.code,
        })
        var that = this;
        dd.httpRequest({
          headers: {
            "Content-Type": "application/json"
          },
          url: 'http://172.18.1.72:8082/zjp/comeOut/come',
          method: 'POST',
          data: JSON.stringify({
            id: this.data.Id,
            userName: that.data.userName,
            storeHouseName: that.data.storeHouseName,
            storeHouseID: that.data.storeHouseID,
            userID: that.data.userID,
            state:38,
          }),
          dataType: 'json',
          success: function(res) {
            console.log(res.data);
            if (res.data.code == 1) {
              that.setData({
                msg: "入库成功",
              });
            } else if (res.data.code == 0) {
              that.setData({
                msg: "入库成功,但无法找到对应商品信息",
              });
            }
            //{"code":1,"count":0,"data":{"createTime":"Mon Jul 15 15:36:14 CST 2019","id":"6940159412054","name":"李四",
            //"number":500,"supplier":"百事可乐饮料有限公司","unit":"毫升"},"is":true,"msg":"入库成功","tip":"操作成功"}
            that.setData({
              name: res.data.data.name,//产品名称
              storeHouseName: res.data.data.storeHouseName,
              userName: res.data.data.userName,
              number: res.data.data.number,
              time: res.data.data.createTime,
              unit: res.data.data.unit,
            })
            that.setData({
              arrayTest: that.data.arrayTest.concat({
                name: res.data.data.name,//产品名称
                msg: that.data.msg,//返回结果
                userName: res.data.data.userName,//出库人姓名
                storeHouseName: res.data.data.storeHouseName,//地名
                id: res.data.data.name,//扫码获取的id
                time: res.data.data.createTime,//出库时间
                unit: res.data.data.unit,//扫码获取的id
                number: res.data.data.number,//出库时间
              }),
            });
          },
        });
      },
    });
  },
});
