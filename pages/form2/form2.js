
Page({
  data: {
    value:'',
  },
  onSubmit(e) {
    dd.alert({
      content: `数据：${JSON.stringify(e.detail.value)}`,
    });
  },
  onReset() {

  }, 
  onChange(e) {
    console.log(e.detail.value);
    this.setData({
      value: e.detail.value,
    });
  },
  datePicker() {
    dd.datePicker({
      currentDate: '2016-10-10',
      startDate: '2016-10-9',
      endDate: '2017-10-9',
      success: (res) => {
        dd.alert({
          title: 'datePicker response: ' + JSON.stringify(res)
        });
      },
    });
  },
  datePickerHMS() {
    dd.datePicker({
      format: 'HH:mm:ss',
      currentDate: '12:12:12',
      startDate: '11:11:11',
      endDate: '13:13:13',
      success: (res) => {
        dd.alert({
          title: 'datePicker response: ' + JSON.stringify(res)
        });
      },
    });
  },
  datePickerYMDHMS() {
    dd.datePicker({
      format: 'yyyy-MM-dd HH:mm:ss',
      currentDate: '2012-01-09 11:11:11',
      startDate: '2012-01-01 11:11:11',
      endDate: '2012-01-10 11:11:11',
      success: (res) => {
        dd.alert({
          title: 'datePicker response: ' + JSON.stringify(res)
        });
      },
    });
  },
  showActionSheet() {
    dd.showActionSheet({
      title: '钉钉-ActionSheet',
      items: ['菜单一', '菜单二', '菜单三'],
      cancelButtonText: '取消好了',
      success: (res) => {
        const btn = res.index === -1 ? '取消' : '第' + res.index + '个';
        dd.alert({
          title: `你点了${btn}按钮`
        });
      },
    });
  },
  //图片上传
  uploadFile() {
    dd.chooseImage({
      sourceType: ['camera', 'album'],
      count: 1,
      success: res => {
        const path = (res.filePaths && res.filePaths[0]) || (res.apFilePaths && res.apFilePaths[0]);

        dd.alert({ content: `内容：${path}` });
        dd.uploadFile({
          url: 'http://httpbin.org/post',
          fileType: 'image',
          fileName: 'file',
          filePath: path,
          success: res => {
            dd.alert({ title: `上传成功：${JSON.stringify(res)}` });
          },
          fail: function(res) {
            dd.alert({ title: `上传失败：${JSON.stringify(res)}` });
          },
        });
      },
    });
  },
  //上传附件
  test(){
    dd.chooseFile({
      count:1,
      type:'file',
      success(res){
        console.log("上传数据:"+res);
      }
    })
  }
});
