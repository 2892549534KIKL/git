Page({
  onLoad() {
    dd.showLoading({
      content: '免登中...',
    });
    var that = this;
    //1:获取token
    dd.httpRequest({
      url: 'http://172.16.103.20:8080/sign/DD_API/getAccess_token',
      method: 'get',
      dataType: 'json',
      success: function(res) {
        console.log('token:' + JSON.stringify(res.data));
        that.setData({
          access_token: res.data,
        })
        // console.log('获取成功token' + that.data.access_token);
        //2 获取authCode
        dd.getAuthCode({
          success: function(res) {
            that.setData({
              authCode: res.authCode,
            })
            // console.log('获取成功authCode' + that.data.authCode);
            //3:获取用户id等信息
            dd.httpRequest({
              headers: {
                "Content-Type": "application/string"
              },
              url: 'http://172.16.103.20:8080/sign/DD_API/getDDUser',
              method: 'POST',
              data: (that.data.authCode),
              success: function(res) {
                // console.log('userid:' + JSON.parse(res.data).userid);
                that.setData({
                  userid: JSON.parse(res.data).userid,
                  userName: JSON.parse(res.data).name,
                })
                console.log('获取成功userid' + that.data.userid);
                //获取后查询是否此钉钉id是否已绑定账号
                dd.httpRequest({
                  headers: {
                    "Content-Type": "application/json"
                  },
                  url: 'http://172.16.103.20:8080/sign/users/findByDdUserId',
                  method: 'POST',
                  data: (
                    that.data.userid
                  ),
                  dataType: 'json',
                  success: function(res) {
                    console.log('登录后数据:' + JSON.stringify(res.data.data));
                    //已绑定账号
                    if (res.data.code > 0) {
                      dd.setStorage({
                        key: 'user',
                        data: {
                          user: res.data.data,
                        }
                      });
                      dd.switchTab({
                        url: '../index/index',
                      })
                    }
                    //未绑定账号
                    else {
                      dd.alert({ content: JSON.stringify(res.data.msg) + ",请先绑定哦" });
                    }
                  }, complete: function(res) {
                    dd.hideLoading();
                  }
                });
              }
            })
          },
          fail: function(err) {
          }
        });
      }, fail: function(err) {
        console.log('token:' + JSON.stringify(err));
      }
    })
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/myAudit/myAudit',
    };
  },
  data: {
    access_token: null,
    authCode: null,
    userid: null,//用户id
    userName: null,//用户钉钉名称
  },
  // 表单提交
  onSubmit(e) {
    var that = this;

    if (e.detail.value.name == "") {
      dd.showToast({ content: '请输入账号', duration: 2000 });
      return;
    } else if (e.detail.value.password == "") {
      dd.showToast({
        content: '请输入密码',
        duration: 2000,
      });
      return;
    }
    setTimeout(() => {
      dd.showLoading({
        content: '加载中...',
        delay: 100,
      });
      dd.httpRequest({
        headers: {
          "Content-Type": "application/json"
        },
        url: 'http://172.16.103.20:8080/sign/users/login',
        method: 'POST',
        data: JSON.stringify({
          name: e.detail.value.name,
          password: e.detail.value.password,
          ddUserId: that.data.userid,
        }),
        dataType: 'json',
        success: function(res) {
          if (res.data.code > 0) {
            dd.setStorage({
              key: 'user',
              data: {
                user: res.data.data
              }
            });
            dd.hideLoading();
            dd.switchTab({
              url: '../index/index',
            })
          }
          else {
            dd.hideLoading();
            dd.showToast({ content: res.data.msg, duration: 3000, });
          }
        },
      });
      //   dd.getStorage({
      //     key: 'user',
      //     success: function(res) {
      //       console.log(res)
      //       dd.alert({content: '获取成功：' + res.data.user.actorName});
      //     },
      //     fail: function(res){
      //       dd.alert({content: res.errorMessage});
      //     },
      // });
    });
  },
  // 跳转页面
  // navigate(e) {
  //   const { url, openType = 'navigateTo' } = e.currentTarget.dataset;
  //   my[openType]({ url });
  // },
  //  loginSucceed(e){
  //   dd.reLaunch({
  //     url: '../../pages/myAudit/myAudit',
  //   });
  // }

});
