Page({
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/myAudit/myAudit',
    };
  },
  data: {},
  // 表单提交
  onSubmit(e) {
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
    console.log(11)
    setTimeout(() => {
      dd.hideLoading();
      // dd.alert({
      //   content: `数据：${JSON.stringify(e.detail.value)}`,
      // });
      dd.httpRequest({
        headers: {
          "Content-Type": "application/json"
        },
        url: 'http://172.18.0.177:8080/zjp/users/login',
        method: 'POST',
        data: JSON.stringify({
            name: e.detail.value.name,
             password: e.detail.value.password,
        }),
        dataType: 'json',
        success: function(res) {
          console.log(res);
          if (res.data.code > 0) {
                    dd.setStorage({
                      key: 'user',
                      data: {
                        user: res.data.data
                      }
                    });
                  dd.switchTab({
                    url: '../index/index',
                  })
          } else {
                    dd.showToast({content: res.data.msg,duration: 3000,});
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
