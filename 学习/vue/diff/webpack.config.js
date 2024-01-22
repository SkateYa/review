const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require('path');

module.exports={
    entry:'./src/js/index.js',
    output:{
        path:resolve(__dirname,'dist')
    },
    devtool:'source-map',
    plugins:[
       new HtmlWebpackPlugin({
        // template:'./src/index.html'
        template:resolve(__dirname,'./src/index.html')
       })
    ],
    devServer:{
        static: './',
        open:true
    },
    mode:'development'
}
