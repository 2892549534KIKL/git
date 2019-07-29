Page({
  data: {
    iD:"",
  },
  onLoad() {
    var that=this;
    dd.getStorage({
          key: 'user',
          success: function(res) {
            that.setData({
              iD:res.data.user.iD,
            })
          },
          fail: function(res){
            dd.alert({content: res.errorMessage});
          },
      });
  },
  onSubmit(e) {
    var that=this;
    if (e.detail.value.oldPassword == "") {
      dd.showToast({ content: '请输入旧密码', duration: 2000 });
      return;
    } else if (e.detail.value.password == "") {
      dd.showToast({
        content: '请输入新密码',
        duration: 2000,
      });
      return;
    } else if (e.detail.value.conpassword == "") {
      dd.showToast({
        content: '请输入确认密码',
        duration: 2000,
      });
      return;
    } else if (e.detail.value.conpassword != e.detail.value.password) {
      dd.showToast({
        content: '确认密码与新密码不一致',
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
        url: 'http://39.96.30.233/zjp/users/editPass',
        method: 'POST',
        data: JSON.stringify({
             iD:that.data.iD,
             oldPassword: e.detail.value.oldPassword,
             password: e.detail.value.conpassword,
        }),
        dataType: 'json',
        success: function(res) {
          dd.hideLoading();
          if (res.data!="") {
                    if(res.data.oldPassword=="不正确"){
                      dd.showToast({ content: '旧密码不正确，请重新输入', duration: 2000 });
                      return;
                    }
                    else{
                      dd.showToast({ content: '恭喜，密码修改成功', duration: 2000 });
                      dd.httpRequest({
                        headers: {
                          "Content-Type": "application/json"
                        },
                        url: 'http://39.96.30.233/zjp/users/deleteSession',
                        method: 'POST',
                        dataType: 'json',
                        success: function(res) {
                          dd.reLaunch({
                            url: '../login/login',
                          })
                        },
                      });
                      dd.reLaunch({
                        url: '../../login/login',
                      })
                    }
          } else {
                    dd.showToast({ content: '抱谦，密码修改失败', duration: 2000 });
                }
        },
      });
    });
  },
});

