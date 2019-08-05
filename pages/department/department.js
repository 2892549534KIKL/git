
Page({
  data: {
    page: 1,//分页查询(第几页)
    rowsCount: 10,//分页查询(一页多少条数据)
    startDate:'',
    endDate:'',
    comeOutData: [{name:'骆佳明',createTime:'2019-08-02 17:20:00',logType:'日报'},{name:'闵雄文',createTime:'2019-08-01 19:20:00',logType:'周报'}
    ,{name:'朱冰晔',createTime:'2019-08-02 17:20:00',logType:'月报'},{name:'游旺',createTime:'2019-08-01 19:20:00',logType:'年报'}],
    loaderSign: true,
    showView: false,//标记数据是否加载完毕
    searchText: "",//搜索文本
      title:'音乐',
    src:'http://music.163.com/song/media/outer/url?id=317151.mp3',
        coverImgUrl:'https://s3.music.126.net/m/s/img/disc_default.png?7c9b3adc16f5485c2bfbe8a540534188',
  },
  //页面初始化时加载
  onLoad() {

        // this.department();
    var that = this;
    dd.showLoading({
      content: '加载中...',
      delay: 100,
    });
    // dd.httpRequest({
    //   url: 'http://39.96.30.233/zjp/product/findByCondition',
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   data: JSON.stringify({
    //     page: that.data.page,
    //     rowsCount: that.data.rowsCount,
    //     condition: that.data.searchText,
    //   }),
    //   dataType: 'json',
    //   success: function(res) {
    //     if (res.data.data.length < that.data.rowsCount) {
    //       that.setData({
    //         page: 1,
    //         showView: true,//显示'已加载全部数据'
    //         loaderSign: false,
    //       });
    //     }
    //     that.setData({
    //       comeOutData: res.data.data,
    //     })
    //   }, fail: function(res) {
    //     dd.alert({ content: '无法连接数据,请查看控制台' });
    //     console.log("错误:" + res);
    //   },
    //   complete: function(res) {
        dd.hideLoading();
    //   }
    // });
  },
  //查询搜索的接口方法
  search() {
    var that = this;
     dd.showLoading({
      content: '加载中...',
      delay: 100,
    });
     that.setData({
      page: 1,
      showView: false,//显示'已加载全部数据'
      loaderSign: true,
    })
    dd.httpRequest({
      url: 'http://39.96.30.233/zjp/product/findByCondition',
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
  logRead(){
    dd.navigateTo({ url: '../../pages/logShow/index' });
    // console.log(123);
    //     dd.reLaunch({url: '../../pages/logShow/index'});
  },
  //点击删除
  del(e) {
    console.log(e.currentTarget.dataset.id);
    var that = this;
    dd.httpRequest({
      url: 'http://39.96.30.233/zjp/product/deleteLarge',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify(new Array(e.currentTarget.dataset.id)),
      dataType: 'json',
      success: function(res) {
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
        // dd.hideLoading();
      }
    });
  },
  selectDate(e){
    console.log(e.target.id);
    console.log(e);
    dd.datePicker({
  format: 'yyyy-MM-dd',
  currentDate: '2019-08-04',
  success: (res) => {
  if(e.target.id=='0') this.setData({ 'startDate':res.date })
   else  {
     var startDate=new Date(this.data.startDate).getTime();
     var endDate=new Date(res.date).getTime();
     if(startDate<endDate) this.setData({ 'endDate':res.date }) 
     else dd.alert({content: '结束时间不能早于或等于开始时间',});
     } 
  },
  
});
  },
  //流加载   
  onReachBottom: function() {
    var that = this;
    if (this.data.loaderSign) {
      dd.showLoading({
      content: '加载中...',
      delay: 100,
    });
      that.setData({
        page: that.data.page + 1
      })
      dd.httpRequest({
        url: 'http://39.96.30.233/zjp/product/findByCondition',
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
                comeOutData: that.data.comeOutData.concat(res.data.data[i]),
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
                comeOutData: that.data.comeOutData.concat(res.data.data[i]),
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
      department(){  dd.complexChoose({
    title:"测试标题",            //标题
    multiple:true,            //是否多选
    limitTips:"超出了",          //超过限定人数返回提示
    maxUsers:1000,            //最大可选人数
    pickedUsers:[],            //已选用户
    pickedDepartments:[],          //已选部门
    disabledUsers:[],            //不可选用户
    disabledDepartments:[],        //不可选部门
    requiredUsers:[],            //必选用户（不可取消选中状态）
    requiredDepartments:[],        //必选部门（不可取消选中状态）
    permissionType:"GLOBAL",          //可添加权限校验，选人权限，目前只有GLOBAL这个参数
    responseUserOnly:false,        //返回人，或者返回人和部门
    success:function(res){
      console.log(res);
        /**
        {
            selectedCount:1,                              //选择人数
            users:[{"name":"","avatar":"","userId":""}]，//返回选人的列表，列表中的对象包含name（用户名），avatar（用户头像），userId（用户工号）三个字段
            departments:[{"id":,"name":"","count":}]//返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数）
        }
        */    
    },
    fail:function(err){
    }
})},
});
