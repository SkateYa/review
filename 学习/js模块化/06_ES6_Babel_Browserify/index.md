1. npm init -y
2. npm i --save-dev @babel/core @babel/cli @babel/preset-env
babel js/src -d js/build
3. 新建一个.babelrc文件 在里面写入以下代码
{
  "presets": ["@babel/preset-env"]
}
4. 写相关的模块代码
5.将es6转化为es5: babel js/src -d js/build

npm install --save-dev babel-cli
npx babel js/src -d js/build


browserify js/lib/app.js -o js/lib/bundle.js