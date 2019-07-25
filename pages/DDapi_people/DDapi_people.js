Page({
  data: {},
  onLoad() { },

  getPeopleAndDepartment() {
    dd.complexChoose({
      title: "测试标题",            //标题
      multiple: true,            //是否多选
      limitTips: "超出了",          //超过限定人数返回提示
      maxUsers: 1000,            //最大可选人数
      pickedUsers: [],            //已选用户
      pickedDepartments: [],          //已选部门
      disabledUsers: [],            //不可选用户
      disabledDepartments: [],        //不可选部门
      requiredUsers: [],            //必选用户（不可取消选中状态）
      requiredDepartments: [],        //必选部门（不可取消选中状态）
      permissionType: "xxx",          //可添加权限校验，选人权限，目前只有GLOBAL这个参数
      responseUserOnly: false,        //返回人，或者返回人和部门
      success: function(res) {
        dd.alert({
          content: `选取的部门或人员信息:${JSON.stringify(res)}`,
        });
        /**
        {
            selectedCount:1,                              //选择人数
            users:[{"name":"","avatar":"","userId":""}]，//返回选人的列表，列表中的对象包含name（用户名），avatar（用户头像），userId（用户工号）三个字段
            departments:[{"id":,"name":"","count":}]//返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数）
        }
        */
      },
      fail: function(err) {
      }
    })
  }, getDepartment() {
    dd.chooseDepartments({
      title: "测试标题",            //标题
      multiple: true,            //是否多选
      limitTips: "超出了",          //超过限定人数返回提示
      maxDepartments: 100,            //最大选择部门数量
      pickedDepartments: [],          //已选部门
      disabledDepartments: [],        //不可选部门
      requiredDepartments: [],        //必选部门（不可取消选中状态）
      permissionType: "xxx",          //选人权限，目前只有GLOBAL这个参数
      success: function(res) {
        dd.alert({
          content: `选取的部门信息:${JSON.stringify(res)}`,
        });
        /**
        {
            userCount:1,                              //选择人数
            departmentsCount:1，//选择的部门数量
            departments:[{"id":,"name":"","number":}]//返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数）
        }
        */
      },
      fail: function(err) {
      }
    });
  },
  postMessage() {
    dd.createDing({
      users: ['manager5771'],// 用户列表，工号
      type: 0, // 附件类型 1：image  2：link
      alertType: 2, // 钉发送方式 0:电话, 1:短信, 2:应用内
      alertDate: { "format": "yyyy-MM-dd HH:mm", "value": "2015-05-09 08:00" },
      attachment: {
        // image必填参数      
        image: [''],
        // link链接必填参数
        title: '',
        url: '',
        text: ''
      }, // 附件信息
      text: '短信测试123456798',  // 正文
      bizType: 0, // 业务类型 0：通知DING；1：任务；2：会议；
      // confInfo: {
      //   bizSubType: 0, // 子业务类型如会议：0：预约会议；1：预约电话会议；2：预约视频会议；（注：目前只有会议才有子业务类型）
      //   location: '某某会议室', //会议地点；（非必填）
      //   startTime: { "format": "yyyy-MM-dd HH:mm", "value": "2015-05-09 08:00" },// 会议开始时间
      //   endTime: { "format": "yyyy-MM-dd HH:mm", "value": "2015-05-09 08:00" }, // 会议结束时间
      //   remindMinutes: 30, // 会前提醒。单位分钟-1：不提醒；0：事件发生时提醒；5：提前5分钟；15：提前15分钟；30：提前30分钟；60：提前1个小时；1440：提前一天；
      //   remindType: 2 // 会议提前提醒方式。0:电话, 1:短信, 2:应用内
      // },

      // taskInfo: {
      //   ccUsers: ['100', '101'], // 抄送用户列表，工号
      //   deadlineTime: { "format": "yyyy-MM-dd HH:mm", "value": "2015-05-09 08:00" }, // 任务截止时间
      //   taskRemind: 30// 任务提醒时间，单位分钟0：不提醒；15：提前15分钟；60：提前1个小时；180：提前3个小时；1440：提前一天；
      // },
      success: function(res) {
        dd.alert({
          content: `调用成功后返回数据:${JSON.stringify(res)}`,
        });
        /*
        {
        	"dingId": "1_1_a09f167xxx",
        	"text": "钉正文内容",
        	"result": true
        }
        */
      },
      fail: function(err) {
        dd.alert({
          content: `调用失败后返回数据:${JSON.stringify(err)}`,
        });
      }
    });
  },
  postMessage2() {
    dd.openChatByUserId({
      userId: 'manager5771', // 用户的工号
      success: res => {

      },
      fail: err => {
        dd.alert({
          content: `调用失败后返回数据:${JSON.stringify(err)}`,
        });
      }
    })
  },
  getConversation() {
    dd.chooseChat({
      isAllowCreateGroup: false,//是否允许创建会话
      filterNotOwnerGroup: false,//是否限制为自己创建的会话
      success: res => {
        dd.alert({
          content: `调用成功后返回数据:${JSON.stringify(res)}`,
        });
        /*{
            chatId: 'xxxx',
            title:'xxx'
        }*/
      },
      fail: err => {
        dd.alert({
          content: `调用失败后返回数据:${JSON.stringify(err)}`,
        });
      }
    })
  },
  postConversationMessage() {
    dd.chooseChat({
      isAllowCreateGroup: false,//是否允许创建会话
      filterNotOwnerGroup: false,//是否限制为自己创建的会话
      success: res => {
        dd.alert({
          content: `调用成功后返回数据:${JSON.stringify(res)}`,
        });
        // dd.alert({
        //   content: `调用成功后返回数据:${JSON.stringify(res.data.chatId)}`,
        // });
        dd.openChatByChatId({
          chatId: res.chatId,//会话Id
          success: res => {

          },
          fail: err => {
            dd.alert({
              content: `调用成功后返回数据:${JSON.stringify(res)}`,
            });
          }
        })
        /*{
            chatId: 'xxxx',
            title:'xxx'
        }*/
      },
      fail: err => {
        dd.alert({
          content: `调用失败后返回数据:${JSON.stringify(err)}`,
        });
      }
    })
  },
  getLocation() {
    dd.getLocation({
      success(res) {
        dd.alert({
          content: `调用成功后返回数据:${JSON.stringify(res)}`,
        });
        // that.setData({
        //   hasLocation: true,
        //   location: formatLocation(res.longitude, res.latitude)
        // })
      },
      fail() {
        dd.alert({ title: '定位失败' });
      },
    })
  }
});
