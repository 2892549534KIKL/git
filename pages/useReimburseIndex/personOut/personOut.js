Page({
  data: {
    arrayList:[],
    constructionSiteList: ["请选择"],
    constructionSiteObject: {},
    index: 0,
    userProduct:{
    id:"",
    name:"",//名称
    barcode:"",//条形码
    qrcode:"",//二维码
    unit:"",//物料的单位
    number:0,//数量
    surplus:0,//剩余量
    userID:"",//入库人的id
    userName:"",//归属人的姓名
    supplier:"",//供应商
    createTime:"",//创建时间
    storeHouse:"",//仓库id
    constructionsiteID:"",
    }
  },
  onLoad() {
    let that = this;
    dd.httpRequest({
      headers: {
        "Content-Type": "application/json"
      },
      url: 'http://172.18.0.177:8080/zjp/constructionSite/findAll',
      method: 'POST',
      dataType: 'json',
      success: function(res) {
        dd.setStorage({
          key: 'constructionSite',
          data: {
            object: res.data.data,
            index: 0//
          },
          success: function() {
            var shnl = JSON.parse(JSON.stringify(res.data.data));
            for(let i = 0;i<res.data.count;i++){
              shnl[i] = shnl[i].name;
            }

            that.setData({
              constructionSiteObject: res.data.data,
              constructionSiteList:shnl,
              index: 0,
            });
          }
        });
      },
    });
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  bindPickerChange(e) {
    let that = this;
    dd.setStorage({
      key: 'constructionSite',
      data: {
        object: that.data.constructionSiteObject,//仓库对象
        index: e.detail.value
      },
      success: function() {
      }
    });
    this.setData({
      index: e.detail.value,
    });
  },
  saoMa(){
    var i=0;
    var barcode='userProduct.barcode';
    dd.scan({
      type: 'qr',
      success: (res) => {
        this.setData({
          [barcode]: res.code,
        })
      var that = this;
      dd.httpRequest({
        headers: {
          "Content-Type": "application/json"
        },
        url: 'http://172.18.0.177:8080/zjp/userProduct/findByBarcode',
        method: 'POST',
        data:JSON.stringify({
            barcode:this.data.userProduct.barcode,//查询条件barcode
        }),
        dataType: 'json', 
        success: function(res) {
          // console.log(res);
          if(res.data==""||res.data==null)
          {
            dd.alert({content: '不存在此物品'});
          }
          else{
            if(res.data.userID!=1507)
            {
              dd.alert({content: '不是你的' + res.data.userName});
            }
            else if(res.data.userID==1507)
            {
              for(i=0;i<that.data.arrayList.length;i++)
              {
                if(that.data.arrayList[i].barcode==res.data.barcode)
                {
                  dd.alert({content: '已经存在' + res.data.name});
                  i=-1;
                  break;
              }
            }
            if(i!=-1)
            {
              that.setData({
                arrayList:that.data.arrayList.concat(res.data),
              })
            }
          }}
        },
      });
      },
    });
  },
  up:function(e){
    var x=0;
    var that = this;
    if(that.data.arrayList.length<=0)
    {
      dd.alert({content:':没有可以提交的物品'});
       return;
    }
    for(var i in e.detail.value)
    {
      if(e.detail.value[i]<0||that.data.arrayList[x].surplus-e.detail.value[i]<0){
        dd.alert({content:  that.data.arrayList[x].name+':使用量错误'});
        return;
      }
      that.data.arrayList[x].surplus=that.data.arrayList[x].surplus-e.detail.value[i];
      x++;
    }
    x=0;
    dd.httpRequest({
        headers: {
          "Content-Type": "application/json"
        },
        url: 'http://172.18.0.177:8080/zjp/userProduct/editData',
        method: 'POST',
        data:JSON.stringify(that.data.arrayList),
        dataType: 'json', 
        success: function(res) {
        console.log('success，携带数据为：', res)
        },
      });
      for(var i in e.detail.value)
      {
        that.data.arrayList[x].number=e.detail.value[i];
        that.data.arrayList[x].constructionsiteID=that.data.constructionSiteObject[that.data.index].id;
        x++;
      }
    x=0;
      dd.httpRequest({
        headers: {
          "Content-Type": "application/json"
        },
        url: 'http://172.18.0.177:8080/zjp/userProductLog/addData',
        method: 'POST',
        data:JSON.stringify(that.data.arrayList),
        dataType: 'json', 
        success: function(res) {
        console.log('success，携带数据为：', res)
        },
      });
  },  
});
