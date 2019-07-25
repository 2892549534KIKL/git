Page({
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if(e.detail.value.name=='')
    {alert('请输入用户名')}
     else if(e.detail.value.password=='')
    {alert('请输入密码')}
  },
  formReset: function() {
    console.log('form发生了reset事件')
  }
})