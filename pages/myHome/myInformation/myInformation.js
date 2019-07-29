Page({
  data: {
    iD: "",
    name: "",
    nickName: "",
    sex: "",
    status: "",
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
          iD: res.data.user.iD,
          name: res.data.user.name,
          nickName: res.data.user.nickName,
          sex: res.data.user.sex,
          phone: res.data.user.phone,
          status: res.data.user.status,
          imagePath: 'http://172.18.0.177:8080/zjp/' + res.data.user.photo,
          photo: 'http://172.18.0.177:8080/zjp/' + res.data.user.photo,
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
      if(that.data.photo==that.data.imagePath){
        dd.httpRequest({
        headers: {
          "Content-Type": "application/json"
        },
        url: 'http://172.18.0.177:8080/zjp/users/editUsers',
        method: 'POST',
        data: JSON.stringify({
          iD: that.data.iD,
          name: e.detail.value.name,
          nickName: e.detail.value.nickName,
          phone: e.detail.value.phone,
          sex: e.detail.value.sex,
          status: e.detail.value.status,
        }),
        dataType: 'json',
        success: function(res) {
          dd.showToast({ content: '修改成功', duration: 2000 });
          res.data.data.photo=that.data.photoc;
          console.log(res)
          if (res.data.code > 0) {
             dd.setStorage({
              key: 'user',
              data: {
                 user: res.data.data
              }
              });
              dd.hideLoading();
          } 
          else {
            dd.showToast({ content: '修改失败', duration: 2000 });
            dd.hideLoading();
            dd.showToast({content: res.data.msg,duration: 3000,});
          }
        },
      });
      }
      else{
        dd.uploadFile({
        header: {
          "Content-Type": "multipart/form-data"
        },
        method: 'POST',
        url: 'http://172.18.0.177:8080/zjp/users/editUser',
        fileType: 'image',
        fileName: 'enclosure.files',
        filePath: that.data.imagePath,
        dataType: 'json',
        formData: {
          iD: that.data.iD,
          name: e.detail.value.name,
          nickName: e.detail.value.nickName,
          phone: e.detail.value.phone,
          sex: e.detail.value.sex,
          status: e.detail.value.status,
          'enclosure.photo':that.data.photoc
        },
        success: res => {
        dd.showToast({ content: '修改成功', duration: 2000 });
        // var obj = JSON.parse(res.data);
        //  dd.setStorage({
        //       key: 'user',
        //       data: {
        //          user: obj.data
        //       }
        //   });
        dd.httpRequest({
          headers: {
            "Content-Type": "application/json"
          },
          url: 'http://172.18.0.177:8080/zjp/users/deleteSession',
          method: 'POST',
          dataType: 'json',
          success: function(res) {
            dd.reLaunch({
              url: '../../login/login',
            })
          },
        });
        },
        fail: function(res) {
          dd.showToast({ content: '修改失败', duration: 2000 });
           console.log('上传失败');
        },
        complete: function(res) {
          dd.hideLoading();
        }
      });
      }
    });
  },
  //图片上传
  uploadFile() {
    var that = this;
    dd.chooseImage({
      sourceType: ['camera', 'album'],
      count: 1,
      success: res => {
        const path = (res.filePaths && res.filePaths[0]) || (res.apFilePaths && res.apFilePaths[0]);
        that.setData({
          imagePath: path,
        })
        console.log("updataImg:" + that.data.imagePath);

      },

    });
  },
});
