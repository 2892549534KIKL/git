Page({

  onLoad(query) {
    var that = this;
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
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
    var IuserID = that.data.userID;
    console.log("IuserID" + IuserID);
    dd.httpRequest({
      headers: {
        "Content-Type": "application/json"
      },
      url: 'http://39.96.30.233/zjp/approval/findByListIDunreleased',
      method: 'POST',
      data: IuserID,
      // dataType: 'int',
      success: function(res) {
        console.log(that.data.userID);
        console.log(res.data)
        var shnl = JSON.parse(JSON.stringify(res.data));
        var listArr = JSON.parse(JSON.stringify(res.data));
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          shnl[i] = shnl[i].title;
          listArr[i] = listArr[i].id;
        }
        that.setData({
          selectNameList: shnl,
          listArr: listArr,
          listID: listArr[that.data.index],
          index: 0,
        });
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
      title: '出库',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
  data: {
    arrayTest: [],
    msg: "",
    storeHouseName: "",
    name: "",
    userName: "",
    time: "",
    Id: 0,
    index: 0,
    selectNameList: ["请选择"],
    quantity: 0,
    userID: 0,
    listID: 0,
    listArr: [],
    productList: [],
    outBarcode:0
  },
  bindPickerChange(e) {
    let that = this;
    let listIDTemp = that.data.listArr[e.detail.value]+"";
    console.log(listIDTemp);
    dd.httpRequest({
      headers: {
        "Content-Type": "application/json"
      },
      url: 'http://39.96.30.233/zjp/approval/findOutList',
      method: 'POST',
      data: listIDTemp,
      // dataType: 'int',
      success: function(res) {
        var rpl = JSON.parse(JSON.stringify(res.data));
        console.log(rpl);
        that.setData({
          productList: rpl,
          index: e.detail.value,
          listID: that.data.listArr[e.detail.value],
        });

      },fail:function(res){
        console.log(res);
      }
    });
  },
  saoMa() {
    dd.scan({
      type: 'qr',
      success: (res) => {
        this.setData({
          qrcodeVal: res.code,

        })
        var that = this;
        dd.showLoading({
          content: '加载中...',
          delay: 100,
        });
        dd.httpRequest({
          headers: {
            "Content-Type": "application/json"
          },
          url: 'http://39.96.30.233/zjp/approval/findByQrcode',
          method: 'POST',
          data: JSON.stringify({
            qrcode: that.data.qrcodeVal,
            senderID: that.data.userID,
            listID: that.data.listID,
          }),
          dataType: 'json',
          success: function(res) {
            console.log(that.data)
            console.log(res.data)
            if (res.data.code == 0) {
              that.setData({
                msg: "出库失败",
              });
            } else {
              var proList = that.data.productList;
              for(let i=0;i<proList.length;i++){
                if(proList[i].barcode == res.data.data.barcode){
                  proList[i].unreleased = proList[i].unreleased-1;
                  break;
                }
              }
              that.setData({
                msg: "出库成功",
                productList: proList,
              });
            }
          },
          complete: function(res) {
            dd.hideLoading();
          },
        });
      },
    });
  },
});
