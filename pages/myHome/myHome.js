Page({
  data: {
    nickName:"",
    photo:"",
    array_bottom: [{
      url: '../../pages/myHome/myInformation/myInformation',
      src: '../images/comeOut.png',
      text: '我的信息',
    }, {
      url: '../../pages/myHome/changePassword/changePassword',
      src: '../images/comeOut.png',
      text: '密码修改',
    }, {
      url: '../../pages/approval/approval',
      src: '../images/comeOut.png',
      text: '我的审批\\审核',
    }],
  },
  onLoad() {
    var that=this;
        dd.getStorage({
          key: 'user',
          success: function(res) {
            console.log(res)
            that.setData({
              nickName:res.data.user.nickName,
              photo:'http://172.18.0.177:8080/zjp/'+res.data.user.photo,
            })
          },
          fail: function(res){
            dd.alert({content: res.errorMessage});
          },
      });
  },
  out(){
    dd.reLaunch({
                    url: '../../login/login',
                  })
  }
});
