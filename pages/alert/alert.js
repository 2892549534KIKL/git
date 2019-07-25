Page({
  data: {
    sign: true,
  },
  onLoad() { },
  cancel() {
    this.setData({sign: false,})
  },
  confirm() {
    this.setData({sign: false,});

  },
  hide(){
   this.setData({sign: false,});
  }
});
