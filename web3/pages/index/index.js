Page({
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
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
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
  test(e){
    // dd.alert({
    //   content:JSON.stringify(e.detail.name),
    // });  
    //获取改日志的id存入缓存
    dd.setStorage({
      key: 'testLogId',
      data: {
        logId: JSON.stringify(e.detail.name),
      },
      success: function() {
        // dd.alert({content: '写入成功'});
    }
    });
    //  this.webViewContext.postMessage({'sendToWebView': '1'});
  },
});
