/* 
1 用户上滑页面 滚动条触底 开始加载下一页数据
  1 找到滚动条触底事件  微信小程序官方开发文档寻找
  2 判断还有没有下一页数据
    1 获取到总页数  只有总条数
      总页数 = Math.ceil(总条数 /  页容量  pagesize)
      总页数     = Math.ceil( 23 / 10 ) = 3
    2 获取到当前的页码  pagenum
    3 判断一下 当前的页码是否大于等于 总页数 
      表示 没有下一页数据

  3 假如没有下一页数据 弹出一个提示
  4 假如还有下一页数据 来加载下一页数据
    1 当前的页码 ++
    2 重新发送请求
    3 数据请求回来  要对data中的数组 进行 拼接 而不是全部替换！！！
2 下拉刷新页面
  1 触发下拉刷新事件 需要在页面的json文件中开启一个配置项
    找到 触发下拉刷新的事件
  2 重置 数据 数组 
  3 重置页码 设置为1
  4 重新发送请求
  5 数据请求回来 需要手动的关闭 等待效果

 */

import { request } from "../../request/index.js";
// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 0, value: '综合', checked: true },
      { id: 1, value: '销量', checked: false },
      { id: 2, value: '价格', checked: false }
    ],
    goodsList: []
  },
  // 接口的请求参数
  queryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  totalPages: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.cid = options.cid || ""
    this.queryParams.query = options.query || ""
    this.getGoodsList()
    console.log(options)
  },
  // 监听用户上拉触底事件
  onReachBottom() {
    if (this.queryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '没有下一页数据了',
      });

    } else {
      this.queryParams.pagenum++
      this.getGoodsList()
    }
  },
  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({ url: '/goods/search', data: this.queryParams })
    const total = res.total
    this.totalPages = Math.ceil(total / this.queryParams.pagesize)
    console.log(this.totalPages)
    this.setData({
      // 拼接了数组
      // goodsList:res.goods
      goodsList: [...this.data.goodsList, ...res.goods]
    })
    // 关闭下拉刷新的窗口 如果没有调用下拉刷新的窗口 直接关闭也不会报错  
    wx.stopPullDownRefresh();
    console.log('res', res)
  },


  tabsItemChange(e) {
    const { index } = e.detail
    let { tabs } = this.data
    tabs.forEach((v, i) => i === index ? v.checked = true : v.checked = false)
    this.setData({
      tabs
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 1 重置数组
    this.setData({
      goodsList: []
    })
    // 2 重置页码
    this.queryParams.pagenum = 1
    // 3 发送请求
    this.getGoodsList()
  },
})