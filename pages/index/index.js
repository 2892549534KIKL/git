Page({
  data: {
    array: [{
      src: '../images/comeOut.png',
      color: 'white',
      mode: 'center',
      text: '出入库数据'
    }, {
      src: '../images/scan.png',
      color: 'white',
      mode: 'center',
      text: '扫码出入库'
    }, {
      src: '../images/out.png',
      color: 'white',
      mode: 'center',
      text: '扫码使用或报销'
    }, {
      src: '../images/apply.png',
      color: 'white',
      mode: 'center',
      text: '申请/审批'
    }, {
      src: '../images/construction.png',
      color: 'white',
      mode: 'center',
      text: '施工管理'
    }, {
      src: '../images/inform.png',
      color: 'white',
      mode: 'center',
      text: '通知'
    }],
    src: './2.png'
  },
  jump(e) {
    var index = e.currentTarget.dataset['index'];
    switch (index) {
      case 0:
        dd.reLaunch({
          url: '../../pages/comeOut/comeOut',
        });
        break;
      case 1:
        dd.navigateTo({
          url: '../../pages/ComeOutIndex/ComeOutIndex',
        });
        break;
      case 2:
        dd.navigateTo({
          url: '../../pages/useReimburseIndex/useReimburseIndex',
        });
        break;
      case 3:
        dd.navigateTo({
          url: '../../pages/approval/approval',
        })
        break;
      case 4:
        dd.reLaunch({
          url: '../../pages/construction/construction',
        });
        break;
      case 5:
        dd.reLaunch({
          url: '../../pages/comeOut/comeOut',
        });
        break;
      case 6:
        dd.reLaunch({
          url: '../../pages/comeOut/comeOut',
        });
        break;
      default:
        dd.alert({
          content:'暂无地址跳转',
        })
        break;

    }

  },

})