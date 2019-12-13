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
    date: null,//开始时间
    dateEnd: null,//结束时间
    list: null,
    items: [
      { name: '归属范围内签到', value: '归属范围内签到', checked: false },
      { name: '超出归属地签到', value: '超出归属地签到', checked: false },
      { name: '超出省范围签到', value: '超出省范围签到', checked: false },
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
      url: 'http://192.168.137.240:8080/sign/signin/findByConditionTwo',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        page: that.data.page,
        rowsCount: that.data.rowsCount,
        sort: '倒序',
      }),
      dataType: 'json',
      success: function (res) {
        console.log(res);
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
      }, fail: function (res) {
        console.log(res);
        dd.alert({ content: '无法连接数据,请稍后重试' });
        console.log("错误:" + res);
      },
      complete: function (res) {
        dd.hideLoading();
      }
    });
  },
  //获取今天
  today() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    var nowDate = year + '-' + month + '-' + day;
    return nowDate;
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
      url: 'http://192.168.137.240:8080/sign/signin/findByConditionTwo',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        page: that.data.page,
        rowsCount: that.data.rowsCount,
        projectCondition: that.data.searchText,
        date: that.data.date,
        dateEnd: that.data.dateEnd,
        list: that.data.list,
        sort: '倒序',
      }),
      dataType: 'json',
      success: function (res) {
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
      }, fail: function (res) {
        dd.alert({ content: '无法连接数据,请稍后重试' });
        console.log("错误:" + res);
      },
      complete: function (res) {
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
  onReachBottom: function () {
    var that = this;
    if (this.data.loaderSign) {
      that.setData({
        page: that.data.page + 1
      })
      dd.httpRequest({
        url: 'http://192.168.137.240:8080/sign/signin/findByConditionTwo',
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify({
          page: that.data.page,
          rowsCount: that.data.rowsCount,
          projectCondition: that.data.searchText,
          date: that.data.date,
          dateEnd: that.data.dateEnd,
          list: that.data.list,
          sort: '倒序',
        }),
        dataType: 'json',
        success: function (res) {
          //如果没查到数据就重置page页码
          if (res.data.data.length < that.data.rowsCount) {
            console.log("结束")
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
        }, fail: function (res) {
          dd.alert({ content: '无法连接数据,请稍后重试' });
          console.log("错误:" + res);
        },
        complete: function (res) {
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
    for (var i = 0; i < this.data.items.length; i++) {
      this.data.items[i].checked = false;
      if (this.data.items[i].name == e.currentTarget.dataset.type) {
        this.data.items[i].checked = true;
      }
    }
    this.setData({ isShowWindow: true, id: e.currentTarget.dataset.id, index: e.currentTarget.dataset.index, changeValue: e.currentTarget.dataset.type, items: this.data.items });
  },
  //弹窗的确认\取消点击事件
  check(e) {
    var that = this;
    this.setData({ isShowWindow: false, });
    if (e.target.dataset.value != "no") {
      dd.httpRequest({
        url: 'http://192.168.137.240:8080/sign/signin/edit',
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify({
          id: that.data.id,
          type: that.data.changeValue
        }),
        dataType: 'json',
        success: function (res) {
          that.data.sign[that.data.index].type = that.data.changeValue;
          that.setData({ sign: that.data.sign })
        }
      });
    } else {
      // dd.alert({ content: '取消' });
    }
  },
  radioChange(e) {
    var that = this;
    that.setData({ changeValue: e.detail.value, });
  },
  datePicker() {
    var that = this;
    dd.datePicker({
      format: 'yyyy-MM-dd',
      currentDate: that.today(),
      success: (res) => {
        if (res.date != null) {
          dd.showToast({ content: '请再选择结束时间', duration: 2000 });
          var startTime = res.date;
          dd.datePicker({
            format: 'yyyy-MM-dd',
            currentDate: that.today(),
            success: (res) => {
              that.setData({ date: startTime, dateEnd: res.date });
              that.search();
            },
          });
        }
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
      success: function (res) {
        console.log(res)
        /**
        {
            selectedCount:1,                              //选择人数
            users:[{"name":"","avatar":"","userId":""}]，//返回选人的列表，列表中的对象包含name（用户名），avatar（用户头像），userId（用户工号）三个字段
            departments:[{"id":,"name":"","count":}]//返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数）
        }
        */
      },
      fail: function (err) {
      }
    })
  },
  //获取签到异常记录
  getExceptions() {
    dd.showToast({ content: '获取签到异常记录', duration: 2000 });
  },
  //获取部门签到(可以获取子部门)
  getDepartment() {
    var that = this;
    dd.chooseDepartments({
      title: "测试标题",            //标题
      multiple: true,            //是否多选
      limitTips: "超出了",          //超过限定人数返回提示
      maxDepartments: 100,            //最大选择部门数量
      pickedDepartments: [],          //已选部门
      disabledDepartments: [],        //不可选部门
      requiredDepartments: [],        //必选部门（不可取消选中状态）
      permissionType: "xxx",          //选人权限，目前只有GLOBAL这个参数
      success: function (res) {
        console.log(res);
        var list = [];
        for (var i = 0; i < res.departmentsCount; i++) {
          if (res.departments[i].id == -1) list[i] = 1;
          else list[i] = res.departments[i].id;
        }
        if (list[0] != 1) that.setData({ list: list });;
        that.search();
        /**
        {
            userCount:1,                              //选择人数
            departmentsCount:1，//选择的部门数量
            departments:[{"id":,"name":"","number":}]//返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数）
        }
        */
      },
      fail: function (err) {
      }
    });
  },
  //打开与某个用户的聊天页面
  postMessage2(e) {
    var that = this;
    if (that.data.isShowWindow) {
      return;
    }
    dd.openChatByUserId({
      userId: e.target.dataset.id, // 用户的工号
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