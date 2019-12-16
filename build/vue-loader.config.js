// const docsLoader = require.resolve('./doc-loader');
module.exports = (isDev) => {
    return {
        preserveWhitespace: true, // 去除html标签中内容得空格
        extractCss: !isDev, // 将.vue文件中得css打包成单独的css文件
        cssModules: {
            localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : "[hash:base64:5]", // css对应得className编译
            camelCase: true
        },
        // hotReload: isDev // 根据环境变量生成
        // loaders: { // 解析.vue文件中的自定义模块
        //     // "docs": docsLoader
        // },
        // preLoader: {},
        // postLoader: {}
    }

};
