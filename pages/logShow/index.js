
Page({
  data: {
    name:'骆佳明',
    createTime:'2019-08-02 17:20:00',
    logType:'日报',
    image:'/image/image.png',
      file:'/image/file.png',
    content:[
      {sonTitle:'今日工作',sonContent:'中江鹏项目钉钉主界面的优化，Vue登录注册模板与colorUI在App上的兼容，钉钉组件服务器到钉盘系统繁忙问题的修复'}
      ,{sonTitle:'明日计划',sonContent:'中江鹏项目钉钉其他界面的UI优化，钉钉其他组件的研究，java的crud的优化'}
       ,{sonTitle:'需协调工作',sonContent:'小猪猪'}
      ,{sonTitle:'备注',sonContent:'I want to eat Roasted Suckling Pig'}
      ],
      contentImgs:['/image/1.jpg','/image/ant.png','/image/homeTOuch.png','/image/homeTOuch.png','/image/homeTOuch.png'],
      enclosures:[
        {fileName:'培训App需求整理.docx',size:'88.6KB',type:'docx'},
         {fileName:'78EQ58VD25ETXJB_4LUZ2M.png',size:'13.8KB',type:'png'},
      ],
      
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
        for(var i=0;i<this.data.enclosures.length;i++){   
          var type=this.data.enclosures[i].type;   var currentNode='enclosures['+i+'].typePlus';
          console.log(currentNode);
   if(type=='png'||type=='jpg'||type=='jpeg'||type=='bmp'||type=='gif') { this.setData({  [currentNode]:this.data.image })  }
   else{ this.setData({  [currentNode]:this.data.file }) }}
 
   console.log(this.data.enclosures);
  },
});
