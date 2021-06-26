const path = require('path');
const resolve = dir => path.join(__dirname,dir)


module.exports = {
    // baseUrl: './', //后缀与即将访问的一样

    //outputDir: 'vue',  //输出目录
    devServer:{
        host:"localhost",
        port:"8081",
        proxy:{
            "/api":{
                target:"http://localhost:8088",
                pathRewrite:{
                    "^/api":"/travel_war/"
                }
            },
            "/local":{
                target:"http://localhost:8081",
                pathRewrite:{
                    "^/local": "/data/"
                }
            }
        }
    },
    chainWebpack: (config)=>{
        config.resolve.alias
            .set("style", resolve('src/assets/styles'))
            .set('@',resolve('src'))
            .set('pubCom',resolve('src/pubComponent'))
            .set('homeFoot',resolve('src/page/home'))
    }
}