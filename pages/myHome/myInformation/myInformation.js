Page({
  data: {
    iD:"",
    name:"",
    nickName:"",
    sex:"",
    status:"",
    photo:"",
    phone:"",
    checkedSex:"true",
    checkedStatus:"true",
    imagePath:"",
  },
  onLoad() {
    var that=this;
        dd.getStorage({
          key: 'user',
          success: function(res) {
            console.log(res)
            if(res.data.user.sex=="女")
              that.data.checkedSex=false;
            if(res.data.user.sex=="禁用")
              that.data.checkedStatus=false;
            that.setData({
              iD:res.data.user.iD,
              name:res.data.user.name,
              nickName:res.data.user.nickName,
              sex:res.data.user.sex,
              phone:res.data.user.phone,
              status:res.data.user.status,
              imagePath:'http://172.18.0.177:8080/zjp/'+res.data.user.photo,
              photo:'http://172.18.0.177:8080/zjp/'+res.data.user.photo,
            })
          },
          fail: function(res){
            dd.alert({content: res.errorMessage});
          },
      });
  },
  onSubmit(e) {
    var that=this;
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
      dd.hideLoading();
      console.log(that.data.imagePath);
       dd.uploadFile({
          header: {  
            "Content-Type": "multipart/form-data"  
          },
          url: 'http://172.18.0.177:8080/zjp/users/editData',
          fileType: 'image',
          fileName: 'enclosure.files',
          filePath: that.data.imagePath,
          formData: JSON.stringify({
             iD:that.data.iD,
             name: e.detail.value.name,
             nickName: e.detail.value.nickName,
             phone: e.detail.value.phone,
             sex: e.detail.value.sex,
             status: e.detail.value.status,
        }),
          success: res => {
            dd.alert({ title: `上传成功：${JSON.stringify(res)}` });
          },
          fail: function(res) {
            dd.alert({ title: `上传失败：${JSON.stringify(res)}` });
          },
        });
      // dd.httpRequest({
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   url: 'http://172.18.0.177:8080/zjp/users/editUser',
      //   method: 'POST',
      //   data: JSON.stringify({
      //        iD:that.data.iD,
      //        name: e.detail.value.name,
      //        nickName: e.detail.value.nickName,
      //        phone: e.detail.value.phone,
      //        sex: e.detail.value.sex,
      //        status: e.detail.value.status,
      //   }),
      //   dataType: 'json',
      //   success: function(res) {
      //     console.log(res);
      //     if (res.data.code > 0) {
      //               dd.setStorage({
      //                 key: 'user',
      //                 data: {
      //                   user: res.data.data
      //                 }
      //               });
      //               dd.showToast({ content: '个人信息修改成功', duration: 2000 });
      //     } else {
      //               dd.showToast({ content: '个人信息修改失败', duration: 2000 });
      //           }
      //   },
      // });
    });
  },
  //图片上传
  uploadFile() {
    var that=this;
    dd.chooseImage({
      sourceType: ['camera', 'album'],
      count: 1,
      success: res => {
        const path = (res.filePaths && res.filePaths[0]) || (res.apFilePaths && res.apFilePaths[0]);
        that.setData({
              imagePath:path,
            })
      },
    });
  },
});
