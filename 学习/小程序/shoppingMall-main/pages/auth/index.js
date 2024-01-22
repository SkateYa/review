// pages/auth/index.js
import { login } from "../../util/util"
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 获取用户信息
  async handleGetUserInfo(e) {
    console.log(e)
   try {
        // 1 获取用户信息
      const { encryptedData, iv, rawData, signature } = e.detail
      // 2 获取小程序登录成功后的code
      const { code } = await login()
      const loginParams = { encryptedData, iv, rawData, signature, code }
      //  3 发送请求 获取用户的token
      // const { token } = await request({ url: '/users/wxlogin', data: loginParams, methods: 'post' })
     // 接口获取不到，自己模拟的token
      const token=" Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
      wx.setStorageSync("token", token);
      wx.navigateBack({
        delta: 1
      })      
   } catch (error) {
      console.log(error)
   }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

})