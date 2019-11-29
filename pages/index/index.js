Page({
  data: {
    checkedIn: 199,//已签到人数
    NoCheckedIn: 30,//已签到人数
    exceptions: 5,//异常人数
    topThreeImage: ['../images/no1.png', '../images/no2.png', '../images/no3.png'],//前三签到图标
    topThreeSign: [//前三签到数据
      { name: '张三', time: '08:35' },
      { name: '李四', time: '08:36' },
      { name: '王五', time: '08:37' },
    ],
    signData: [
      { name: '张三', time: '08:35', number: 2, site: '福建省福州市鼓楼区安泰街道福州鼓楼新高达教育培训中心(南门校区)新兴大厦(斗西路)' },
      { name: '李四', time: '08:36', number: 1, site: '江西省赣州市章贡区黄金岭街道迎宾大道辅路赣州富翔斯巴鲁汽车销售服务有限公司' },
      { name: '王五', time: '08:37', number: 3, site: '福建省福州市鼓楼区湖东路140号' },
    ],
  },
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
});
