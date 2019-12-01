Page({
  data: {
    user:"",
    iD: "",
    name: "",
    nickName: "",
    sex: "",
    photo: "",
    photoc: "",
    phone: "",
    checkedSex: "true",
    checkedStatus: "true",
    imagePath: "",
  },
  onLoad() {
    var that = this;
    dd.getStorage({
      key: 'user',
      success: function(res) {
        console.log(res)
        if (res.data.user.sex == "女")
          that.data.checkedSex = false;
        if (res.data.user.sex == "禁用")
          that.data.checkedStatus = false;
        that.setData({
          user:res.data,
          iD: res.data.user.iD,
          name: res.data.user.name,
          nickName: res.data.user.nickName,
          sex: res.data.user.sex,
          phone: res.data.user.phone,
          imagePath: 'http://localhost:8081/sign/' + res.data.user.photo,
          photo: 'http://localhost:8081/sign/' + res.data.user.photo,
          photoc: res.data.user.photo,
        })
      },
      fail: function(res) {
        dd.alert({ content: res.errorMessage });
      },
    });
  },
  onSubmit(e) {
    var that = this;
    if (e.detail.value.name == "") {
      dd.showToast({ content: '请输入账号', duration: 2000 });
      return;
    } else if (e.detail.value.nickName == "") {
      dd.showToast({
        content: '请输入姓名',
        duration: 2000,
      });
      return;
    } else if (e.detail.value.phone == "") {
      dd.showToast({
        content: '请输入联系电话',
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
        url: 'http://localhost:8081/sign/users/editUsers',
        method: 'POST',
        data: JSON.stringify({
          iD: that.data.iD,
          name: e.detail.value.name,
          nickName: e.detail.value.nickName,
          phone: e.detail.value.phone,
          sex: e.detail.value.sex,
        }),
        dataType: 'json',
        success: function(res) {
          that.data.user.name=e.detail.value.name;
          that.data.user.nickName=e.detail.value.nickName;
          that.data.user.phone=e.detail.value.phone;
          that.data.user.sex=e.detail.value.sex;
          that.data.user.status=e.detail.value.status;
          dd.showToast({ content: '修改成功', duration: 2000 });
          if (res.data.code > 0) {
             dd.setStorage({
              key: 'user',
              data: {
                 user: that.data.user
              }
              });
        
          } 
          else {
            dd.showToast({ content: '修改失败', duration: 2000 });
       
            dd.showToast({content: res.data.msg,duration: 3000,});
          }
        }
      });
    });
  },
});
