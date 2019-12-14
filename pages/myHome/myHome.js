Page({
  data: {
    nickName:"",
    photo:"/image/nobody.png",
    array_bottom: [{
      url: '../../pages/myHome/myInformation/myInformation',
      src: '../images/myHomeWodexinxi.png',
      text: '我的信息',
    }, {
      url: '../../pages/myHome/changePassword/changePassword',
      src: '../images/myHomeMima.png',
      text: '密码修改',
    },],
  },
  onShow(){
    var that=this;
        dd.getStorage({
          key: 'user',
          success: function(res) {
            console.log(1)
            console.log(res.data.user.photo)
            that.setData({
              nickName:res.data.user.nickName,
            })
            if(res.data.user.photo!=null) { that.setData({  photo:'http://222.216.30.107:8080/sign/'+res.data.user.photo, }) } 
          },
          fail: function(res){
            dd.alert({content: res.errorMessage});
          },
      });
  },
  // out(){
  //   dd.httpRequest({
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       url: 'http://222.216.30.107:8080/sign/users/deleteSession',
  //       method: 'POST',
  //       dataType: 'json',
  //       success: function(res) {
  //         dd.reLaunch({
  //           url: '../login/login',
  //         })
  //       },
  //     });
  // }
});
