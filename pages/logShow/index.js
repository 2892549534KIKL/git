
Page({
  data: {
    name:'骆佳明',
    createTime:'2019-08-02 17:20:00',
    logType:'日报',
    loaderSign: true,
    showView: false,//标记数据是否加载完毕
    searchText: "",//搜索文本
      title:'音乐',
    src:'http://music.163.com/song/media/outer/url?id=317151.mp3',
        coverImgUrl:'https://s3.music.126.net/m/s/img/disc_default.png?7c9b3adc16f5485c2bfbe8a540534188',
        personSrc:'/image/testLogShow.png',
  },
  //页面初始化时加载
  onLoad() {
       let manager = dd.getBackgroundAudioManager()
        manager.title = this.data.title
        manager.coverImgUrl = this.data.coverImgUrl
        manager.src = this.data.src
        // this.department();
    var that = this;
  },
});
