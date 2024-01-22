// pages/search/index.js
/* 
1 输入框绑定 值改变事件 input事件
  1 获取到输入框的值
  2 合法性判断 
  3 检验通过 把输入框的值 发送到后台
  4 返回的数据打印到页面上
2 防抖 （防止抖动） 定时器  节流 
  0 防抖 一般 输入框中 防止重复输入 重复发送请求
  1 节流 一般是用在页面下拉和上拉 
  1 定义全局的定时器id
 */
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
   goods:[],
   isFocus:false,
   inputValue:""

  },
  TimeId:-1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
// 输入框的值改变发生的事件
  handleInput(e){
    // 获取输入框的值
    let {value}=e.detail;
    // 检测合法性
    if(!value.trim()){
      this.setData({
        goods:[],
        isFocus:true
      })
     return;
    }
    this.setData({
      isFocus:true
    })
    clearTimeout(this.TimeId)
    this.TimeId=setTimeout(() => {
      this.qsearch(value)
    }, 1000);
   // 发送请求获取数据
   console.log(e)
  },
 async qsearch(query){
   const res=await request({url:'/goods/qsearch',data:{query}})
   this.setData({
    goods:res
   })
   console.log(res)
  },
  // 点击取消按钮
  handleCancel(){
    this.setData({
      goods:[],
      isFocus:false,
      inputValue:""
     })
  }
})