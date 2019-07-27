Page({
  data: {
    approvalId: -1,//审批id
    detailsData: null,//所有的数据
  },
  onLoad(data) {
    console.log(JSON.stringify(data.approvalId));
    this.setData({
      approvalId: data.approvalId,
    })
    var that = this;
    dd.showLoading({
      content: '加载中...',
    });
    dd.httpRequest({
      url: 'http://localhost:8080/zjp/approval/findOutList',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify(this.data.approvalId, ),
      dataType: 'json',
      success: function(res) {
        that.setData({
          detailsData: res.data,
        })
        console.log("成功:" + JSON.stringify(res.data));
      }, fail: function(res) {
        dd.alert({ content: '无法连接数据,请查看控制台' });
        console.log("错误:" + JSON.stringify(res));
      },
      complete: function(res) {
        dd.hideLoading();
      }
    });
  },
});
