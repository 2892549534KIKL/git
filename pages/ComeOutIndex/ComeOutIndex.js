Page({
  data: {
    userInfo: {},
    storeHouseNameList: ["请选择"],
    storeHouseObject: {},
    index: 0,
  },
  onLoad() {
    let that = this;
    dd.httpRequest({
      headers: {
        "Content-Type": "application/json"
      },
      url: 'http://172.18.0.177:8080/zjp/storeHouse/findAll',
      method: 'POST',
      dataType: 'json',
      success: function(res) {
        dd.setStorage({
          key: 'storeHouse',
          data: {
            object: res.data.data,//仓库对象
            index: 0//仓库名
          },
          success: function() {
            var shnl = JSON.parse(JSON.stringify(res.data.data));
            for(let i = 0;i<res.data.count;i++){
              shnl[i] = shnl[i].name;
            }
            that.setData({
              storeHouseObject: res.data.data,
              storeHouseNameList:shnl,
              index: 0,
            });
          },fail:function(){
            alert("网络错误，请检查网络连接");
          }
        });
      },
    });
  },
  in() {
    dd.navigateTo({ url: 'in/in' });
  },
  out() {
    dd.navigateTo({ url: 'out/out' });
  },
  bindPickerChange(e) {
    let that = this;
    dd.setStorage({
      key: 'storeHouse',
      data: {
        object: that.data.storeHouseObject,//仓库对象
        index: e.detail.value
      },
      success: function() {
      }
    });
    this.setData({
      index: e.detail.value,
    });
  },
});