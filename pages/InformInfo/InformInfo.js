Page({
  data: {
    page: 1,//分页查询(第几页)
    rowsCount: 10,//分页查询(一页多少条数据)
    Inform: {},
    id:"",
    loaderSign: true,
    showView: false,//标记数据是否加载完毕
    searchText: "",//搜索文本
  },
  //页面初始化时加载
  onLoad() {
    var that = this;
    dd.getStorage({
        key: 'user',
        success: function(res) {
          that.data.id=res.data.user.iD;
        },
        fail: function(res){
          dd.alert({content: res.errorMessage});
        },
    });
    dd.showLoading({
      content: '加载中...',
      delay: 100,
    });
    dd.httpRequest({
      url: 'http://39.96.30.233/zjp/notice/findByUserID',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        page: that.data.page,
        rowsCount: that.data.rowsCount,
        userID: that.data.id,
        condition: that.data.searchText,
      }),
      dataType: 'json',
      success: function(res) {
        if (res.data.data.length < that.data.rowsCount) {
          that.setData({
            page: 1,
            showView: true,//显示'已加载全部数据'
            loaderSign: false,
          });
        }
        that.setData({
          Inform: res.data.data,
        })
      }, fail: function(res) {
        dd.alert({ content: '无法连接数据,请查看控制台' });
        console.log("错误:" + res);
      },
      complete: function(res) {
        dd.hideLoading();
      }
    });
  },
  //查询搜索的接口方法
  search() {
    var that = this;
    that.setData({
      page: 1,
      showView: false,//显示'已加载全部数据'
      loaderSign: true,
    })
    dd.showLoading({
        content: '加载中...',
        delay: 100,
      });
    dd.httpRequest({
      url: 'http://39.96.30.233/zjp/notice/findByUserID',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        page: that.data.page,
        rowsCount: that.data.rowsCount,
        condition: that.data.searchText,
        userID: that.data.id,
      }),
      dataType: 'json',
      success: function(res) {
        if (res.data.data.length < that.data.rowsCount) {
          that.setData({
            page: 1,
            showView: true,//显示'已加载全部数据'
            loaderSign: false,
          });
        }
        that.setData({
          Inform: res.data.data,
        })
      }, fail: function(res) {
        dd.alert({ content: '无法连接数据,请查看控制台' });
        console.log("错误:" + res);
      },
      complete: function(res) {
        dd.hideLoading();
      }
    });
  },
  //保存搜索值
  save(e) {
    this.setData({ searchText: e.detail.value });
  },
  //点击未读
  showRead(e) {
    var that = this;
    if(that.data.Inform[e.currentTarget.dataset.index].isRead!="否") return;
    dd.showLoading({
        content: '加载中...',
        delay: 100,
    });
    console.log(11)
    dd.httpRequest({
      url: 'http://39.96.30.233/zjp/notice/updateRead',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
            noticeID: e.currentTarget.dataset.id,
            isRead: "是",
            userID: that.data.id,
        }),
      dataType: 'json',
      success: function(res) {
        var index = e.currentTarget.dataset.index;
        that.data.Inform[index].isRead = "是";
        that.setData({//啥也不做,只触发渲染就OK
          Inform: that.data.Inform,
        })
      }, fail: function(res) {
        console.log("错误:" + JSON.stringify(res));
      },
      complete: function(res) {
        dd.hideLoading();
      }
    });
  },
  //流加载
  onReachBottom: function() {
    var that = this;
    if (this.data.loaderSign) {
      that.setData({
        page: that.data.page + 1
      })
      dd.showLoading({
          content: '加载中...',
          delay: 100,
      });
      dd.httpRequest({
        url: 'http://39.96.30.233/zjp/notice/findByUserID',
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify({
          page: that.data.page,
          rowsCount: that.data.rowsCount,
          userID: that.data.id,
          condition: that.data.searchText,
        }),
        dataType: 'json',
        success: function(res) {
          //如果没查到数据就重置page页码
          if (res.data.data.length < that.data.rowsCount) {
            for (var i = 0; i < res.data.data.length; i++) {
              that.setData({
                Inform: that.data.Inform.concat(res.data.data[i]),
              })
            }
            that.setData({
              page: that.data.page - 1,
              showView: true,//显示'已加载全部数据'
              loaderSign: false,
            });
          } else {
            for (var i = 0; i < res.data.data.length; i++) {
              that.setData({
                Inform: that.data.Inform.concat(res.data.data[i]),
              })
            }
          }
          //一秒后再启动流加载
          setTimeout(() => {
            that.setData({
              loaderSign: false,
            })
          }, 1000);
        }, fail: function(res) {
          dd.alert({ content: '无法连接数据,请查看控制台' });
          console.log("错误:" + res);
        },
        complete: function(res) {
          dd.hideLoading();
        }
      });
    } 
  },
});