Page({
  data: {
    userID:"",
    array: [{
      src: '/image/outInData.png',
      color: 'white',
      mode: 'center',
      text: '出入库数据'
    }, {
      src: '/image/outInScan.png',
      color: 'white',
      mode: 'center',
      text: '扫码出入库'
    }, {
      src: '/image/use.png',
      color: 'white',
      mode: 'center',
      text: '扫码使用或报销'
    }, {
      src: '/image/approval.png',
      color: 'white',
      mode: 'center',
      text: '申请/审批'
    }, {
      src: '/image/construction.png',
      color: 'white',
      mode: 'center',
      text: '施工管理'
    }, {
      src: '/image/notice.png',
      color: 'white',
      mode: 'center',
      text: '通知'
    }],
    src: './2.png'
  },
  onLoad() {
    var that = this;
     dd.getStorage({
        key: 'user',
        success: function(res) {
          that.data.userID=res.data.user.iD;
          },
       fail: function(res){
            console.log({content: res.errorMessage});
         },
      });
    dd.httpRequest({
      url: 'http://39.96.30.233/zjp/approval/selectEChartsMap',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        userID: that.data.userID,
      }),
      dataType: 'json',
      success: function(res) {
        that.data.array[3].number= res.data[0].value;
        that.setData({
          array: that.data.array,
        })
      }, fail: function(res) {
        console.log("错误:" + res);
      },
      complete: function(res) {
        dd.hideLoading();
      }
    });
    dd.httpRequest({
      url: 'http://39.96.30.233/zjp/notice/getTotalByUserID',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        userID: that.data.userID,
        isComplete: '否',
      }),
      dataType: 'json',
      success: function(res) {
        that.data.array[5].number= res.data;
        that.setData({
          array: that.data.array,
        })
      }, fail: function(res) {
        console.log("错误:" + res);
      },
      complete: function(res) {
        dd.hideLoading();
      }
    });
  },
  jump(e) {
    var index = e.currentTarget.dataset['index'];
    switch (index) {
      case 0:
        dd.reLaunch({
          url: '../../pages/comeOut/comeOut',
        });
        break;
      case 1:
        dd.navigateTo({
          url: '../../pages/ComeOutIndex/ComeOutIndex',
        });
        break;
      case 2:
        dd.navigateTo({
          url: '../../pages/useReimburseIndex/useReimburseIndex',
        });
        break;
      case 3:
        dd.navigateTo({
          url: '../../pages/approval/approval',
        })
        break;
      case 4:
        dd.reLaunch({
          url: '../../pages/construction/construction',
        });
        break;
      case 5:
        dd.navigateTo({
          url: '../../pages/InformInfo/InformInfo',
        });
        break;
      case 6:
        dd.reLaunch({
          url: '../../pages/InformInfo/InformInfo',
        });
        break;
      default:
        dd.alert({
          content:'暂无地址跳转',
        })
        break;

    }

  },

})