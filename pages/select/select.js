Page({
  data: {
    page: 1,//分页查询(第几页)
    rowsCount: 10,//分页查询(一页多少条数据)
    sign: {},//签到查询数据对象
    loaderSign: true,
    showView: false,//标记数据是否加载完毕
    searchText: null,//搜索文本
    isShowWindow: false,//弹窗
    changeValue: '',//选中的值
    items: [
      { name: '正常', value: '正常' },
      { name: '异常', value: '异常' },
    ]
  },
  //页面初始化时加载
  onLoad() {
    var that = this;
    dd.showLoading({
      content: '加载中...',
      delay: 100,
    });
    dd.httpRequest({
      url: 'http://39.96.30.233/zjp/constructionSite/findByCondition',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        page: that.data.page,
        rowsCount: that.data.rowsCount,
      }),
      dataType: 'json',
      success: function(res) {
        that.setData({
          sign: res.data.data,
        })
        if (res.data.data.length < that.data.rowsCount) {
          that.setData({
            page: 1,
            showView: true,//显示'已加载全部数据'
            loaderSign: false,
          });
        }
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
      url: 'http://39.96.30.233/zjp/constructionSite/findByCondition',
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
        if (res.data.data.length < that.data.rowsCount) {
          that.setData({
            page: 1,
            showView: true,//显示'已加载全部数据'
            loaderSign: false,
          });
        }
        that.setData({
          sign: res.data.data,
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
  //点击修改状态
  alter(e) {
    var that = this;
    this.setData({ isShowWindow: false, });
    // dd.httpRequest({
    //   url: 'http://39.96.30.233/zjp/constructionSite/deleteLarge',
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   data: JSON.stringify(new Array(e.currentTarget.dataset.id)),
    //   dataType: 'json',
    //   success: function(res) {
    //     var index = e.currentTarget.dataset.index;
    //     that.data.sign[index].createTime = "-1";
    //     that.setData({//啥也不做,只触发渲染就OK
    //       sign: that.data.sign,
    //     })
    //   }, fail: function(res) {
    //     console.log("错误:" + JSON.stringify(res));
    //   },
    //   complete: function(res) {
    //     dd.hideLoading();
    //   }
    // });
  },
  //流加载
  onReachBottom: function() {
    var that = this;
    if (this.data.loaderSign) {
      that.setData({
        page: that.data.page + 1
      })
      dd.httpRequest({
        url: 'http://39.96.30.233/zjp/constructionSite/findByCondition',
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
          if (res.data.data.length < that.data.rowsCount) {
            for (var i = 0; i < res.data.data.length; i++) {
              that.setData({
                sign: that.data.sign.concat(res.data.data[i]),
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
                sign: that.data.sign.concat(res.data.data[i]),
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

    } else {

    }

  },
  //隐藏弹窗
  hide() {
    this.setData({ isShowWindow: false, });
  },
  show(e) {
    this.setData({ isShowWindow: true, id: e.currentTarget.dataset.id, index: e.currentTarget.dataset.index });
  },
  //弹窗的确认\取消点击事件
  check(e) {
    var that = this;
    this.setData({ isShowWindow: false, });
    if (e.target.dataset.value != "no") {
      dd.alert({ content: '确认' + that.data.changeValue });
    } else {
      dd.alert({ content: '取消' });
    }
  },
  radioChange(e) {
    var that = this;
    that.setData({ changeValue: e.detail.value, });
  },
  datePicker() {
    dd.datePicker({
      format: 'yyyy-MM-dd',
      currentDate: '2012-12-12',
      success: (res) => {
        dd.showToast({ content: '请再选择结束时间', duration: 2000 });
        var startTime = res.date;
        dd.datePicker({
          format: 'yyyy-MM-dd',
          currentDate: '2012-12-12',
          success: (res) => {
            dd.alert({
              content: startTime + '-->' + res.date,
            });
          },
        });

      },
    });
  },
  //获取员工id 或 部门id(但获取不了子部门)
  getPeopleAndDepartment() {
    dd.complexChoose({
      title: "测试标题",            //标题
      multiple: true,            //是否多选
      limitTips: "超出了",          //超过限定人数返回提示
      maxUsers: 1000,            //最大可选人数
      pickedUsers: [],            //已选用户
      pickedDepartments: [],          //已选部门
      disabledUsers: [],            //不可选用户
      disabledDepartments: [],        //不可选部门
      requiredUsers: [],            //必选用户（不可取消选中状态）
      requiredDepartments: [],        //必选部门（不可取消选中状态）
      permissionType: "xxx",          //可添加权限校验，选人权限，目前只有GLOBAL这个参数
      responseUserOnly: false,        //返回人，或者返回人和部门
      success: function(res) {
        dd.alert({
          content: `选取的部门或人员信息:${JSON.stringify(res)}`,
        });
        /**
        {
            selectedCount:1,                              //选择人数
            users:[{"name":"","avatar":"","userId":""}]，//返回选人的列表，列表中的对象包含name（用户名），avatar（用户头像），userId（用户工号）三个字段
            departments:[{"id":,"name":"","count":}]//返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数）
        }
        */
      },
      fail: function(err) {
      }
    })
  },
  //获取签到异常记录
  getExceptions(){
    dd.showToast({ content: '获取签到异常记录', duration: 2000 });
  },
  //获取部门签到(可以获取子部门)
  getDepartment() {
    dd.chooseDepartments({
      title: "测试标题",            //标题
      multiple: true,            //是否多选
      limitTips: "超出了",          //超过限定人数返回提示
      maxDepartments: 100,            //最大选择部门数量
      pickedDepartments: [],          //已选部门
      disabledDepartments: [],        //不可选部门
      requiredDepartments: [],        //必选部门（不可取消选中状态）
      permissionType: "xxx",          //选人权限，目前只有GLOBAL这个参数
      success: function(res) {
        dd.alert({
          content: `选取的部门信息:${JSON.stringify(res)}`,
        });
        /**
        {
            userCount:1,                              //选择人数
            departmentsCount:1，//选择的部门数量
            departments:[{"id":,"name":"","number":}]//返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数）
        }
        */
      },
      fail: function(err) {
      }
    });
  },
  //打开与某个用户的聊天页面
   postMessage2(e) {
    dd.openChatByUserId({
      userId: '266301101526061205',//e.target.dataset.value, // 用户的工号
      success: res => {

      },
      fail: err => {
        dd.alert({
          content: `调用失败后返回数据:${JSON.stringify(err)}`,
        });
      }
    })
  },
  

});