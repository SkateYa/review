// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    collectNums: 0 //被收藏的商品的数量
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
    const userInfo = wx.getStorageSync("userInfo");
    const collect = wx.getStorageSync('collect') || []
    console.log(userInfo)
    this.setData({ userInfo, collectNums: collect.length })
  },
})