Page({
  data:{
        buttonText_1:'开始(最长支持60秒音频录制)',
        src:'',
        coverImgUrl:'https://s3.music.126.net/m/s/img/disc_default.png?7c9b3adc16f5485c2bfbe8a540534188',
        timer: '',//定时器名字
        countDownNum: '60',//倒计时初始值
        tempLabel: 0,//临时变量用于判断是否暂停计时
        tempLogId: 0,//该日志的id
        isPlay: false,
  },
//开始录音
  startRecord() {
    //读取缓存中的日志id再传入后台
    var that = this;
    dd.getStorage({
      key: 'testLogId',
      success: function(res) {
        that.setData({
          tempLogId: res.data.logId
        })
      },
      fail: function(res){
        dd.alert({content: res.errorMessage});
      }
    });
    if(this.data.tempLabel==1){
      this.setData({
        countDownNum: 60,
        tempLabel:0,
      });
    }
    this.setData({
        buttonText_1:'已开始(最长支持60秒音频录制)',
      });
    this.startTime();//开始倒计时

    if (dd.canIUse('getRecorderManager')) {     // 端上支持
        const recorderManager = dd.getRecorderManager()    
    } else {     // 端上不支持
        dd.alert({ content: '请升级钉钉版本至4.5.18以支持录音功能' })    
        return ;
    }
    let rm = dd.getRecorderManager()
    //开始录音
     rm.onstart = () => {
        //dd.alert({ content: '开始录音' })
    }
    rm.onstop = (res) => {
        //dd.alert({ content: '临时存放地址: ' + res.tempFilePath})
        console.log(res.tempFilePath);
        this.setData({
          src: res.tempFilePath,
        });
        console.log('设置完成:'+this.data.src);
    }
    rm.onerror = (err) => {
        dd.alert({ content: '录音出现错误' })
    }
    rm.start({ duration: 60 })
  },
  //结束录音
  stopRecord() {
      this.setData({
        tempLabel: 1,
        buttonText_1:'重新录制',
      })
      this.stopTime();//结束倒计时
      let rm = dd.getRecorderManager();
      rm.stop();
  },
   //播放录音
  start() {
      this.setData({
        isPlay:true,
      })
      let manager = dd.getBackgroundAudioManager()
      manager.src = this.data.src;

  },
  //暂停播放
  onLoad(){
    dd.device.audio.pause({
    localAudioId : "localAudioId",
    onSuccess : function() {
    },
    onFail : function(err) {
    }
});
  },
  //录音上传
  upload(){
    if(this.data.countDownNum!=60){

    var that = this;
          var flie = that.data.src;
          var logId = that.data.tempLogId;
          logId = logId.substr(1,logId.length-2);
          dd.uploadFile({
            url: 'http://www.xn--qrqy46c.top/wlms/users/DDUploadRecording',
            fileType: 'audio',
            fileName: 'file',
            method: 'POST',
            header: { "Content-Type": "multipart/form-data" },//类型
            filePath: flie,
            formData: {
              logId: logId,
            },
            success: (res) => {
              dd.alert({
                content: JSON.parse(res.data).msg,
              });
              dd.navigateTo({
                  url:"../../pages/test2/test2"
              });
            },
          });
    }else{
      dd.alert({ content: '请先录制好音频哦' })
    }
      
  },
  startTime(){//开始倒计时
    this.countDown();
  },
  stopTime(){//停止倒计时
     clearInterval(this.data.timer);
  },
  countDown() {
    let that = this;
    let countDownNum = that.data.countDownNum;//获取倒计时初始值
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
    that.setData({
      timer: setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
        
        if(that.data.tempLabel==0){
        //每隔一秒countDownNum就减一，实现同步
        countDownNum--;
        //然后把countDownNum存进data，好让用户知道时间在倒计着
         that.setData({
            countDownNum: countDownNum
          })
        }
         
        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        if (countDownNum == 0) {
          //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
          //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
          clearInterval(that.data.timer);
          //关闭定时器之后，可作其他处理codes go here
        }
      }, 1000)
    })
  }
});
