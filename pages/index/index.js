
Page({
  data: {
     background: [{color:'green',src:'/image/1.jpg'},{color:'red',src:'/image/2.jpg'},{color:'yellow',src:'/image/4.jpg'} ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    userID:"",
    title:[{title:'出入库',index:0,array: [{
      src: '/image/outInData.png',
      color: 'white',
      mode: 'center',
      text: '出入库数据'
     },{
      src: '/image/InScan.png',
      color: 'white',
      mode: 'center',
      text: '扫码入库' },{
      src: '/image/outScan.png',
      color: 'white',
      mode: 'center',
      text: '扫码出库' }]},
      {title:'使用或报销',index:1,array:[{
      src: '/image/use.png',
      color: 'white',
      mode: 'center',
      text: '扫码使用' },{
      src: '/image/expense.png',
      color: 'white',
      mode: 'center',
      text: '扫码报销' }
      ]},
      {title:'申请/审批',index:2,array:[{
      src: '/image/approval.png',
      color: 'white',
      mode: 'center',
      text: '申请/审批' }]},
      {title:'施工管理',index:3,array:[{
      src: '/image/construction.png',
      color: 'white',
      mode: 'center',
      text: '施工管理'}]},
      {title:'通知',index:4,array:[{
      src: '/image/notice.png',
      color: 'white',
      mode: 'center',
      text: '通知' }]}],
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
         that.setData({ 'title[2].array[0].text':approval})
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
       index==0?dd.reLaunch({url: '../../pages/comeOut/comeOut'}):index==1?dd.navigateTo({url: '../../pages/ComeOutIndex/ComeOutIndex'}):dd.navigateTo({url: '../../pages/ComeOutIndex/out/out'});
        break;
      case 1:
        index==0?dd.navigateTo({ url: '../../pages/useReimburseIndex/personOut/personOut'}):dd.navigateTo({ url: '../../pages/useReimburseIndex/return/return'});
        break;
      case 2:
        dd.navigateTo({url: '../../pages/approval/approval'});
        break;
      case 3:
        dd.reLaunch({ url: '../../pages/construction/construction', })
        break;
      case 4:
           dd.navigateTo({   url: '../../pages/InformInfo/InformInfo',  });
        break;
      default:
        dd.alert({
          content:'暂无地址跳转',
        })
        break;

    }

  },

})