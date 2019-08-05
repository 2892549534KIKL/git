
Page({
  data: {
     background: [{color:'green',src:'/image/1.jpg'},{color:'red',src:'/image/1.jpg'},{color:'yellow',src:'/image/1.jpg'} ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    userID:"",
    title:[
      {title:'日报',index:0,array: [{
      src: '/image/dayPaperW.png',
      color: 'white',
      mode: 'center',
      text: '写日报'},{
      src: '/image/dayPaperR.png',
      color: 'white',
      mode: 'center',
      text: '查阅日报' }]},

      {title:'周报',index:1,array:[{
      src: '/image/weekPaperW.png',
      color: 'white',
      mode: 'center',
      text: '写周报' },{
      src: '/image/weekPaperR.png',
      color: 'white',
      mode: 'center',
      text: '查阅周报' }]},

      {title:'月报',index:1,array:[{
      src: '/image/monthPaperW.png',
      color: 'white',
      mode: 'center',
      text: '写月报' },{
      src: '/image/monthPaperR.png',
      color: 'white',
      mode: 'center',
      text: '查阅月报' }]},

    {title:'年报',index:1,array:[{
      src: '/image/yearPaperW.png',
      color: 'white',
      mode: 'center',
      text: '写年报' },{
      src: '/image/yearPaperR.png',
      color: 'white',
      mode: 'center',
      text: '查阅年报' }]}],
    src: './2.png'
  },
  onLoad() {
    var that = this;
     dd.getStorage({
        key: 'user',
        success: function(res) {
          that.data.userID=res.data.user.iD;
          var actorName=res.data.user.actorName;
          var approval='申请';
         if(actorName=='管理员'||actorName=='老板') approval='审批';
         that.setData({ 'title[2].array[0].text':'写月报'})
         console.log(actorName+approval);
          },
       fail: function(res){
            console.log({content: res.errorMessage});
         },
      });
    dd.httpRequest({
      url: 'http://39.96.30.233/zjp/approval/selectEChartsMap',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        userID: that.data.userID,
      }),
      dataType: 'json',
      success: function(res) {
        that.data.title[2].array[0].number= res.data[0].value;
        that.setData({
          title: that.data.title,
        })
      }, fail: function(res) {
        console.log("错误:" + res);
      },
      complete: function(res) {
        dd.hideLoading();
      }
    });
    dd.httpRequest({
      url: 'http://39.96.30.233/zjp/notice/getTotalByUserID',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        userID: that.data.userID,
        isComplete: '否',
      }),
      dataType: 'json',
      success: function(res) {
        if(res.data>0)
          that.data.title[4].array[0].number= res.data;
          console.log(that.data.title[4])
        that.setData({
          title: that.data.title,
        })
      }, fail: function(res) {
        console.log("错误:" + res);
      },
      complete: function(res) {
        dd.hideLoading();
      }
    });
  },
  upload(){
    console.log('正在执行文件上传')
    dd.chooseImage({
  count:1,
  success: (res) => {
    console.log(res);
      dd.uploadFile({
  url: 'http://47.98.38.78/fms/enclosure/addAttachmentData',
  fileType: 'image',
  fileName: 'files',
  filePath: res.filePaths[0],
  formData:{filesID:72},
  success: (res) => {
    console.log(res);
    console.log(123);
    dd.alert({ content: '更换成功'	});
  }})}})},
  jump(e) {
    var index = e.currentTarget.dataset['index'];
    var inde= e.currentTarget.dataset['inde'];
       console.log(index);
       console.log(inde);
    switch (inde) {
      case 0:
       index==0?dd.reLaunch({url: '../../pages/comeOut/comeOut'}):dd.reLaunch({url: '../../pages/department/index'});
        break;
      case 1:
        index==0?dd.reLaunch({url: '../../pages/comeOut/comeOut'}):dd.reLaunch({url: '../../pages/department/index'});
        break;
      case 2:
        index==0?dd.reLaunch({url: '../../pages/comeOut/comeOut'}):dd.reLaunch({url: '../../pages/department/index'});
        break;
      case 3:
        index==0?dd.reLaunch({url: '../../pages/comeOut/comeOut'}):dd.reLaunch({url: '../../pages/department/index'});
        break;
      default:
        dd.alert({
          content:'暂无地址跳转',
        })
        break;

    }

  },

})