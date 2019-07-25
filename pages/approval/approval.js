Page({
  data: {
    page: 1,//分页查询(第几页)
    rowsCount: 10,//分页查询(一页多少条数据)
    userID: 1587,//申请/审批的用户id
    isComplete: 21,//21状态表示为审核(二选一)
    condition: null,//null表示已审核(二选一)
    approvalData: {},
    loaderSign: true,
    showView: false,//标记数据是否加载完毕
    searchText: "",//搜索文本
    buttonText: '已审批',//设置按键文本
    isShowWindow: false,//弹窗
    details:"",
    id:"",
    index:"",
  },
  //页面初始化时加载
  onLoad() {
    var that = this;
    dd.showLoading({
      content: '加载中...',

    });
    dd.httpRequest({
      url: 'http://172.18.0.177:8080/zjp/approval/findByCondition',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        page: that.data.page,
        rowsCount: that.data.rowsCount,
        userID: that.data.userID,
        isComplete: that.data.isComplete,
        condition: that.data.searchText,
      }),
      dataType: 'json',
      success: function(res) {
        if (res.data.data.length < 10) {
            that.setData({
              page: 1,
              showView: true,//显示'已加载全部数据'
              loaderSign:false,
            });
          }
        that.setData({
          approvalData: res.data.data,
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
      })
    dd.showLoading({
      content: '加载中...',

    });
    dd.httpRequest({
      url: 'http://172.18.0.177:8080/zjp/approval/findByCondition',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        page: that.data.page,
        rowsCount: that.data.rowsCount,
        userID: that.data.userID,
        isComplete: that.data.isComplete,
        condition: that.data.searchText,
      }),
      dataType: 'json',
      success: function(res) {
                 console.log(res);
        that.setData({
          approvalData: res.data.data,
        })
      }, fail: function(res) {
        console.log({ content: '无法连接数据,请查看控制台' });
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
  savedetails(e) {
    this.setData({ details: e.detail.value });
  },
  //点击审批(状态码:同意22/驳回23)
  check(e) {
    var that = this;
    var state = 22;
    this.setData({ isShowWindow: false, });
    console.log(e);

    // dd.showLoading({
    //   content: '加载中...',
    // });
    if(e.target.dataset.value!="yes")
    {
      state=23;
    }
    dd.httpRequest({
      url: 'http://172.18.0.177:8080/zjp/approval/editData',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        id: that.data.id,
        text: that.data.details,
        state: state,
        userID: that.data.userID,
      }),
      dataType: 'json',
      success: function(res) {
        var index = that.data.index;
        that.data.approvalData[index].createTime = "-1";
        that.setData({//啥也不做,只触发渲染就OK
          approvalData: that.data.approvalData,
        })
        that.setData({
          details: "",
          index:"",
          id:"",
        })
      }, fail: function(res) {
        dd.alert({ content: '无法连接数据,请查看控制台' });
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
      dd.showLoading({
        content: '加载中...',
      });
      that.setData({
        page: that.data.page + 1
      })
      dd.httpRequest({
        url: 'http://172.18.0.177:8080/zjp/approval/findByCondition',
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify({
          page: that.data.page,
          rowsCount: that.data.rowsCount,
          userID: that.data.userID,
          condition: that.data.searchText,
        }),
        dataType: 'json',
        success: function(res) {
          //如果没查到数据就重置page页码
          if (res.data.data.length < that.data.rowsCount) {
            for (var i = 0; i < res.data.data.length; i++) {
              that.setData({
                approvalData:that.data.approvalData.concat(res.data.data[i]),
              })
            }
            that.setData({
              page: that.data.page - 1,
              showView: true,//显示'已加载全部数据'
              loaderSign:false,
            });
          } else {
            for (var i = 0; i < res.data.data.length; i++) {
              that.setData({
                approvalData:that.data.approvalData.concat(res.data.data[i]),
              })
            }
          }
          //一秒后再启动流加载
          setTimeout(() => {
            that.setData({
              loaderSign: false,
            })
          }, 1000);
        console.log(that.data.approvalData);
        }, fail: function(res) {
          console.log({ content: '无法连接数据,请查看控制台' });
          console.log("错误:" + res);
        },
        complete: function(res) {
          dd.hideLoading();
        }
      });
    } else {

    }
  },
  //切换待审批\已审批
  cut() {
    this.data.buttonText == '已审批' ? this.data.buttonText = '未审批' : this.data.buttonText = '已审批';
    this.setData({ buttonText: this.data.buttonText,searchText:"",showView:false,loaderSign:true,page:1})//重新渲染参数
    var that = this;
    dd.showLoading({
      content: '加载中...',
    });
    if (this.data.buttonText == '已审批') {
      that.data.isComplete=21;
      dd.httpRequest({
        url: 'http://172.18.0.177:8080/zjp/approval/findByCondition',
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify({
          page: that.data.page,
          rowsCount: that.data.rowsCount,
          userID: that.data.userID,
          isComplete: that.data.isComplete,
          condition: that.data.searchText,
        }),
        dataType: 'json',
        success: function(res) {
          if (res.data.data.length < that.data.rowsCount) {
            that.setData({
              page: that.data.page - 1,
              showView: true,//显示'已加载全部数据'
              loaderSign:false,
            });
          }
          that.setData({
            approvalData: res.data.data,
          });
        }, fail: function(res) {
          console.log({ content: '无法连接数据,请查看控制台' });
          console.log("错误:" + res);
        },
        complete: function(res) {
          dd.hideLoading();
        }
      });
    } else {
      that.data.isComplete="";
      dd.httpRequest({
        url: 'http://172.18.0.177:8080/zjp/approval/findByCondition',
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify({
          page: that.data.page,
          rowsCount: that.data.rowsCount,
          userID: that.data.userID,
          condition: that.data.searchText,
        }),
        dataType: 'json',
        success: function(res) {
          if (res.data.data.length < that.data.rowsCount) {
            that.setData({
              page: that.data.page - 1,
              showView: true,//显示'已加载全部数据'
              loaderSign:false,
            });
          }
          that.setData({
            approvalData: res.data.data,
          })
        }, fail: function(res) {
          console.log({ content: '无法连接数据,请查看控制台' });
          console.log("错误:" + res);
        },
        complete: function(res) {
          dd.hideLoading();
        }
      });
    }
  },
  //查看物料详情
  showDetails(e) {
    dd.navigateTo({ url: 'details/details?approvalId=' + e.currentTarget.dataset.id });
  },
  //隐藏弹窗
  hide() {
    this.setData({ isShowWindow: false, });
  },
  show(e) {
    this.setData({ isShowWindow: true, id:e.currentTarget.dataset.id,index:e.currentTarget.dataset.index});
  },
});
