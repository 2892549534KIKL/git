Page({
  data: {
    page: 1,//分页查询(第几页)
    rowsCount: 10,//分页查询(一页多少条数据)
    comeOutData: {},
    loaderSign: true,
    showView: false,//标记数据是否加载完毕
    searchText: "",//搜索文本
  },
  //页面初始化时加载
  onLoad() {
    var that = this;
    dd.showLoading({
      content: '加载中...',
      delay: 100,
    });
    dd.httpRequest({
      url: 'http://172.18.0.177:8080/zjp/product/findByCondition',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        page: that.data.page,
        rowsCount: that.data.rowsCount,
        condition: that.data.searchText,
      }),
      dataType: 'json',
      success: function(res) {
        that.setData({
          comeOutData: res.data.data,
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
    dd.httpRequest({
      url: 'http://172.18.0.177:8080/zjp/product/findByCondition',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        page: that.data.page,
        rowsCount: that.data.rowsCount,
        condition: that.data.searchText,
      }),
      dataType: 'json',
      success: function(res) {
        that.setData({
          comeOutData: res.data.data,
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
  //点击删除
  del(e) {
    console.log(e.currentTarget.dataset.id);
    var that = this;
    dd.httpRequest({
      url: 'http://172.18.0.177:8080/zjp/product/deleteLarge',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify(new Array(e.currentTarget.dataset.id)),
      dataType: 'json',
      success: function(res) {
        dd.alert({ content: '删除完成' });
        var index = e.currentTarget.dataset.index;
        that.data.comeOutData[index].createTime = "-1";
        that.setData({//啥也不做,只触发渲染就OK
          comeOutData: that.data.comeOutData,
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
      that.setData({
        page: that.data.page + 1
      })
      dd.httpRequest({
        url: 'http://172.18.0.177:8080/zjp/product/findByCondition',
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify({
          page: that.data.page,
          rowsCount: that.data.rowsCount,
          condition: that.data.searchText,
        }),
        dataType: 'json',
        success: function(res) {
          //如果没查到数据就重置page页码
          if (res.data.data.length == 0) {
            that.setData({
              page: that.data.page - 1,
              showView: true,//显示'已加载全部数据'
            });
          } else {
            for (var i = 0; i <= res.data.data.length; i++) {
              that.setData({
                comeOutData: that.data.comeOutData.concat({
                  name: res.data.data[i].name,//商品名称
                  unit: res.data.data[i].unit,//单位
                  number: res.data.data[i].number,//数量
                  userName: res.data.data[i].userName,//操作人
                  storeHouseName: res.data.data[i].storeHouseName,//仓库
                  state: res.data.data[i].state,//创建时间
                  createTime: res.data.data[i].createTime,//创建时间
                }),
              });
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

    } else {

    }

  },
});