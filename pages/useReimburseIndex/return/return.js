Page({
  data: {
    arrayList:[],
    list:[],
    id:"",
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
    storeHouseID:"",//仓库id
    constructionsiteID:"",
    stateID:""//物料状态id
    }
  },
  onLoad() {
    var that = this;
    dd.getStorage({
        key: 'user',
        success: function(res) {
          that.data.id=res.data.user.iD;
          },
       fail: function(res){
            console.log({content: res.errorMessage});
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
  saoMa(){
    var i=0;
    var barcode='userProduct.barcode';
    dd.scan({
      type: 'qr',
      success: (res) => {
        this.setData({
          [barcode]: res.code,
        })
      dd.showLoading({
        content: '加载中...',
        delay: 100,
      });
      var that = this;
      dd.httpRequest({
        headers: {
          "Content-Type": "application/json"
        },
        url: 'http://localhost:8080/zjp/userProduct/findByBarcode',
        method: 'POST',
        data:JSON.stringify({
            barcode:this.data.userProduct.barcode,//查询条件barcode
        }),
        dataType: 'json', 
        success: function(res) {
          dd.hideLoading();
          if(res.data==""||res.data==null)
          {
            dd.alert({content: '不存在此物品'});
          }
          else{
            if(res.data.userID!=that.data.id)
            {
              dd.alert({content: '不是你的' + res.data.userName});
            }
            else if(res.data.userID==that.data.id)
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
     for(x=0;x<that.data.arrayList.length;x++)
      {
        that.data.arrayList[x].number=that.data.arrayList[x].surplus;
        that.data.arrayList[x].stateID=39;
        that.data.arrayList[x].storeHouseID=1;
      }
      dd.showLoading({
        content: '加载中...',
        delay: 100,
      });
      dd.httpRequest({
        headers: {
          "Content-Type": "application/json"
        },
        url: 'http://localhost:8080/zjp/userProductLog/addData',
        method: 'POST',
        data:JSON.stringify(that.data.arrayList),
        dataType: 'json', 
        success: function(res) {
        console.log('success，携带数据为：', res)
        },
      });
      dd.httpRequest({
        headers: {
          "Content-Type": "application/json"
        },
        url: 'http://localhost:8080/zjp/product/addData',
        method: 'POST',
        data:JSON.stringify(that.data.arrayList),
        dataType: 'json', 
        success: function(res) {
        console.log('success，携带数据为：', res)
        },
      });
    for(x=0;x<that.data.arrayList.length;x++)
    {
      that.data.arrayList[x].surplus=0;
    }
    dd.httpRequest({
        headers: {
          "Content-Type": "application/json"
        },
        url: 'http://localhost:8080/zjp/userProduct/editData',
        method: 'POST',
        data:JSON.stringify(that.data.arrayList),
        dataType: 'json', 
        success: function(res) {
        dd.hideLoading();
        that.setData({//啥也不做,只触发渲染就OK
          arrayList: null,
        })
        console.log('success，携带数据为：', res)
        },
      });
  },  
});
