Page({
  onLoad() {
    dd.showLoading({
      content: '免登中...',
    });
    var that = this;
    //1:获取token
    dd.httpRequest({
      url: 'http://39.96.30.233/zjp/BusinessReport_DD_API/getAccess_token',
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
              url: 'http://39.96.30.233/zjp/BusinessReport_DD_API/getDDUser',
              method: 'POST',
              data: (that.data.authCode),
              success: function(res) {
                // console.log('userid:' + JSON.parse(res.data).userid);
                that.setData({
                  userid: JSON.parse(res.data).userid,
                  userName: JSON.parse(res.data).name,
                })
                if (that.data.userid == undefined) {
                  dd.alert({
                    content: "免登失败,请登陆后重试"
                  })
                }else{
                  dd.navigateTo({ url: '../index/index' });
                }
                dd.hideLoading();
                console.log('获取成功userid:  ' + that.data.userid);
              }
            })
          },
          fail: function(err) {
            dd.hideLoading();
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

});
