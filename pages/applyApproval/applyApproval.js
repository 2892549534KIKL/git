Page({
  data: {
    table: [
      //状态              出库人             仓库                      物品名称             时间               数量        单位         记录id
      { state: "出库成功", operator: "张三", customerName: "南昌分仓库", itemName: "铝合金", time: '2019-7-12 12:20:30', number: 999, unit: '箱', id: 100 },
      { state: "出库失败", operator: "李四", customerName: "重庆分仓库", itemName: "钢筋", time: '2019-7-12', number: 50, unit: '吨', id: 100 },
      { state: "出库成功", operator: "王五", customerName: "杭州分仓库", itemName: "光缆", time: '2019-7-12', number: 888, unit: '箱', id: 100 },
      { state: "出库成功", operator: "赵六", customerName: "广东分仓库", itemName: "水泥", time: '2019-7-12', number: 10, unit: '吨', id: 100 },
      { state: "出库成功", operator: "张三", customerName: "南昌分仓库", itemName: "铝合金", time: '2019-7-12', number: 999, unit: '箱', id: 100 },
      { state: "出库失败", operator: "李四", customerName: "重庆分仓库", itemName: "铝合金", time: '2019-7-12', number: 777, unit: '箱', id: 100 },
      { state: "出库成功", operator: "王五", customerName: "杭州分仓库", itemName: "铝合金", time: '2019-7-12', number: 888, unit: '箱', id: 100 },
      { state: "出库成功", operator: "赵六", customerName: "广东分仓库", itemName: "铝合金", time: '2019-7-12', number: 666, unit: '箱', id: 100 },
    ],
    text: "这是一条测试公告，看看效果怎么样，2019年3月23日",
    marqueePace: 1,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    marquee_margin: 30,
    size: 14,
    interval: 20 // 时间间隔
  },
  onLoad() { },
  // 查询搜索的接口方法
  search() {
    dd.alert({ content: '点击搜索' });
  },

  onReachBottom: function() {
    // this.setData({
    //   table: this.data.table.concat({
    //     state: '出库成功',//返回结果
    //     operator:"李四啊啊啊啊啊",//出库人姓名
    //     customerName: "重庆分仓库",//返回结果
    //     itemName: "铝合金",//出库人姓名
    //     time: '2019-7-12',//返回结果
    //     number: 777,//出库人姓名
    //     unit: '箱',//返回结果
    //     id: 100,//出库人姓名
    //   }),
    // });
    dd.alert({
      content: "下拉进行懒加载(直接向数据中:table添加数据就可以)",
    });
  },
});
