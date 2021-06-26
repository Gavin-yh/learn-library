module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: false
    }
  },
  devServer: {
    // 代理使用koaServe开启的服务器，签发真正的令牌。
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changOrigin: true
      }
    },
    // before(app) {
    //   app.get('/api/login', (req, res) => {
    //     const {username, password} = req.query
    //     console.log(username, password)
    //     if (username === "gavin" && password === "111") {
    //       res.json({
    //         code: 1,
    //         token: "33_*333"
    //       })
    //     }else{
    //       res.status(401).json({ error: '用户名或密码错误'})
    //     }
    //   })
    // }
  }
}
