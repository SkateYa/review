/*
 * @Author: qij
 * @Date: 2022-07-11 14:12:45
 * @LastEditTime: 2022-07-15 17:54:02
 * @LastEditors: Please set LastEditors
 * @Description: msn-websocket SDK 1.0.1
 * @FilePath: websocket.js
 */
(function (global, undefined) {
  "use strict"; //使用js严格模式检查，使语法更规范
  var _global;

  // 兼容console
  var console = window.console;
  if (!console || !console.log || !console.error) {
    console = {log: function(){ }, error: function(){ }};
  }

  function WebSocketManage(opt) {
    this._initial(opt);
  }

  /**
   * 初始化
   * @param {Object} opt 初始化 
   */
  WebSocketManage.prototype._initial = function(opt) {
    this.client = null;
    this.clientStatus = false;
    this.socketMethod = 0; // 0未请求 1websocket  2ajax
    var def = {
      userAccount: "", // 用户账号
      routeUrl: '', // 获取websoket服务地址
      serverUrl: "", // websocket服务地址
      channelCode: '', // 渠道Code
      sceneCode: '',
      sceneObj: {}, //场景code与场景关联对象
      customStorage: true,
      messageList:[],
      handleConnect: function(){},
      handleReconnectAttempt: function(){},
      handleConnectError: function(){},
      handleConnectTimeout: function(){},
      handleDisconnect: function(){},
      handleMessageEvent: function(){}
    };

    this.def = deepMerge(def, opt);
    this.userAccount = this.def.userAccount;
    this.messageList = this.def.messageList;
    this.routeUrl = this.def.routeUrl
    this.serverUrl = this.def.serverUrl;
    this.channelCode = this.def.channelCode;
    this.httpAjax = opt.httpAjax || httpAjax;
    
    // customStorage 是否需自定义存储
    if (this.def.customStorage) {
      if (!opt.getStorage) {
        console.error('-----customStorage:' + this.def.customStorage + '--自定义存储状态下需在初始化时实现并传入getStorage方法')
      } else if (!opt.setStorage) {
        console.error('-----customStorage:' + this.def.customStorage + '--自定义存储状态下需在初始化时实现并传入setStorage方法')
      } else {
        this.getStorage = opt.getStorage || getStorage;
        this.setStorage = opt.setStorage || setStorage;
      }
    } else {
      this.getStorage = getStorage;
      this.setStorage = setStorage;
    }
  }

  /**
   * 断开Websocket连接
   */
  WebSocketManage.prototype.disconncet = function () {
    if (this.client && this.clientStatus) {
      this.clientStatus = false;
      this.socketMethod = 1
      this.client.disconnect();
    }
  };

  /**
   * 连接Websocket
   */
  WebSocketManage.prototype.connect = function () {
    console.log(this.socketMethod)
    if (this.client && !this.client.socket.connected) {
      this.client.socket.connect();
      return;
    }
    if (this.socketMethod === 1) {
      return;
    }
    if (this.socketMethod === 2) {
      console.log(this)
      this.msgTemplateContext.getMsgList()
      return;
    }
    var _this = this;
    var _def = _this.def;
    var getUserIdByUserAccont = function () {
      httpAjax({
        // 用户信息查询，获取用户id
        url: _this.routeUrl + '/mns-route/user/selectUserInfo',
        method: 'post',
        data: {
          channelCode: _this.channelCode,
          userAccount: _this.userAccount
        },
        success: function(res) {
          console.log(res)
          if (res.code !== 1000) {
            console.error('-----getUserIdByUserAccont:' + '--请配置或检查网络是否正常')
            return
          }
          if (!res.data || !res.data.userId) {
            console.error('-----getUserIdByUserAccont:' + '--请配置或检查网络是否正常')
            return
          }
          _this.userId = res.data.userId;
          _this.socketMethod = 2
          // initSocket()
        }
      });
    }
    var initSocket = function () {
      console.log('执行initSocket')
      // 初始化Websocket
      var socket = io.connect(_this.serverUrl + '?registrationId=' + _this.userId);
      // Socket 连接成功
      socket.on("connect", function () {
        _this.client = socket;
        _this.clientStatus = true;
        _this.socketMethod = 1
        console.log(_this.socketMethod)
        _def.handleConnect();
      });
      // Socket 重连接事件
      socket.on("reconnect_attempt", function (size) {
        // _this.msgTemplateContext.getMsgList()
        _def.handleReconnectAttempt(size);
      });
      // Socket 连接异常
      socket.on("connect_error", function (error) {
        _this.socketMethod = 2
        _def.handleConnectError(error);
      });
      // Socket 连接超时
      socket.on("connect_timeout", function (time) {
        _this.socketMethod = 2
        _def.handleConnectTimeout(time);
      });
      // Socket 连接断开事件
      socket.on("disconnect", function (message) {
        console.log(message,'disconnect')
        _this.clientStatus = false;
        _this.socketMethod = 0
        _def.handleDisconnect(message);
      });
      // 消息接收
      socket.on('messageEvent', function(res) {
        console.log(res)
        if (!res) {
          return
        }
        var result = JSON.parse(res)
        if (result.content === '连接成功') {
          return
        }
        console.log(JSON.parse(result.content))
        var data = JSON.parse(result.content)
        console.log(Object.prototype.toString.call(data) === '[object Object]')
        if (data && Object.prototype.toString.call(data) === '[object Object]') {
          var list = _this.getStorage('MSG_LIST') || []
          var flag = false
          for (var t = 0; t < list.length; t++) {
            var e = list[t];
            if (e.id === f.id) {
              flag =true
              break
            }
          }
          if (!flag) {
            data.clicked = false
            data.exposure = false
            list.push(data)
          }
          _this.setStorage('MSG_LIST', list)
          _def.handleMessageEvent(list);
        }
      });
    }
    if (!_this.def.serverUrl && !_this.serverUrl) {
      if (_this.routeUrl) {
        httpAjax({
          // 路由，返回某个可用的服务器信息
          url: _this.routeUrl + '/mns-route/route',
          method: 'get',
          data: {},
          success: function(res) {
            if (res.code !== 1000) {
              console.error('-----route:' + '--请配置或检查网络是否正常')
              return
            }
            if (!res.data || !res.data.host || !res.data.webSocketPort) {
              console.error('-----route:' + '--请配置或检查网络是否正常')
              return
            }
            _this.serverUrl = 'http://' + res.data.host + ':' + res.data.webSocketPort;
            getUserIdByUserAccont()
          }
        });
      } else {
        console.error('-----route:' + '--请配置routeUrl')
      }
    } else {
      getUserIdByUserAccont()
    }
  };

  /**
   * 状态检查器：监测并控制Websocket连接状态
   */
  WebSocketManage.prototype.getMsgTemplate = function(){
    var _webSocketManageContext = this;
    var msgTemplateContext = {
      MSG_LIST: "MSG_LIST", // 本地存储状态名
      SCENE_LIST: "SCENE_LIST", // 本地存储状态名
      getAppOnlineStatusTimer: null,
      // 关闭状态管理器
      close: function () {
        this.clearWebsocket();
        this.clearTimer();
      },
      clearWebsocket: function () {
        if (_webSocketManageContext.clientStatus) {
          _webSocketManageContext.disconncet();
        }
      },
      clearTimer: function () {
        if (this.getAppOnlineStatusTimer) {
          clearInterval(this.getAppOnlineStatusTimer);
          this.getAppOnlineStatusTimer = null;
        }
      },
      getMessageTemplateInfo(messageCode,cb) {
        _webSocketManageContext.httpAjax({
            // 根据消息编码查询消息模板详情
            url: _webSocketManageContext.routeUrl + '/mns-route/message/info/selectMessageTemplateInfo',
            data: {
              messageCode: messageCode
            },
            success: function(res) {
              if (res && res.data) {
                // resolve(res.data)
              if (res && res.data) {
                console.log('getMessageTemplateInfo=============')
                cb(res.data)
              }
            }
          }
        });
      },
      getMsgList: function () {
        var _this = this;
        _webSocketManageContext.httpAjax({
          // 用户消息拉取
          url: _webSocketManageContext.routeUrl + '/mns-route/message/pull',
          data: {
            userId: _webSocketManageContext.userId,
            pageNumber: 1,
            pageSize: 9999,
            sceneCode: ''
          },
          success: function(res) {
            console.log(res)
            if (res && res.data && res.data.records) {
              var list = _this.getLocalList(_this.MSG_LIST) || []
              var addList = []
              for (var i = 0; i < res.data.records.length; i++) {
                var f = res.data.records[i];
                console.log(f)
                var flag = false
                for (var t = 0; t < list.length; t++) {
                  var e = list[t];
                  if (e.id === f.id) {
                   flag = true
                  }
                }
                if (!flag) {
                  f.clicked = false
                  f.exposure = false
                  addList.push(f)
                }
              }
              list = list.concat(addList)
              _this.updateLocalList(_this.MSG_LIST, list)
              console.log(_this.getLocalList(_this.MSG_LIST))
              _this.messageList = _this.getTemplate(_webSocketManageContext.sceneCode)
              
            }
          }
        }); // ajax 请求获取连接状态
      },
      returnMsg(sceneCode) {
        var _this = this
        const list = _this.getLocalList(_this.MSG_LIST) || []
        var msgList = []
        for (var i = 0; i < list.length; i++) {
          const e = list[i];
          if (!e.validStartTime || !e.validEndTime) {
            continue
          }
          var oDate1 = new Date(e.validStartTime);
          var oDate2 = new Date(e.validEndTime);
          var nowDate = new Date()
          if(nowDate.getTime() < oDate1.getTime() || nowDate.getTime() > oDate2.getTime()){
            continue
          }
          var sceneCodeList = e.sceneCode.split(',')
          if (sceneCodeList.indexOf(sceneCode) > -1 && !e.exposure) {
            msgList.push({
              messageCode: e.messageCode,
              priority: e.priority,
              validEndTime: e.validEndTime,
              validStartTime: e.validStartTime
            })
          }
        }
        msgList.sort(function(a,b){
          return  Number(a.priority || 0)-Number(b.priority || 0);
        })
        return msgList
      },
      returnTemplate(msgList) {
        console.log('returnTemplate',msgList)
        var count = 0
        for (var i = 0; i < msgList.length; i++) {
          const e = msgList[i];
          this.getMessageTemplateInfo(e.messageCode, function(obj) {
            count++
            e.viewJsonOne = obj.viewJsonOne
            e.viewJsonTwo = obj.viewJsonTwo
            console.log('returnTemplate----回调')
            console.log(count, msgList.length)
            if (count === msgList.length) {
              _webSocketManageContext.def.handleMessageEvent(msgList)
            }
          })
        }
      },
      getLocalList: function (name) {
        console.log('_webSocketManageContext.getStorage(name);',_webSocketManageContext.getStorage(name))
        return _webSocketManageContext.getStorage(name);
      },
      updateLocalList: function (name, list) {
        _webSocketManageContext.setStorage(name, list);
      },
      //  点击了按钮之后就要调用clicked
      clicked: function (messageCode) {
        var _this = this;
        const list = _this.getLocalList(_this.MSG_LIST) || []
        if (list && list.length > 0) {
          for (var i = 0; i < list.length; i++) {
            if (list[i].messageCode === messageCode) {
              _this.httpExposure(list[i].id, i)
              break
            }
          }
        }
      },
      // 就是你显示了这个消息之后就要调用exposured 
      exposured: function (messageCode) {
        var _this = this;
        const list = _this.getLocalList(_this.MSG_LIST) || []
        if (list && list.length > 0) {
          for (var i = 0; i < list.length; i++) {
            if (list[i].messageCode === messageCode) {
              _this.httpExposure(list[i].id, i)
              break
            }
          }
        }
      },
      httpExposure: function(id, index) {
        const list = _this.getLocalList(_this.MSG_LIST)
        _webSocketManageContext.httpAjax({
          url: _webSocketManageContext.routeUrl + '/mns-route/message/ack/exposure',
          method: 'post',
          data: {
            id
          },
          success: function(res) {
            if (res && res.code === 1000) {
              list[index].exposure = true
            }
          }
        });
      },
      httpClick: function(id, index) {
        const list = _this.getLocalList(_this.MSG_LIST) || []
        _webSocketManageContext.httpAjax({
          url: _webSocketManageContext.routeUrl + '/mns-route/message/ack/click',
          method: 'post',
          data: {
            id
          },
          success: function(res) {
            if (res && res.code === 1000) {
              list[index].clicked = true
            }
          }
        });
      },
      getTemplate(sceneCode) {
        console.log(sceneCode)
        if (!sceneCode) {
          return []
        }
        this.returnTemplate(this.returnMsg(sceneCode))
      },
      // 普通页初始化
      init: function () {
        this.clearTimer();
        // 执行检测是否链接websocket逻辑
        if (this.getAppOnlineStatusTimer) return;
        var time = time || 2000;
        this.clearWebsocket();  
        var _this = this;
        this.getAppOnlineStatusTimer = setInterval(function () {
          if (!_webSocketManageContext.clientStatus) {
            _webSocketManageContext.connect(); // 连接websocket
          }
        }, time);
      },
      setScene(sceneCode) {
        _webSocketManageContext.sceneCode = sceneCode
      }
    };
    this.msgTemplateContext = msgTemplateContext;
    return msgTemplateContext;
  }

  // 对象合并
  function deepMerge(o, n) {
    for(var key in n) {
        // 如果target(也就是o[key])存在，且是对象的话再去调用deepMerge，否则就是o[key]里面没这个对象，需要与n[key]合并
        o[key] = o[key] && o[key].toString() === "[object Object]" ?
        deepMerge(o[key], n[key]) : o[key] = n[key];
    }
    return o;
  }

  /**
   * 设置本地存储数据
   * @param {string} key 存储字段名
   * @param {string} value 存储字段值
   */
  function setStorage(key, value) {
    // 如cookie
    return setCookie(key, value);
  }

  /**
   * 读取本地存储数据
   * @param {string} key 存储字段名
   * @return {string} 返回值描述
   */
  function getStorage(key) {
      // 如cookie
      return getCookie(key);
  }

  // 当本地缓存方案使用cookie时
  function getCookie(key) {
    var arr = null;
    if (document.cookie != null && document.cookie.length > 0)
        arr = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
    if (arr != null)
        return unescape(arr[2]);
    return null;
  }

  function setCookie(key, val) {
      var Days = 7; //此 cookie 将被保存 7 天
      var exp = new Date(); //new Date("December 31, 9998");
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
      document.cookie = key + "=" + escape(val) + ";expires=;path=/";
  }

  // Ajax请求
  function httpAjax(options) {
    // uni.request(options);
    console.log(options.url)
    var xhr = null, // XMLHttpRequest对象
        url = options.url, // url地址
        method = options.method || 'get', // 传输方式，默认为get
        async = typeof (options.async) === "undefined" ? true : options.async,
        data = options.data || null, // 参数
        params = '',
        callback = options.success, // ajax请求成功的回调函数                   
        error = options.error;
    // 将data的对象字面量的形式转换为字符串形式
    if (data) {
      if (method === "get") {
        for (var i in data) {
            params += i + '=' + data[i] + '&';
        }
        //拼接后的内容 'pageNumber=1&pageSize=20&'
        // 去掉最后的&
        params = params.replace(/&$/, "");
      } else  {
        console.log(options.data)
        /* 
        var data= {
          channelCode:1,
          userAccount: 2
        }
        '{"channelCode":1,"userAccount":2}' 
        */
        params = JSON.stringify(options.data)
      }
    }
    // 根据method的值改变url
    // https://ai.pukkavision.com?pageNumber=1&pageSize=20
    if (method === "get" && params) {
        url += '?' + params;
    }
    // XMLHttpRequest 存在
    if (typeof XMLHttpRequest != "undefined") {
        xhr = new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefined") {
        // 将所有可能出现的ActiveXObject版本放在一个数组中
        var xhrArr = ['Microsoft.XMLHTTP', 'MSXML2.XMLHTTP.6.0', 'MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP.2.0'];
        // 遍历创建XMLHttpRequest对象
        var len = xhrArr.length;
        for (var i = 0; i < len; i++) {
            try {
                // 创建XMLHttpRequest对象
                xhr = new ActiveXObject(xhrArr[i]);
                break;
            } catch (ex) {

            }
        }
    } else {
        throw new Error('No XHR object availabel.');
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                callback && callback(JSON.parse(xhr.responseText))
            } else {
                error && error();
            }
        }
    }
    // 创建发送请求
    xhr.open(method, url, async);
    if (method === 'get') {
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    } else {
      xhr.setRequestHeader("Content-type","application/json");
    }
    xhr.send(params);
  }

  // 最后将插件对象暴露给全局对象
  _global = (function () {
    return this || (0, eval)("this");
  })();
  !("WebSocketManage" in _global) &&
    (_global.WebSocketManage = WebSocketManage);
})();
