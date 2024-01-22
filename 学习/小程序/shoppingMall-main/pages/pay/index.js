
/* 
1 页面加载的时候
  1 从缓存中获取购物车数据 渲染到页面中
    这些数据  checked=true 
2 微信支付
  1 哪些人 哪些帐号 可以实现微信支付
    1 企业帐号 
    2 企业帐号的小程序后台中 必须 给开发者 添加上白名单 
      1 一个 appid 可以同时绑定多个开发者
      2 这些开发者就可以公用这个appid 和 它的开发权限  
3 支付按钮
  1 先判断缓存中有没有token
  2 没有 跳转到授权页面 进行获取token 
  3 有token 。。。
  4 创建订单 获取订单编号
  5 已经完成了微信支付
  6 手动删除缓存中 已经被选中了的商品 
  7 删除后的购物车数据 填充回缓存
  8 再跳转页面 
 */
import { showModal, showToast, requestPayment } from "../../util/util"
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
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
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync('cart') || [];
    let checkedCart = cart.filter(v => v.checked)
    this.setData({ address })
    this.setCart(checkedCart)
  },
  // 设置购物车状态同时 重新计算 底部工具栏的数据 全选 总价格 购买的数量
  setCart(cart) {
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalNum += v.num
      totalPrice += v.num * v.goods_price
    })
    this.setData({
      cart, totalPrice, totalNum
    })
  },
  // 支付
  async handleOrderPay() {
    try {
      // 判断缓存中是否有token
      const token = wx.getStorageSync("token");
      // 没有token,就跳转到授权页面
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index',
        });
        return;
      }
      // 创建订单，
      // 准备请求头参数
      // const header = { Authorization: token }
      // 请求体参数
      const order_price = this.data.totalPrice
      const consignee_addr = this.data.address.all
      const cart = this.data.cart
      let goods = []
      cart.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.goods_number,
        goods_price: v.goods_price
      }))
      const orderParams = { order_price, consignee_addr, goods }
      // 发送请求，创建订单，获取订单编号
      const { order_number } = await request({ url: '/my/orders/create', method: "POST", data: orderParams})
      // 发起预支付接口
      const { pay } = await request({ url: '/my/orders/req_unifiedorder', method: 'POST', data: { order_number } })
      // 发起微信支付
      await requestPayment(pay)
      // 查询后台，订单状态
      const res = await request({ url: '/my/orders/chkOrder', method: 'POST', data: { order_number } })
      await showToast({ title: "支付成功" })
      // 手动删除缓存中的数据，已经支付了的商品
      let newCart = wx.getStorageSync("cart");
      newCart = newCart.filter(v => !v.checked)
      wx.setStorageSync("cart", newCart);
      // 支付成功，跳转到订单页面
      wx.navigateTo({
        url: '/pages/order/index',
      });
    } catch (error) {
      await showToast({ title: "支付失败" })
      // 模拟失败跳转到订单页面，实际情况不用跳转
      wx.navigateTo({
        url: '/pages/order/index',
      });
      console.log(error)
    }
  }
})