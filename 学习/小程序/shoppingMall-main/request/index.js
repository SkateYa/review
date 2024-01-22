// 同时发送异步代码的次数
let ajaxTimes = 0;
export const request = (params) => {
    // 判断 url中是否带有 /my/ 请求的是私有的路径 带上header token
    let header = { ...params.header };
    if (params.url.includes("/my/")) {
        // 拼接header 带上token
        header["Authorization"] = wx.getStorageSync("token");
    }
    ajaxTimes++;
    wx.showLoading({
        title: '加载中',
        mask: true,
    });

    // url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories' 
    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
    return new Promise((reslove, reject) => {
        wx.request({
            ...params,
            header,
            url: baseUrl + params.url,
            success: (result) => {
                reslove(result.data.message)
            },
            fail: (error) => {
                reject(error)
            },
            complete: () => {
                ajaxTimes--;
                if (ajaxTimes === 0) {
                    wx.hideLoading();
                }
            }
        });
    })
}