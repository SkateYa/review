目录
*****
[TOC]
*****

# 初始化
## 是否写过Loader？简单描述一下编写loader的思路？
Loader 支持链式调用，所以开发上需要严格遵循“单一职责”，每个 Loader 只负责自己需要负责的事情。
Loader的API 可以去官网查阅

Loader 运行在 Node.js 中，我们可以调用任意 Node.js 自带的 API 或者安装第三方模块进行调用Webpack 传给 Loader 的原内容都是 UTF-8 格式编码的字符串，当某些场景下 Loader 处理二进制文件时，需要通过 exports.raw = true 告诉 Webpack 该 Loader 是否需要二进制数据尽可能的异步化 Loader，如果计算量很小，同步也可以Loader 是无状态的，我们不应该在 Loader 中保留状态使用 loader-utils 和 schema-utils 为我们提供的实用工具加载本地 Loader 方法

Npm linkResolveLoader

## 是否写过Plugin？简单描述一下编写Plugin的思路？
webpack在运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在特定的阶段钩入想要添加的自定义功能。Webpack 的 Tapable 事件流机制保证了插件的有序性，使得整个系统扩展性良好。
Plugin的API 可以去官网查阅

compiler 暴露了和 Webpack 整个生命周期相关的钩子compilation 暴露了与模块和依赖有关的粒度更小的事件钩子插件需要在其原型上绑定apply方法，才能访问 compiler 实例传给每个插件的 compiler 和 compilation对象都是同一个引用，若在一个插件中修改了它们身上的属性，会影响后面的插件找出合适的事件点去完成想要的功能

emit 事件发生时，可以读取到最终输出的资源、代码块、模块及其依赖，并进行修改(emit 事件是修改 Webpack 输出资源的最后时机)watch-run 当依赖的文件发生变化时会触发
异步的事件需要在插件处理完任务时调用回调函数通知 Webpack 进入下一个流程，不然会卡住

## Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
确定入口：根据配置中的 entry 找出所有的入口文件
编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。
简单说

初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler
编译：从 Entry 出发，针对每个 Module 串行调用对应的 Loader 去翻译文件的内容，再找到该 Module 依赖的 Module，递归地进行编译处理
输出：将编译后的 Module 组合成 Chunk，将 Chunk 转换成文件，输出到文件系统中

## 初始化项目

```
1. npm init  (初始化项目，npm init会生成一个pakeage.json文件)
2. npm i webpack webpack-cli -g （全局按照webpack-cli,默认安装的是webpack5，如需安装webpack4）
3. npm i webpack webpack-cli -D      （本地安装,安装开发依赖，-D等价于--save-dev）
4. 打包命令  
webapck 能生成build文件
webpack serve  (不能生成build文件，能自动打开浏览器)
```
# 开发环境配置  

## 运行命令  

```
（ webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js 整体打包环境，是开发环境）
webpack --mode development   （mac）
webpack ./src/index.js -o ./build/built.js --mode=development    （windows）
生产环境
webpack --mode production  （mac）
webpack ./src/index.js -o ./build/built.js --mode=production  （windows）
    1. webpack能处理js/json资源，不能处理css/img等其他资源
    2. 生产环境和开发环境将ES6模块化编译成浏览器能识别的模块化~
    3. 生产环境比开发环境多一个压缩js代码。
5.webpack.config.js
webpack的配置文件
    作用: 指示 webpack 干哪些活（当你运行 webpack 指令时，会加载里面的配置）
    所有构建工具都是基于nodejs平台运行的~模块化默认采用commonjs。
```



```
// resolve用来拼接绝对路径的方法
const { resolve } = require('path');

module.exports = {
  // webpack配置
  // 入口起点
  entry: './src/index.js',
  // 输出
  output: {
    // 输出文件名
    filename: 'built.js',
    // 输出路径(绝对路径，需要引用node.js的path)
    // __dirname nodejs的变量，代表当前文件的目录绝对路径
    path: resolve(__dirname, 'build')
  },
  // loader的配置
  module: {
    rules: [
      // 详细loader配置
      // 不同文件必须配置不同loader处理
      {
        // 匹配哪些文件
        test: /\.css$/,
        // 使用哪些loader进行处理
        use: [
          // use数组中loader执行顺序：从右到左，从下到上 依次执行
          // 创建style标签，将js中的样式资源插入进行，添加到head中生效
          'style-loader',
          // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 将less文件编译成css文件
          // 需要下载 less-loader和less
          'less-loader'
        ]
      }
    ]
  },
  // plugins的配置
  plugins: [
    // 详细plugins的配置
  ],
  // 模式
  mode: 'development', // 开发模式
  // mode: 'production'
}
```
## 打包css资源
安装css-loader和 style-loader （loader: 1. 下载   2. 使用（配置loader））

```
npm i css-loader style-loader -D
```
## 打包less资源
安装less-loader 和 less

```
npm i less-loader -D   
npm i less -D
```
## 打包html资源（html-webpack-plugin）
下载解析html的插件 （plugins: 1. 下载  2. 引入  3. 使用）
生成一个 HTML5 文件， 在 body 中使用 script 标签引入你所有 webpack 生成的 bundle。 只需添加该插件到你的 webpack 配置中
```
npm i html-webpack-plugin -D

npm install clean-webpack-plugin -D
```

配置插件，默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）

清空上次打包的文件
```
/*
  loader: 1. 下载   2. 使用（配置loader）
  plugins: 1. 下载  2. 引入  3. 使用
*/
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 
 const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  
   plugins: [
    // plugins的配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
    // 需求：需要有结构的HTML文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件（用绝对路径），并自动引入打包输出的所有资源（JS/CSS）
      template: './src/index.html'
    }),
    // 每次打包的时候，打包目录都会遗留上次打包的文件，为了保持打包目录的纯净，我们需要在打包前将打包目录清空
    new CleanWebpackPlugin(), // 引入插件
  ],
```
## 打包图片资源
要下载url-loader 和 file-loader

```
npm i url-loader file-loader -D
```

```
{
    // 问题：默认处理不了html中img图片
    // 处理图片资源
    test: /\.(jpg|png|gif)$/,
    // 使用一个loader
    // 下载 url-loader file-loader
    loader: 'url-loader',
    options: {
      // 图片大小小于8kb，就会被base64处理
      // 优点: 减少请求数量（减轻服务器压力）
      // 缺点：图片体积会更大（文件请求速度更慢）
      limit: 8 * 1024,
      // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
      // 解析时会出问题：[object Module]
      // 解决：关闭url-loader的es6模块化，使用commonjs解析
      esModule: false,
      // 给图片进行重命名
      // [hash:10]取图片的hash的前10位
      // [ext]取文件原来扩展名
      name: '[hash:10].[ext]'
    }
  },
```

## 处理html文件的img图片


```
npm i html-loader -D
```

```
  {
    test: /\.html$/,
    // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
    loader: 'html-loader'
  }
```
## 打包其他资源
module -> rules排除其他资源(例如字体文件)

```
// 打包其他资源(除了html/js/css资源以外的资源)
  {
    // 排除css/js/html资源
    exclude: /\.(css|js|html|less)$/,
    loader: 'file-loader',
    options: {
      name: '[hash:10].[ext]'
    }
  }
```
## 自动化部署(webpack-dev-server )

```
npm i webpack-dev-server -D

启动命令：webpack serve
```

```
// 开发服务器 devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
  // 特点：只会在内存中编译打包，不会有任何输出
  // 启动devServer指令为：npx webpack-dev-server
  
  // 和mode模块同级
  devServer: {
    // 项目构建后路径
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true
  }
```
## 开发环境详细配置

```
/*
  开发环境配置：能让代码运行
    运行项目指令：
      webpack 会将打包结果输出出去
      npx webpack-dev-server 只会在内存中编译打包，没有输出
*/


const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // loader的配置
            {
                // 匹配哪些文件
                test: /\.css$/,
                // 使用哪些loader进行处理
                use: [
                    // use数组中loader执行顺序：从右到左，从下到上 依次执行
                    // 创建style标签，将js中的样式资源插入进行，添加到head中生效
                    'style-loader',
                    // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 将less文件编译成css文件
                    // 需要下载 less-loader和less
                    'less-loader'
                ]
            }, 
            {
                // 问题：默认处理不了html中img图片
                // 处理图片资源
                test: /\.(jpg|png|gif)$/,
                // 使用一个loader
                // 下载 url-loader file-loader
                loader: 'url-loader',
                options: {
                    // 图片大小小于8kb，就会被base64处理
                    // 优点: 减少请求数量（减轻服务器压力）
                    // 缺点：图片体积会更大（文件请求速度更慢）
                    limit: 8 * 1024,
                    // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
                    // 解析时会出问题：[object Module]
                    // 解决：关闭url-loader的es6模块化，使用commonjs解析
                    esModule: false,
                    // 给图片进行重命名
                    // [hash:10]取图片的hash的前10位
                    // [ext]取文件原来扩展名
                    name: '[hash:10].[ext]'
                }
            },
            {
                // 处理html中img资源
                test: /\.html$/,
                // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
                loader: 'html-loader'
            },
            {
                // 处理其他资源
                exclude: /\.(css|html|js|less|jpg|png|gif)/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'css'
                }
            }
        ]
    },
    plugins: [
        // plugins的配置
        // html-webpack-plugin
        // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
        // 需求：需要有结构的HTML文件
        new HtmlWebpackPlugin({
            // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
            template: './src/index.html'
        })
    ],
    // 开发服务器 devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~）
    // 特点：只会在内存中编译打包，不会有任何输出
    // 启动devServer指令为：npx webpack-dev-server
    devServer: {
        // 项目构建后路径
        contentBase: resolve(__dirname, 'build'),
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 3000,
        // 自动打开浏览器
        open: true
    },
    mode: 'development'
}
```
# 生产环境配置
## 提取css为单独文件
安装插件（提取css成一个单独的文件）

```
npm i mini-css-extract-plugin -D
```
MiniCssExtractPlugin.loader,这个loader取代style-loader,作用：提取js中的css成单独文件

```
// module
{
    test: /\.css$/,
    use: [
      // 创建style标签，将样式放入
      // 'style-loader', 
      // 这个loader取代style-loader。作用：提取js中的css成单独文件
      MiniCssExtractPlugin.loader,
      // 将css文件整合到js文件中
      'css-loader'
    ]
  }

// plugins
 new MiniCssExtractPlugin({
  // 对输出的css文件进行重命名
  filename: 'css/built.css'
})
```
## css兼容性处理
安装css兼容性插件

```
npm i postcss-loader postcss-preset-env -D
```

browserslist配置
```
/*
css兼容性处理：postcss --> postcss-loader postcss-preset-env

帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
  development
       "last 1 chrome version",   兼容最近对一个chrome的版本
  production
      ">0.2%",    //大于99.8%的浏览器
      "not dead",  //不要死的浏览器
      "not op_mini all" 。 //op_mini已经死掉的浏览器

"browserslist": {
  // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
  "development": [
    "last 1 chrome version",
    "last 1 firefox version",
    "last 1 safari version"
  ],
  // 生产环境：默认是看生产环境
  "production": [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ]
}
*/
```

```
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module:{
        rules:[
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    // 使用loader的默认配置
                    // 'postcss-loader',
                    // 修改loader的配置要写成对象的方式
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                // postcss的插件
                                require('postcss-preset-env')()
                            ]
                        }
                    }
                ]
            }
        ]
    },
```
## 压缩css插件（optimize-css-assets-webpack-plugin）
仅在生产环境开启 CSS 优化。
```
npm i optimize-css-assets-webpack-plugin -D   (webpack4)
npm i css-minimizer-webpack-plugin -D   (webpack5)
```

```
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

plugins: [
  new CssMinimizerWebpackPlugin()
]
```
## 语法检查

https://www.npmjs.com/package/eslint-config-airbnb-base
需要下载：eslint-loader  eslint-config-airbnb-base  eslint-plugin-import eslint 

```
npm i eslint-loader eslint eslint-config-airbnb-base eslint-plugin-import -D
```

// 下一行eslint所有规则都失效（下一行不进行eslint检查）
// eslint-disable-next-line

```
使用eslint/*
语法检查： eslint-loader  eslint
  注意：只检查自己写的源代码，第三方的库是不用检查的
  设置检查规则：
    package.json中eslintConfig中设置(手动输入)~
      "eslintConfig": {
        "extends": "airbnb-base"
      }
    airbnb --> eslint-config-airbnb-base  eslint-plugin-import eslint
  */
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
    options: {
      // 自动修复eslint的错误
      fix: true,
    },
  },
```
## js兼容性

```
npm i babel-loader @babel/core  @babel/preset-env -D   (webpack4)
npm i babel-loader  @babel/preset-env -D  (webpack5)

npm i @babel/polyfill -D
```

```
/*
js兼容性处理：babel-loader @babel/core
  1. 基本js兼容性处理 --> @babel/preset-env
    问题：只能转换基本语法，如promise高级语法不能转换
  2. 全部js兼容性处理 --> @babel/polyfill
    问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了~
  3. 需要做兼容性处理的就做：按需加载  --> core-js
*/


{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      // 预设：指示babel做怎么样的兼容性处理
      presets: [
        [
          '@babel/preset-env',
          {
             // 按需加载
            useBuiltIns: 'usage',
            // 指定core-js版本
            corejs: {
              version: 3,
            },
            // 指定兼容性做到哪个版本浏览器
            targets: {
              chrome: '60',
              firefox: '60',
              ie: '9',
              safari: '10',
              edge: '17',
            },
          },
        ],
      ],
    },
  }
```
## js压缩
生产环境下会自动压缩js代码
```
mode: 'production',
```
## html压缩
webpack5会自动压缩
webpack4要配置

```
const HtmlWebpackPlugin = require('html-webpack-plugin');


plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 压缩html代码
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    })
  ],
```
## 生产环境详细配置

```
/*
  webpack.config.js  webpack的配置文件
    作用: 指示 webpack 干哪些活（当你运行 webpack 指令时，会加载里面的配置）

    所有构建工具都是基于nodejs平台运行的~模块化默认采用commonjs。
*/

// resolve用来拼接绝对路径的方法
const {
  resolve,
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

// 定义nodejs环境变量：决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production';
/*
    css兼容性处理：postcss --> postcss-loader postcss-preset-env

    帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式

    "browserslist": {
      // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
      "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
      ],
      // 生产环境：默认是看生产环境
      "production": [
        ">0.2%",
        "not dead",
        "not op_mini all"
      ]
    }
  */

// 复用loader
const commonCssLoader = [
  // 创建style标签，将样式放入
  // 'style-loader',
  // 这个loader取代style-loader。作用：提取js中的css成单独文件
  MiniCssExtractPlugin.loader,
  // 将css文件整合到js文件中
  'css-loader',
  {
    // 还需要在package.json中定义browserslist
    // 使用loader的默认配置
    // 'postcss-loader',
    // 修改loader的配置
    loader: 'postcss-loader',
    // 修改postcss-loader的配置
    options: {
      ident: 'postcss',
      // postcss的插件
      plugins: () => [require('postcss-preset-env')()],
    },
  },
];

module.exports = {
  // webpack配置
  // 入口起点
  entry: './src/index.js',
  output: {
    // 输出文件名
    filename: 'built.js',
    // 输出路径
    // __dirname nodejs的变量，代表当前文件的目录绝对路径
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [{
      test: /\.css$/,
      // use数组中loader执行顺序：从右到左，从下到上 依次执行
      // 创建style标签，将js中的样式资源插入进行，添加到head中生效
      use: [...commonCssLoader],
    },
    {
      test: /\.less$/,
      use: [...commonCssLoader, 'less-loader'],
    },
    /*
                正常来讲，一个文件只能被一个loader处理。
                当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
                  先执行eslint 在执行babel
              */
    /*
                语法检查： eslint-loader  eslint
                  注意：只检查自己写的源代码，第三方的库是不用检查的
                  设置检查规则：
                    package.json中eslintConfig中设置~
                      "eslintConfig": {
                        "extends": "airbnb-base"
                      }
                    airbnb --> eslint-config-airbnb-base  eslint-plugin-import eslint
              */
    {
      // 在package.json中eslintConfig --> airbnb
      test: /\.js/,
      exclude: /node_modules/,
       // 优先执行
      enforce: 'pre',
      loader: 'eslint-loader',
      options: {
        // 自动修复eslint的错误
        fix: true,
      },
    },
    /*
                js兼容性处理：babel-loader @babel/core
                  1. 基本js兼容性处理 --> @babel/preset-env
                    问题：只能转换基本语法，如promise高级语法不能转换
                  2. 全部js兼容性处理 --> @babel/polyfill
                    问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了~
                  3. 需要做兼容性处理的就做：按需加载  --> core-js
              */
    {
      test: /\.js/,
      // 排除node_modules文件
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        // 预设：指示babel做怎么样的兼容性处理
        presets: [
          [
            '@babel/preset-env',
            {
              // 按需加载
              useBuiltIns: 'usage',
              // 指定core-js版本
              corejs: {
                version: 3,
              },
              // 指定兼容性做到哪个版本浏览器
              targets: {
                chrome: '60',
                firefox: '60',
                ie: '9',
                safari: '10',
                edge: '17',
              },
            },

          ],
        ],
      },
    },
    {
      test: /\.(jpg|png|gif)/,
      // 使用一个loader
      // 下载 url-loader file-loader
      loader: 'url-loader',
      options: {
        // 图片大小小于8kb，就会被base64处理
        // 优点: 减少请求数量（减轻服务器压力）
        // 缺点：图片体积会更大（文件请求速度更慢）
        limit: 8 * 1024,
        // 给图片进行重命名
        // [hash:10]取图片的hash的前10位
        // [ext]取文件原来扩展名
        name: '[hash:10].[ext]',
        outputPath: 'imgs',
        // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
        // 解析时会出问题：[object Module]
        // 解决：关闭url-loader的es6模块化，使用commonjs解析
        esModule: false,
      },
    },
    {
      test: /\.html$/,
      // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
      loader: 'html-loader',
    },
    {
      // 排除js|css|less|html|jpg|png|gif资源
      exclude: /\.(js|css|less|html|jpg|png|gif)/,
      loader: 'file-loader',
      options: {
        // 打包后文件存放的文件夹
        outputPath: 'media',
      },
    },
    ],
  },
  plugins: [
    // html-webpack-plugin
    // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
    // 需求：需要有结构的HTML文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
      template: './src/index.html',
      // 压缩html代码
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }),
    // css插件，对输出的css文件进行重命名
    new MiniCssExtractPlugin({
      filename: 'css/built.css',
    }),
    // 压缩css
    new CssMinimizerWebpackPlugin(),

  ],
  // 开发服务器 devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~）
  // 特点：只会在内存中编译打包，不会有任何输出
  // 启动devServer指令为：npx webpack-dev-server
  devServer: {
    // 项目构建后路径
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true,
  },
  // 生产环境下会自动压缩js代码
  mode: 'production',
};

```
# webpack性能优化
* 开发环境性能优化
* 生产环境性能优化

## 开发环境性能优化
* 优化打包构建速度
  * HMR
* 优化代码调试
  * source-map

## 生产环境性能优化
* 优化打包构建速度
  * oneOf
  * babel缓存
  * 多进程打包
  * externals
  * dll
* 优化代码运行的性能
  * 缓存(hash-chunkhash-contenthash)
  * tree shaking
  * code split
  * 懒加载/预加载
  * pwa
  

## HMR配置(热模块替换 开发环境下配置)
webpack5 需要新增配置
target: 'web',  （和entry同级）

```
/*
  HMR: hot module replacement 热模块替换 / 模块热替换
    作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
      极大提升构建速度

      样式文件：可以使用HMR功能：因为style-loader内部实现了~（hot: true）

      html文件: 默认不能使用HMR功能.同时会导致问题：html文件不能热更新了~ （不用做HMR功能）
        解决：修改entry入口，将html文件引入

      vue文件：vue-loader内部实现，同理配置vue-loader直接使用HMR。
    
      js文件：默认不能使用HMR功能 --> 需要修改js代码，添加支持HMR功能的代码
        注意：HMR功能对js的处理，只能处理非入口js文件的其他文件。（入口文件做不了）

        if (module.hot) {
        // 一旦 module.hot 为true，说明开启了HMR功能。 --> 让HMR功能代码生效
        module.hot.accept('./print.js', function() {
            // 方法会监听 print.js 文件的变化，一旦发生变化，其他模块不会重新打包构建。
            // 会执行后面的回调函数
            print();
        });
        }
   */
   
   devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 5000,
    open: true,
    // 开启HMR功能
    // 当修改了webpack配置，新配置要想生效，必须重新webpack服务
    hot: true,
  },
```
## source-map
source-map: 一种 提供源代码到构建后代码映射 技术 （如果构建后代码出错了，通过映射可以追踪源代码错误）

devtool与mode同级
```
devtool: 'eval-source-map'

/*
  source-map: 一种 提供源代码到构建后代码映射 技术 （如果构建后代码出错了，通过映射可以追踪源代码错误）

    [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

    source-map：外部
      错误代码准确信息 和 源代码的错误位置
    inline-source-map：内联
      只生成一个内联source-map
      错误代码准确信息 和 源代码的错误位置
    hidden-source-map：外部
      错误代码错误原因，但是没有错误位置
      不能追踪源代码错误，只能提示到构建后代码的错误位置
    eval-source-map：内联
      每一个文件都生成对应的source-map，都在eval
      错误代码准确信息 和 源代码的错误位置
    nosources-source-map：外部
      错误代码准确信息, 但是没有任何源代码信息
    cheap-source-map：外部
      错误代码准确信息 和 源代码的错误位置 
      只能精确的行
    cheap-module-source-map：外部
      错误代码准确信息 和 源代码的错误位置 
      module会将loader的source map加入

    内联 和 外部的区别：1. 外部生成了文件，内联没有 2. 内联构建速度更快

    开发环境：速度快，调试更友好
      速度快(eval>inline>cheap>...)
        eval-cheap-souce-map
        eval-source-map
      调试更友好  
        souce-map
        cheap-module-souce-map
        cheap-souce-map

      --> eval-source-map  / eval-cheap-module-souce-map

    生产环境：源代码要不要隐藏? 调试要不要更友好
      内联会让代码体积变大，所以在生产环境不用内联
      nosources-source-map 全部隐藏
      hidden-source-map 只隐藏源代码，会提示构建后代码错误信息

      --> source-map / cheap-module-souce-map
*/

```
## oneOf
默认情况下，文件会去匹配rules下面的每一个规则，即使已经匹配到某个规则了也会继续向下匹配。而如果将规则放在 oneOf 属性中，则一旦匹配到某个规则后，就停止匹配了。

以下loader只会匹配一个
注意：不能有两个配置处理同一种类型文件(如果需要多个配置处理同一类型文件需要写在oneOf外层)

```
rules: [
      {
        // 在package.json中eslintConfig --> airbnb
        test: /\.js/,
        exclude: /node_modules/,
        // 优先执行
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      {
        // 以下loader只会匹配一个
        // 注意：不能有两个配置处理同一种类型文件
        oneOf: [{
          test: /\.css$/,
          use: [...commonCssLoader],
        },
        {
          test: /\.js/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: {
                    version: 3,
                  },
                  targets: {
                    chrome: '60',
                    firefox: '60',
                    ie: '9',
                    safari: '10',
                    edge: '17',
                  },
                },

              ],
            ],
          },
        }
        ],
      }
    ],
```

## 缓存

```
output: {
    filename: '[contenthash].bundle.js',
  },

/*
  缓存：
    babel缓存
      cacheDirectory: true
      --> 让第二次打包构建速度更快
    文件资源缓存
      hash: 每次wepack构建时会生成一个唯一的hash值。
        问题: 因为js和css同时使用一个hash值。
          如果重新打包，会导致所有缓存失效。（可能我却只改动一个文件）
      chunkhash：根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就一样
        问题: js和css的hash值还是一样的
          因为css是在js中被引入的，所以同属于一个chunk
      contenthash: 根据文件的内容生成hash值。不同文件hash值一定不一样
      --> 让代码上线运行缓存更好使用
*/

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        oneOf: [
        /*
            正常来讲，一个文件只能被一个loader处理。
            当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
              先执行eslint 在执行babel
          */
        {
          test: /\.js/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: {
                    version: 3,
                  },
                  targets: {
                    chrome: '60',
                    firefox: '60',
                    ie: '9',
                    safari: '10',
                    edge: '17',
                  },
                },
              ],
            ],
            // 开启babel缓存
            // 第二次构建时，会读取之前的缓存
            cacheDirectory: true,
          },
        }
        ],
      }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/built.[contenthash:10].css',
    })
  ],
  mode: 'production',
  devtool: 'source-map',
};
```

## tree shaking（生产环境）
Tree Shaking(树摇)：移除 JavaScript 上下文中的未引用代码(dead-code)。将整个应用程序想象成一棵树，绿色的树叶表示实际用到的source code（源码）和library（库），灰色的树叶则表示未被使用的代码，是枯萎的树叶。为了除去这些死去的无用的树叶，你需要摇动这棵树使其落下。这就是Tree Shaking的名称由来。

在Webpack4中还做不到，Webpack4中只会去除从未被使用的模块。带入上面的例子，如果test在index.js文件中没有被用到，才会被Tree Shaking。之所以这样，是因为Webpack4默认认为所有文件的代码都是有副作用的。如何告知Webpack你的代码是否有副作用，可通过package.json中的sideEffects字段。


```
/*
  tree shaking：去除无用代码
    前提：1. 必须使用ES6模块化  2. 开启production环境
    作用: 减少代码体积

    在package.json中配置 
      "sideEffects": false 所有代码都没有副作用（都可以进行tree shaking）
        问题：有的版本可能可能会把css / @babel/polyfill （副作用）文件干掉
        保留css文件和less文件
      "sideEffects": ["*.css", "*.less"]
*/
```
## code split
### 1.多入口（有几个入口输出几个文件）

```
 entry: {
    // 多入口：有一个入口，最终输出就有一个bundle,有多个就输出多个bundle
    index: './src/js/index.js',
    test: './src/js/test.js'
  },
 mode: 'production'
```
### 2 optimization
可以是单入口或者多入口

```
// entry: './src/index.js',
  entry: {
    main: './src/index.js',
    test: './src/test.js',
  },

 /*
    1. 单入口 可以将node_modules中代码单独打包一个chunk最终输出
    2. 多入口 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
  */
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
 mode: 'production',
```
### 3.单入口（用的多）

webpack.config.js
```
entry: './src/index.js',
/*
    1. 单入口 可以将node_modules中代码单独打包一个chunk最终输出
    2. 多入口 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
  */
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  mode: 'production',
```

index.js (入口文件)

```
/*
  通过js代码，让某个文件被单独打包成一个chunk
  import动态导入语法：能将某个文件单独打包
  webpackChunkName: 'test'  命名为test
*/
import(/* webpackChunkName: 'test' */'./test')
  .then(({ mul, count }) => {
    // 文件加载成功~
    // eslint-disable-next-line
    console.log(mul(2, 5));
  })
  .catch(() => {
    // eslint-disable-next-line
    console.log('文件加载失败~');
  });
```
## 懒加载/预加载(js)
index.js

```
console.log('index.js文件被加载了~');

// import { mul } from './test';

document.getElementById('btn').onclick = function() {
  // 懒加载~：当文件需要使用时才加载~
  // 预加载 prefetch：会在使用之前，提前加载js文件 
  // 正常加载可以认为是并行加载（同一时间加载多个文件）  
  // 预加载 prefetch：等其他资源加载完毕，浏览器空闲了，再偷偷加载资源(兼容性不太好，慎用)
  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test').then(({ mul }) => {
    console.log(mul(4, 5));
  });
};

```
## PWA
 PWA: 渐进式网络开发应用程序(离线可访问)
 workbox --> workbox-webpack-plugin

```
npm i workbox-webpack-plugin -D
```

webpack.config.js
```
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

plugins: [
    new WorkboxWebpackPlugin.GenerateSW({
      /*
        1. 帮助serviceworker快速启动
        2. 删除旧的 serviceworker

        生成一个 serviceworker 配置文件~
      */
      clientsClaim: true,
      skipWaiting: true
    })
 ]
```

index.js(入口文件)

```
/*
  1. eslint不认识 window、navigator全局变量
    解决：需要修改package.json中eslintConfig配置
      "env": {
        "browser": true // 支持浏览器端全局变量
      }
   2. sw代码必须运行在服务器上
      --> nodejs
      -->
        npm i serve -g
        serve -s build 启动服务器，将build目录下所有资源作为静态资源暴露出去
*/
// 注册serviceWorker
// 处理兼容性问题
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('sw注册成功了');
      })
      .catch(() => {
        console.log('sw注册失败了');
      });
  });
}
```
## 多进程
thread-loader 放到某个loader的后面可以对这个loader进行多进程打包
```
npm i thread-loader -D
```

```
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
      /* 
        开启多进程打包。 
        进程启动大概为600ms，进程通信也有开销。
        只有工作消耗时间比较长，才需要多进程打包
      */
      {
        loader: 'thread-loader',
        options: {
          workers: 2 // 进程2个
        }
      },
      {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: { version: 3 },
                targets: {
                  chrome: '60',
                  firefox: '50'
                }
              }
            ]
          ],
          // 开启babel缓存
          // 第二次构建时，会读取之前的缓存
          cacheDirectory: true
        }
      }
    ]
  },
```

## externals
externals 用来告诉 Webpack 要构建的代码中使用了哪些不用被打包的模块，这些模块可能是通过外部环境（如CDN）引入的。

webpack.config.js

```
  externals: {
    // 拒绝jQuery,vue等被打包进来
    'jquery': 'jQuery'
    'vue': 'Vue',
    'vue-router':'VueRouter',
    'vuex':'Vuex'
  }
```


html文件

```
<body>
  <h1 id="title">hello html</h1>
  <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
</body>
```
## dll  ？
在 webpack5.x 中已经不建议使用这种方式进行模块缓存，因为其已经内置了更好体验的 cache 方法

dll（动态链接库）：使用dll技术对公共库进行提前打包，可大大提升构建速度。公共库一般情况下是不会有改动的，所以这些模块只需要编译一次就可以了，并且可以提前打包好。在主程序后续构建时如果检测到该公共库已经通过dll打包了，就不再对其编译而是直接从动态链接库中获取。
实现dll打包需要以下三步：

抽取公共库，打包到一个或多个动态链接库中。
将打包好的动态链接库在页面中引入。
主程序使用了动态链接库中的公共库时，不能被打包入bundle，应该直接去动态链接库中获取。



```
npm i add-asset-html-webpack-plugin -D
```

webpack.config.js

```
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    // 告诉webpack哪些库不参与打包，同时使用时的名称也得变~(忽略一些文件)
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'dll/manifest.json')
    }),
    // 将某个文件打包输出去，并在html中自动引入该资源(忽略的文件再次引入)
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, 'dll/jquery.js'),
      // 解决index.html文件引入jquery路径多了‘auto/’，
      publicPath: ''
    })
  ],
  mode: 'production'
};

```
webpack.dll.js

```
/*
  使用dll技术，对某些库（第三方库：jquery、react、vue...）进行单独打包
    当你运行 webpack 时，默认查找 webpack.config.js 配置文件
    需求：需要运行 webpack.dll.js 文件
      --> webpack --config webpack.dll.js
*/

const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    // 最终打包生成的[name] --> jquery
    // ['jquery'] --> 要打包的库是jquery
    jquery: ['jquery'],
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dll'),
    library: '[name]_[hash]' // 打包的库里面向外暴露出去的内容叫什么名字
  },
  plugins: [
    // 打包生成一个 manifest.json --> 提供和jquery映射
    new webpack.DllPlugin({
      name: '[name]_[hash]', // 映射库的暴露的内容名称
      path: resolve(__dirname, 'dll/manifest.json') // 输出文件路径
    })
  ],
  mode: 'production'
};

```



