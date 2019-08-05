Page({
  data: {
    nickName:"",
    photo:"/image/nobody.png",
    array_bottom: [{
      url: '../../pages/myHome/myInformation/myInformation',
      src: '../../image/alreadyRead.png',
      text: '今日已待阅日报6',
    },{
      url: '../../pages/myHome/myInformation/myInformation',
      src: '../../image/notRead.png',
      text: '今日待阅日报8',
    },{
      url: '../../pages/myHome/myInformation/myInformation',
      src: '../../image/myHomeWodexinxi.png',
      text: '我的信息',
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
            if(res.data.user.photo!=null) { that.setData({  photo:'http://39.96.30.233/zjp/'+res.data.user.photo, }) } 
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
        url: 'http://39.96.30.233/zjp/users/deleteSession',
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
