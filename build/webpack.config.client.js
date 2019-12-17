// path是Nodejs中的基本包,用来处理路径
const path = require('path');
// 引入html-webpack-plugin
const HTMLPlugin = require('html-webpack-plugin');
// 引入webpack
const webpack = require("webpack");
// 帮助我们很好得合并webpack配置
const merge = require('webpack-merge');
const ExtractPlugin = require("extract-text-webpack-plugin");
const baseConfig = require('./webpack.config.base');
// 判断是否为测试环境,在启动脚本时设置的环境变量都是存在于process.env这个对象里面的
const isDev = process.env.NODE_ENV === "development";
const defaultPlugin = [
    // 主要作用是在此处可以根据isdev配置process.env,一是可以在js代码中可以获取到process.env,
    // 二是webpack或则vue等根据process.env如果是development,会给一些特殊的错误提醒等,而这些特殊项在正式环境是不需要的
    new webpack.DefinePlugin({
        'process.env':{
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    // 引入HTMLPlugin
    new HTMLPlugin()
];
const devServer = {
    port: 8000, // 访问的端口号
    host: '127.0.0.1', // 可以设置0.0.0.0 ,这样设置你可以通过127.0.0.1或则localhost去访问
    overlay: {
        errors: true, // 编译中遇到的错误都会显示到网页中去
    },
    open: true , // 项目启动时,会默认帮你打开浏览器
    hot: true // 在单页面应用开发中,我们修改了代码后是整个页面都刷新,开启hot后,将只刷新对应的组件
};
let config;
if (isDev) {
    config = merge(baseConfig, {
        devtool: '#cheap-module-eval-source-map',
        module: {
            // 官方推荐使用这个配置,作用是在浏览器中调试时,显示的代码和我们的项目中的代码会基本相似,而不会显示编译后的代码,以致于我们调试连自己都看不懂
            rules: [
                {
                   test: /\.styl/,
                    use: [
                        // 将css写入到html中去
                        'vue-style-loader',
                        // css-loader处理css
                        'css-loader',
                        // stylus-loader和postcss-loader自己都会生成sourceMap,如果前面stylus-loader已生成了sourceMap
                        // 那么postcss-loader可以直接引用前面的sourceMap
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                            }
                        },
                        'stylus-loader' // 处理stylus的css预处理器的问题件,转换成css后,抛给上一层的css-loader
                    ],
                }
           ],

        },
        // 这个devServer的配置是在webpack2.x以后引入的,1.x是没有的
        devServer,
        // 添加两个插件用于hot:true的配置
        plugins: defaultPlugin.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    });
} else {
    config = merge(baseConfig, {
        // 覆盖默认entry配置
        entry: {
            app: path.join(__dirname, '../client/index.js'),
            vendor: ['vue']
        },
        output: {
            // 此处一定是chunkhash,因为用hash时app和vendor的hash码是一样的了,这样每次业务代码更新,vendor也会更新,也就没有了意义.
            filename: '[name].[chunkhash:8].js'
        },
        module: {
            rules: [
                {
                    test: /\.styl/,
                    use: ExtractPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: [
                            // css-loader处理css
                            'css-loader',
                            // stylus-loader和postcss-loader自己都会生成sourceMap,如果前面stylus-loader已生成了sourceMap
                            // 那么postcss-loader可以直接引用前面的sourceMap
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true,
                                }
                            },
                            // 处理stylus的css预处理器的问题件,转换成css后,抛给上一层的css-loader
                            'stylus-loader'
                        ]
                    })
                },
            ]
        },
        plugins: defaultPlugin.concat([
            // 定义打包分离出的css文件名
            new ExtractPlugin('styles.[contentHash:8].css'),
            // 定义静态文件打包
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor'
            }),
            // 将app.js文件中一些关于webpack文件的配置单独打包出为一个文件,用于解决部分浏览器长缓存问题
            new webpack.optimize.CommonsChunkPlugin({
                name: 'runtime'
            })
        ])
    });
}
// 声明一个config的配置,用于对外暴露
module.exports = config;
