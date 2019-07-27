Page({
  data: {
    nickName:"",
    photo:"",
    array_bottom: [{
      url: '../../pages/myHome/myInformation/myInformation',
      src: '../../image/wo_my.png',
      text: '我的信息',
    }, {
      url: '../../pages/myHome/changePassword/changePassword',
      src: '../../image/wo_password.png',
      text: '密码修改',
    }, {
      url: '../../pages/approval/approval',
      src: '../../image/wo_approval.png',
      text: '我的审批\\审核',
    }],
  },
  onShow(){
    var that=this;
        dd.getStorage({
          key: 'user',
          success: function(res) {
            console.log(res)
            that.setData({
              nickName:res.data.user.nickName,
              photo:'http://localhost:8080/zjp/'+res.data.user.photo,
            })
          },
          fail: function(res){
            dd.alert({content: res.errorMessage});
          },
      });
  },
  out(){
    dd.httpRequest({
        headers: {
          "Content-Type": "application/json"
        },
        url: 'http://localhost:8080/zjp/users/deleteSession',
        method: 'POST',
        dataType: 'json',
        success: function(res) {
          dd.reLaunch({
            url: '../login/login',
          })
        },
      });
  }
});
