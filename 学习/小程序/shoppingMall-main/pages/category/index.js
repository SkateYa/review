import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],//左边的数据
    rightContent: [], //右边的数据
    currentIndex:0,  //左边选中的下标
    scrollTop:0  //右边内容的滚动条距离顶部的距离
    
  },
  Cates: [],
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
   * web的本地存储和小程序本地存储的区别
   * 1.写代码的方式不一样
   *   web：
      localStorage.setItem("key","value")
      localStorage.getItem("key")
      微信小程序：
      wx.setStorageSync(Cates, {"key","value")
      wx.getStorageSync("key")
   * 2.存储的时候 有没有发生类型转换
    web:不管存入的是什么类型的数据，最终都会先调用一下 toString()，把数据变成了字符串，再存入进去。
    微信小程序：不存在类型转换的这个操作，存什么类型的数据进去，获取的时候就是什么类型。
   */
  const Cates = wx.getStorageSync('cates');
  if(!Cates){
    this.getCates()
  }else{
    if(Date.now() - Cates.time>1000*10){
      this.getCates()
    }else{
      this.Cates = Cates;
      console.log('this.Cates',this.Cates)
      let leftMenuList = this.Cates.map(v => v.cat_name)
      let rightContent =this.Cates[0].children;
      this.setData({ 
        leftMenuList,
        rightContent
      })
    }
  }


    this.getCates()
  },
  // 获取分类数据
  async getCates() {
    const res = await request({ url: '/categories' })
    this.Cates = res;
    wx.setStorageSync('cates', this.Cates)
    let leftMenuList = this.Cates.map(v => v.cat_name)
    let rightContent =this.Cates[0].children;
    this.setData({ 
      leftMenuList,
      rightContent
    })

    // request({ url: '/categories' }).then(result => {
    //   this.Cates = result;
    //   wx.setStorageSync('cates', this.Cates)
    //   let leftMenuList = this.Cates.map(v => v.cat_name)
    //   let rightContent =this.Cates[0].children;
    //   this.setData({ 
    //     leftMenuList,
    //     rightContent
    //   })
    // })
  },
  // 左边的点击事件
  handleItemTap(e){
    console.log(e)
    const index=e.currentTarget.dataset.index
    // 根据左边不同的索引来渲染右边的商品内容
    let rightContent =this.Cates[index].children;
    this.setData({ 
      currentIndex:index,
      rightContent,
      // 重新设置右边内容的scroll-view标签的距离顶部的距离
      scrollTop:0
    })
    console.log(e.currentTarget.dataset.index)

  }

})