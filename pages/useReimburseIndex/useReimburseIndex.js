Page({
  data: {},
  onLoad() { },
  in() {
    dd.navigateTo({ url: 'personOut/personOut' });
  },
  out() {
    dd.navigateTo({ url: 'return/return' });
  },
});
