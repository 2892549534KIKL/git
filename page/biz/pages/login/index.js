Page({
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if(e.detail.value.name=='')
    {alert('用户名不能为空');}
      if(e.detail.value.password=='')
    {alert('密码不能为空');}
  }
})
