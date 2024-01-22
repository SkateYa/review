// pages/collect/index.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect:[],
    tabs: [
      { id: 0, value: '商品收藏', checked: true },
      { id: 1, value: '品牌收藏', checked: false },
      { id: 2, value: '店铺收藏', checked: false },
      { id: 3, value: '浏览足迹', checked: false }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   const collect = wx.getStorageSync("collect")||[];
   this.setData({
     collect
   })
  },
  tabsItemChange(e) {
    const { index } = e.detail
    let { tabs } = this.data
    tabs.forEach((v, i) => i === index ? v.checked = true : v.checked = false)
    this.setData({
      tabs
    })
  },
})